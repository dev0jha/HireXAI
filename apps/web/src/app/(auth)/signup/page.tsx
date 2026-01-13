"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { useSignUp } from "@/hooks/screens/signUp.hook"
import NameFields from "@/components/auth/primitives/name-fields"
import EmailField from "@/components/auth/primitives/email-field"
import PassField from "@/components/auth/primitives/pass-fields"
import RoleSelectorField from "@/components/auth/primitives/role-selector"

export default function SignUpPage() {
  const { form, submitFormAction } = useSignUp()

  const {
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <form onSubmit={submitFormAction}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription>Enter your information to get started</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <NameFields control={form.control} />
              <EmailField control={form.control} />
              <PassField control={form.control} confirmPassword />
              <RoleSelectorField control={form.control} />
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="font-medium text-primary hover:underline">
                  Sign In
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Form>
  )
}
