import { Hospital } from "lucide-react"
import logo from "../../public/agahozo.png"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function VersionSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="text-sidebar-primary-foreground flex  items-center justify-center rounded-lg">
            <img src={logo} alt="logo" className="w-14 h-14" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Clinic Management</span>
            <span className="text-xs text-muted-foreground">System</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
