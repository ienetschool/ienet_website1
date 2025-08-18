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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy,
  Eye,
  Save,
  Settings,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Layout,
  Type,
  Image,
  Video,
  Quote,
  List,
  Code,
  Star,
  MessageSquare,
  DollarSign,
  Mail,
  Search,
  Globe,
  BarChart3,
  History,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PageBlock {
  id: string;
  type: 'hero' | 'text' | 'image' | 'video' | 'quote' | 'list' | 'code' | 'testimonial' | 'pricing' | 'contact' | 'faq' | 'cta';
  content: Record<string, any>;
  order: number;
  settings?: {
    margin?: string;
    padding?: string;
    backgroundColor?: string;
    textColor?: string;
    alignment?: string;
  };
}

interface Page {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  parentId?: number;
  type: 'page' | 'service' | 'feature';
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schema?: string;
  blocks: PageBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  version: number;
}

interface PageVersion {
  id: number;
  pageId: number;
  version: number;
  title: string;
  blocks: PageBlock[];
  createdAt: string;
  createdBy: string;
}

const blockTypes = [
  { type: 'hero', name: 'Hero Section', icon: Layout, description: 'Eye-catching header with title and CTA' },
  { type: 'text', name: 'Text Block', icon: Type, description: 'Rich text content with formatting' },
  { type: 'image', name: 'Image', icon: Image, description: 'Single image with caption' },
  { type: 'video', name: 'Video', icon: Video, description: 'Embedded video content' },
  { type: 'quote', name: 'Quote', icon: Quote, description: 'Highlighted quote or testimonial' },
  { type: 'list', name: 'List', icon: List, description: 'Bullet points or numbered list' },
  { type: 'code', name: 'Code Block', icon: Code, description: 'Syntax highlighted code' },
  { type: 'testimonial', name: 'Testimonial', icon: MessageSquare, description: 'Customer testimonial card' },
  { type: 'pricing', name: 'Pricing Table', icon: DollarSign, description: 'Service pricing comparison' },
  { type: 'contact', name: 'Contact Form', icon: Mail, description: 'Lead capture form' },
  { type: 'faq', name: 'FAQ Section', icon: MessageSquare, description: 'Frequently asked questions' },
  { type: 'cta', name: 'Call to Action', icon: Star, description: 'Conversion-focused button section' }
];

