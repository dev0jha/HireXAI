"use client"

import { Camera, Loader2 } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import React, { useRef, useState } from "react"

import Container from "@/components/core/Container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { SettingStore } from "@/hooks/scopedstores/settings.store"
import {
   useOpenToRecuiterSetting,
   useSaveSettingsAction,
   useSaveSettingsStatus,
} from "@/hooks/screens/settings.hooks"
import {
   createUserSettingsQueryOptions,
   uploadProfileImageMutation,
} from "@/lib/queries/queryOptions"
import { queryKeys } from "@/lib/queries/queryKeys"

interface UserSettings {
   name: string
   email: string
   image?: string
   role: "recruiter" | "candidate"
   username?: string
   company?: string
   position?: string
   bio?: string
   location?: string
   website?: string
   isOpenToRecruiters?: boolean
   isPublicProfile?: boolean
}

export default function SettingsPage() {
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
      <SettingStore.Provider
         defaults={{
            isSaving: false,
            isOpenToRecruiters: userSettings?.isOpenToRecruiters ?? false,
         }}
      >
         <Container className="py-12">
            <div className="mx-auto max-w-2xl">
               <div className="mb-10">
                  <h1 className="text-2xl font-bold tracking-tight text-white">Profile</h1>
                  <p className="text-zinc-500 text-sm">
                     Manage your public presence and account details.
                  </p>
               </div>

               <SettingsFormContent user={userSettings} />
            </div>
         </Container>
      </SettingStore.Provider>
   )
}

function SettingsFormContent({ user }: { user?: UserSettings }) {
   const { handleSave } = useSaveSettingsAction()
   const { isOpenToRecruiters, setIsOpenToRecruiters } = useOpenToRecuiterSetting()
   const queryClient = useQueryClient()
   const fileInputRef = useRef<HTMLInputElement>(null)
   const [isUploading, setIsUploading] = useState(false)
   const [localImage, setLocalImage] = useState<string | undefined>(user?.image)

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

   return (
      <>
         <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
         />
         <form onSubmit={handleSave} className="space-y-8">
            <div className="flex items-center gap-6">
               <div className="group relative">
                  <Avatar className="h-20 w-20 border-2 border-zinc-800">
                     <AvatarImage src={localImage} alt={user?.name || "User"} />
                     <AvatarFallback className="bg-zinc-900 text-zinc-500">
                        {user?.name?.substring(0, 2).toUpperCase() || "US"}
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
                  <h3 className="font-medium text-white text-lg">{user?.name || "User"}</h3>
                  <p className="text-zinc-500 text-sm">@{user?.username || "username"}</p>
               </div>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="space-y-6">
               <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                  <div className="space-y-2">
                     <Label className="text-xs text-zinc-500 font-normal">Full Name</Label>
                     <Input
                        name="name"
                        defaultValue={user?.name || ""}
                        className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                     />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-xs text-zinc-500 font-normal">Email Address</Label>
                     <Input
                        defaultValue={user?.email || ""}
                        disabled
                        className="bg-zinc-900/50 border-zinc-800 text-zinc-500 focus:border-zinc-700 focus:ring-0 h-10 opacity-60 cursor-not-allowed"
                     />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-xs text-zinc-500 font-normal">Location</Label>
                     <Input
                        name="location"
                        defaultValue={user?.location || ""}
                        className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                     />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-xs text-zinc-500 font-normal">Portfolio</Label>
                     <Input
                        name="website"
                        defaultValue={user?.website || ""}
                        className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                     />
                  </div>
                  <div className="col-span-2 space-y-2">
                     <Label className="text-xs text-zinc-500 font-normal">Bio</Label>
                     <Textarea
                        name="bio"
                        defaultValue={user?.bio || ""}
                        className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 resize-none min-h-20"
                     />
                  </div>
               </div>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-sm font-medium text-zinc-200">Recruiter Visibility</p>
                  <p className="text-xs text-zinc-500">
                     Allow verified recruiters to view your profile.
                  </p>
               </div>
               <div className="flex items-center gap-3">
                  <span
                     className={`text-xs font-medium ${isOpenToRecruiters ? "text-emerald-500" : "text-zinc-600"}`}
                  >
                     {isOpenToRecruiters ? "Active" : "Hidden"}
                  </span>
                  <Switch
                     checked={isOpenToRecruiters}
                     onCheckedChange={setIsOpenToRecruiters}
                     className="data-[state=checked]:bg-emerald-600"
                  />
               </div>
            </div>

            <div className="pt-4">
               <SaveButton />
            </div>
         </form>
      </>
   )
}

function SaveButton() {
   const { isSaving } = useSaveSettingsStatus()

   return (
      <Button
         type="submit"
         disabled={isSaving}
         className="bg-white text-black hover:bg-zinc-200 w-full sm:w-auto font-medium"
      >
         {isSaving ? (
            <>
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               Saving...
            </>
         ) : (
            "Save Changes"
         )}
      </Button>
   )
}
