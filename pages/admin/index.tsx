import clsx from "clsx"
import Link from "next/link"
import { useGetPagesQuery } from "~/generated/graphql"
import { withUrql } from "~/lib/urql-client"

export default withUrql(function AdminPage() {
  const [getPagesQuery] = useGetPagesQuery({
    variables: {
      type: "post",
      includeDrafts: true,
      language: "all",
    },
  })
  return (
    <div className="max-w-md mx-auto p-5">
      <div className="mb-5">
        <Link href="/admin/new-post">
          <a className="text-blue-500">New Post</a>
        </Link>
      </div>
      <div className="space-y-5">
        {getPagesQuery.data?.getPages.map((page) => {
          return (
            <div key={page.id}>
              <h3>
                <Link href={`/admin/pages/${page.id}`}>
                  <a className="text-brand hover:underline">{page.title}</a>
                </Link>
              </h3>
              <div className="text-xs text-zinc-400 space-x-3 mt-1">
                <span>{page.publishedAt}</span>

                <span className="inline-flex items-center space-x-1">
                  <span
                    className={clsx(
                      `w-2 h-2 rounded-full inline-block`,
                      page.published ? `bg-green-500` : `bg-orange-500`
                    )}
                  ></span>
                  <span className="">
                    {page.published ? "Published" : "Draft"}
                  </span>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
