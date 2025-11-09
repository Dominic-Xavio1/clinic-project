
import { AppSidebar } from "@/components/app-sidebar"
import {useNavigate} from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import toast from "react-hot-toast"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({ children }) {
  const navigator = useNavigate()
  const handleLogout = async()=>{
   await localStorage.removeItem("token")
   await localStorage.removeItem("name")
navigator("/")
toast.success("Logout successfully!")
  }
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <SidebarInset className="!m-0">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-6" />
            <div className="flex-1">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Home</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="font-bold border p-2 px-4 rounded-sm hover:cursor-pointer" onClick={()=>handleLogout()}>
              Logout
            </div>
          </header> 
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {/* Left-align content so it sits close to the sidebar. */}
            <div className="w-full max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}


