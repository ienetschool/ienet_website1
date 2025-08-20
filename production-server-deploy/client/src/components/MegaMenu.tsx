import { Link } from "wouter";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  Code, 
  Server, 
  Shield, 
  Smartphone, 
  Database,
  Cog,
  Quote
} from "lucide-react";

const serviceCategories = [
  {
    title: "Website Development",
    icon: Code,
    description: "Custom websites, e-commerce platforms, and web applications",
    slug: "website-development",
    services: [
      { name: "UI/UX Design", slug: "ui-ux-design" },
      { name: "E-commerce Development", slug: "ecommerce-development" },
      { name: "CMS Development", slug: "cms-development" },
      { name: "Progressive Web Apps", slug: "progressive-web-apps" }
    ]
  },
  {
    title: "Web Hosting",
    icon: Server,
    description: "Reliable hosting solutions from shared to dedicated servers",
    slug: "web-hosting",
    services: [
      { name: "Shared Hosting", slug: "shared-hosting" },
      { name: "VPS Hosting", slug: "vps-hosting" },
      { name: "Cloud Hosting", slug: "cloud-hosting" },
      { name: "Domain Registration", slug: "domain-registration" }
    ]
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    description: "Comprehensive security services to protect your digital assets",
    slug: "cybersecurity",
    services: [
      { name: "Vulnerability Assessment", slug: "vulnerability-assessment" },
      { name: "Penetration Testing", slug: "penetration-testing" },
      { name: "Security Audits", slug: "security-audits" },
      { name: "Managed Security", slug: "managed-security" }
    ]
  }
];

export default function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-screen max-w-4xl p-8">
              <div className="grid grid-cols-3 gap-8">
                {serviceCategories.map((category) => (
                  <div key={category.title}>
                    <div className="flex items-center space-x-2 mb-4">
                      <category.icon className="text-primary" size={20} />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        <Link href={`/services/${category.slug}`} className="hover:text-primary dark:hover:text-primary-foreground">
                          {category.title}
                        </Link>
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <ul className="space-y-2">
                      {category.services.map((service) => (
                        <li key={service.slug}>
                          <NavigationMenuLink asChild>
                            <Link 
                              href={`/services/${category.slug}/${service.slug}`}
                              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground block transition-colors"
                            >
                              {service.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Footer section for the mega menu */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                      Need a custom solution?
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We create tailored IT solutions for your unique requirements.
                    </p>
                  </div>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <Quote size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
