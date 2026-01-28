import type React from "react"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { SidebarContent, SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/layout/sidebar/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#161618] relative flex">
        <Sidebar>
          <SidebarContent>
            <DashboardSidebar />
          </SidebarContent>
        </Sidebar>
      </div>

      <SidebarInset className="w-full bg-[#161618]">
        <DashboardHeader />
        <div className="p-0 text-zinc-100">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
