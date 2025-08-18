import { useState, useEffect, DragEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  Clock,
  Move,
  Layers
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
  blocks: PageBlock[];
  createdAt: string;
  updatedAt: string;
}

const BLOCK_TEMPLATES = [
  {
    type: 'hero',
    name: 'Hero Section',
    icon: Layout,
    description: 'Eye-catching header with title, subtitle, and CTA',
    defaultContent: {
      title: 'Welcome to Our Amazing Service',
      subtitle: 'Transform your business with our innovative solutions',
      ctaText: 'Get Started',
      ctaLink: '#',
      backgroundImage: '',
      alignment: 'center'
    }
  },
  {
    type: 'text',
    name: 'Text Block',
    icon: Type,
    description: 'Rich text content with formatting options',
    defaultContent: {
      title: 'Text Section',
      content: 'This is a sample text block. You can add rich content here including paragraphs, lists, and formatted text.',
      alignment: 'left'
    }
  },
  {
    type: 'image',
    name: 'Image Gallery',
    icon: Image,
    description: 'Responsive image display with captions',
    defaultContent: {
      images: [{ url: 'https://via.placeholder.com/600x400', caption: 'Sample Image', alt: 'Sample' }],
      layout: 'single',
      alignment: 'center'
    }
  },
  {
    type: 'video',
    name: 'Video Player',
    icon: Video,
    description: 'Embedded video content',
    defaultContent: {
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      title: 'Video Title',
      description: 'Video description'
    }
  },
  {
    type: 'testimonial',
    name: 'Testimonials',
    icon: Star,
    description: 'Customer testimonials and reviews',
    defaultContent: {
      testimonials: [
        {
          name: 'John Doe',
          company: 'Tech Corp',
          content: 'This service exceeded our expectations!',
          rating: 5,
          avatar: 'https://via.placeholder.com/80x80'
        }
      ],
      layout: 'carousel'
    }
  },
  {
    type: 'pricing',
    name: 'Pricing Table',
    icon: DollarSign,
    description: 'Pricing plans and features comparison',
    defaultContent: {
      plans: [
        {
          name: 'Basic',
          price: '$29',
          period: 'month',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          highlighted: false,
          ctaText: 'Choose Plan'
        },
        {
          name: 'Pro',
          price: '$99',
          period: 'month',
          features: ['Everything in Basic', 'Feature 4', 'Feature 5', 'Priority Support'],
          highlighted: true,
          ctaText: 'Choose Plan'
        }
      ]
    }
  },
  {
    type: 'faq',
    name: 'FAQ Section',
    icon: MessageSquare,
    description: 'Frequently asked questions',
    defaultContent: {
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'What is included in the service?',
          answer: 'Our service includes comprehensive support and all necessary features.'
        },
        {
          question: 'How do I get started?',
          answer: 'Simply sign up and follow our easy onboarding process.'
        }
      ]
    }
  },
  {
    type: 'cta',
    name: 'Call to Action',
    icon: Mail,
    description: 'Conversion-focused action section',
    defaultContent: {
      title: 'Ready to Get Started?',
      description: 'Join thousands of satisfied customers today',
      primaryCta: { text: 'Start Free Trial', link: '#' },
      secondaryCta: { text: 'Learn More', link: '#' },
      backgroundColor: '#3B82F6'
    }
  },
  {
    type: 'contact',
    name: 'Contact Form',
    icon: Mail,
    description: 'Contact form with custom fields',
    defaultContent: {
      title: 'Get In Touch',
      description: 'We\'d love to hear from you',
      fields: [
        { type: 'text', name: 'name', label: 'Name', required: true },
        { type: 'email', name: 'email', label: 'Email', required: true },
        { type: 'textarea', name: 'message', label: 'Message', required: true }
      ],
      submitText: 'Send Message'
    }
  }
];

