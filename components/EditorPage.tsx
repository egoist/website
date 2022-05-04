import { useFormik } from "formik"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import {
  useCreatePostMutation,
  useGetPageForEditQuery,
  useUpdatePageMutation,
} from "~/generated/graphql"
import { Editor } from "./Editor"

const getInputDatetimeValue = (date: Date) => {
  const isoString = date.toISOString()

  return isoString.substring(0, ((isoString.indexOf("T") | 0) + 6) | 0)
}

const languages = ["english", "chinese"]

export const EditorPage: React.FC<{ pageId?: string }> = ({ pageId }) => {
  const isUpdate = !!pageId

  const router = useRouter()
  const [, createPostMutation] = useCreatePostMutation()
  const [getPageResult] = useGetPageForEditQuery({
    variables: {
      slugOrId: pageId!,
    },
    pause: !pageId,
  })
  const [, updatePageMutation] = useUpdatePageMutation()

  const form = useFormik<{
    title: string
    content: string
    slug: string
    published?: boolean | null
    publishedAt: string
    language?: string | null
    cover?: string | null
  }>({
    initialValues: {
      title: "",
      content: "",
      slug: "",
      published: false,
      publishedAt: getInputDatetimeValue(new Date()),
      language: undefined,
      cover: undefined,
    },
    async onSubmit(values) {
      const { error } = isUpdate
        ? await updatePageMutation({
            id: pageId!,
            title: values.title,
            content: values.content,
            slug: values.slug,
            published: values.published,
            publishedAt: values.publishedAt,
            language: values.language,
            cover: values.cover,
          })
        : await createPostMutation({
            title: values.title,
            content: values.content,
            slug: values.slug,
            published: values.published,
            publishedAt: values.publishedAt,
            language: values.language,
            cover: values.cover,
          })
      if (error) {
        alert(error.message)
      } else {
        if (isUpdate) {
          alert("updated")
        } else {
          router.push("/admin")
        }
      }
    },
  })

  useEffect(() => {
    if (!getPageResult.fetching && getPageResult.data) {
      form.setValues({
        title: getPageResult.data.getPage.title,
        content: getPageResult.data.getPage.content,
        slug: getPageResult.data.getPage.slug,
        published: getPageResult.data.getPage.published,
        publishedAt: getInputDatetimeValue(
          new Date(getPageResult.data.getPage.publishedAt || new Date())
        ),
        language: getPageResult.data.getPage.language,
      })
    }
  }, [getPageResult.fetching])

  if (getPageResult.fetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-screen-md p-5 mx-auto">
      <Head>
        <title>
          {isUpdate
            ? `Update "${getPageResult.data?.getPage.title}"`
            : `New Page`}
        </title>
      </Head>
      <div className="mb-5">
        <Link href="/admin">
          <a className="text-blue-500">Back</a>
        </Link>
      </div>
      <form onSubmit={form.handleSubmit} className="space-y-4">
        <div>
          <input
            name="title"
            placeholder="Title goes here..."
            onChange={form.handleChange}
            value={form.values.title}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
        <div>
          <input
            name="cover"
            placeholder="Cover image"
            onChange={form.handleChange}
            value={form.values.cover || ""}
            type="url"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
        <div>
          <input
            name="slug"
            placeholder="slug"
            onChange={form.handleChange}
            value={form.values.slug}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
        <div>
          <Editor
            value={form.values.content}
            onChange={(value) => form.setFieldValue("content", value)}
          />
        </div>
        <div>
          <label className="select-none">
            <input
              type="checkbox"
              checked={!!form.values.published}
              onChange={(e) =>
                form.setFieldValue("published", e.target.checked)
              }
            />{" "}
            Published
          </label>
        </div>
        <div>
          <select
            value={form.values.language || "english"}
            onChange={(e) => form.setFieldValue("language", e.target.value)}
          >
            {languages.map((lang) => {
              return (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <input
            name="publishedAt"
            type="datetime-local"
            value={form.values.publishedAt}
            onChange={form.handleChange}
          />
        </div>
        <div>
          <button type="submit">{isUpdate ? "Update" : "Create"} Post</button>
        </div>
      </form>
    </div>
  )
}
