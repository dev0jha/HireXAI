import { SidebarHeader } from "@/components/ui/sidebar"
import Logo from "@/components/Logo"

export function SidebarHeaderContent() {
   return (
      <SidebarHeader>
         <div className="flex h-16 items-center justify-center gap-3 bg-zinc-200/5 border-white/10 px-4 border-2 rounded-lg">
            <Logo />
         </div>
      </SidebarHeader>
   )
}
