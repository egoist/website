import { useFormik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import { useLoginMutation, useSignupMutation } from "~/generated/graphql"

export const AuthPage: React.FC<{ type: "signup" | "login" }> = ({ type }) => {
  const isSignup = type === "signup"
  const router = useRouter()
  const [, signupMutation] = useSignupMutation()
  const [, loginMutation] = useLoginMutation()

  const handleError = (error: Error) => {
    alert(error.message)
  }

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values) {
      if (isSignup) {
        const { error } = await signupMutation({
          email: values.email,
          password: values.password,
        })
        if (error) {
          handleError(error)
          return
        }
      } else {
        const { error } = await loginMutation({
          email: values.email,
          password: values.password,
        })
        if (error) {
          handleError(error)
          return
        }
      }
      router.push("/admin")
    },
  })
  return (
    <div>
      <form
        className="space-y-4 p-5 mx-auto max-w-md"
        onSubmit={form.handleSubmit}
      >
        <label>
          <span className="block mb-1">Email</span>
          <input
            name="email"
            type="email"
            className="border rounded-lg px-3 h-10 inline-flex items-center w-full"
            required
            autoComplete="off"
            value={form.values.email}
            onChange={form.handleChange}
          />
        </label>
        <label className="block">
          <span className="block mb-1">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="off"
            className="border rounded-lg px-3 h-10 inline-flex items-center w-full"
            required
            value={form.values.password}
            onChange={form.handleChange}
          />
        </label>
        <div>
          <button
            type="submit"
            className="bg-indigo-500 rounded-lg text-white h-10 inline-flex items-center px-3"
          >
            {isSignup ? "Signup" : "Login"}{" "}
          </button>
        </div>
        <div>
          {isSignup ? (
            <span>
              Already a user?
              <Link href="/signup">
                <a>Login</a>
              </Link>
            </span>
          ) : (
            <span>
              No account?{" "}
              <Link href="/signup">
                <a>Signup</a>
              </Link>{" "}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
