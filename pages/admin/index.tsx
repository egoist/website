import Link from "next/link"
import { useGetPagesQuery } from "~/generated/graphql"
import { withUrql } from "~/lib/urql-client"

export default withUrql(function AdminPage() {
  const [getPagesQuery] = useGetPagesQuery({
    variables: {
      type: "post",
      includeDrafts: true,
    },
  })
  return (
    <div className="max-w-md mx-auto p-5">
      <div className="mb-5">
        <Link href="/admin/new-post">
          <a className="text-blue-500">New Post</a>
        </Link>
      </div>
      {getPagesQuery.data?.getPages.map((page) => {
        return (
          <div key={page.id}>
            <h3>
              <Link href={`/admin/pages/${page.id}`}>
                <a className="underline">{page.title}</a>
              </Link>
            </h3>
          </div>
        )
      })}
    </div>
  )
})
