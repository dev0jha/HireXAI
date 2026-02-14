"use client"

import React, { useRef, useState } from "react"
import { Camera, Loader2 } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

import Container from "@/components/core/Container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import {
   createUserSettingsQueryOptions,
   uploadProfileImageMutation,
   updateUserMutation,
} from "@/lib/queries/queryOptions"
import { queryKeys } from "@/lib/queries/queryKeys"

interface UserSettings {
   name: string
   email: string
   image?: string
   role: "recruiter" | "candidate"
   company?: string
   position?: string
   bio?: string
   location?: string
   isOpenToRecruiters?: boolean
   isPublicProfile?: boolean
}

type FormValues = {
   name: string
   company: string
   position: string
   isPublicProfile: boolean
}

export default function RecruiterSettingsPage() {
   const { data, isLoading } = useQuery(createUserSettingsQueryOptions())

   if (isLoading) {
      return (
         <Container className="py-12">
            <div className="mx-auto max-w-2xl">
               <div className="flex h-64 items-center justify-center">
                  <Loader2 className="text-zinc-500 h-6 w-6 animate-spin" />
               </div>
            </div>
         </Container>
      )
   }

   const userSettings = data?.success ? data.settings : undefined

   return (
      <Container className="py-12">
         <div className="mx-auto max-w-2xl">
            <div className="mb-10">
               <h1 className="text-2xl font-bold tracking-tight text-white">Recruiter Profile</h1>
               <p className="text-zinc-500 text-sm">
                  Manage your company details and account settings.
               </p>
            </div>

            <RecruiterSettingsForm user={userSettings} />
         </div>
      </Container>
   )
}

function RecruiterSettingsForm({ user }: { user?: UserSettings }) {
   const queryClient = useQueryClient()
   const fileInputRef = useRef<HTMLInputElement>(null)
   const [isUploading, setIsUploading] = useState(false)
   const [localImage, setLocalImage] = useState<string | undefined>(user?.image)

   const form = useForm<FormValues>({
      defaultValues: {
         name: user?.name ?? "",
         company: user?.company ?? "",
         position: user?.position ?? "",
         isPublicProfile: user?.isPublicProfile ?? true,
      },
   })

   const updateMutation = useMutation({
      ...updateUserMutation,
      onSuccess: () => {
         toast.success("Profile updated successfully!")
         queryClient.invalidateQueries({ queryKey: queryKeys.user() })
         form.reset(form.getValues())
      },
      onError: (error: Error) => {
         toast.error(error.message || "Failed to update profile")
      },
   })

   const uploadMutation = useMutation({
      ...uploadProfileImageMutation,
      onSuccess: data => {
         if (data.success) {
            setLocalImage(data.imageUrl)
            queryClient.invalidateQueries({ queryKey: queryKeys.user() })
            toast.success("Profile image updated!")
         } else {
            toast.error(data.message || "Failed to upload image")
         }
      },
      onError: (error: Error) => {
         toast.error(error.message || "Failed to upload image")
      },
      onSettled: () => {
         setIsUploading(false)
      },
   })

   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setIsUploading(true)
      uploadMutation.mutate(file)
   }

   const onSubmit = (values: FormValues) => {
      updateMutation.mutate({
         name: values.name,
         company: values.company,
         position: values.position,
         isPublicProfile: values.isPublicProfile,
      })
   }

   const isDirty = form.formState.isDirty

   return (
      <>
         <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
         />
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <div className="relative">
                  {isDirty && (
                     <Badge
                        variant="outline"
                        className="absolute right-0 top-0 border-amber-500 text-amber-500"
                     >
                        Unsaved Changes
                     </Badge>
                  )}
                  <div className="flex items-center gap-6">
                     <div className="group relative">
                        <Avatar className="h-20 w-20 border-2 border-zinc-800">
                           <AvatarImage
                              src={localImage || "/recruiter-portrait-male-professional.jpg"}
                              alt={user?.name || "User"}
                              className="object-cover"
                           />
                           <AvatarFallback className="bg-zinc-900 text-zinc-500">
                              {user?.name?.substring(0, 2).toUpperCase() || "RE"}
                           </AvatarFallback>
                        </Avatar>
                        <Button
                           type="button"
                           size="icon"
                           variant="ghost"
                           className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-black"
                           onClick={() => fileInputRef.current?.click()}
                           disabled={isUploading}
                        >
                           {isUploading ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                           ) : (
                              <Camera className="h-3.5 w-3.5" />
                           )}
                        </Button>
                     </div>
                     <div className="space-y-1">
                        <h3 className="font-medium text-white text-lg">
                           {user?.name || "Recruiter"}
                        </h3>
                        <p className="text-zinc-500 text-sm">
                           {user?.email || "recruiter@example.com"}
                        </p>
                     </div>
                  </div>
               </div>

               <Separator className="bg-zinc-800" />

               <div className="space-y-6">
                  <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-xs text-zinc-500 font-normal">
                                 Full Name
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                                    placeholder="John Smith"
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />

                     <div className="space-y-2">
                        <Label className="text-xs text-zinc-500 font-normal">Email Address</Label>
                        <Input
                           value={user?.email || ""}
                           disabled
                           className="bg-zinc-900/50 border-zinc-800 text-zinc-500 focus:border-zinc-700 focus:ring-0 h-10 opacity-60 cursor-not-allowed"
                        />
                     </div>

                     <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-xs text-zinc-500 font-normal">
                                 Company Name
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                                    placeholder="TechCorp Inc."
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-xs text-zinc-500 font-normal">
                                 Position
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                                    placeholder="Senior Recruiter"
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>
               </div>

               <Separator className="bg-zinc-800" />

               <FormField
                  control={form.control}
                  name="isPublicProfile"
                  render={({ field }) => (
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-sm font-medium text-zinc-200">Public Profile</p>
                           <p className="text-xs text-zinc-500">
                              Allow candidates to view your recruiter profile.
                           </p>
                        </div>
                        <div className="flex items-center gap-3">
                           <span
                              className={`text-xs font-medium ${field.value ? "text-emerald-500" : "text-zinc-600"}`}
                           >
                              {field.value ? "Active" : "Hidden"}
                           </span>
                           <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-emerald-600"
                           />
                        </div>
                     </div>
                  )}
               />

               <div className="pt-2">
                  <Button
                     type="submit"
                     disabled={updateMutation.isPending || !form.formState.isDirty}
                     className="bg-white text-black hover:bg-zinc-200 w-full sm:w-auto font-medium h-10 px-8"
                  >
                     {updateMutation.isPending ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Saving...
                        </>
                     ) : (
                        "Save Changes"
                     )}
                  </Button>
               </div>
            </form>
         </Form>
      </>
   )
}
