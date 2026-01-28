import type React from "react"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { SidebarContent, SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/layout/sidebar/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex bg-[#121212]">
      <div className="min-h-screen bg-[#121212] relative flex rounded-lg">
        <Sidebar>
          <SidebarContent className="bg-[#121212]">
            <DashboardSidebar />
          </SidebarContent>
        </Sidebar>
      </div>

      <SidebarInset className="w-full bg-[#121212] p-6 gap-4">
        <DashboardHeader />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
