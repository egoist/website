import { useRouter } from "next/router"
import { EditorPage } from "~/components/EditorPage"
import { withUrql } from "~/lib/urql-client"

export default withUrql(function EditPage() {
  const router = useRouter()
  const pageId = router.query.page as string | undefined

  if (!pageId) return null

  return <EditorPage pageId={pageId} />
})
