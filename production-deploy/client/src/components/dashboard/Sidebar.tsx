import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Search,
  Globe,
  Mail,
  Shield,
  Palette,
  Layout,
  Zap,
  TrendingUp,
  Activity,
  Calendar,
  Star,
  Image,
  Menu,
  Edit,
  Plus,
  ChevronDown,
  ChevronRight,
  Home,
  Building,
  Building2,
  ShoppingCart,
  CreditCard,
  Database,
  Sliders,
  MessageCircle,
  Eye,
  Lock,
  HelpCircle,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  children?: MenuItem[];
  path?: string;
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    path: "/dashboard"
  },
  {
    id: "cms",
    label: "Content Management",
    icon: FileText,
    children: [
      { id: "pages", label: "Pages", icon: Layout, path: "/dashboard/pages" },
      { id: "services", label: "Services", icon: Building, path: "/dashboard/services" },
      { id: "sub-services", label: "Sub-Services", icon: Building2, path: "/dashboard/sub-services" },
      { id: "features", label: "Feature Pages", icon: Zap, path: "/dashboard/features" },
      { id: "projects", label: "Projects", icon: Star, path: "/dashboard/projects" },
      { id: "blog", label: "Blog Posts", icon: Edit, path: "/dashboard/blog" },
    ]
  },
  {
    id: "leads",
    label: "Lead Management",
    icon: MessageSquare,
    badge: "3",
    children: [
      { id: "enquiries", label: "Enquiries", icon: MessageCircle, path: "/dashboard/enquiries" },
      { id: "contacts", label: "Contact Forms", icon: Mail, path: "/dashboard/contacts" },
      { id: "quotes", label: "Quote Requests", icon: FileText, path: "/dashboard/quotes" },
    ]
  },
  {
    id: "seo",
    label: "SEO & Analytics",
    icon: Search,
    children: [
      { id: "seo-pages", label: "Page SEO", icon: Globe, path: "/dashboard/seo" },
      { id: "schema", label: "Schema Markup", icon: Database, path: "/dashboard/schema" },
      { id: "analytics", label: "Analytics", icon: TrendingUp, path: "/dashboard/analytics" },
      { id: "sitemap", label: "Sitemap", icon: Layout, path: "/dashboard/sitemap" },
    ]
  },
  {
    id: "ui-content",
    label: "UI Content",
    icon: Image,
    children: [
      { id: "sliders", label: "Hero Sliders", icon: Sliders, path: "/dashboard/sliders" },
      { id: "testimonials", label: "Testimonials", icon: Star, path: "/dashboard/testimonials" },
      { id: "team", label: "Team Members", icon: Users, path: "/dashboard/team" },
      { id: "gallery", label: "Media Gallery", icon: Image, path: "/dashboard/gallery" },
    ]
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingCart,
    children: [
      { id: "products", label: "Products", icon: ShoppingCart, path: "/dashboard/products" },
      { id: "orders", label: "Orders", icon: FileText, path: "/dashboard/orders" },
      { id: "payments", label: "Payments", icon: CreditCard, path: "/dashboard/payments" },
    ]
  },
  {
    id: "users",
    label: "User Management",
    icon: Users,
    children: [
      { id: "all-users", label: "All Users", icon: Users, path: "/dashboard/users" },
      { id: "roles", label: "Roles & Permissions", icon: Shield, path: "/dashboard/roles" },
      { id: "activity", label: "Activity Logs", icon: Activity, path: "/dashboard/activity" },
    ]
  },
  {
    id: "settings",
    label: "Site Settings",
    icon: Settings,
    children: [
      { id: "general", label: "General Settings", icon: Settings, path: "/dashboard/settings" },
      { id: "theme", label: "Theme & Design", icon: Palette, path: "/dashboard/theme" },
      { id: "email", label: "Email Templates", icon: Mail, path: "/dashboard/email" },
      { id: "security", label: "Security", icon: Lock, path: "/dashboard/security" },
    ]
  },
  {
    id: "tools",
    label: "Tools & Utilities",
    icon: Zap,
    children: [
      { id: "backup", label: "Backup & Restore", icon: Database, path: "/dashboard/backup" },
      { id: "maintenance", label: "Maintenance", icon: Settings, path: "/dashboard/maintenance" },
      { id: "help", label: "Help & Support", icon: HelpCircle, path: "/dashboard/help" },
    ]
  }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['cms']);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isActive = (path: string) => location === path;
  const isParentActive = (item: MenuItem) => {
    if (item.children) {
      return item.children.some(child => child.path && isActive(child.path));
    }
    return item.path ? isActive(item.path) : false;
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = item.path ? isActive(item.path) : isParentActive(item);

    return (
      <div key={item.id} className="mb-1">
        {hasChildren ? (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 px-4 text-left font-normal",
              depth > 0 && "pl-8",
              active && "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
            )}
            onClick={() => toggleExpanded(item.id)}
          >
            <item.icon className="mr-3 h-4 w-4" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-2 h-5 text-xs">
                {item.badge}
              </Badge>
            )}
            {isExpanded ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        ) : (
          <Link href={item.path || "#"}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-4 text-left font-normal",
                depth > 0 && "pl-8",
                active && "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              )}
              onClick={onClose}
            >
              <item.icon className="mr-3 h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-2 h-5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className="ml-2 mt-1 border-l border-gray-200 dark:border-gray-700">
            {item.children?.map(child => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">IeNet CMS</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-1">
              {menuItems.map(item => renderMenuItem(item))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 truncate">admin@ienet.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}