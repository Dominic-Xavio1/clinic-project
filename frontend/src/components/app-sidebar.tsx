import * as React from "react"
import { LayoutDashboard, UserPlus, User, EllipsisVertical, FilePlus, HeartPulse, MessageSquare } from "lucide-react"
import { VersionSwitcher } from "@/components/version-switcher"
import { useLocation, Link } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Navigation data


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  let role = localStorage.getItem("role")
  const baseNav = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Diseases",
      url: "/diseases",
      icon: HeartPulse,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: MessageSquare,
    },
  ]

  const staffNav = [
    {
      title: "Register Patients",
      url: "/register",
      icon: UserPlus,
    },
    {
      title: "Create Report",
      url: "/create-report",
      icon: FilePlus,
    },
  ]

  const doctorExtras = role === "doctor" ? [{ title: "Register Nurse", url: "/register-nurse", icon: UserPlus }] : []

  const navMain = role === "doctor" || role === "nurse" ? [...baseNav, ...staffNav, ...doctorExtras] : baseNav

  const data = {
    navMain,
    user: {
      name: localStorage.getItem("name") || "User",
      email: `${role}`  ,
      avatar: "/avatars/01.png",
    },
  }
  return (
    <>
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => {
                const location = useLocation();
                const isActive = location.pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>  
                        <item.icon className="size-4" />
                        <span className="font-normal">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <User className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">{data.user.name}</span>
                    <span className="text-xs text-muted-foreground">{data.user.email}</span>
                  </div>
                  <EllipsisVertical className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top" className="w-56">
         
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  
    </>
  )
}
