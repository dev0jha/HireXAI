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
import { useSignIn } from "@/hooks/screens/signIn.hook"
import { Form } from "@/components/ui/form"
import EmailField from "@/components/auth/primitives/email-field"
import PassField from "@/components/auth/primitives/pass-fields"

export default function SignInPage() {
  const { form, onSubmitFormAction } = useSignIn()

  const {
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <form onSubmit={onSubmitFormAction}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <EmailField control={form.control} />
              <PassField control={form.control} />
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                  Sign Up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Form>
  )
}
