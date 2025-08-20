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
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import {
  Sparkles,
  Wand2,
  Type,
  FileText,
  Image,
  Code,
  Search,
  Target,
  Users,
  TrendingUp,
  Globe,
  Zap,
  Brain,
  Palette,
  Camera,
  Video,
  Music,
  MessageCircle,
  Star,
  Lightbulb,
  Rocket,
  Crown,
  Gem,
  Copy,
  Download,
  RefreshCw,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface AIContentGeneratorProps {
  onContentGenerated?: (content: GeneratedContent) => void;
  pageContext?: any;
}

interface GeneratedContent {
  type: 'text' | 'html' | 'image' | 'seo' | 'schema';
  content: string;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
    tone?: string;
    length?: number;
  };
}

const contentTypes = [
  { value: 'heading', label: 'Headings & Titles', icon: Type, description: 'Generate compelling headlines' },
  { value: 'paragraph', label: 'Paragraphs', icon: FileText, description: 'Write detailed content sections' },
  { value: 'blog-post', label: 'Blog Posts', icon: FileText, description: 'Complete blog articles' },
  { value: 'product-description', label: 'Product Descriptions', icon: Star, description: 'E-commerce product copy' },
  { value: 'meta-tags', label: 'SEO Meta Tags', icon: Search, description: 'Optimized meta titles & descriptions' },
  { value: 'social-media', label: 'Social Media Posts', icon: MessageCircle, description: 'Social content & captions' },
  { value: 'call-to-action', label: 'Call-to-Action', icon: Target, description: 'Conversion-focused CTAs' },
  { value: 'faq', label: 'FAQ Content', icon: Users, description: 'Frequently asked questions' }
];

