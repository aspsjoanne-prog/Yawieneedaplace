import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Heart, 
  BarChart3, 
  Settings, 
  Home,
  Bell,
  User,
  HelpCircle,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "wouter";

export function AppSidebar() {
  const [location] = useLocation();

  const navigationItems = [
    {
      title: "Search",
      url: "/",
      icon: Search,
      isActive: location === "/",
    },
    {
      title: "Saved Properties",
      url: "/saved",
      icon: Heart,
      isActive: location === "/saved",
      badge: "3", //todo: remove mock functionality
    },
    {
      title: "Comparisons",
      url: "/compare",
      icon: BarChart3,
      isActive: location === "/compare",
    },
    {
      title: "Alerts",
      url: "/alerts",
      icon: Bell,
      isActive: location === "/alerts",
      badge: "2", //todo: remove mock functionality
    },
  ];

  const settingsItems = [
    {
      title: "Profile",
      url: "/profile",
      icon: User,
      isActive: location === "/profile",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: location === "/settings",
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
      isActive: location === "/help",
    },
  ];

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">PropFind</h2>
            <p className="text-xs text-muted-foreground">Property Search</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase()}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="ghost" className="w-full justify-start" data-testid="button-logout">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}