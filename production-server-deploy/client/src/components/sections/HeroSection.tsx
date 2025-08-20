import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-6">
              <Rocket className="mr-2" size={16} />
              Enterprise IT Solutions
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Complete{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                IT Services
              </span>{" "}
              for Modern Businesses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              From website development to cybersecurity, we provide comprehensive IT solutions that drive business growth and digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                <ArrowRight className="mr-2" size={16} />
                View Our Services
              </Button>
              <Button variant="outline" size="lg">
                Schedule Consultation
              </Button>
            </div>
          </div>
          <div className="relative">
            {/* Modern tech dashboard illustration */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-4 bg-primary-200 dark:bg-primary-800 rounded"></div>
                <div className="h-4 bg-emerald-200 dark:bg-emerald-800 rounded"></div>
                <div className="h-4 bg-amber-200 dark:bg-amber-800 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
