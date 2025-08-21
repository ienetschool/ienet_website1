import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  Undo,
  Redo,
  Type
} from "lucide-react";

interface WYSIWYGEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function WYSIWYGEditor({ content, onChange, placeholder = "Start typing...", className }: WYSIWYGEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    
    // Update content after command execution
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    executeCommand('insertText', text);
  }, [executeCommand]);

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const toolbarButtons = [
    // Text formatting
    { icon: Bold, command: 'bold', tooltip: 'Bold (Ctrl+B)' },
    { icon: Italic, command: 'italic', tooltip: 'Italic (Ctrl+I)' },
    { icon: Underline, command: 'underline', tooltip: 'Underline (Ctrl+U)' },
    { separator: true },
    
    // Headings
    { icon: Heading1, command: 'formatBlock', value: 'h1', tooltip: 'Heading 1' },
    { icon: Heading2, command: 'formatBlock', value: 'h2', tooltip: 'Heading 2' },
    { icon: Heading3, command: 'formatBlock', value: 'h3', tooltip: 'Heading 3' },
    { icon: Type, command: 'formatBlock', value: 'p', tooltip: 'Paragraph' },
    { separator: true },
    
    // Alignment
    { icon: AlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', tooltip: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', tooltip: 'Align Right' },
    { separator: true },
    
    // Lists
    { icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', tooltip: 'Numbered List' },
    { separator: true },
    
    // Media and links
    { icon: Link, action: insertLink, tooltip: 'Insert Link' },
    { icon: Image, action: insertImage, tooltip: 'Insert Image' },
    { separator: true },
    
    // Special formatting
    { icon: Quote, command: 'formatBlock', value: 'blockquote', tooltip: 'Blockquote' },
    { icon: Code, command: 'formatBlock', value: 'pre', tooltip: 'Code Block' },
    { separator: true },
    
    // Undo/Redo
    { icon: Undo, command: 'undo', tooltip: 'Undo (Ctrl+Z)' },
    { icon: Redo, command: 'redo', tooltip: 'Redo (Ctrl+Y)' }
  ];

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-0">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-3 bg-muted/30 border-b">
          <TooltipProvider>
            {toolbarButtons.map((button, index) => {
              if (button.separator) {
                return <Separator key={index} orientation="vertical" className="h-6 mx-1" />;
              }

              const IconComponent = button.icon!;
              const handleClick = button.action || (() => executeCommand(button.command!, button.value));

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClick}
                      className="h-8 w-8 p-0"
                      data-testid={`button-editor-${button.command || 'action'}`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{button.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>

        {/* Editor Content */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning={true}
          onInput={handleInput}
          onPaste={handlePaste}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          dangerouslySetInnerHTML={{ __html: content }}
          className={`
            min-h-[300px] p-4 outline-none focus:ring-0
            prose prose-sm max-w-none
            ${isFocused ? 'ring-2 ring-ring ring-offset-2' : ''}
          `}
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
          data-testid="editor-content"
        />

        {/* Placeholder */}
        {!content && !isFocused && (
          <div 
            className="absolute top-[72px] left-4 text-muted-foreground pointer-events-none"
            data-testid="editor-placeholder"
          >
            {placeholder}
          </div>
        )}

        {/* Word count and status */}
        <div className="flex justify-between items-center p-3 bg-muted/20 border-t text-xs text-muted-foreground">
          <span data-testid="editor-word-count">
            {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length} words
          </span>
          <span>
            {isFocused ? 'Editing...' : 'Ready'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// Custom hooks for the WYSIWYG editor
export function useWYSIWYGContent(initialContent: string = '') {
  const [content, setContent] = useState(initialContent);
  
  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const clearContent = useCallback(() => {
    setContent('');
  }, []);

  const getPlainText = useCallback(() => {
    return content.replace(/<[^>]*>/g, '');
  }, [content]);

  const getWordCount = useCallback(() => {
    return getPlainText().split(/\s+/).filter(word => word.length > 0).length;
  }, [getPlainText]);

  return {
    content,
    updateContent,
    clearContent,
    getPlainText,
    getWordCount
  };
}