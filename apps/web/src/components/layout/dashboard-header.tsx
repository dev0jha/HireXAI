"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Code2, Menu, X, Settings, LogOut, User } from "lucide-react"
import { useSession } from "@/lib/auth-client"

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, error } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md md:left-64">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link href="/" className="flex items-center gap-2 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white">HireXAI</span>
          </Link>
        </div>
 <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-3 hover:bg-white/5 pl-2 pr-0">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-white leading-none">Admin</p>
              </div>
              <Avatar className="h-9 w-9 border border-white/10">
                <AvatarImage src={session?.user.image || "/developer-portrait-male-asian.jpg"} alt={session?.user.name || "User"} />
                <AvatarFallback className="bg-white/10 text-white">{session?.user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#09090b] border-white/10 text-zinc-300">
            <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white">
              <Link href="/profile/alexchen" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white">
              <Link href="/dashboard/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>{" "}

            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white">
              <Link href="/" className="flex items-center gap-2 text-destructive hover:text-red-400">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 p-4 md:hidden bg-black">
          <nav className="space-y-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10">
                Overview
              </Button>
            </Link>
            <Link href="/dashboard/analysis" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10">
                Analyze Repo
              </Button>
            </Link>
            <Link href="/dashboard/request" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10">
                Requests
              </Button>
            </Link>
            <Link href="/dashboard/setting" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10">
                Settings
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
