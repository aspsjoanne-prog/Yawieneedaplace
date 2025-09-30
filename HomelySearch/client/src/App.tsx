import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import SearchPage from "@/pages/SearchPage";
import SavedPage from "@/pages/SavedPage";
import ComparePage from "@/pages/ComparePage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SearchPage} />
      <Route path="/saved" component={SavedPage} />
      <Route path="/compare" component={ComparePage} />
      <Route path="/alerts" component={() => <div className="p-6"><h1>Alerts Page</h1><p>Coming soon...</p></div>} />
      <Route path="/profile" component={() => <div className="p-6"><h1>Profile Page</h1><p>Coming soon...</p></div>} />
      <Route path="/settings" component={() => <div className="p-6"><h1>Settings Page</h1><p>Coming soon...</p></div>} />
      <Route path="/help" component={() => <div className="p-6"><h1>Help Page</h1><p>Coming soon...</p></div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-2 border-b bg-background">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-hidden">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
