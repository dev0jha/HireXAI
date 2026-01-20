"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SchematicBackground } from "@/components/semantic-background"
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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4 bg-[radial-gradient(35%_80%_at_50%_0%,--theme(--color-foreground/.1),transparent)]">
        <SchematicBackground />
        <Card className="z-10 w-full max-w-md bg-black border-dashed border-1">
          <form onSubmit={submitFormAction}>
            <CardHeader className="text-start mb-4">
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription>Enter your information to get started</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 mb-4">
              <NameFields control={form.control} />
              <EmailField control={form.control} />
              <PassField control={form.control} confirmPassword />
              <RoleSelectorField control={form.control} />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" size="lg" className="w-full " disabled={isSubmitting}>
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
