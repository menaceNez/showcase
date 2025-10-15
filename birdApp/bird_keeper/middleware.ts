
export { auth as middleware } from "./auth"

export const config = {
  // (?!register|_next/static...) defines the negative lookahead, means what patterns we exclude from needing authorization
  // means what is allows without auth, notice at the end the |$) this will allow for our root/home to be seen without authing ('/' endpoint).
  matcher: ['/((?!register|_next/static|_next/image|.*\\.png|.*\\.jpg|$).*)'], 
}
