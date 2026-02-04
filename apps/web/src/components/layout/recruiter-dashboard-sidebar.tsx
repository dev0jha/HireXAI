"use client"

import { SiderbarFooter } from "@/components/layout/sidebar/sidebar-footer"
import { SidebarHeader } from "@/components/layout/sidebar/sidebar-header"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconSearch, IconSettings, IconUsers } from "@tabler/icons-react"
import { SidebarContent } from "@/components/ui/sidebar"

const navItems = [
   { href: "/recruiter/discover", label: "Discover", icon: IconSearch },
   { href: "/recruiter/candidates", label: "My Candidates", icon: IconUsers },
   { href: "/recruiter/settings", label: "Settings", icon: IconSettings },
]

function RecruiterMainContent({ collapsed }: { collapsed?: boolean }) {
   const pathname = usePathname()

   return (
      <SidebarContent>
         <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item, idx) => {
               const isActive =
                  pathname === item.href ||
                  (pathname.startsWith(item.href + "/") && item.href !== "/recruiter")

               return (
                  <Link key={`${idx}-${item.href}`} href={item.href}>
                     <div
                        className={cn(
                           "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                           collapsed && "justify-center px-2",
                           isActive
                              ? "bg-white/10 text-white"
                              : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        )}
                     >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                     </div>
                  </Link>
               )
            })}
         </nav>
      </SidebarContent>
   )
}

export function RecruiterDashboardSidebar() {
   const { open } = useSidebar()

   const collapsed = !open

   return (
      <aside
         className={cn(
            "fixed top-0 left-0 z-40 hidden h-screen overflow-hidden border border-r border-[#2c2c2c] bg-[#191919] shadow-xl transition-all duration-300 md:block",
            collapsed ? "w-16" : "w-64"
         )}
      >
         <div className="flex h-full flex-col">
            {/* Header */}
            <SidebarHeader collapsed={collapsed} />
            {/* Nav */}
            <RecruiterMainContent collapsed={collapsed} />
            {/* Footer */}
            <SiderbarFooter collapsed={collapsed} />
         </div>
      </aside>
   )
}
