import LogoutBtn from "@/components/auth/logout-btn"
import { SidebarFooter } from "@/components/ui/sidebar"

export function SiderbarFooter({ collapsed }: { collapsed?: boolean }) {
  return <SidebarFooter>{!collapsed && <LogoutBtn />}</SidebarFooter>
}
