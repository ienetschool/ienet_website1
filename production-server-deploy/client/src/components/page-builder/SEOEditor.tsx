import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  Globe, 
  Share2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Target,
  Eye,
  BarChart3
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
  pageData: SEOData;
  onSave: (data: SEOData) => void;
}

export default function SEOEditor({ pageData, onSave }: SEOEditorProps) {
  const [seoData, setSeoData] = useState<SEOData>(pageData);
  const [activeTab, setActiveTab] = useState('basic');

  const calculateSEOScore = () => {
    let score = 0;
    const maxScore = 100;

    // Title length (ideal: 50-60 characters)
    if (seoData.title.length >= 30 && seoData.title.length <= 60) score += 20;
    else if (seoData.title.length > 0) score += 10;

    // Description length (ideal: 150-160 characters)
    if (seoData.description.length >= 120 && seoData.description.length <= 160) score += 20;
    else if (seoData.description.length > 0) score += 10;

    // Keywords (ideal: 3-5)
    if (seoData.keywords.length >= 3 && seoData.keywords.length <= 5) score += 15;
    else if (seoData.keywords.length > 0) score += 8;

    // Open Graph data
    if (seoData.ogTitle && seoData.ogDescription) score += 15;
    if (seoData.ogImage) score += 10;

    // Technical SEO
    if (seoData.canonicalUrl) score += 10;
    if (seoData.robots) score += 10;

    return Math.min(score, maxScore);
  };

  const seoScore = calculateSEOScore();
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  const handleKeywordChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k.length > 0);
    setSeoData(prev => ({ ...prev, keywords }));
  };

  const handleSave = () => {
    onSave(seoData);
  };

  return (
    <div className="space-y-6">
      {/* SEO Score Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              SEO Optimization
            </CardTitle>
            <div className="flex items-center space-x-2">
              {getScoreIcon(seoScore)}
              <span className={`text-lg font-bold ${getScoreColor(seoScore)}`}>
                {seoScore}/100
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">SEO Score</span>
                <span className="text-sm text-gray-600">{seoScore}%</span>
              </div>
              <Progress value={seoScore} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm">Search Optimized</span>
              </div>
              <div className="flex items-center space-x-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Social Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Performance Focused</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium flex items-center mb-2">
                  Meta Title
                  <Badge variant="outline" className="ml-2">
                    {seoData.title.length}/60
                  </Badge>
                </label>
                <Input
                  value={seoData.title}
                  onChange={(e) => setSeoData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter page title for search results"
                  maxLength={60}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Optimal length: 50-60 characters
                </p>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center mb-2">
                  Meta Description
                  <Badge variant="outline" className="ml-2">
                    {seoData.description.length}/160
                  </Badge>
                </label>
                <Textarea
                  value={seoData.description}
                  onChange={(e) => setSeoData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Write a compelling description that appears in search results"
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Optimal length: 150-160 characters
                </p>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center mb-2">
                  Keywords
                  <Badge variant="outline" className="ml-2">
                    {seoData.keywords.length} keywords
                  </Badge>
                </label>
                <Input
                  value={seoData.keywords.join(', ')}
                  onChange={(e) => handleKeywordChange(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Separate keywords with commas. Recommended: 3-5 keywords
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Social Media Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Open Graph Title
                </label>
                <Input
                  value={seoData.ogTitle}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogTitle: e.target.value }))}
                  placeholder="Title when shared on social media"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Open Graph Description
                </label>
                <Textarea
                  value={seoData.ogDescription}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogDescription: e.target.value }))}
                  placeholder="Description when shared on social media"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Open Graph Image URL
                </label>
                <Input
                  value={seoData.ogImage}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Recommended size: 1200x630 pixels
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Technical SEO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Canonical URL
                </label>
                <Input
                  value={seoData.canonicalUrl}
                  onChange={(e) => setSeoData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                  placeholder="https://yourdomain.com/page-url"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Prevents duplicate content issues
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Robots Meta Tag
                </label>
                <select
                  value={seoData.robots}
                  onChange={(e) => setSeoData(prev => ({ ...prev, robots: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="index,follow">Index, Follow (Default)</option>
                  <option value="noindex,follow">No Index, Follow</option>
                  <option value="index,nofollow">Index, No Follow</option>
                  <option value="noindex,nofollow">No Index, No Follow</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Google Search Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Search className="w-4 h-4 mr-2" />
                  Google Search Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                    {seoData.title || 'Page Title'}
                  </div>
                  <div className="text-green-600 text-sm">
                    {seoData.canonicalUrl || 'https://yourdomain.com/page'}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {seoData.description || 'Page description will appear here...'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Social Media Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  {seoData.ogImage && (
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <img 
                        src={seoData.ogImage} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="font-semibold text-sm">
                      {seoData.ogTitle || seoData.title || 'Page Title'}
                    </div>
                    <div className="text-gray-600 text-xs mt-1">
                      {seoData.ogDescription || seoData.description || 'Description'}
                    </div>
                    <div className="text-gray-500 text-xs mt-2">
                      yourdomain.com
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SEO Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                SEO Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Title Length</span>
                    {seoData.title.length >= 30 && seoData.title.length <= 60 ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Description Length</span>
                    {seoData.description.length >= 120 && seoData.description.length <= 160 ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Keywords Count</span>
                    {seoData.keywords.length >= 3 && seoData.keywords.length <= 5 ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Open Graph Data</span>
                    {seoData.ogTitle && seoData.ogDescription ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Canonical URL</span>
                    {seoData.canonicalUrl ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Robots Meta</span>
                    {seoData.robots ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center">
          <Target className="w-4 h-4 mr-2" />
          Save SEO Settings
        </Button>
      </div>
    </div>
  );
}