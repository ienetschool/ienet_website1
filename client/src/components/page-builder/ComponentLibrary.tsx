import { useState } from "react";
import { useDrag } from "react-dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Type,
  Image,
  Square,
  Navigation,
  Grid,
  Layout,
  Video,
  MapPin,
  Calendar,
  Star,
  Quote,
  Users,
  BarChart3,
  ShoppingCart,
  MessageCircle,
  Search,
  Plus,
  Zap
} from "lucide-react";
import type { PageElement } from "./AdvancedPageBuilder";

interface ComponentTemplate {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  description: string;
  template: Omit<PageElement, 'id' | 'parentId'>;
  preview?: string;
  isPro?: boolean;
}

const componentTemplates: ComponentTemplate[] = [
  // Basic Elements
  {
    id: 'text-heading',
    name: 'Heading',
    icon: Type,
    category: 'Basic',
    description: 'Add headings and titles',
    template: {
      type: 'text',
      content: 'Your Heading Here',
      properties: {
        className: 'text-3xl font-bold text-gray-900 dark:text-gray-100',
        style: { marginBottom: '16px' },
        settings: { tag: 'h2', editable: true }
      }
    }
  },
  {
    id: 'text-paragraph',
    name: 'Paragraph',
    icon: Type,
    category: 'Basic',
    description: 'Add text content',
    template: {
      type: 'text',
      content: 'Your paragraph text goes here. Click to edit this content.',
      properties: {
        className: 'text-base text-gray-700 dark:text-gray-300 leading-relaxed',
        style: { marginBottom: '16px' },
        settings: { tag: 'p', editable: true }
      }
    }
  },
  {
    id: 'image-block',
    name: 'Image',
    icon: Image,
    category: 'Basic',
    description: 'Add images and photos',
    template: {
      type: 'image',
      properties: {
        className: 'w-full h-auto rounded-lg shadow-md',
        style: { maxWidth: '100%', height: 'auto' },
        settings: {
          src: 'https://via.placeholder.com/600x400?text=Your+Image',
          alt: 'Placeholder image',
          editable: true
        }
      }
    }
  },
  {
    id: 'button-primary',
    name: 'Button',
    icon: Square,
    category: 'Basic',
    description: 'Call-to-action buttons',
    template: {
      type: 'button',
      content: 'Click Me',
      properties: {
        className: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200',
        style: { display: 'inline-block' },
        settings: { href: '#', target: '_self', editable: true }
      }
    }
  },

  // Layout Elements
  {
    id: 'container-section',
    name: 'Section',
    icon: Layout,
    category: 'Layout',
    description: 'Full-width content section',
    template: {
      type: 'section',
      properties: {
        className: 'py-16 px-4 bg-gray-50 dark:bg-gray-800',
        style: { width: '100%', minHeight: '200px' },
        settings: { containerMaxWidth: '1200px', editable: true }
      },
      children: []
    }
  },
  {
    id: 'container-box',
    name: 'Container',
    icon: Square,
    category: 'Layout',
    description: 'Flexible container box',
    template: {
      type: 'container',
      properties: {
        className: 'p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
        style: { minHeight: '100px' },
        settings: { editable: true }
      },
      children: []
    }
  },
  {
    id: 'grid-2col',
    name: '2 Column Grid',
    icon: Grid,
    category: 'Layout',
    description: 'Two column layout',
    template: {
      type: 'grid',
      properties: {
        className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
        style: { width: '100%' },
        settings: { columns: 2, editable: true }
      },
      children: [
        {
          id: 'col-1',
          type: 'container',
          properties: {
            className: 'p-4 bg-gray-100 dark:bg-gray-800 rounded-lg min-h-32',
            settings: { editable: true }
          },
          children: []
        },
        {
          id: 'col-2',
          type: 'container',
          properties: {
            className: 'p-4 bg-gray-100 dark:bg-gray-800 rounded-lg min-h-32',
            settings: { editable: true }
          },
          children: []
        }
      ]
    }
  },
  {
    id: 'grid-3col',
    name: '3 Column Grid',
    icon: Grid,
    category: 'Layout',
    description: 'Three column layout',
    template: {
      type: 'grid',
      properties: {
        className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
        style: { width: '100%' },
        settings: { columns: 3, editable: true }
      },
      children: [
        {
          id: 'col-1',
          type: 'container',
          properties: {
            className: 'p-4 bg-gray-100 dark:bg-gray-800 rounded-lg min-h-32',
            settings: { editable: true }
          },
          children: []
        },
        {
          id: 'col-2',
          type: 'container',
          properties: {
            className: 'p-4 bg-gray-100 dark:bg-gray-800 rounded-lg min-h-32',
            settings: { editable: true }
          },
          children: []
        },
        {
          id: 'col-3',
          type: 'container',
          properties: {
            className: 'p-4 bg-gray-100 dark:bg-gray-800 rounded-lg min-h-32',
            settings: { editable: true }
          },
          children: []
        }
      ]
    }
  },

  // Components
  {
    id: 'hero-banner',
    name: 'Hero Banner',
    icon: Layout,
    category: 'Components',
    description: 'Large banner with text and CTA',
    template: {
      type: 'hero',
      properties: {
        className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 text-center',
        style: { minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        settings: { editable: true }
      },
      children: [
        {
          id: 'hero-content',
          type: 'container',
          properties: {
            className: 'max-w-4xl mx-auto',
            settings: { editable: true }
          },
          children: [
            {
              id: 'hero-title',
              type: 'text',
              content: 'Welcome to Our Amazing Service',
              properties: {
                className: 'text-5xl font-bold mb-6',
                settings: { tag: 'h1', editable: true }
              }
            },
            {
              id: 'hero-subtitle',
              type: 'text',
              content: 'We provide the best solutions for your business needs',
              properties: {
                className: 'text-xl mb-8 opacity-90',
                settings: { tag: 'p', editable: true }
              }
            },
            {
              id: 'hero-cta',
              type: 'button',
              content: 'Get Started',
              properties: {
                className: 'bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200',
                settings: { href: '#', editable: true }
              }
            }
          ]
        }
      ]
    }
  },
  {
    id: 'card-basic',
    name: 'Card',
    icon: Square,
    category: 'Components',
    description: 'Content card with image and text',
    template: {
      type: 'card',
      properties: {
        className: 'bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden',
        style: { maxWidth: '400px' },
        settings: { editable: true }
      },
      children: [
        {
          id: 'card-image',
          type: 'image',
          properties: {
            className: 'w-full h-48 object-cover',
            settings: {
              src: 'https://via.placeholder.com/400x200?text=Card+Image',
              alt: 'Card image',
              editable: true
            }
          }
        },
        {
          id: 'card-content',
          type: 'container',
          properties: {
            className: 'p-6',
            settings: { editable: true }
          },
          children: [
            {
              id: 'card-title',
              type: 'text',
              content: 'Card Title',
              properties: {
                className: 'text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100',
                settings: { tag: 'h3', editable: true }
              }
            },
            {
              id: 'card-text',
              type: 'text',
              content: 'This is a sample card description. Add your content here.',
              properties: {
                className: 'text-gray-600 dark:text-gray-400',
                settings: { tag: 'p', editable: true }
              }
            }
          ]
        }
      ]
    }
  },
  {
    id: 'navigation-menu',
    name: 'Navigation',
    icon: Navigation,
    category: 'Components',
    description: 'Website navigation menu',
    template: {
      type: 'navigation',
      properties: {
        className: 'bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700',
        style: { width: '100%' },
        settings: { editable: true }
      },
      children: [
        {
          id: 'nav-container',
          type: 'container',
          properties: {
            className: 'max-w-7xl mx-auto px-4 py-4 flex items-center justify-between',
            settings: { editable: true }
          },
          children: [
            {
              id: 'nav-logo',
              type: 'text',
              content: 'Logo',
              properties: {
                className: 'text-xl font-bold text-gray-900 dark:text-gray-100',
                settings: { tag: 'div', editable: true }
              }
            },
            {
              id: 'nav-menu',
              type: 'container',
              properties: {
                className: 'hidden md:flex items-center space-x-8',
                settings: { editable: true }
              },
              children: [
                {
                  id: 'nav-item-1',
                  type: 'text',
                  content: 'Home',
                  properties: {
                    className: 'text-gray-700 dark:text-gray-300 hover:text-blue-600 cursor-pointer',
                    settings: { tag: 'a', href: '#', editable: true }
                  }
                },
                {
                  id: 'nav-item-2',
                  type: 'text',
                  content: 'About',
                  properties: {
                    className: 'text-gray-700 dark:text-gray-300 hover:text-blue-600 cursor-pointer',
                    settings: { tag: 'a', href: '#', editable: true }
                  }
                },
                {
                  id: 'nav-item-3',
                  type: 'text',
                  content: 'Services',
                  properties: {
                    className: 'text-gray-700 dark:text-gray-300 hover:text-blue-600 cursor-pointer',
                    settings: { tag: 'a', href: '#', editable: true }
                  }
                },
                {
                  id: 'nav-item-4',
                  type: 'text',
                  content: 'Contact',
                  properties: {
                    className: 'text-gray-700 dark:text-gray-300 hover:text-blue-600 cursor-pointer',
                    settings: { tag: 'a', href: '#', editable: true }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // Forms
  {
    id: 'contact-form',
    name: 'Contact Form',
    icon: Form,
    category: 'Forms',
    description: 'Contact form with fields',
    template: {
      type: 'form',
      properties: {
        className: 'bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md',
        style: { width: '100%' },
        settings: { action: '/api/contact', method: 'POST', editable: true }
      },
      children: [
        {
          id: 'form-title',
          type: 'text',
          content: 'Contact Us',
          properties: {
            className: 'text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100',
            settings: { tag: 'h3', editable: true }
          }
        }
      ]
    }
  },

  // Pro Components
  {
    id: 'testimonial-slider',
    name: 'Testimonials',
    icon: Quote,
    category: 'Pro',
    description: 'Customer testimonials slider',
    isPro: true,
    template: {
      type: 'container',
      properties: {
        className: 'bg-gray-50 dark:bg-gray-800 py-16 px-6',
        style: { width: '100%' },
        settings: { editable: true }
      },
      children: []
    }
  },
  {
    id: 'pricing-table',
    name: 'Pricing Table',
    icon: BarChart3,
    category: 'Pro',
    description: 'Pricing plans comparison',
    isPro: true,
    template: {
      type: 'container',
      properties: {
        className: 'bg-white dark:bg-gray-900 p-8 rounded-lg',
        style: { width: '100%' },
        settings: { editable: true }
      },
      children: []
    }
  }
];

interface DraggableComponentProps {
  template: ComponentTemplate;
  onAdd: (template: Omit<PageElement, 'id' | 'parentId'>) => void;
}

function DraggableComponent({ template, onAdd }: DraggableComponentProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { template },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const Icon = template.icon;

  return (
    <div
      ref={drag}
      className={`
        p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-grab hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors
        ${isDragging ? 'opacity-50' : ''}
        ${template.isPro ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10' : 'bg-white dark:bg-gray-800'}
      `}
      data-testid={`component-${template.id}`}
      onClick={() => onAdd(template.template)}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-md ${
          template.isPro 
            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
              {template.name}
            </h4>
            {template.isPro && (
              <Badge variant="secondary" className="text-xs">
                Pro
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {template.description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ComponentLibraryProps {
  onElementAdd: (element: Omit<PageElement, 'id' | 'parentId'>) => void;
  onElementSelect: (elementId: string | null) => void;
}

export function ComponentLibrary({ onElementAdd, onElementSelect }: ComponentLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ['all', ...Array.from(new Set(componentTemplates.map(t => t.category)))];
  
  const filteredTemplates = componentTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedTemplates = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, ComponentTemplate[]>);

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-components"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="text-xs"
              data-testid={`filter-${category}`}
            >
              {category === 'all' ? 'All' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Components */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {activeCategory === 'all' ? (
            <Accordion type="multiple" defaultValue={Object.keys(groupedTemplates)} className="space-y-2">
              {Object.entries(groupedTemplates).map(([category, templates]) => (
                <AccordionItem key={category} value={category} className="border rounded-lg">
                  <AccordionTrigger className="px-4 py-2 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {templates.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid gap-3">
                      {templates.map((template) => (
                        <DraggableComponent
                          key={template.id}
                          template={template}
                          onAdd={onElementAdd}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="grid gap-3">
              {filteredTemplates.map((template) => (
                <DraggableComponent
                  key={template.id}
                  template={template}
                  onAdd={onElementAdd}
                />
              ))}
            </div>
          )}

          {filteredTemplates.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No components found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}