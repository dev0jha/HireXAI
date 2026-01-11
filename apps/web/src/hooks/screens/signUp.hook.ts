"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, type SignUpSchema } from "@/utils/validation/register.validation"
import { SignUpUserAction } from "@/actions/auth.actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useSignUp() {
  const router = useRouter()

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: SignUpSchema) {
    const toastId = toast.loading("creating account....")

    const response = await SignUpUserAction(values)
    if (!response.success) {
      toast.error(response.error, { id: toastId })
      return
    }

    toast.success("Sign In successfull!!", { id: toastId })
    router.push("/signin")
  }

  const submitFormAction = form.handleSubmit(onSubmit)

  return {
    submitFormAction,
    form,
  }
}
