import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit3,
  Undo,
  Redo
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: string;
  readOnly?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  className = "",
  height = "400px",
  readOnly = false
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setCursorPosition(e.target.selectionStart);
  }, [onChange]);

  const insertText = useCallback((before: string, after: string = "", example: string = "") => {
    const textarea = document.querySelector('textarea[data-editor="true"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || example;
    
    const newText = value.substring(0, start) + before + textToInsert + after + value.substring(end);
    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  }, [value, onChange]);

  const formatText = useCallback((format: string) => {
    switch (format) {
      case 'bold':
        insertText('**', '**', 'bold text');
        break;
      case 'italic':
        insertText('*', '*', 'italic text');
        break;
      case 'underline':
        insertText('__', '__', 'underlined text');
        break;
      case 'h1':
        insertText('# ', '', 'Heading 1');
        break;
      case 'h2':
        insertText('## ', '', 'Heading 2');
        break;
      case 'h3':
        insertText('### ', '', 'Heading 3');
        break;
      case 'bullet':
        insertText('- ', '', 'List item');
        break;
      case 'number':
        insertText('1. ', '', 'Numbered item');
        break;
      case 'quote':
        insertText('> ', '', 'Quote text');
        break;
      case 'code':
        insertText('`', '`', 'code');
        break;
      case 'codeblock':
        insertText('```\n', '\n```', 'code block');
        break;
      case 'link':
        insertText('[', '](url)', 'link text');
        break;
      case 'image':
        insertText('![', '](image-url)', 'alt text');
        break;
    }
  }, [insertText]);

  const renderPreview = useMemo(() => {
    if (!value) return <p className="text-muted-foreground">Nothing to preview...</p>;
    
    // Simple markdown-like rendering
    let html = value
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded">$1</code>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^1\. (.*$)/gm, '<li>$1</li>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-muted pl-4 italic">$1</blockquote>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" class="max-w-full h-auto rounded" />')
      .replace(/\n/g, '<br>');

    // Wrap list items in ul tags
    html = html.replace(/(<li>.*<\/li>)/s, '<ul class="list-disc ml-6 space-y-1">$1</ul>');
    
    return <div dangerouslySetInnerHTML={{ __html: html }} className="prose prose-sm max-w-none" />;
  }, [value]);

  const toolbarButtons = [
    { icon: Bold, action: () => formatText('bold'), title: 'Bold', testId: 'btn-bold' },
    { icon: Italic, action: () => formatText('italic'), title: 'Italic', testId: 'btn-italic' },
    { icon: Underline, action: () => formatText('underline'), title: 'Underline', testId: 'btn-underline' },
    null, // Separator
    { icon: Heading1, action: () => formatText('h1'), title: 'Heading 1', testId: 'btn-h1' },
    { icon: Heading2, action: () => formatText('h2'), title: 'Heading 2', testId: 'btn-h2' },
    { icon: Heading3, action: () => formatText('h3'), title: 'Heading 3', testId: 'btn-h3' },
    null, // Separator
    { icon: List, action: () => formatText('bullet'), title: 'Bullet List', testId: 'btn-bullet' },
    { icon: ListOrdered, action: () => formatText('number'), title: 'Numbered List', testId: 'btn-number' },
    { icon: Quote, action: () => formatText('quote'), title: 'Quote', testId: 'btn-quote' },
    null, // Separator
    { icon: Code, action: () => formatText('code'), title: 'Inline Code', testId: 'btn-code' },
    { icon: Link, action: () => formatText('link'), title: 'Link', testId: 'btn-link' },
    { icon: Image, action: () => formatText('image'), title: 'Image', testId: 'btn-image' },
  ];

  if (readOnly) {
    return (
      <div className={cn("border rounded-lg p-4", className)} style={{ minHeight: height }}>
        {renderPreview}
      </div>
    );
  }

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "edit" | "preview")}>
        {/* Toolbar */}
        <div className="border-b bg-muted/30 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {toolbarButtons.map((button, index) => 
                button === null ? (
                  <Separator key={index} orientation="vertical" className="h-6 mx-1" />
                ) : (
                  <Button
                    key={button.testId}
                    variant="ghost"
                    size="sm"
                    onClick={button.action}
                    title={button.title}
                    data-testid={button.testId}
                    className="h-8 w-8 p-0"
                  >
                    <button.icon className="h-4 w-4" />
                  </Button>
                )
              )}
            </div>
            
            <TabsList className="h-8">
              <TabsTrigger value="edit" className="text-xs" data-testid="tab-edit">
                <Edit3 className="w-3 h-3 mr-1" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-xs" data-testid="tab-preview">
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Content */}
        <TabsContent value="edit" className="m-0">
          <Textarea
            data-editor="true"
            value={value}
            onChange={handleTextareaChange}
            placeholder={placeholder}
            className="border-0 rounded-none focus-visible:ring-0 resize-none"
            style={{ height, minHeight: height }}
            data-testid="rich-text-editor-textarea"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div className="p-4" style={{ height, minHeight: height, overflow: "auto" }}>
            {renderPreview}
          </div>
        </TabsContent>
      </Tabs>

      {/* Status Bar */}
      <div className="border-t bg-muted/20 px-3 py-2 text-xs text-muted-foreground flex justify-between">
        <span>Characters: {value.length}</span>
        <span>Words: {value.split(/\s+/).filter(Boolean).length}</span>
      </div>
    </div>
  );
}