import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TravelLayout } from "@/components/TravelLayout";
import Dashboard from "./pages/Dashboard";
import TouristSpots from "./pages/TouristSpots";
import Accommodations from "./pages/Accommodations";
import CafeShop from "./pages/CafeShop";
import Gallery from "./pages/Gallery";
import TransportGuide from "./pages/TransportGuide";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// ✅ Import Login wrapper (with LoginForm + SignUpForm toggle)
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* 🔑 Standalone login/signup page */}
            <Route path="/login" element={<Login />} />

            {/* 🔑 Main layout and all other routes */}
            <Route
              path="/*"
              element={
                <TravelLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/spots" element={<TouristSpots />} />
                    <Route path="/accommodations" element={<Accommodations />} />
                    <Route path="/cafe" element={<CafeShop />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/transport" element={<TransportGuide />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </TravelLayout>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
