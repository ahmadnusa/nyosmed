import { google } from "@/auth"
import { generateCodeVerifier, generateState } from "arctic"
import { cookies } from "next/headers"

export async function GET() {
  const state = generateState()
  const codeVerify = generateCodeVerifier()

  const url = await google.createAuthorizationURL(state, codeVerify, {
    scopes: ["profile", "email"],
  })

  cookies().set("state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  })

  cookies().set("code_verifier", codeVerify, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  })

  return Response.redirect(url)
}
