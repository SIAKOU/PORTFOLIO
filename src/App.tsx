import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GithubProvider } from "@/contexts/GithubContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import Layout from "@/components/Layout";
import Splash from "@/components/Splash";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CVPage = lazy(() => import("@/components/CVPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" attribute="class">
            <GithubProvider>
            <ProjectProvider>
              <Toaster />
              <Sonner />
              <AnimatePresence>
                {showSplash && <Splash key="splash" onFinish={() => setShowSplash(false)} />}
              </AnimatePresence>
              {!showSplash && (
                <BrowserRouter>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
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
                  </Suspense>
                </BrowserRouter>
              )}
            </ProjectProvider>
            </GithubProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
