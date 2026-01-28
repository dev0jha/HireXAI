"use client"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"
import { SiderbarFooter } from "@/components/layout/sidebar/sidebar-footer"
import { SidebarHeader } from "@/components/layout/sidebar/sidebar-header"
import { MainContent } from "@/components/layout/sidebar/sidebar-maincontent"

export function DashboardSidebar() {
  const { open } = useSidebar()

  const collapsed = !open

  return (
    <aside
      className={cn(
        "hidden md:block fixed left-0 top-0 z-40 h-screen bg-[#222224] transition-all duration-300 shadow-xl",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* keader */}
        <SidebarHeader collapsed={collapsed} />
        {/* Nav */}
        <MainContent collapsed={collapsed} />
        {/* Footer */}
        <SiderbarFooter collapsed={collapsed} />
      </div>
    </aside>
  )
}
