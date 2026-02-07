"use client"

import { Camera, Loader2 } from "lucide-react"

import Container from "@/components/core/Container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { mockDevelopers } from "@/data/mock-data"
import { SettingStore } from "@/hooks/scopedstores/settings.store"
import {
   useOpenToRecuiterSetting,
   useSaveSettingsAction,
   useSaveSettingsStatus,
} from "@/hooks/screens/settings.hooks"

export default function SettingsPage() {
   const developer = mockDevelopers[0]

   return (
      <SettingStore.Provider
         defaults={{
            isOpenToRecruiters: developer.isOpenToRecruiters,
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

               <SettingsFormContent developer={developer} />
            </div>
         </Container>
      </SettingStore.Provider>
   )
}

function SettingsFormContent({ developer }: { developer: (typeof mockDevelopers)[0] }) {
   const { handleSave } = useSaveSettingsAction()
   const { isOpenToRecruiters, setIsOpenToRecruiters } = useOpenToRecuiterSetting()

   return (
      <form onSubmit={handleSave} className="space-y-8">
         {/* 1. IDENTITY (Clean Row) */}
         <div className="flex items-center gap-6">
            <div className="group relative">
               <Avatar className="h-20 w-20 border-2 border-zinc-800">
                  <AvatarImage src={developer.avatar} alt={developer.name} />
                  <AvatarFallback className="bg-zinc-900 text-zinc-500">
                     {developer.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-black"
               >
                  <Camera className="h-3.5 w-3.5" />
               </Button>
            </div>
            <div className="space-y-1">
               <h3 className="font-medium text-white text-lg">{developer.name}</h3>
               <p className="text-zinc-500 text-sm">@{developer.username}</p>
            </div>
         </div>

         <Separator className="bg-zinc-800" />

         {/* 2. FORM GRID (Flat) */}
         <div className="space-y-6">
            <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
               <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Full Name</Label>
                  <Input
                     defaultValue={developer.name}
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                  />
               </div>
               <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Email Address</Label>
                  <Input
                     defaultValue={developer.email}
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                  />
               </div>
               <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Location</Label>
                  <Input
                     defaultValue={developer.location}
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                  />
               </div>
               <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Portfolio</Label>
                  <Input
                     defaultValue={developer.website}
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                  />
               </div>
               <div className="col-span-2 space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Bio</Label>
                  <Textarea
                     defaultValue={developer.bio}
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 resize-none min-h-20"
                  />
               </div>
            </div>
         </div>

         <Separator className="bg-zinc-800" />

         {/* 3. VISIBILITY (Minimal Toggle) */}
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

         {/* 4. ACTIONS */}
         <div className="pt-4">
            <SaveButton />
         </div>
      </form>
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
