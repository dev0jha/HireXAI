import { signInUserAction } from "@/actions/auth.actions"
import { useForm } from "react-hook-form"
import { signInSchema } from "@/utils/validation/signIn.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useRouter } from "next/navigation"

import type { SignInSchema } from "@/utils/validation/signIn.validation"

export function useSignIn() {
  const router = useRouter()

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignInSchema) {
    const toastId = toast.loading("Logging you in...")

    const response = await signInUserAction(values)
    if (!response.success) {
      toast.error(response.error, { id: toastId })
      return
    }

    toast.success("Sign In Successfull!!", { id: toastId })
    router.push("/dashboard")
  }

  const onSubmitFormAction = form.handleSubmit(onSubmit)

  return {
    onSubmitFormAction,
    form,
  }
}
