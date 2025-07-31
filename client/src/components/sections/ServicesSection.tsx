import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { 
  Code, 
  Server, 
  Shield, 
  Smartphone, 
  Database, 
  Cog,
  Check
} from "lucide-react";

const iconMap = {
  code: Code,
  server: Server,
  shield: Shield,
  smartphone: Smartphone,
  database: Database,
  cog: Cog,
};

const colorMap = {
  primary: "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400",
  emerald: "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400",
  red: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
  purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
  amber: "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400",
  indigo: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400",
};

const buttonColorMap = {
  primary: "bg-primary-600 hover:bg-primary-700",
  emerald: "bg-emerald-600 hover:bg-emerald-700",
  red: "bg-red-600 hover:bg-red-700",
  purple: "bg-purple-600 hover:bg-purple-700",
  amber: "bg-amber-600 hover:bg-amber-700",
  indigo: "bg-indigo-600 hover:bg-indigo-700",
};

export default function ServicesSection() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['/api/service-categories'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-8">
                  <Skeleton className="w-16 h-16 rounded-lg mb-6" />
                  <Skeleton className="h-6 w-48 mb-4" />
                  <Skeleton className="h-4 w-full mb-6" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Core Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive IT solutions designed to accelerate your digital transformation and business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category: any) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code;
            const colorClass = colorMap[category.color as keyof typeof colorMap] || colorMap.primary;
            const buttonClass = buttonColorMap[category.color as keyof typeof buttonColorMap] || buttonColorMap.primary;

            return (
              <Card 
                key={category.id} 
                className="group bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${colorClass} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {category.description}
                  </p>
                  
                  {/* Sample features for display */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Check className="text-emerald-500 mr-2" size={14} />
                      <span>Professional Solutions</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Check className="text-emerald-500 mr-2" size={14} />
                      <span>Expert Implementation</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Check className="text-emerald-500 mr-2" size={14} />
                      <span>24/7 Support</span>
                    </div>
                  </div>

                  <Button asChild className={`w-full text-white ${buttonClass}`}>
                    <Link href={`/services/${category.slug}`}>
                      Explore Services
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
