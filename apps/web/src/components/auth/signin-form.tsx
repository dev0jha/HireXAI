"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Form from "next/form"
import { SignInUser } from "@/actions/auth-action"
import { useForm } from "react-hook-form"
import { signInSchema, type SignInSchema } from "@/utils/validation/signIn.validation"

import { zodResolver } from "@hookform/resolvers/zod"

export function SignInForm() {
  const { handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <Form action={SignInUser} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          disabled={pending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          disabled={pending}
        />
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? "Signing in..." : "Sign In"}
      </Button>
    </Form>
  )
}

