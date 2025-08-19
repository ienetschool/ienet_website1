import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Paintbrush, Code, Search, Eye, Wand2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface EditButtonProps {
  onRichEdit?: () => void;
  onVisualEdit?: () => void;
  onSEOEdit?: () => void;
  onPreview?: () => void;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function EditButton({ 
  onRichEdit,
  onVisualEdit, 
  onSEOEdit,
  onPreview,
  className = "",
  variant = "ghost",
  size = "sm"
}: EditButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={`relative ${className}`}
          data-testid="edit-button-dropdown"
        >
          <Edit className="w-4 h-4" />
          <Badge 
            variant="secondary" 
            className="absolute -top-1 -right-1 text-xs px-1 py-0 h-auto bg-blue-500 text-white"
          >
            Pro
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50">
          Professional Editor Suite
        </div>
        <DropdownMenuSeparator />
        
        {onRichEdit && (
          <DropdownMenuItem 
            onClick={onRichEdit}
            className="flex items-center space-x-2 cursor-pointer hover:bg-blue-50"
          >
            <Code className="w-4 h-4 text-blue-600" />
            <div>
              <div className="font-medium">Rich Text Editor</div>
              <div className="text-xs text-gray-500">Visual HTML editor with formatting</div>
            </div>
          </DropdownMenuItem>
        )}
        
        {onVisualEdit && (
          <DropdownMenuItem 
            onClick={onVisualEdit}
            className="flex items-center space-x-2 cursor-pointer hover:bg-purple-50"
          >
            <Paintbrush className="w-4 h-4 text-purple-600" />
            <div>
              <div className="font-medium">Visual Page Builder</div>
              <div className="text-xs text-gray-500">Drag & drop page designer</div>
            </div>
          </DropdownMenuItem>
        )}
        
        {onSEOEdit && (
          <DropdownMenuItem 
            onClick={onSEOEdit}
            className="flex items-center space-x-2 cursor-pointer hover:bg-green-50"
          >
            <Search className="w-4 h-4 text-green-600" />
            <div>
              <div className="font-medium">SEO Optimization</div>
              <div className="text-xs text-gray-500">Meta tags, social media & analytics</div>
            </div>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        {onPreview && (
          <DropdownMenuItem 
            onClick={onPreview}
            className="flex items-center space-x-2 cursor-pointer hover:bg-orange-50"
          >
            <Eye className="w-4 h-4 text-orange-600" />
            <div>
              <div className="font-medium">Live Preview</div>
              <div className="text-xs text-gray-500">See changes in real-time</div>
            </div>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1.5 text-xs text-gray-500 bg-gray-50">
          <Wand2 className="w-3 h-3 inline mr-1" />
          Advanced editing tools activated
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}