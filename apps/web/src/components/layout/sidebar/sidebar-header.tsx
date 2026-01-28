import { IconCode } from "@tabler/icons-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"

export function SidebarHeader({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
      <Link href="/" className="flex items-center gap-2">
        {collapsed ? (
          <SidebarTrigger className="p-0 bg-transparent text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition">
              <IconCode className="h-5 w-5 text-white" />
            </div>
          </SidebarTrigger>
        ) : (
          <>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
              <IconCode className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-white tracking-tight">HireXAI</span>
          </>
        )}
      </Link>

      {!collapsed && (
        <SidebarTrigger className="bg-transparent text-white rounded-md stroke-3 font-bold" />
      )}
    </div>
  )
}
