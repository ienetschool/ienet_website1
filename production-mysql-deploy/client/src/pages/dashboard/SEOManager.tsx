import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Globe, 
  FileText, 
  Code, 
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  Copy,
  Link as LinkIcon,
  Bot,
  Map,
  Shield,
  Zap,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SEOPage {
  id: number;
  url: string;
  title: string;
  metaDescription: string;
  h1Count: number;
  h2Count: number;
  imageCount: number;
  internalLinks: number;
  externalLinks: number;
  wordCount: number;
  lastCrawled: string;
  issues: SEOIssue[];
  score: number;
  status: 'good' | 'warning' | 'error';
}

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: 'meta' | 'content' | 'technical' | 'images' | 'links';
  message: string;
  element?: string;
  suggestion: string;
}

interface Redirect {
  id: number;
  source: string;
  destination: string;
  type: '301' | '302';
  hits: number;
  isActive: boolean;
  createdAt: string;
}

interface SchemaMarkup {
  id: number;
  pageUrl: string;
  type: 'WebPage' | 'Service' | 'FAQPage' | 'Product' | 'Organization' | 'LocalBusiness';
  schema: string;
  isValid: boolean;
  errors: string[];
  lastValidated: string;
}

export default function SEOManager() {
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [schemas, setSchemas] = useState<SchemaMarkup[]>([]);
  const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [robotsTxt, setRobotsTxt] = useState('');
  const [sitemapXml, setSitemapXml] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchSEOData();
  }, []);

  const fetchSEOData = async () => {
    setIsLoading(true);
    try {
      const [pagesRes, redirectsRes, schemasRes, robotsRes, sitemapRes] = await Promise.all([
        fetch('/api/dashboard/seo/pages'),
        fetch('/api/dashboard/seo/redirects'),
        fetch('/api/dashboard/seo/schemas'),
        fetch('/api/dashboard/seo/robots'),
        fetch('/api/dashboard/seo/sitemap')
      ]);

      if (pagesRes.ok) setPages(await pagesRes.json());
      if (redirectsRes.ok) setRedirects(await redirectsRes.json());
      if (schemasRes.ok) setSchemas(await schemasRes.json());
      if (robotsRes.ok) setRobotsTxt(await robotsRes.text());
      if (sitemapRes.ok) setSitemapXml(await sitemapRes.text());
    } catch (error) {
      console.error('Failed to fetch SEO data:', error);
      toast({
        title: "Error",
        description: "Failed to load SEO data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const crawlPage = async (pageId: number) => {
    try {
      const response = await fetch(`/api/dashboard/seo/crawl/${pageId}`, {
        method: 'POST'
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Page crawl initiated"
        });
        fetchSEOData();
      }
    } catch (error) {
      console.error('Failed to crawl page:', error);
      toast({
        title: "Error",
        description: "Failed to crawl page",
        variant: "destructive"
      });
    }
  };

  const saveRedirect = async (redirect: Omit<Redirect, 'id' | 'hits' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/dashboard/seo/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(redirect)
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Redirect saved successfully"
        });
        fetchSEOData();
      }
    } catch (error) {
      console.error('Failed to save redirect:', error);
      toast({
        title: "Error",
        description: "Failed to save redirect",
        variant: "destructive"
      });
    }
  };

  const validateSchema = async (schemaId: number) => {
    try {
      const response = await fetch(`/api/dashboard/seo/schemas/${schemaId}/validate`, {
        method: 'POST'
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Schema validation completed"
        });
        fetchSEOData();
      }
    } catch (error) {
      console.error('Failed to validate schema:', error);
      toast({
        title: "Error",
        description: "Failed to validate schema",
        variant: "destructive"
      });
    }
  };

  const generateSitemap = async () => {
    try {
      const response = await fetch('/api/dashboard/seo/sitemap/generate', {
        method: 'POST'
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Sitemap generated successfully"
        });
        fetchSEOData();
      }
    } catch (error) {
      console.error('Failed to generate sitemap:', error);
      toast({
        title: "Error",
        description: "Failed to generate sitemap",
        variant: "destructive"
      });
    }
  };

  const updateRobotsTxt = async () => {
    try {
      const response = await fetch('/api/dashboard/seo/robots', {
        method: 'PUT',
        headers: { 'Content-Type': 'text/plain' },
        body: robotsTxt
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "robots.txt updated successfully"
        });
      }
    } catch (error) {
      console.error('Failed to update robots.txt:', error);
      toast({
        title: "Error",
        description: "Failed to update robots.txt",
        variant: "destructive"
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status: SEOPage['status']) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SEO Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO Optimization & Schema Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="audit" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="audit">SEO Audit</TabsTrigger>
              <TabsTrigger value="schema">Schema Markup</TabsTrigger>
              <TabsTrigger value="redirects">Redirects</TabsTrigger>
              <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
              <TabsTrigger value="robots">Robots.txt</TabsTrigger>
            </TabsList>

            <TabsContent value="audit" className="space-y-6">
              {/* SEO Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                        <p className="text-2xl font-bold">
                          {Math.round(pages.reduce((acc, page) => acc + page.score, 0) / pages.length) || 0}
                        </p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pages Audited</p>
                        <p className="text-2xl font-bold">{pages.length}</p>
                      </div>
                      <FileText className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Issues Found</p>
                        <p className="text-2xl font-bold">
                          {pages.reduce((acc, page) => acc + page.issues.length, 0)}
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Schema Errors</p>
                        <p className="text-2xl font-bold">
                          {schemas.filter(s => !s.isValid).length}
                        </p>
                      </div>
                      <Code className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pages List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Page Analysis</CardTitle>
                    <Button onClick={() => fetchSEOData()}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pages.map((page) => (
                      <Card key={page.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getStatusIcon(page.status)}
                                <h3 className="font-semibold truncate">{page.title}</h3>
                                <Badge className={`${getScoreColor(page.score)} text-xs`}>
                                  {page.score}/100
                                </Badge>
                              </div>
                              <p className="text-sm text-blue-600 mb-2">{page.url}</p>
                              <p className="text-sm text-muted-foreground mb-3">{page.metaDescription}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                <div>
                                  <span className="font-medium">Words:</span> {page.wordCount}
                                </div>
                                <div>
                                  <span className="font-medium">H1:</span> {page.h1Count}
                                </div>
                                <div>
                                  <span className="font-medium">Images:</span> {page.imageCount}
                                </div>
                                <div>
                                  <span className="font-medium">Links:</span> {page.internalLinks + page.externalLinks}
                                </div>
                              </div>

                              {page.issues.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-sm font-medium mb-2">Issues ({page.issues.length}):</p>
                                  <div className="space-y-1">
                                    {page.issues.slice(0, 3).map((issue, index) => (
                                      <div key={index} className="flex items-start gap-2">
                                        <AlertTriangle className={`h-3 w-3 mt-0.5 ${
                                          issue.type === 'error' ? 'text-red-500' : 
                                          issue.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                                        }`} />
                                        <span className="text-xs text-muted-foreground">{issue.message}</span>
                                      </div>
                                    ))}
                                    {page.issues.length > 3 && (
                                      <p className="text-xs text-muted-foreground">
                                        +{page.issues.length - 3} more issues
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedPage(page)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Details
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => crawlPage(page.id)}
                              >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Crawl
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schema" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Schema Markup Management</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Schema
                </Button>
              </div>

              <div className="grid gap-4">
                {schemas.map((schema) => (
                  <Card key={schema.id} className={`border-l-4 ${schema.isValid ? 'border-l-green-500' : 'border-l-red-500'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {schema.isValid ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                            <Badge variant="outline">{schema.type}</Badge>
                          </div>
                          <p className="text-sm text-blue-600 mb-2">{schema.pageUrl}</p>
                          
                          {!schema.isValid && schema.errors.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-red-600 mb-1">Validation Errors:</p>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {schema.errors.map((error, index) => (
                                  <li key={index}>• {error}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <details className="text-xs">
                            <summary className="cursor-pointer font-medium">View Schema JSON</summary>
                            <pre className="mt-2 p-2 bg-gray-50 rounded overflow-x-auto">
                              {JSON.stringify(JSON.parse(schema.schema), null, 2)}
                            </pre>
                          </details>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => validateSchema(schema.id)}
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Validate
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="redirects" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Redirect Management</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Redirect
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Redirect</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="source">Source URL</Label>
                        <Input id="source" placeholder="/old-page" />
                      </div>
                      <div>
                        <Label htmlFor="destination">Destination URL</Label>
                        <Input id="destination" placeholder="/new-page" />
                      </div>
                      <div>
                        <Label htmlFor="type">Redirect Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="301">301 (Permanent)</SelectItem>
                            <SelectItem value="302">302 (Temporary)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Create Redirect</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b">
                        <tr>
                          <th className="text-left p-4">Source</th>
                          <th className="text-left p-4">Destination</th>
                          <th className="text-left p-4">Type</th>
                          <th className="text-left p-4">Hits</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {redirects.map((redirect) => (
                          <tr key={redirect.id} className="border-b">
                            <td className="p-4 font-mono text-sm">{redirect.source}</td>
                            <td className="p-4 font-mono text-sm">{redirect.destination}</td>
                            <td className="p-4">
                              <Badge variant={redirect.type === '301' ? 'default' : 'secondary'}>
                                {redirect.type}
                              </Badge>
                            </td>
                            <td className="p-4">{redirect.hits.toLocaleString()}</td>
                            <td className="p-4">
                              <Badge variant={redirect.isActive ? 'default' : 'secondary'}>
                                {redirect.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sitemap" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sitemap Generator</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={generateSitemap}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">sitemap.xml</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    value={sitemapXml}
                    onChange={(e) => setSitemapXml(e.target.value)}
                    rows={20}
                    className="font-mono text-xs"
                    readOnly
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="robots" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Robots.txt Editor</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={updateRobotsTxt}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">robots.txt</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    value={robotsTxt}
                    onChange={(e) => setRobotsTxt(e.target.value)}
                    rows={15}
                    className="font-mono text-sm"
                    placeholder="User-agent: *&#10;Disallow: /admin/&#10;Disallow: /private/&#10;&#10;Sitemap: https://example.com/sitemap.xml"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Configure crawling permissions for search engine bots
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}