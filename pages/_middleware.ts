import { NextRequest, NextResponse } from "next/server"

export default async (req: NextRequest) => {
  const { pathname } = req.nextUrl
  if (
    /^\/admin($|\/)/.test(pathname) &&
    !req.cookies[process.env.AUTH_COOKIE_NAME]
  ) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
