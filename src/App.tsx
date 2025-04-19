
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useState, useEffect, createContext } from "react";

// Create auth context
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if user is already logged in from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem("nexwealth-auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("nexwealth-auth", "true");
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("nexwealth-auth");
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <TooltipProvider>
          <div className="flex items-center justify-end p-2 absolute top-0 right-0 z-20">
            <ThemeToggle />
          </div>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route 
                path="/auth" 
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />} 
              />
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
