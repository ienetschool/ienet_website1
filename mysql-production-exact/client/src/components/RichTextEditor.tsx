import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image,
  Save,
  X
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  title?: string;
  placeholder?: string;
  isSaving?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  onSave,
  onCancel,
  title = "Rich Text Editor",
  placeholder = "Start typing...",
  isSaving = false
}: RichTextEditorProps) {
  const [selectedText, setSelectedText] = useState("");

  const wrapSelectedText = (before: string, after: string = "") => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        end + before.length
      );
    }, 0);
  };

  const insertText = (text: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeText = value.substring(0, start);
    const afterText = value.substring(start);

    const newText = beforeText + text + afterText;
    onChange(newText);

    // Position cursor after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex flex-wrap gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => wrapSelectedText("**", "**")}
            title="Bold"
            data-testid="bold-button"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => wrapSelectedText("*", "*")}
            title="Italic"
            data-testid="italic-button"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => wrapSelectedText("<u>", "</u>")}
            title="Underline"
            data-testid="underline-button"
          >
            <Underline className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => insertText("\n- ")}
            title="Bullet List"
            data-testid="bullet-list-button"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => insertText("\n1. ")}
            title="Numbered List"
            data-testid="numbered-list-button"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => wrapSelectedText('[', '](https://)')}
            title="Link"
            data-testid="link-button"
          >
            <Link className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => insertText('![Alt text](image-url)')}
            title="Image"
            data-testid="image-button"
          >
            <Image className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[300px] font-mono"
          data-testid="rich-text-textarea"
        />
        
        <div className="border rounded p-4 bg-gray-50">
          <h4 className="text-sm font-medium mb-2">Preview:</h4>
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: value
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
                .replace(/^- (.+)$/gm, '<li>$1</li>')
                .replace(/^(\d+)\. (.+)$/gm, '<li>$1. $2</li>')
                .replace(/\n/g, '<br>')
            }}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={onSave}
            disabled={isSaving}
            data-testid="save-rich-text-button"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button 
            onClick={onCancel}
            variant="outline"
            data-testid="cancel-rich-text-button"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}