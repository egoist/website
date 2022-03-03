import { AuthPage } from "~/components/AuthPage"
import { withUrql } from "~/lib/urql-client"

export default withUrql(function SignupPage() {
  return <AuthPage type="signup" />
})
