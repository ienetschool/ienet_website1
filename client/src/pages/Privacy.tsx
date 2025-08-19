import { TopBar } from "@/components/layout/TopBar";
import { ModernHeader } from "@/components/layout/ModernHeader";
import { ModernFooter } from "@/components/layout/ModernFooter";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "wouter";

const seoConfig = {
  title: "Privacy Policy - IeNet",
  description: "Learn about IeNet's privacy policy, data protection practices, and how we handle your personal information securely.",
  keywords: "privacy policy, data protection, IeNet, security, personal information",
  canonical: "/privacy"
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seoConfig} />
      <TopBar />
      <ModernHeader />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Live Chat Button */}
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          onClick={() => window.open('https://wa.me/5927503901', '_blank')}
        >
          <MessageCircle size={24} />
        </Button>
        
        {/* Get Quote Button */}
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          onClick={() => window.location.href = '/contact'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11h6v2H9zm0-4h6v2H9zm0 8h4v2H9z" fill="currentColor"/>
            <path d="M4 2v18l4-4h12V2H4z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </Button>
      </div>

      <main>
        {/* Breadcrumb */}
        <section className="bg-white dark:bg-gray-900 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">Privacy Policy</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-white mb-6">Privacy Policy</h1>
              <p className="text-xl text-blue-100 mb-8">
                Your privacy is important to us. This policy explains how IeNet collects, uses, and protects your personal information.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Information We Collect</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">How We Use Your Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">Data Security</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  If you have any questions about this Privacy Policy, please contact us at info@ienet.com or +592 750-3901.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}