export default function PageBuilder() {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [draggedBlockType, setDraggedBlockType] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<PageBlock | null>(null);
  const [showBlockEditor, setShowBlockEditor] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch pages from API
  const { data: pages = [], isLoading: pagesLoading, refetch: refetchPages } = useQuery({
    queryKey: ['/api/dashboard/pages'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/pages');
      if (!response.ok) throw new Error('Failed to fetch pages');
      return response.json();
    }
  });

  // Page save mutation
  const savePageMutation = useMutation({
    mutationFn: async (pageData: Page) => {
      const response = await fetch(`/api/dashboard/pages/${pageData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData)
      });
      if (!response.ok) throw new Error('Failed to save page');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Page Saved",
        description: "Page has been successfully saved.",
      });
      refetchPages();
    },
    onError: () => {
      toast({
        title: "Save Failed",
        description: "Failed to save page. Please try again.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      setSelectedPage(pages[0]);
    }
  }, [pages, selectedPage]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, blockType: string) => {
    setDraggedBlockType(blockType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleBlockDragStart = (e: DragEvent<HTMLDivElement>, blockId: string) => {
    setDraggedBlock(blockId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggedBlockType ? 'copy' : 'move';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetIndex?: number) => {
    e.preventDefault();
    
    if (!selectedPage) return;

    if (draggedBlockType) {
      // Adding new block from template
      const template = BLOCK_TEMPLATES.find(t => t.type === draggedBlockType);
      if (template) {
        const newBlock: PageBlock = {
          id: `block-${Date.now()}`,
          type: template.type as any,
          content: template.defaultContent,
          order: targetIndex ?? selectedPage.blocks.length,
        };

        const updatedBlocks = [...selectedPage.blocks];
        if (targetIndex !== undefined) {
          updatedBlocks.splice(targetIndex, 0, newBlock);
          // Reorder subsequent blocks
          updatedBlocks.forEach((block, index) => {
            block.order = index;
          });
        } else {
          updatedBlocks.push(newBlock);
        }

        setSelectedPage({
          ...selectedPage,
          blocks: updatedBlocks
        });

        toast({
          title: "Block Added",
          description: `${template.name} block has been added to the page.`,
        });
      }
      setDraggedBlockType(null);
    } else if (draggedBlock) {
      // Reordering existing blocks
      const draggedBlockData = selectedPage.blocks.find(b => b.id === draggedBlock);
      if (draggedBlockData && targetIndex !== undefined) {
        const updatedBlocks = selectedPage.blocks.filter(b => b.id !== draggedBlock);
        updatedBlocks.splice(targetIndex, 0, draggedBlockData);
        
        // Reorder all blocks
        updatedBlocks.forEach((block, index) => {
          block.order = index;
        });

        setSelectedPage({
          ...selectedPage,
          blocks: updatedBlocks
        });
      }
      setDraggedBlock(null);
    }
  };

  const duplicateBlock = (blockId: string) => {
    if (!selectedPage) return;
    
    const blockToDuplicate = selectedPage.blocks.find(b => b.id === blockId);
    if (blockToDuplicate) {
      const newBlock: PageBlock = {
        ...blockToDuplicate,
        id: `block-${Date.now()}`,
        order: blockToDuplicate.order + 1
      };

      const updatedBlocks = [...selectedPage.blocks];
      updatedBlocks.splice(blockToDuplicate.order + 1, 0, newBlock);
      
      // Reorder subsequent blocks
      updatedBlocks.forEach((block, index) => {
        block.order = index;
      });

      setSelectedPage({
        ...selectedPage,
        blocks: updatedBlocks
      });

      toast({
        title: "Block Duplicated",
        description: "Block has been successfully duplicated.",
      });
    }
  };

  const deleteBlock = (blockId: string) => {
    if (!selectedPage) return;
    
    const updatedBlocks = selectedPage.blocks
      .filter(b => b.id !== blockId)
      .map((block, index) => ({ ...block, order: index }));

    setSelectedPage({
      ...selectedPage,
      blocks: updatedBlocks
    });

    toast({
      title: "Block Deleted",
      description: "Block has been successfully deleted.",
    });
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!selectedPage) return;
    
    const blockIndex = selectedPage.blocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;

    const newIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;
    if (newIndex < 0 || newIndex >= selectedPage.blocks.length) return;

    const updatedBlocks = [...selectedPage.blocks];
    [updatedBlocks[blockIndex], updatedBlocks[newIndex]] = [updatedBlocks[newIndex], updatedBlocks[blockIndex]];
    
    // Update order
    updatedBlocks.forEach((block, index) => {
      block.order = index;
    });

    setSelectedPage({
      ...selectedPage,
      blocks: updatedBlocks
    });
  };

  const editBlock = (block: PageBlock) => {
    setEditingBlock(block);
    setShowBlockEditor(true);
  };

  const saveBlock = (updatedBlock: PageBlock) => {
    if (!selectedPage) return;

    const updatedBlocks = selectedPage.blocks.map(b => 
      b.id === updatedBlock.id ? updatedBlock : b
    );

    setSelectedPage({
      ...selectedPage,
      blocks: updatedBlocks
    });

    setShowBlockEditor(false);
    setEditingBlock(null);

    toast({
      title: "Block Updated",
      description: "Block has been successfully updated.",
    });
  };

  const savePage = () => {
    if (!selectedPage) return;
    savePageMutation.mutate(selectedPage);
  };

  const renderBlockPreview = (block: PageBlock) => {
    const template = BLOCK_TEMPLATES.find(t => t.type === block.type);
    const Icon = template?.icon || Layout;

    return (
      <div 
        key={block.id}
        draggable
        onDragStart={(e) => handleBlockDragStart(e, block.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, block.order)}
        className={`
          group relative border-2 border-dashed border-gray-200 rounded-lg p-4 mb-3 
          hover:border-blue-400 transition-colors cursor-move
          ${draggedBlock === block.id ? 'opacity-50' : ''}
        `}
        data-testid={`block-${block.type}-${block.id}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <Icon className="w-4 h-4" />
            <span className="font-medium">{template?.name || block.type}</span>
            <Badge variant="outline" className="text-xs">
              {block.type}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => moveBlock(block.id, 'up')}
              disabled={block.order === 0}
              data-testid={`move-up-${block.id}`}
            >
              <ArrowUp className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => moveBlock(block.id, 'down')}
              disabled={block.order === selectedPage!.blocks.length - 1}
              data-testid={`move-down-${block.id}`}
            >
              <ArrowDown className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editBlock(block)}
              data-testid={`edit-${block.id}`}
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => duplicateBlock(block.id)}
              data-testid={`duplicate-${block.id}`}
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteBlock(block.id)}
              data-testid={`delete-${block.id}`}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {block.type === 'hero' && (
            <div>
              <strong>{block.content.title}</strong>
              <p className="text-xs mt-1">{block.content.subtitle}</p>
            </div>
          )}
          {block.type === 'text' && (
            <div>
              <strong>{block.content.title}</strong>
              <p className="text-xs mt-1">{block.content.content?.substring(0, 100)}...</p>
            </div>
          )}
          {block.type === 'pricing' && (
            <div>Plans: {block.content.plans?.map((p: any) => p.name).join(', ')}</div>
          )}
          {block.type === 'testimonial' && (
            <div>Testimonials: {block.content.testimonials?.length || 0} items</div>
          )}
          {block.type === 'faq' && (
            <div>FAQs: {block.content.faqs?.length || 0} questions</div>
          )}
          {(block.type === 'cta' || block.type === 'contact') && (
            <div>
              <strong>{block.content.title}</strong>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex" data-testid="page-builder">
      {/* Block Templates Sidebar */}
      <div className="w-80 border-r bg-gray-50 p-4">
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Block Templates
          </h3>
          <p className="text-sm text-gray-600">Drag blocks to add them to your page</p>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-2">
            {BLOCK_TEMPLATES.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, template.type)}
                  className="
                    p-3 border rounded-lg cursor-grab active:cursor-grabbing
                    hover:border-blue-400 hover:bg-blue-50 transition-colors
                    bg-white
                  "
                  data-testid={`template-${template.type}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="border-b p-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <Select value={selectedPage?.id.toString()} onValueChange={(value) => {
              const page = pages.find(p => p.id === parseInt(value));
              setSelectedPage(page || null);
            }}>
              <SelectTrigger className="w-48" data-testid="page-selector">
                <SelectValue placeholder="Select a page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={page.id.toString()}>
                    <div className="flex items-center gap-2">
                      <span>{page.title}</span>
                      <Badge variant={page.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                        {page.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)} data-testid="toggle-preview">
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" data-testid="save-page">
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button 
              onClick={savePage} 
              disabled={savePageMutation.isPending}
              data-testid="save-page"
            >
              <Save className="w-4 h-4 mr-2" />
              {savePageMutation.isPending ? 'Saving...' : 'Save Page'}
            </Button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 bg-gray-100">
          {pagesLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2">Loading pages...</span>
            </div>
          ) : selectedPage ? (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{selectedPage.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Slug: /{selectedPage.slug}</span>
                  <Badge variant={selectedPage.status === 'published' ? 'default' : 'secondary'}>
                    {selectedPage.status}
                  </Badge>
                  <span>{selectedPage.blocks?.length || 0} blocks</span>
                </div>
              </div>

              <div 
                className="bg-white rounded-lg shadow-sm min-h-96 p-6"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e)}
                data-testid="page-canvas"
              >
                {(!selectedPage.blocks || selectedPage.blocks.length === 0) ? (
                  <div className="text-center py-12 text-gray-500">
                    <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No blocks yet</h3>
                    <p>Drag blocks from the sidebar to start building your page</p>
                  </div>
                ) : (
                  selectedPage.blocks
                    ?.sort((a, b) => a.order - b.order)
                    ?.map(renderBlockPreview) || []
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No page selected</h3>
              <p>Select a page from the dropdown to start editing</p>
            </div>
          )}
        </div>
      </div>

      {/* Block Editor Dialog */}
      <Dialog open={showBlockEditor} onOpenChange={setShowBlockEditor}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="block-editor-dialog">
          <DialogHeader>
            <DialogTitle>
              Edit {BLOCK_TEMPLATES.find(t => t.type === editingBlock?.type)?.name || 'Block'}
            </DialogTitle>
          </DialogHeader>
          
          {editingBlock && (
            <div className="space-y-4">
              {editingBlock.type === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hero-title">Title</Label>
                    <Input
                      id="hero-title"
                      value={editingBlock.content.title || ''}
                      onChange={(e) => setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, title: e.target.value }
                      })}
                      data-testid="hero-title-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Subtitle</Label>
                    <Textarea
                      id="hero-subtitle"
                      value={editingBlock.content.subtitle || ''}
                      onChange={(e) => setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, subtitle: e.target.value }
                      })}
                      data-testid="hero-subtitle-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-cta">CTA Text</Label>
                    <Input
                      id="hero-cta"
                      value={editingBlock.content.ctaText || ''}
                      onChange={(e) => setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, ctaText: e.target.value }
                      })}
                      data-testid="hero-cta-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-cta-link">CTA Link</Label>
                    <Input
                      id="hero-cta-link"
                      value={editingBlock.content.ctaLink || ''}
                      onChange={(e) => setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, ctaLink: e.target.value }
                      })}
                      data-testid="hero-cta-link-input"
                    />
                  </div>
                </div>
              )}

              {editingBlock.type === 'text' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="text-title">Title</Label>
                    <Input
                      id="text-title"
                      value={editingBlock.content.title || ''}
                      onChange={(e) => setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, title: e.target.value }
                      })}
                      data-testid="text-title-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="text-content">Content</Label>
                    <Textarea
                      id="text-content"
                      rows={6}
                      value={editingBlock.content.content || ''}
                      onChange={(e) => setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, content: e.target.value }
                      })}
                      data-testid="text-content-input"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowBlockEditor(false)} data-testid="cancel-edit">
                  Cancel
                </Button>
                <Button onClick={() => saveBlock(editingBlock)} data-testid="save-block">
                  Save Block
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}