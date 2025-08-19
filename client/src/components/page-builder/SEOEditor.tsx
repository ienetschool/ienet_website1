import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Globe, 
  Link, 
  Image, 
  Tag, 
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  robots: string;
  structuredData: any;
}

interface SEOEditorProps {
  pageData: any;
  onSave: (seoData: SEOData) => void;
}

export function SEOEditor({ pageData, onSave }: SEOEditorProps) {
  const { toast } = useToast();
  const [seoData, setSeoData] = useState<SEOData>({
    title: pageData?.title || '',
    description: pageData?.description || '',
    keywords: pageData?.keywords || [],
    ogTitle: pageData?.ogTitle || '',
    ogDescription: pageData?.ogDescription || '',
    ogImage: pageData?.ogImage || '',
    canonicalUrl: pageData?.canonicalUrl || '',
    robots: pageData?.robots || 'index,follow',
    structuredData: pageData?.structuredData || {}
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [seoScore, setSeoScore] = useState(0);

  const calculateSEOScore = () => {
    let score = 0;
    if (seoData.title && seoData.title.length >= 30 && seoData.title.length <= 60) score += 20;
    if (seoData.description && seoData.description.length >= 120 && seoData.description.length <= 160) score += 20;
    if (seoData.keywords.length >= 3) score += 15;
    if (seoData.ogTitle) score += 15;
    if (seoData.ogDescription) score += 15;
    if (seoData.ogImage) score += 15;
    return Math.min(score, 100);
  };

  React.useEffect(() => {
    setSeoScore(calculateSEOScore());
  }, [seoData]);

  const addKeyword = () => {
    if (keywordInput.trim() && !seoData.keywords.includes(keywordInput.trim())) {
      setSeoData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setSeoData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleSave = () => {
    onSave(seoData);
    toast({
      title: "SEO Settings Saved",
      description: "Page SEO configuration has been updated",
    });
  };

  const getSEOScoreColor = () => {
    if (seoScore >= 80) return 'text-green-600';
    if (seoScore >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSEOScoreIcon = () => {
    if (seoScore >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (seoScore >= 60) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* SEO Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              SEO Score
            </span>
            <div className="flex items-center space-x-2">
              {getSEOScoreIcon()}
              <span className={`text-2xl font-bold ${getSEOScoreColor()}`}>
                {seoScore}/100
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                seoScore >= 80 ? 'bg-green-500' : 
                seoScore >= 60 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`}
              style={{ width: `${seoScore}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {seoScore >= 80 && "Excellent! Your page is well optimized for search engines."}
            {seoScore >= 60 && seoScore < 80 && "Good, but there's room for improvement."}
            {seoScore < 60 && "Needs improvement. Consider optimizing the missing elements."}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic" className="flex items-center">
            <Search className="w-4 h-4 mr-1" />
            Basic SEO
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            Social Media
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center">
            <Link className="w-4 h-4 mr-1" />
            Technical
          </TabsTrigger>
          <TabsTrigger value="structured" className="flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            Schema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={seoData.title}
                  onChange={(e) => setSeoData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Page title for search engines"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {seoData.title.length}/60 characters
                  {seoData.title.length > 60 && <span className="text-red-500 ml-2">Too long</span>}
                  {seoData.title.length < 30 && seoData.title.length > 0 && <span className="text-yellow-500 ml-2">Too short</span>}
                </div>
              </div>

              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={seoData.description}
                  onChange={(e) => setSeoData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the page content"
                  rows={3}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {seoData.description.length}/160 characters
                  {seoData.description.length > 160 && <span className="text-red-500 ml-2">Too long</span>}
                  {seoData.description.length < 120 && seoData.description.length > 0 && <span className="text-yellow-500 ml-2">Too short</span>}
                </div>
              </div>

              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <div className="flex space-x-2">
                  <Input
                    id="keywords"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="Add a keyword"
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button type="button" onClick={addKeyword}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {seoData.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                      {keyword} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Open Graph / Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="og-title">OG Title</Label>
                <Input
                  id="og-title"
                  value={seoData.ogTitle}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogTitle: e.target.value }))}
                  placeholder="Title for social media sharing"
                />
              </div>

              <div>
                <Label htmlFor="og-description">OG Description</Label>
                <Textarea
                  id="og-description"
                  value={seoData.ogDescription}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogDescription: e.target.value }))}
                  placeholder="Description for social media sharing"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="og-image">OG Image URL</Label>
                <Input
                  id="og-image"
                  value={seoData.ogImage}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="canonical-url">Canonical URL</Label>
                <Input
                  id="canonical-url"
                  value={seoData.canonicalUrl}
                  onChange={(e) => setSeoData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                  placeholder="https://example.com/canonical-page"
                />
              </div>

              <div>
                <Label htmlFor="robots">Robots Meta</Label>
                <Input
                  id="robots"
                  value={seoData.robots}
                  onChange={(e) => setSeoData(prev => ({ ...prev, robots: e.target.value }))}
                  placeholder="index,follow"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Common values: index,follow | noindex,nofollow | index,nofollow
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Structured Data (JSON-LD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="structured-data">Schema Markup</Label>
                <Textarea
                  id="structured-data"
                  value={JSON.stringify(seoData.structuredData, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setSeoData(prev => ({ ...prev, structuredData: parsed }));
                    } catch (error) {
                      // Invalid JSON, don't update
                    }
                  }}
                  placeholder='{"@context": "https://schema.org", "@type": "WebPage"}'
                  rows={8}
                  className="font-mono text-sm"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Enter valid JSON-LD structured data markup
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <BarChart3 className="w-4 h-4 mr-2" />
          Save SEO Settings
        </Button>
      </div>
    </div>
  );
}

export default SEOEditor;