export default function PageBuilder() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [versions, setVersions] = useState<PageVersion[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const [showSEOEditor, setShowSEOEditor] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dashboard/pages');
      if (response.ok) {
        const data = await response.json();
        setPages(data);
      }
    } catch (error) {
      console.error('Failed to fetch pages:', error);
      toast({
        title: "Error",
        description: "Failed to load pages",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVersions = async (pageId: number) => {
    try {
      const response = await fetch(`/api/dashboard/pages/${pageId}/versions`);
      if (response.ok) {
        const data = await response.json();
        setVersions(data);
      }
    } catch (error) {
      console.error('Failed to fetch versions:', error);
    }
  };

  const savePage = async (page: Page) => {
    try {
      const response = await fetch(`/api/dashboard/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page)
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Page saved successfully"
        });
        fetchPages();
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to save page:', error);
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive"
      });
    }
  };

  const addBlock = (type: PageBlock['type']) => {
    if (!selectedPage) return;

    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      order: selectedPage.blocks.length
    };

    const updatedPage = {
      ...selectedPage,
      blocks: [...selectedPage.blocks, newBlock]
    };

    setSelectedPage(updatedPage);
    setShowBlockPicker(false);
    setIsEditing(true);
  };

  const getDefaultContent = (type: PageBlock['type']): Record<string, any> => {
    switch (type) {
      case 'hero':
        return {
          title: 'Hero Title',
          subtitle: 'Hero subtitle text',
          ctaText: 'Get Started',
          ctaUrl: '#',
          backgroundImage: '',
          alignment: 'center'
        };
      case 'text':
        return {
          content: '<p>Add your text content here...</p>',
          fontSize: 'medium',
          alignment: 'left'
        };
      case 'image':
        return {
          src: '',
          alt: '',
          caption: '',
          width: '100%',
          alignment: 'center'
        };
      case 'video':
        return {
          url: '',
          title: '',
          autoplay: false,
          controls: true
        };
      case 'quote':
        return {
          text: 'Your inspiring quote goes here',
          author: 'Author Name',
          role: 'Position',
          style: 'bordered'
        };
      case 'list':
        return {
          items: ['List item 1', 'List item 2', 'List item 3'],
          style: 'bullet',
          color: 'default'
        };
      case 'testimonial':
        return {
          text: 'Customer testimonial text',
          author: 'Customer Name',
          role: 'Position',
          company: 'Company',
          rating: 5,
          avatar: ''
        };
      case 'pricing':
        return {
          title: 'Choose Your Plan',
          plans: [
            { name: 'Basic', price: '$29', features: ['Feature 1', 'Feature 2'] },
            { name: 'Pro', price: '$59', features: ['Feature 1', 'Feature 2', 'Feature 3'] }
          ]
        };
      case 'contact':
        return {
          title: 'Get In Touch',
          fields: ['name', 'email', 'message'],
          submitText: 'Send Message',
          successMessage: 'Thank you for your message!'
        };
      case 'faq':
        return {
          title: 'Frequently Asked Questions',
          items: [
            { question: 'Question 1?', answer: 'Answer 1' },
            { question: 'Question 2?', answer: 'Answer 2' }
          ]
        };
      case 'cta':
        return {
          title: 'Ready to Get Started?',
          description: 'Join thousands of satisfied customers',
          buttonText: 'Start Now',
          buttonUrl: '#',
          style: 'gradient'
        };
      default:
        return {};
    }
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!selectedPage) return;

    const blocks = [...selectedPage.blocks];
    const index = blocks.findIndex(b => b.id === blockId);
    
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    }

    // Update order values
    blocks.forEach((block, idx) => {
      block.order = idx;
    });

    setSelectedPage({
      ...selectedPage,
      blocks
    });
    setIsEditing(true);
  };

  const deleteBlock = (blockId: string) => {
    if (!selectedPage) return;

    const updatedPage = {
      ...selectedPage,
      blocks: selectedPage.blocks.filter(b => b.id !== blockId)
    };

    setSelectedPage(updatedPage);
    setIsEditing(true);
  };

  const getStatusColor = (status: Page['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Page['status']) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-3 w-3" />;
      case 'draft': return <Clock className="h-3 w-3" />;
      case 'archived': return <AlertCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Page Builder</CardTitle>
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
            <Layout className="h-5 w-5" />
            Page Builder & Content Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pages" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="builder">Page Builder</TabsTrigger>
              <TabsTrigger value="seo">SEO Manager</TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search pages..." className="w-64" />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Page
                </Button>
              </div>

              <div className="grid gap-4">
                {pages.map((page) => (
                  <Card key={page.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{page.title}</h3>
                            <Badge className={`${getStatusColor(page.status)} text-xs`}>
                              {getStatusIcon(page.status)}
                              <span className="ml-1">{page.status}</span>
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              v{page.version}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">/{page.slug}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Updated: {new Date(page.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedPage(page);
                              fetchVersions(page.id);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4 mr-2" />
                            Clone
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="builder" className="space-y-4">
              {selectedPage ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Page Content Editor */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Editing: {selectedPage.title}</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowVersionHistory(true)}>
                          <History className="h-4 w-4 mr-2" />
                          History
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setShowSEOEditor(true)}>
                          <Search className="h-4 w-4 mr-2" />
                          SEO
                        </Button>
                        <Button size="sm" onClick={() => savePage(selectedPage)} disabled={!isEditing}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>

                    <ScrollArea className="h-[600px] border rounded-lg p-4">
                      <div className="space-y-4">
                        {selectedPage.blocks.map((block, index) => (
                          <Card key={block.id} className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                  <Badge variant="outline">{block.type}</Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => moveBlock(block.id, 'up')}
                                    disabled={index === 0}
                                  >
                                    <ArrowUp className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => moveBlock(block.id, 'down')}
                                    disabled={index === selectedPage.blocks.length - 1}
                                  >
                                    <ArrowDown className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => deleteBlock(block.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-gray-50 p-3 rounded">
                                <pre className="text-xs text-muted-foreground">
                                  {JSON.stringify(block.content, null, 2)}
                                </pre>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        <Button 
                          variant="outline" 
                          className="w-full h-16 border-2 border-dashed"
                          onClick={() => setShowBlockPicker(true)}
                        >
                          <Plus className="h-6 w-6 mr-2" />
                          Add Block
                        </Button>
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Page Settings Sidebar */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Page Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input 
                            id="title"
                            value={selectedPage.title}
                            onChange={(e) => {
                              setSelectedPage({
                                ...selectedPage,
                                title: e.target.value
                              });
                              setIsEditing(true);
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="slug">URL Slug</Label>
                          <Input 
                            id="slug"
                            value={selectedPage.slug}
                            onChange={(e) => {
                              setSelectedPage({
                                ...selectedPage,
                                slug: e.target.value
                              });
                              setIsEditing(true);
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select 
                            value={selectedPage.status}
                            onValueChange={(value: 'draft' | 'published' | 'archived') => {
                              setSelectedPage({
                                ...selectedPage,
                                status: value
                              });
                              setIsEditing(true);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">SEO Preview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="text-blue-600 text-sm font-medium">
                            {selectedPage.metaTitle || selectedPage.title}
                          </h4>
                          <p className="text-green-600 text-xs">
                            example.com/{selectedPage.slug}
                          </p>
                          <p className="text-gray-600 text-xs">
                            {selectedPage.metaDescription || 'No meta description set'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Layout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Page Selected</h3>
                  <p className="text-muted-foreground">Select a page from the Pages tab to start editing</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="seo">
              {selectedPage ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Settings for: {selectedPage.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="metaTitle">Meta Title</Label>
                            <Input 
                              id="metaTitle"
                              value={selectedPage.metaTitle || ''}
                              onChange={(e) => {
                                setSelectedPage({
                                  ...selectedPage,
                                  metaTitle: e.target.value
                                });
                                setIsEditing(true);
                              }}
                              placeholder="Page title for search engines"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {(selectedPage.metaTitle || '').length}/60 characters
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="metaDescription">Meta Description</Label>
                            <Textarea 
                              id="metaDescription"
                              value={selectedPage.metaDescription || ''}
                              onChange={(e) => {
                                setSelectedPage({
                                  ...selectedPage,
                                  metaDescription: e.target.value
                                });
                                setIsEditing(true);
                              }}
                              placeholder="Brief description for search results"
                              rows={3}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {(selectedPage.metaDescription || '').length}/160 characters
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="canonicalUrl">Canonical URL</Label>
                            <Input 
                              id="canonicalUrl"
                              value={selectedPage.canonicalUrl || ''}
                              onChange={(e) => {
                                setSelectedPage({
                                  ...selectedPage,
                                  canonicalUrl: e.target.value
                                });
                                setIsEditing(true);
                              }}
                              placeholder="https://example.com/canonical-url"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="ogImage">Open Graph Image</Label>
                            <Input 
                              id="ogImage"
                              value={selectedPage.ogImage || ''}
                              onChange={(e) => {
                                setSelectedPage({
                                  ...selectedPage,
                                  ogImage: e.target.value
                                });
                                setIsEditing(true);
                              }}
                              placeholder="URL to social sharing image"
                            />
                          </div>
                          <div>
                            <Label htmlFor="schema">JSON-LD Schema</Label>
                            <Textarea 
                              id="schema"
                              value={selectedPage.schema || ''}
                              onChange={(e) => {
                                setSelectedPage({
                                  ...selectedPage,
                                  schema: e.target.value
                                });
                                setIsEditing(true);
                              }}
                              placeholder='{"@context": "https://schema.org", "@type": "WebPage"}'
                              rows={8}
                              className="font-mono text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Page Selected</h3>
                  <p className="text-muted-foreground">Select a page to manage its SEO settings</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Block Picker Dialog */}
      <Dialog open={showBlockPicker} onOpenChange={setShowBlockPicker}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add Block</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {blockTypes.map((blockType) => (
              <Card 
                key={blockType.type}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addBlock(blockType.type)}
              >
                <CardContent className="p-4 text-center">
                  <blockType.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium text-sm">{blockType.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{blockType.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}