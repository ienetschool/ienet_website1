import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Save,
  Undo,
  Redo,
  Type
} from 'lucide-react';

interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (text: string, html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ 
  initialContent = '', 
  onChange,
  placeholder = 'Start writing...' 
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [htmlContent, setHtmlContent] = useState(initialContent);
  const [activeView, setActiveView] = useState<'visual' | 'html' | 'preview'>('visual');
  const editorRef = useRef<HTMLDivElement>(null);
  const htmlTextareaRef = useRef<HTMLTextAreaElement>(null);

  const formatDocument = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.innerHTML;
      const textContent = editorRef.current.textContent || '';
      setContent(textContent);
      setHtmlContent(htmlContent);
      onChange?.(textContent, htmlContent);
    }
  };

  const handleHtmlChange = (value: string) => {
    setHtmlContent(value);
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
      setContent(editorRef.current.textContent || '');
      onChange?.(editorRef.current.textContent || '', value);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatDocument('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      formatDocument('insertImage', url);
    }
  };

  useEffect(() => {
    if (editorRef.current && activeView === 'visual') {
      editorRef.current.innerHTML = htmlContent;
    }
  }, [activeView]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Type className="w-5 h-5 mr-2" />
            Rich Text Editor
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {content.length} characters
            </Badge>
            <Badge variant="secondary">
              Professional Editor
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visual" className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="html" className="flex items-center">
              <Code className="w-4 h-4 mr-2" />
              HTML
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-4">
            {/* Formatting Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-1 border-r pr-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('undo')}
                  title="Undo"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('redo')}
                  title="Redo"
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 border-r pr-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('formatBlock', 'h1')}
                  title="Heading 1"
                >
                  <Heading1 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('formatBlock', 'h2')}
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('formatBlock', 'h3')}
                  title="Heading 3"
                >
                  <Heading3 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 border-r pr-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('bold')}
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('italic')}
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('underline')}
                  title="Underline"
                >
                  <Underline className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 border-r pr-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('justifyLeft')}
                  title="Align Left"
                >
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('justifyCenter')}
                  title="Align Center"
                >
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('justifyRight')}
                  title="Align Right"
                >
                  <AlignRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 border-r pr-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('insertUnorderedList')}
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('insertOrderedList')}
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatDocument('formatBlock', 'blockquote')}
                  title="Quote"
                >
                  <Quote className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={insertLink}
                  title="Insert Link"
                >
                  <Link className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={insertImage}
                  title="Insert Image"
                >
                  <Image className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Visual Editor */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={updateContent}
              className="min-h-[300px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 prose max-w-none"
              style={{ 
                backgroundColor: 'white',
                fontSize: '14px',
                lineHeight: '1.6'
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </TabsContent>

          <TabsContent value="html" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">HTML Source Code</label>
              <textarea
                ref={htmlTextareaRef}
                value={htmlContent}
                onChange={(e) => handleHtmlChange(e.target.value)}
                className="w-full h-[400px] p-4 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="<p>Enter your HTML content here...</p>"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
                {!htmlContent && (
                  <p className="text-gray-500 italic">No content to preview</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-sm text-gray-600">
            Words: {content.split(/\s+/).filter(word => word.length > 0).length} | 
            Characters: {content.length}
          </div>
          <Button className="flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Auto-saving...
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}