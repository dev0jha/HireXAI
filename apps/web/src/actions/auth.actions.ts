"use server"

import { auth } from "@/lib/auth"
import { attempt } from "@/utils/attempt"

import type { SignInSchema } from "@/utils/validation/signIn.validation"
import { ActionRes } from "@/types/actions"
import { SignUpSchema } from "@/utils/validation/register.validation"

export async function SignInUserAction(formValues: SignInSchema): Promise<ActionRes> {
  const result = await attempt(() =>
    auth.api.signInEmail({
      body: {
        ...formValues,
      },
      asResponse: true,
    })
  )

  if (!result.ok) {
    console.error("Failed sign In", result.error)
    return {
      success: false,
      error: result.error.message ?? "Invalid credentials!!",
    }
  }

  return {
    success: true,
  }
}

export async function SignUpUserAction({
  firstName,
  lastName,
  email,
  password,
}: SignUpSchema): Promise<ActionRes> {
  const result = await attempt(() =>
    auth.api.signUpEmail({
      body: {
        name: firstName + lastName,
        email: email,
        password: password,
      },
    })
  )

  if (!result.ok) {
    console.error("Failed sign Up", result.error)
    return {
      success: false,
      error: result.error.message ?? "Sign in failed",
    }
  }

  return {
    success: true,
  }
}
