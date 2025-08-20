import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Code,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Copy,
  Download,
  Upload,
  Wand2,
  Globe,
  Star,
  Building,
  Calendar,
  MapPin,
  User,
  FileText,
  ShoppingCart,
  Utensils,
  GraduationCap,
  Music,
  Camera,
  Briefcase,
  Heart,
  Zap
} from 'lucide-react';

interface SchemaData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

interface SchemaEditorProps {
  pageData?: any;
  onSave?: (schemaData: SchemaData[]) => void;
  onValidate?: (schemas: SchemaData[]) => Promise<any>;
}

const schemaTypes = [
  { value: 'Article', label: 'Article', icon: FileText, category: 'Content' },
  { value: 'BlogPosting', label: 'Blog Post', icon: FileText, category: 'Content' },
  { value: 'NewsArticle', label: 'News Article', icon: FileText, category: 'Content' },
  { value: 'FAQPage', label: 'FAQ Page', icon: FileText, category: 'Content' },
  { value: 'HowTo', label: 'How-To Guide', icon: FileText, category: 'Content' },
  
  { value: 'Product', label: 'Product', icon: ShoppingCart, category: 'E-commerce' },
  { value: 'Offer', label: 'Offer', icon: ShoppingCart, category: 'E-commerce' },
  { value: 'Review', label: 'Review', icon: Star, category: 'E-commerce' },
  { value: 'AggregateRating', label: 'Aggregate Rating', icon: Star, category: 'E-commerce' },
  
  { value: 'Organization', label: 'Organization', icon: Building, category: 'Business' },
  { value: 'LocalBusiness', label: 'Local Business', icon: Building, category: 'Business' },
  { value: 'Corporation', label: 'Corporation', icon: Building, category: 'Business' },
  { value: 'NonProfit', label: 'Non-Profit', icon: Heart, category: 'Business' },
  
  { value: 'Person', label: 'Person', icon: User, category: 'People' },
  { value: 'ContactPoint', label: 'Contact Point', icon: User, category: 'People' },
  
  { value: 'Event', label: 'Event', icon: Calendar, category: 'Events' },
  { value: 'Course', label: 'Course', icon: GraduationCap, category: 'Education' },
  { value: 'Recipe', label: 'Recipe', icon: Utensils, category: 'Lifestyle' },
  { value: 'SoftwareApplication', label: 'Software App', icon: Zap, category: 'Technology' },
  { value: 'WebSite', label: 'Website', icon: Globe, category: 'Technology' },
  { value: 'BreadcrumbList', label: 'Breadcrumb List', icon: Globe, category: 'Navigation' },
];

const templateSchemas = {
  Article: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '',
    description: '',
    author: {
      '@type': 'Person',
      name: ''
    },
    publisher: {
      '@type': 'Organization',
      name: '',
      logo: {
        '@type': 'ImageObject',
        url: ''
      }
    },
    datePublished: '',
    dateModified: '',
    mainEntityOfPage: '',
    image: ''
  },
  Product: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: '',
    description: '',
    brand: {
      '@type': 'Brand',
      name: ''
    },
    offers: {
      '@type': 'Offer',
      price: '',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '',
      reviewCount: ''
    },
    image: ''
  },
  LocalBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '',
    description: '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: '',
      addressRegion: '',
      postalCode: '',
      addressCountry: ''
    },
    telephone: '',
    url: '',
    openingHours: '',
    priceRange: ''
  },
  FAQPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: []
  },
  BreadcrumbList: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: []
  }
};

