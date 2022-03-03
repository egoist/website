import { useFormik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import {
  useCreatePostMutation,
  useGetPageForEditQuery,
  useUpdatePageMutation,
} from "~/generated/graphql"

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
  }>({
    initialValues: {
      title: "",
      content: "",
      slug: "",
      published: false,
    },
    async onSubmit(values) {
      const { error } = isUpdate
        ? await updatePageMutation({
            id: pageId!,
            title: values.title,
            content: values.content,
            slug: values.slug,
            published: values.published,
          })
        : await createPostMutation({
            title: values.title,
            content: values.content,
            slug: values.slug,
            published: values.published,
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
      })
    }
  }, [getPageResult.fetching])

  if (getPageResult.fetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md p-5 mx-auto">
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
            name="slug"
            placeholder="slug"
            onChange={form.handleChange}
            value={form.values.slug}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
        <div>
          <textarea
            name="content"
            onChange={form.handleChange}
            value={form.values.content}
            className="w-full border rounded-lg p-3"
            rows={10}
            required
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
          <button type="submit">{isUpdate ? "Update" : "Create"} Post</button>
        </div>
      </form>
    </div>
  )
}