const toneOptions = [
  { value: 'professional', label: 'Professional', description: 'Formal business tone' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
  { value: 'authoritative', label: 'Authoritative', description: 'Expert and confident' },
  { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and excited' },
  { value: 'informative', label: 'Informative', description: 'Educational and clear' },
  { value: 'persuasive', label: 'Persuasive', description: 'Compelling and convincing' },
  { value: 'creative', label: 'Creative', description: 'Imaginative and unique' }
];

const lengthOptions = [
  { value: 'short', label: 'Short', range: [25, 50], description: '25-50 words' },
  { value: 'medium', label: 'Medium', range: [50, 150], description: '50-150 words' },
  { value: 'long', label: 'Long', range: [150, 300], description: '150-300 words' },
  { value: 'extended', label: 'Extended', range: [300, 500], description: '300-500 words' }
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ar', label: 'Arabic' }
];

export function AIContentGenerator({ onContentGenerated, pageContext }: AIContentGeneratorProps) {
  const { toast } = useToast();
  
  // Form state
  const [contentType, setContentType] = useState('paragraph');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [language, setLanguage] = useState('en');
  const [customInstructions, setCustomInstructions] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  
  // Advanced options
  const [includeEmojis, setIncludeEmojis] = useState(false);
  const [seoOptimized, setSeoOptimized] = useState(true);
  const [creativityLevel, setCreativityLevel] = useState([70]);
  const [includeStatistics, setIncludeStatistics] = useState(false);
  const [includeQuestions, setIncludeQuestions] = useState(false);
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [activeGeneration, setActiveGeneration] = useState(0);
  
  // Templates state
  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);

  const generateContent = useCallback(async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for content generation.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI content generation
      // In a real implementation, this would call your AI service
      const prompt = buildPrompt();
      const generatedText = await simulateAIGeneration(prompt);
      
      const newContent: GeneratedContent = {
        type: 'text',
        content: generatedText,
        metadata: {
          title: topic,
          tone,
          length: lengthOptions.find(l => l.value === length)?.range[1] || 100,
          keywords: keywords.split(',').map(k => k.trim()).filter(k => k)
        }
      };
      
      setGeneratedContent(prev => [...prev, newContent]);
      onContentGenerated?.(newContent);
      
      toast({
        title: "Content Generated",
        description: "AI has successfully generated your content.",
      });
      
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [topic, tone, length, keywords, onContentGenerated, toast]);

  const buildPrompt = useCallback(() => {
    const selectedLength = lengthOptions.find(l => l.value === length);
    const selectedTone = toneOptions.find(t => t.value === tone);
    const selectedType = contentTypes.find(t => t.value === contentType);
    
    let prompt = `Create ${selectedType?.label.toLowerCase()} about "${topic}" `;
    prompt += `in a ${selectedTone?.label.toLowerCase()} tone. `;
    prompt += `Target length: ${selectedLength?.description}. `;
    
    if (keywords) {
      prompt += `Include these keywords: ${keywords}. `;
    }
    
    if (targetAudience) {
      prompt += `Target audience: ${targetAudience}. `;
    }
    
    if (seoOptimized) {
      prompt += `Optimize for SEO. `;
    }
    
    if (includeEmojis) {
      prompt += `Include relevant emojis. `;
    }
    
    if (includeStatistics) {
      prompt += `Include relevant statistics or data points. `;
    }
    
    if (includeQuestions) {
      prompt += `Include engaging questions. `;
    }
    
    if (customInstructions) {
      prompt += `Additional instructions: ${customInstructions}`;
    }
    
    return prompt;
  }, [contentType, topic, tone, length, keywords, targetAudience, seoOptimized, includeEmojis, includeStatistics, includeQuestions, customInstructions]);

  const simulateAIGeneration = async (prompt: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // Sample generated content based on content type
    const samples: Record<string, string> = {
      heading: `${topic}: Comprehensive Guide for Modern Businesses`,
      paragraph: `${topic} represents a crucial aspect of modern digital strategy. By implementing effective approaches and leveraging cutting-edge technologies, businesses can achieve remarkable results and stay ahead of the competition. This comprehensive approach ensures sustainable growth and long-term success in today's dynamic marketplace.`,
      'blog-post': `# The Ultimate Guide to ${topic}\n\n${topic} has become increasingly important in today's digital landscape. This comprehensive guide will walk you through everything you need to know to master this essential skill.\n\n## Why ${topic} Matters\n\nIn our rapidly evolving world, understanding ${topic} is no longer optional—it's essential for success.\n\n## Getting Started\n\nHere are the fundamental principles you need to understand...`,
      'product-description': `Experience the power of ${topic} with our innovative solution. Designed for modern professionals who demand excellence, this product delivers unmatched performance and reliability. Transform your workflow and achieve outstanding results with industry-leading features and intuitive design.`,
      'meta-tags': `Title: ${topic} - Professional Solutions | Your Brand\nDescription: Discover expert ${topic} services and solutions. Get professional guidance and achieve outstanding results with our proven approach.`,
      'call-to-action': `Ready to transform your ${topic} strategy? Get started today and see immediate results. Join thousands of satisfied customers who have revolutionized their approach with our expert solutions.`,
      faq: `**Q: What is ${topic}?**\nA: ${topic} is a comprehensive approach that helps businesses achieve their goals through proven strategies and innovative solutions.\n\n**Q: How can ${topic} benefit my business?**\nA: By implementing ${topic}, you can expect improved efficiency, better results, and increased customer satisfaction.`
    };
    
    return samples[contentType] || samples.paragraph;
  };

  const copyToClipboard = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to Clipboard",
      description: "Content has been copied to your clipboard.",
    });
  }, [toast]);

  const saveAsTemplate = useCallback((content: GeneratedContent) => {
    const template = {
      id: Date.now(),
      name: `${contentType} - ${topic}`,
      content,
      settings: {
        contentType,
        tone,
        length,
        keywords
      }
    };
    
    setSavedTemplates(prev => [...prev, template]);
    toast({
      title: "Template Saved",
      description: "Content template has been saved for future use.",
    });
  }, [contentType, topic, tone, length, keywords, toast]);

  const renderContentForm = () => (
    <div className="space-y-6">
      {/* Content Type Selection */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Content Type</Label>
        <div className="grid grid-cols-2 gap-3">
          {contentTypes.map((type) => (
            <Button
              key={type.value}
              variant={contentType === type.value ? 'default' : 'outline'}
              className="justify-start h-auto p-3"
              onClick={() => setContentType(type.value)}
              data-testid={`button-content-type-${type.value}`}
            >
              <div className="flex items-start space-x-2">
                <type.icon className="w-4 h-4 mt-0.5" />
                <div className="text-left">
                  <div className="font-medium text-sm">{type.label}</div>
                  <div className="text-xs text-gray-500">{type.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Topic Input */}
      <div className="space-y-2">
        <Label htmlFor="topic">Topic *</Label>
        <Input
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic or subject..."
          data-testid="input-topic"
        />
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords (comma-separated)</Label>
        <Input
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="keyword1, keyword2, keyword3..."
          data-testid="input-keywords"
        />
      </div>

      {/* Tone and Length */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger data-testid="select-tone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {toneOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Length</Label>
          <Select value={length} onValueChange={setLength}>
            <SelectTrigger data-testid="select-length">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {lengthOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Target Audience */}
      <div className="space-y-2">
        <Label htmlFor="audience">Target Audience</Label>
        <Input
          id="audience"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="e.g., Small business owners, Marketing professionals..."
          data-testid="input-target-audience"
        />
      </div>

      {/* Advanced Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Advanced Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Creativity Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Creativity Level</Label>
              <span className="text-sm text-gray-500">{creativityLevel[0]}%</span>
            </div>
            <Slider
              value={creativityLevel}
              onValueChange={setCreativityLevel}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={seoOptimized}
                onChange={(e) => setSeoOptimized(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">SEO Optimized</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeEmojis}
                onChange={(e) => setIncludeEmojis(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Include Emojis</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeStatistics}
                onChange={(e) => setIncludeStatistics(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Include Statistics</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeQuestions}
                onChange={(e) => setIncludeQuestions(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Include Questions</span>
            </label>
          </div>

          {/* Custom Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Custom Instructions</Label>
            <Textarea
              id="instructions"
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              placeholder="Any specific requirements or style preferences..."
              rows={3}
              data-testid="textarea-custom-instructions"
            />
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Button
        onClick={generateContent}
        disabled={isGenerating || !topic.trim()}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        data-testid="button-generate-content"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Generating Content...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Content
          </>
        )}
      </Button>
    </div>
  );

  const renderGeneratedContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Generated Content ({generatedContent.length})</h3>
        {generatedContent.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setGeneratedContent([])}
          >
            Clear All
          </Button>
        )}
      </div>

      {generatedContent.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="font-medium">No content generated yet</p>
          <p className="text-sm">Fill out the form and generate your first piece of content</p>
        </div>
      ) : (
        <div className="space-y-4">
          {generatedContent.map((content, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{content.type}</Badge>
                    <span className="text-sm font-medium">
                      {content.metadata?.title || `Generation ${index + 1}`}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(content.content)}
                      data-testid={`button-copy-${index}`}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => saveAsTemplate(content)}
                      data-testid={`button-save-template-${index}`}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm font-sans">
                    {content.content}
                  </pre>
                </div>
                {content.metadata && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {content.metadata.tone && (
                      <Badge variant="outline" className="text-xs">
                        Tone: {content.metadata.tone}
                      </Badge>
                    )}
                    {content.metadata.length && (
                      <Badge variant="outline" className="text-xs">
                        ~{content.metadata.length} words
                      </Badge>
                    )}
                    {content.metadata.keywords && content.metadata.keywords.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {content.metadata.keywords.length} keywords
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold">AI Content Generator</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create high-quality content with advanced AI
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {/* Left Panel - Form */}
        <div>
          <ScrollArea className="h-[700px]">
            {renderContentForm()}
          </ScrollArea>
        </div>

        {/* Right Panel - Generated Content */}
        <div>
          <ScrollArea className="h-[700px]">
            {renderGeneratedContent()}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default AIContentGenerator;