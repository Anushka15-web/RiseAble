import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "./context/AccessibilityContext";

// Pages
import Home from "./pages/Home";
import AccessibilityTools from "./pages/AccessibilityTools";
import CommunicationHub from "./pages/CommunicationHub";
import LanguageSupport from "./pages/LanguageSupport";
import JobListings from "./pages/JobListings";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Layout
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="accessibility-tools" element={<AccessibilityTools />} />
              <Route path="communication-hub" element={<CommunicationHub />} />
              <Route path="language-support" element={<LanguageSupport />} />
              <Route path="jobs" element={<JobListings />} />
              <Route path="courses" element={<Courses />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
