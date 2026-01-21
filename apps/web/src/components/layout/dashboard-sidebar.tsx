"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Code2,
  LayoutDashboard,
  Search,
  Inbox,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import LogoutBtn from "@/components/auth/logout-btn"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/analysis", label: "Analyze Repo", icon: Search },
  { href: "/dashboard/request", label: "Requests", icon: Inbox },
  { href: "/dashboard/setting", label: "Settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "hidden md:block fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-black transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <span className="font-bold text-white tracking-tight">HireXAI</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hidden md:flex text-zinc-400 hover:text-white hover:bg-white/10"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 space-y-2 p-3">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 transition-colors duration-200",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-white/10 text-white border border-white/5"
                      : "text-zinc-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive && "text-white")} />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          {!collapsed && <LogoutBtn />}
        </div>
      </div>
    </aside>
  )
}
