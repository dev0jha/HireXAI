"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "@/lib/auth-client"
import LogoutBtn from "@/components/auth/logout-btn"
import { SidebarFooter, SidebarGroup } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { grabUserNameInitials } from "@/lib/info"

export function SiderbarFooter({ collapsed }: { collapsed?: boolean }) {
  const { data: session } = useSession()

  switch (true) {
    case collapsed:
      return <SidebarFooter />

    case !session || !session.user:
      return null

    default:
      return (
        <SidebarFooter
          className={cn(
            "px-5 transition-all ",
            collapsed && "px-0 flex flex-col items-center justify-center"
          )}
        >
          <SidebarGroup className={cn(collapsed && "flex flex-col items-center gap-3")}>
            {!collapsed && <div className="px-2 py-2 text-xs text-neutral-500">Signed in as</div>}

            <div
              className={cn("pb-2 text-sm flex gap-4", collapsed && "flex-col items-center gap-2")}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user.image ?? ""} />
                <AvatarFallback>{grabUserNameInitials(session.user.name)}</AvatarFallback>
              </Avatar>

              {!collapsed && (
                <div className="flex gap-4">
                  <div>
                    <div className="font-medium text-white">{session.user.name}</div>
                    <div className="text-neutral-500">{session.user.email}</div>
                  </div>
                </div>
              )}
            </div>

            <div className={!collapsed ? "pb-2" : "hidden"}>
              <LogoutBtn className="rounded-md py-4 px-3" />
            </div>
          </SidebarGroup>
        </SidebarFooter>
      )
  }
}
