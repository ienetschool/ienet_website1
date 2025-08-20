import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import SubServiceDetail from "@/pages/SubServiceDetail";
import FeatureDetail from "@/pages/FeatureDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Industries from "@/pages/Industries";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Pricing from "@/pages/Pricing";
import Blog from "@/pages/Blog";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms"; 
import Careers from "@/pages/Careers";
import SitemapViewer from "@/pages/SitemapViewer";
import AdminDashboard from "@/pages/AdminDashboard";
import PerformanceDashboard from "@/pages/PerformanceDashboard";
import ComprehensiveDashboard from "@/pages/ComprehensiveDashboard";
import DashboardHelper from "@/pages/DashboardHelper";
import DatabaseViewer from "@/pages/DatabaseViewer";
import PageBuilder from "@/pages/dashboard/PageBuilder";

import EditingDemo from "@/components/EditingDemo";
import UserManagement from "@/pages/UserManagement";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/services" component={Services} />
          <Route path="/services/:categorySlug" component={ServiceDetail} />
          <Route path="/services/:categorySlug/:serviceSlug" component={SubServiceDetail} />
          <Route path="/services/:categorySlug/:serviceSlug/:featureSlug" component={FeatureDetail} />
          <Route path="/features/:categorySlug/:serviceSlug/:featureSlug" component={FeatureDetail} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:slug" component={ProjectDetail} />
          <Route path="/industries" component={Industries} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/faq" component={FAQ} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/blog" component={Blog} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/careers" component={Careers} />
          <Route path="/sitemap-viewer" component={SitemapViewer} />
          <Route path="/performance" component={PerformanceDashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/page-builder" component={PageBuilder} />
          <Route path="/dashboard" component={ComprehensiveDashboard} />
          <Route path="/dashboard/:section*" component={ComprehensiveDashboard} />
          <Route path="/ienetdb" component={DatabaseViewer} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/services/:categorySlug" component={ServiceDetail} />
          <Route path="/services/:categorySlug/:serviceSlug" component={SubServiceDetail} />
          <Route path="/services/:categorySlug/:serviceSlug/:featureSlug" component={FeatureDetail} />
          <Route path="/features/:categorySlug/:serviceSlug/:featureSlug" component={FeatureDetail} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:slug" component={ProjectDetail} />
          <Route path="/industries" component={Industries} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/faq" component={FAQ} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/blog" component={Blog} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/careers" component={Careers} />
          <Route path="/sitemap-viewer" component={SitemapViewer} />
          <Route path="/performance" component={PerformanceDashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/users" component={UserManagement} />
          <Route path="/page-builder" component={PageBuilder} />
          <Route path="/dashboard" component={ComprehensiveDashboard} />
          <Route path="/dashboard/:section*" component={ComprehensiveDashboard} />
          <Route path="/ienetdb" component={DatabaseViewer} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ienet-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
