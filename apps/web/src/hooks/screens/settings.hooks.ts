import { SettingStore } from "@/hooks/scopedstores/settings.store"
import { useUpdateUser } from "@/lib/auth-client"

/*
 * Hook to get saving settings status
 * **/
export function useSaveSettingsStatus() {
   const [isSaving, setIsSaving] = SettingStore.useAtom("isSaving")
   return {
      isSaving,
      setIsSaving,
   }
}

/**
 *
 * Is open to recruiters toggle hook
 * **/
export function useOpenToRecuiterSetting() {
   const [isOpenToRecruiters, setIsOpenToRecruiters] = SettingStore.useAtom("isOpenToRecruiters")
   return {
      isOpenToRecruiters,
      setIsOpenToRecruiters,
   }
}

/**
 * Form field hooks
 * **/
export function useSettingsFormFields() {
   const [name, setName] = SettingStore.useAtom("name")
   const [location, setLocation] = SettingStore.useAtom("location")
   const [portfolio, setPortfolio] = SettingStore.useAtom("portfolio")
   const [bio, setBio] = SettingStore.useAtom("bio")

   return {
      name,
      setName,
      location,
      setLocation,
      portfolio,
      setPortfolio,
      bio,
      setBio,
   }
}

/*
 *  Hook to handle saving settings action
 * **/
export function useSaveSettingsAction() {
   const { isSaving, setIsSaving } = useSaveSettingsStatus()
   const { name } = useSettingsFormFields()
   const updateUserMutation = useUpdateUser()

   async function handleSave(e: React.FormEvent) {
      e.preventDefault()
      setIsSaving(true)

      try {
         await updateUserMutation.mutateAsync({ name })
      } catch (error) {
         console.error("Failed to save settings:", error)
      } finally {
         setIsSaving(false)
      }
   }

   return {
      handleSave,
      isSaving,
      setIsSaving,
   }
}
