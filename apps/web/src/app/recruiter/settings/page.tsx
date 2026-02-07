"use client"

import { Camera, Loader2, User, Building2, Briefcase } from "lucide-react"

import Container from "@/components/core/Container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
   useRecruiterSaveSettingsAction,
   useRecruiterSaveSettingsStatus,
} from "@/hooks/screens/recruiter-settings.hooks"
import { createUserQueryOptions } from "@/lib/queries/queryOptions"
import { useQuery } from "@tanstack/react-query"

export default function RecruiterSettingsPage() {
   return (
      <Container className="py-8">
         <div className="flex items-center justify-center">
            <div className="w-full max-w-3xl space-y-4">
               {/* Header */}
               <div className="mb-6 px-1">
                  <h1 className="text-xl font-bold tracking-tight text-white">Settings</h1>
                  <p className="text-zinc-400 text-xs">
                     Manage your recruiter profile and company information.
                  </p>
               </div>

               {/* Main Form Content */}
               <RecruiterSettingsForm />
            </div>
         </div>
      </Container>
   )
}

function RecruiterSettingsForm() {
   const { data: user, isLoading } = useQuery(createUserQueryOptions())
   const { handleSave } = useRecruiterSaveSettingsAction()

   if (isLoading) {
      return (
         <div className="flex h-64 items-center justify-center">
            <Loader2 className="text-zinc-500 h-6 w-6 animate-spin" />
         </div>
      )
   }

   return (
      <form onSubmit={handleSave} className="space-y-4">
         {/* GROUP 1: Identity */}
         <Card className="bg-neutral-900 border-white/5 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="group relative">
                     <Avatar className="h-14 w-14 border border-white/10">
                        <AvatarImage
                           src={user?.image || "/recruiter-portrait-male-professional.jpg"}
                           alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-zinc-800 text-zinc-400">
                           {user?.name?.substring(0, 2).toUpperCase() || "RE"}
                        </AvatarFallback>
                     </Avatar>
                     <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute -right-1.5 -bottom-1.5 h-6 w-6 rounded-full border border-neutral-900 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                     >
                        <Camera className="h-3 w-3" />
                     </Button>
                  </div>
                  <div>
                     <h3 className="text-base font-semibold text-white">
                        {user?.name || "Recruiter"}
                     </h3>
                     <p className="text-zinc-500 text-xs">{user?.email}</p>
                     <p className="text-primary mt-0.5 text-[10px] font-bold tracking-widest uppercase">
                        Verified Recruiter
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="grid gap-4 md:grid-cols-2">
            {/* GROUP 2: Personal Details */}
            <Card className="bg-neutral-900 border-white/5 shadow-sm h-full">
               <CardHeader className="p-4 pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2 text-zinc-100">
                     <User className="h-3.5 w-3.5 text-zinc-500" />
                     <CardTitle className="text-sm font-medium">Personal Details</CardTitle>
                  </div>
               </CardHeader>
               <CardContent className="p-4 space-y-3">
                  <div className="space-y-1.5">
                     <Label
                        htmlFor="name"
                        className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide"
                     >
                        Full Name
                     </Label>
                     <Input
                        id="name"
                        name="name"
                        defaultValue={user?.name || ""}
                        placeholder="John Smith"
                        className="focus:ring-primary/50 border-white/10 bg-white/5 text-white h-8 text-sm"
                     />
                  </div>
                  <div className="space-y-1.5">
                     <Label
                        htmlFor="email"
                        className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide"
                     >
                        Email
                     </Label>
                     <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ""}
                        disabled
                        className="focus:ring-primary/50 border-white/10 bg-white/5 text-zinc-500 h-8 text-sm opacity-70"
                     />
                  </div>
               </CardContent>
            </Card>

            {/* GROUP 3: Professional Info */}
            <Card className="bg-neutral-900 border-white/5 shadow-sm h-full">
               <CardHeader className="p-4 pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2 text-zinc-100">
                     <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                     <CardTitle className="text-sm font-medium">Company Details</CardTitle>
                  </div>
               </CardHeader>
               <CardContent className="p-4 space-y-3">
                  <div className="space-y-1.5">
                     <Label
                        htmlFor="company"
                        className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide"
                     >
                        Company Name
                     </Label>
                     {/* @ts-ignore */}
                     <div className="relative">
                        <Building2 className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500" />
                        <Input
                           id="company"
                           name="company"
                           defaultValue={user?.company || ""}
                           placeholder="TechCorp Inc."
                           className="pl-8 focus:ring-primary/50 border-white/10 bg-white/5 text-white h-8 text-sm"
                        />
                     </div>
                  </div>
                  <div className="space-y-1.5">
                     <Label
                        htmlFor="position"
                        className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide"
                     >
                        Position
                     </Label>
                     {/* @ts-ignore */}
                     <div className="relative">
                        <Briefcase className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500" />
                        <Input
                           id="position"
                           name="position"
                           defaultValue={user?.position || ""}
                           placeholder="Senior Recruiter"
                           className="pl-8 focus:ring-primary/50 border-white/10 bg-white/5 text-white h-8 text-sm"
                        />
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Action Button */}
         <div className="flex justify-end pt-1">
            <SaveButton />
         </div>
      </form>
   )
}

function SaveButton() {
   const { isSaving } = useRecruiterSaveSettingsStatus()

   return (
      <Button type="submit" disabled={isSaving} size="sm" className="min-w-32.5 font-semibold h-9">
         {isSaving ? (
            <>
               <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
               Saving...
            </>
         ) : (
            "Save Changes"
         )}
      </Button>
   )
}
