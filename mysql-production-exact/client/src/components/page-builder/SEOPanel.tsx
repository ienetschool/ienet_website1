import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Globe,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle,
  Image,
  Link,
  Hash
} from "lucide-react";
import type { PageData } from "./AdvancedPageBuilder";

interface SEOPanelProps {
  pageData: PageData;
  onUpdatePageSettings: (updates: Partial<PageData>) => void;
}

export function SEOPanel({ pageData, onUpdatePageSettings }: SEOPanelProps) {
  const [seoScore, setSeoScore] = useState(75);

  const updateSEO = (field: string, value: string) => {
    const updates = {
      seo: {
        ...pageData.seo,
        [field]: value
      }
    };
    onUpdatePageSettings(updates);
  };

  const updatePageInfo = (field: string, value: string) => {
    onUpdatePageSettings({ [field]: value });
  };

  const generateSEOScore = () => {
    let score = 0;
    let maxScore = 100;

    // Title check
    if (pageData.seo.title) {
      score += 20;
      if (pageData.seo.title.length >= 30 && pageData.seo.title.length <= 60) {
        score += 10;
      }
    }

    // Description check
    if (pageData.seo.description) {
      score += 20;
      if (pageData.seo.description.length >= 120 && pageData.seo.description.length <= 160) {
        score += 10;
      }
    }

    // Keywords check
    if (pageData.seo.keywords) {
      score += 10;
    }

    // Slug check
    if (pageData.slug) {
      score += 10;
      if (pageData.slug.length <= 75 && !pageData.slug.includes(' ')) {
        score += 10;
      }
    }

    // OG Image check
    if (pageData.seo.ogImage) {
      score += 10;
    }

    setSeoScore(Math.min(score, maxScore));
    return score;
  };

  const getSEOIssues = () => {
    const issues = [];
    
    if (!pageData.seo.title) {
      issues.push({ type: 'error', message: 'Page title is missing' });
    } else if (pageData.seo.title.length < 30) {
      issues.push({ type: 'warning', message: 'Page title is too short (recommended: 30-60 characters)' });
    } else if (pageData.seo.title.length > 60) {
      issues.push({ type: 'warning', message: 'Page title is too long (recommended: 30-60 characters)' });
    }

    if (!pageData.seo.description) {
      issues.push({ type: 'error', message: 'Meta description is missing' });
    } else if (pageData.seo.description.length < 120) {
      issues.push({ type: 'warning', message: 'Meta description is too short (recommended: 120-160 characters)' });
    } else if (pageData.seo.description.length > 160) {
      issues.push({ type: 'warning', message: 'Meta description is too long (recommended: 120-160 characters)' });
    }

    if (!pageData.seo.keywords) {
      issues.push({ type: 'warning', message: 'Keywords are missing' });
    }

    if (!pageData.slug) {
      issues.push({ type: 'error', message: 'Page slug is missing' });
    } else if (pageData.slug.includes(' ')) {
      issues.push({ type: 'error', message: 'Page slug contains spaces (use hyphens instead)' });
    }

    if (!pageData.seo.ogImage) {
      issues.push({ type: 'info', message: 'Open Graph image is missing (recommended for social sharing)' });
    }

    return issues;
  };

  const seoIssues = getSEOIssues();
  const currentScore = generateSEOScore();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
          SEO Optimization
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">SEO Score</span>
              <span className="text-sm font-medium">{currentScore}/100</span>
            </div>
            <Progress value={currentScore} className="h-2" />
          </div>
          <Badge variant={currentScore >= 80 ? 'default' : currentScore >= 60 ? 'secondary' : 'destructive'}>
            {currentScore >= 80 ? 'Good' : currentScore >= 60 ? 'Fair' : 'Poor'}
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* SEO Issues */}
          {seoIssues.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  SEO Issues ({seoIssues.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {seoIssues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    {issue.type === 'error' ? (
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    ) : issue.type === 'warning' ? (
                      <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">{issue.message}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Accordion type="multiple" defaultValue={["basic", "meta", "social"]} className="space-y-2">
            {/* Basic SEO */}
            <AccordionItem value="basic">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Basic SEO
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Page Title</Label>
                  <Input
                    value={pageData.seo.title || ''}
                    onChange={(e) => updateSEO('title', e.target.value)}
                    placeholder="Enter page title..."
                    className="mt-1"
                    data-testid="input-seo-title"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Recommended: 30-60 characters</span>
                    <span>{pageData.seo.title?.length || 0}/60</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Page Slug</Label>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-l-md border border-r-0">
                      /
                    </span>
                    <Input
                      value={pageData.slug || ''}
                      onChange={(e) => updatePageInfo('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                      placeholder="page-slug"
                      className="rounded-l-none"
                      data-testid="input-page-slug"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use lowercase letters, numbers, and hyphens only
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Meta Description</Label>
                  <Textarea
                    value={pageData.seo.description || ''}
                    onChange={(e) => updateSEO('description', e.target.value)}
                    placeholder="Enter meta description..."
                    rows={3}
                    className="mt-1"
                    data-testid="textarea-seo-description"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Recommended: 120-160 characters</span>
                    <span>{pageData.seo.description?.length || 0}/160</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Keywords</Label>
                  <Input
                    value={pageData.seo.keywords || ''}
                    onChange={(e) => updateSEO('keywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                    className="mt-1"
                    data-testid="input-seo-keywords"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate keywords with commas
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Social Media */}
            <AccordionItem value="social">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Social Media (Open Graph)
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">OG Image URL</Label>
                  <Input
                    value={pageData.seo.ogImage || ''}
                    onChange={(e) => updateSEO('ogImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                    data-testid="input-og-image"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 1200x630 pixels
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Social Media Preview</h4>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-900">
                    {pageData.seo.ogImage && (
                      <img
                        src={pageData.seo.ogImage}
                        alt="OG Preview"
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    )}
                    <div className="text-sm font-medium text-blue-600 mb-1">
                      {pageData.seo.title || 'Page Title'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {pageData.seo.description || 'Meta description will appear here...'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      example.com
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Advanced */}
            <AccordionItem value="advanced">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Advanced Settings
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Custom CSS</Label>
                  <Textarea
                    value={pageData.settings.customCSS || ''}
                    onChange={(e) => onUpdatePageSettings({ 
                      settings: { 
                        ...pageData.settings, 
                        customCSS: e.target.value 
                      } 
                    })}
                    placeholder="/* Custom CSS for this page */"
                    rows={6}
                    className="mt-1 font-mono text-sm"
                    data-testid="textarea-custom-css"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Custom JavaScript</Label>
                  <Textarea
                    value={pageData.settings.customJS || ''}
                    onChange={(e) => onUpdatePageSettings({ 
                      settings: { 
                        ...pageData.settings, 
                        customJS: e.target.value 
                      } 
                    })}
                    placeholder="// Custom JavaScript for this page"
                    rows={6}
                    className="mt-1 font-mono text-sm"
                    data-testid="textarea-custom-js"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* SEO Tips */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                SEO Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• Keep your page title unique and descriptive</p>
              <p>• Write compelling meta descriptions that encourage clicks</p>
              <p>• Use relevant keywords naturally in your content</p>
              <p>• Ensure your page loads quickly and is mobile-friendly</p>
              <p>• Add alt text to all images for accessibility</p>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}