export function SchemaEditor({ pageData, onSave, onValidate }: SchemaEditorProps) {
  const { toast } = useToast();
  const [schemas, setSchemas] = useState<SchemaData[]>([]);
  const [activeSchema, setActiveSchema] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'visual' | 'json'>('visual');
  const [validationResults, setValidationResults] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);

  const addSchema = useCallback((type: string) => {
    const template = templateSchemas[type as keyof typeof templateSchemas];
    if (template) {
      const newSchema = { ...template };
      setSchemas(prev => [...prev, newSchema]);
      setActiveSchema(schemas.length);
    }
  }, [schemas.length]);

  const updateSchema = useCallback((index: number, updates: Partial<SchemaData>) => {
    setSchemas(prev => prev.map((schema, i) => 
      i === index ? { ...schema, ...updates } : schema
    ));
  }, []);

  const removeSchema = useCallback((index: number) => {
    setSchemas(prev => prev.filter((_, i) => i !== index));
    if (activeSchema >= schemas.length - 1) {
      setActiveSchema(Math.max(0, schemas.length - 2));
    }
  }, [activeSchema, schemas.length]);

  const validateSchemas = useCallback(async () => {
    if (!onValidate) return;
    
    setIsValidating(true);
    try {
      const results = await onValidate(schemas);
      setValidationResults(results);
      
      if (results.valid) {
        toast({
          title: "Schema Validation Passed",
          description: "All schemas are valid and properly formatted.",
        });
      } else {
        toast({
          title: "Schema Validation Issues",
          description: `Found ${results.errors?.length || 0} validation issues.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Failed to validate schemas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  }, [schemas, onValidate, toast]);

  const exportSchemas = useCallback(() => {
    const dataStr = JSON.stringify(schemas, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'schemas.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [schemas]);

  const importSchemas = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSchemas = JSON.parse(e.target?.result as string);
        setSchemas(importedSchemas);
        toast({
          title: "Schemas Imported",
          description: `Successfully imported ${importedSchemas.length} schemas.`,
        });
      } catch (error) {
        toast({
          title: "Import Error",
          description: "Failed to parse schema file. Please check the format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  }, [toast]);

  const generateSchemaFromAI = useCallback(async (type: string, content: string) => {
    // AI-powered schema generation (placeholder)
    toast({
      title: "AI Schema Generation",
      description: "AI schema generation coming soon with advanced content analysis.",
    });
  }, [toast]);

  const renderSchemaTypeSelector = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Schema Type</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(
            schemaTypes.reduce((acc, type) => {
              if (!acc[type.category]) acc[type.category] = [];
              acc[type.category].push(type);
              return acc;
            }, {} as Record<string, typeof schemaTypes>)
          ).map(([category, types]) => (
            <div key={category}>
              <h4 className="font-medium mb-2 text-sm text-gray-600 dark:text-gray-400">
                {category}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {types.map((type) => (
                  <Button
                    key={type.value}
                    variant="outline"
                    size="sm"
                    onClick={() => addSchema(type.value)}
                    className="justify-start"
                    data-testid={`button-add-schema-${type.value}`}
                  >
                    <type.icon className="w-4 h-4 mr-2" />
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderSchemaList = () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Active Schemas ({schemas.length})</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={validateSchemas}
            disabled={isValidating || schemas.length === 0}
            data-testid="button-validate-schemas"
          >
            {isValidating ? (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            Validate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportSchemas}
            disabled={schemas.length === 0}
            data-testid="button-export-schemas"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {schemas.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium">No schemas added</p>
          <p className="text-sm">Add a schema type to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {schemas.map((schema, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                activeSchema === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSchema(index)}
              data-testid={`schema-item-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{schema['@type']}</Badge>
                  <span className="text-sm font-medium">
                    {schema.name || schema.headline || `Schema ${index + 1}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSchema(index);
                  }}
                  data-testid={`button-remove-schema-${index}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderVisualEditor = () => {
    const currentSchema = schemas[activeSchema];
    if (!currentSchema) return null;

    const renderSchemaField = (key: string, value: any, path: string = '') => {
      const fullPath = path ? `${path}.${key}` : key;
      
      if (key === '@context' || key === '@type') {
        return (
          <div key={key} className="space-y-2">
            <Label className="text-xs text-gray-500">{key}</Label>
            <Input
              value={value}
              disabled
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
        );
      }

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <div key={key} className="space-y-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Label className="font-medium">{key}</Label>
            {Object.entries(value).map(([subKey, subValue]) =>
              renderSchemaField(subKey, subValue, fullPath)
            )}
          </div>
        );
      }

      if (Array.isArray(value)) {
        return (
          <div key={key} className="space-y-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="font-medium">{key}</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Add array item logic
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {value.map((item, index) => (
              <div key={index} className="space-y-2">
                {typeof item === 'object' ? (
                  Object.entries(item).map(([subKey, subValue]) =>
                    renderSchemaField(subKey, subValue, `${fullPath}[${index}]`)
                  )
                ) : (
                  <Input
                    value={item}
                    onChange={(e) => {
                      const newSchema = { ...currentSchema };
                      const keys = fullPath.split('.');
                      let current = newSchema;
                      for (let i = 0; i < keys.length - 1; i++) {
                        current = current[keys[i]];
                      }
                      current[keys[keys.length - 1]][index] = e.target.value;
                      updateSchema(activeSchema, newSchema);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        );
      }

      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
          {key.includes('description') || key.includes('text') ? (
            <Textarea
              value={value || ''}
              onChange={(e) => {
                const newSchema = { ...currentSchema };
                const keys = fullPath.split('.');
                let current = newSchema;
                for (let i = 0; i < keys.length - 1; i++) {
                  current = current[keys[i]];
                }
                if (keys.length === 1) {
                  newSchema[key] = e.target.value;
                } else {
                  current[keys[keys.length - 1]] = e.target.value;
                }
                updateSchema(activeSchema, newSchema);
              }}
              placeholder={`Enter ${key}`}
              rows={3}
            />
          ) : (
            <Input
              value={value || ''}
              onChange={(e) => {
                const newSchema = { ...currentSchema };
                const keys = fullPath.split('.');
                let current = newSchema;
                for (let i = 0; i < keys.length - 1; i++) {
                  current = current[keys[i]];
                }
                if (keys.length === 1) {
                  newSchema[key] = e.target.value;
                } else {
                  current[keys[keys.length - 1]] = e.target.value;
                }
                updateSchema(activeSchema, newSchema);
              }}
              placeholder={`Enter ${key}`}
              type={key.includes('date') ? 'date' : key.includes('price') ? 'number' : 'text'}
            />
          )}
        </div>
      );
    };

    return (
      <ScrollArea className="h-[600px]">
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Edit {currentSchema['@type']} Schema</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateSchemaFromAI(currentSchema['@type'], '')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
            >
              <Wand2 className="w-4 h-4 mr-1" />
              AI Generate
            </Button>
          </div>
          {Object.entries(currentSchema).map(([key, value]) =>
            renderSchemaField(key, value)
          )}
        </div>
      </ScrollArea>
    );
  };

  const renderJsonEditor = () => {
    const currentSchema = schemas[activeSchema];
    if (!currentSchema) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">JSON Editor</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(currentSchema, null, 2));
                toast({
                  title: "Copied to Clipboard",
                  description: "Schema JSON copied to clipboard.",
                });
              }}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Textarea
          value={JSON.stringify(currentSchema, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              updateSchema(activeSchema, parsed);
            } catch (error) {
              // Invalid JSON, don't update
            }
          }}
          className="font-mono text-sm h-[500px]"
          placeholder="Schema JSON will appear here..."
        />
      </div>
    );
  };

  const renderValidationResults = () => {
    if (!validationResults) return null;

    return (
      <Card className={validationResults.valid ? 'border-green-500' : 'border-red-500'}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {validationResults.valid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span>Validation Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {validationResults.valid ? (
            <p className="text-green-600">All schemas are valid and properly formatted!</p>
          ) : (
            <div className="space-y-2">
              {validationResults.errors?.map((error: any, index: number) => (
                <div key={index} className="flex items-start space-x-2 text-red-600">
                  <AlertTriangle className="w-4 h-4 mt-0.5" />
                  <span className="text-sm">{error.message}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full flex flex-col space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Schema & Structured Data Editor</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create and manage JSON-LD structured data for better SEO
          </p>
        </div>
        <div className="flex space-x-2">
          <input
            type="file"
            accept=".json"
            onChange={importSchemas}
            className="hidden"
            id="schema-import"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('schema-import')?.click()}
          >
            <Upload className="w-4 h-4 mr-1" />
            Import
          </Button>
          <Button
            onClick={() => onSave?.(schemas)}
            disabled={schemas.length === 0}
            data-testid="button-save-schemas"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Save Schemas
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Schema Types & List */}
        <div className="space-y-4">
          {renderSchemaTypeSelector()}
          {renderSchemaList()}
        </div>

        {/* Middle Panel - Editor */}
        <div className="lg:col-span-2 space-y-4">
          {schemas.length > 0 && (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'visual' | 'json')}>
              <TabsList>
                <TabsTrigger value="visual" data-testid="tab-visual-editor">
                  <Eye className="w-4 h-4 mr-1" />
                  Visual Editor
                </TabsTrigger>
                <TabsTrigger value="json" data-testid="tab-json-editor">
                  <Code className="w-4 h-4 mr-1" />
                  JSON Editor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visual">
                <Card>
                  <CardContent className="p-0">
                    {renderVisualEditor()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="json">
                <Card>
                  <CardContent className="p-4">
                    {renderJsonEditor()}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* Validation Results */}
          {renderValidationResults()}
        </div>
      </div>
    </div>
  );
}

export default SchemaEditor;