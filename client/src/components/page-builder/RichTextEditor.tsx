import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Image,
  Quote,
  Code,
  Undo,
  Redo,
  Type,
  Palette,
  Eye,
  Code2
} from 'lucide-react';

interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (content: string, html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ 
  initialContent = '', 
  onChange, 
  placeholder = 'Start writing...' 
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(initialContent);
  const [activeMode, setActiveMode] = useState<'visual' | 'html' | 'preview'>('visual');
  const [htmlContent, setHtmlContent] = useState(initialContent);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    if (editorRef.current && activeMode === 'visual') {
      editorRef.current.innerHTML = htmlContent || initialContent;
    }
  }, [activeMode, initialContent]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const text = editorRef.current.innerText;
      setContent(text);
      setHtmlContent(html);
      onChange?.(text, html);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            execCommand('redo');
          } else {
            execCommand('undo');
          }
          break;
      }
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl);
      setLinkUrl('');
      setShowLinkDialog(false);
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const img = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; height: auto;" />`;
      execCommand('insertHTML', img);
      setImageUrl('');
      setImageAlt('');
      setShowImageDialog(false);
    }
  };

  const formatBlock = (tag: string) => {
    execCommand('formatBlock', `<${tag}>`);
  };

  const toolbar = (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
      {/* Text Formatting */}
      <div className="flex items-center gap-1 mr-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('bold')}
          className="p-2"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('italic')}
          className="p-2"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('underline')}
          className="p-2"
        >
          <Underline className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('strikeThrough')}
          className="p-2"
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
      </div>

      {/* Alignment */}
      <div className="flex items-center gap-1 mr-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('justifyLeft')}
          className="p-2"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('justifyCenter')}
          className="p-2"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('justifyRight')}
          className="p-2"
        >
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('justifyFull')}
          className="p-2"
        >
          <AlignJustify className="w-4 h-4" />
        </Button>
      </div>

      {/* Lists */}
      <div className="flex items-center gap-1 mr-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
      </div>

      {/* Headings */}
      <div className="flex items-center gap-1 mr-4">
        <select
          className="px-3 py-1 border rounded text-sm"
          onChange={(e) => formatBlock(e.target.value)}
          defaultValue=""
        >
          <option value="">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>
      </div>

      {/* Insert Elements */}
      <div className="flex items-center gap-1 mr-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowLinkDialog(true)}
          className="p-2"
        >
          <Link className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowImageDialog(true)}
          className="p-2"
        >
          <Image className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('formatBlock', '<blockquote>')}
          className="p-2"
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('formatBlock', '<pre>')}
          className="p-2"
        >
          <Code className="w-4 h-4" />
        </Button>
      </div>

      {/* Undo/Redo */}
      <div className="flex items-center gap-1 mr-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('undo')}
          className="p-2"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => execCommand('redo')}
          className="p-2"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Font Size */}
      <div className="flex items-center gap-1">
        <select
          className="px-3 py-1 border rounded text-sm"
          onChange={(e) => execCommand('fontSize', e.target.value)}
          defaultValue="3"
        >
          <option value="1">8pt</option>
          <option value="2">10pt</option>
          <option value="3">12pt</option>
          <option value="4">14pt</option>
          <option value="5">18pt</option>
          <option value="6">24pt</option>
          <option value="7">36pt</option>
        </select>
        
        <input
          type="color"
          className="w-8 h-8 border rounded cursor-pointer"
          onChange={(e) => execCommand('foreColor', e.target.value)}
          title="Text Color"
        />
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as any)}>
          <TabsList className="w-full justify-start rounded-none">
            <TabsTrigger value="visual" className="flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="html" className="flex items-center">
              <Code2 className="w-4 h-4 mr-2" />
              HTML
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="m-0">
            {toolbar}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[300px] p-4 focus:outline-none"
              onInput={updateContent}
              onKeyDown={handleKeyDown}
              style={{ whiteSpace: 'pre-wrap' }}
              suppressContentEditableWarning
            >
              {!htmlContent && (
                <div className="text-gray-400 pointer-events-none">
                  {placeholder}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="html" className="m-0">
            <textarea
              className="w-full min-h-[400px] p-4 font-mono text-sm border-0 focus:outline-none resize-none"
              value={htmlContent}
              onChange={(e) => {
                setHtmlContent(e.target.value);
                onChange?.(e.target.value.replace(/<[^>]*>/g, ''), e.target.value);
              }}
              placeholder="Enter HTML content..."
            />
          </TabsContent>

          <TabsContent value="preview" className="m-0">
            <div
              className="min-h-[300px] p-4 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </TabsContent>
        </Tabs>

        {/* Link Dialog */}
        {showLinkDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-96">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="link-url">URL</Label>
                    <Input
                      id="link-url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={insertLink}>Insert</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Image Dialog */}
        {showImageDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-96">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image-alt">Alt Text</Label>
                    <Input
                      id="image-alt"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Describe the image"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={insertImage}>Insert</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RichTextEditor;