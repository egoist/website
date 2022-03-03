import { EditorPage } from "~/components/EditorPage"
import { withUrql } from "~/lib/urql-client"

export default withUrql(function NewPostPage() {
  return <EditorPage />
})
