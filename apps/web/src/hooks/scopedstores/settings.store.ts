import { atom } from "jotai"
import type { Atom } from "jotai"

import { createScopedAtoms } from "@/lib/state/scoped-stores"

interface SettingAtoms {
   isSaving: Atom<boolean>
   isOpenToRecruiters: Atom<boolean>
   /*
   Add a form for setting page
   */
   name: Atom<string>
   location: Atom<string>
   portfolio: Atom<string>
   bio: Atom<string>
}

/*
 * Component level scoped store for settings page
 * **/
export const SettingStore = createScopedAtoms<SettingAtoms>(defaults => ({
   isSaving: atom<boolean>(defaults?.isSaving ?? false),
   isOpenToRecruiters: atom<boolean>(defaults?.isOpenToRecruiters ?? false),
   name: atom<string>(defaults?.name ?? ""),
   location: atom<string>(defaults?.location ?? ""),
   portfolio: atom<string>(defaults?.portfolio ?? ""),
   bio: atom<string>(defaults?.bio ?? ""),
}))
