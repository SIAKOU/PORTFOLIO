import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProjectProvider } from "@/contexts/ProjectContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CVPage from "@/components/CVPage";
import Splash from "@/components/Splash";
import Layout from "@/components/Layout";
import ProjectDetailPage from "./pages/ProjectDetailPage";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ProjectProvider>
              <Toaster />
              <Sonner />
              {showSplash ? (
                <Splash onFinish={() => setShowSplash(false)} duration={2500} />
              ) : (
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Layout>
                          <Index />
                        </Layout>
                      }
                    />
                    <Route
                      path="/project/:id"
                      element={
                        <Layout>
                          <ProjectDetailPage />
                        </Layout>
                      }
                    />
                    <Route path="/cv" element={<CVPage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              )}
            </ProjectProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
