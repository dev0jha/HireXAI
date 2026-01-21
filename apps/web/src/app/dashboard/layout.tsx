import type React from "react"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { DashboardHeader } from "@/components/layout/dashboard-header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black relative">
      <DashboardSidebar />
      <DashboardHeader />
      <main className="pt-16 md:ml-64 relative z-10">
        <div className="p-0 text-zinc-100">{children}</div>
      </main>
    </div>
  )
}
