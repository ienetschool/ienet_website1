import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Edit3, Save, X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface InlineEditorProps {
  pageType: 'service' | 'sub-service' | 'feature' | 'blog' | 'page';
  pageId: number | string;
  field: string;
  value: string;
  isTitle?: boolean;
  isRichText?: boolean;
  placeholder?: string;
  className?: string;
}

export function InlineEditor({
  pageType,
  pageId,
  field,
  value,
  isTitle = false,
  isRichText = false,
  placeholder,
  className = ""
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [showEditMode, setShowEditMode] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user can edit (admin or editor role)
  const canEdit = user && ((user as any).role === 'admin' || (user as any).role === 'editor');

  const updateMutation = useMutation({
    mutationFn: async (newValue: string) => {
      const endpoint = getUpdateEndpoint(pageType, pageId);
      return apiRequest("PATCH", endpoint, { [field]: newValue });
    },
    onSuccess: () => {
      toast({
        title: "Updated successfully",
        description: `${field} has been updated`,
      });
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [getQueryKey(pageType)] });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getUpdateEndpoint = (type: string, id: number | string) => {
    switch (type) {
      case 'service':
        return `/api/service-categories/${id}`;
      case 'sub-service':
        return `/api/services/${id}`;
      case 'feature':
        return `/api/features/${id}`;
      case 'blog':
        return `/api/blog/${id}`;
      case 'page':
        return `/api/pages/${id}`;
      default:
        return `/api/pages/${id}`;
    }
  };

  const getQueryKey = (type: string) => {
    switch (type) {
      case 'service':
        return '/api/service-categories';
      case 'sub-service':
        return '/api/services';
      case 'feature':
        return '/api/features';
      case 'blog':
        return '/api/blog';
      case 'page':
        return '/api/pages';
      default:
        return '/api/pages';
    }
  };

  const handleSave = () => {
    if (editValue.trim() !== value.trim()) {
      updateMutation.mutate(editValue);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  if (!canEdit) {
    // Show normal content for non-editors
    if (isTitle) {
      return <h1 className={className}>{value}</h1>;
    }
    return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  }

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setShowEditMode(true)}
      onMouseLeave={() => setShowEditMode(false)}
    >
      {!isEditing ? (
        <div className="relative">
          {isTitle ? (
            <h1 className="cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-200 rounded p-2 transition-all">
              {value}
            </h1>
          ) : (
            <div 
              className="cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-200 rounded p-2 transition-all"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          )}
          
          {(showEditMode || isEditing) && (
            <Button
              size="sm"
              variant="outline"
              className="absolute top-0 right-0 opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setIsEditing(true)}
              data-testid={`edit-${field}-button`}
            >
              <Edit3 className="w-3 h-3 mr-1" />
              Edit
            </Button>
          )}
        </div>
      ) : (
        <Card className="border-blue-200 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-3">
              {isTitle ? (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder={placeholder}
                  className="text-lg font-semibold"
                  data-testid={`input-${field}`}
                />
              ) : isRichText ? (
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder={placeholder}
                  className="min-h-[200px]"
                  data-testid={`textarea-${field}`}
                />
              ) : (
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder={placeholder}
                  className="min-h-[100px]"
                  data-testid={`textarea-${field}`}
                />
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  size="sm"
                  data-testid={`save-${field}-button`}
                >
                  <Save className="w-3 h-3 mr-1" />
                  {updateMutation.isPending ? "Saving..." : "Save"}
                </Button>
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  data-testid={`cancel-${field}-button`}
                >
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Global edit mode toggle component
export function EditModeToggle() {
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();

  const canEdit = user && ((user as any).role === 'admin' || (user as any).role === 'editor');

  if (!canEdit) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setEditMode(!editMode)}
        variant={editMode ? "default" : "outline"}
        className="shadow-lg"
        data-testid="toggle-edit-mode"
      >
        {editMode ? (
          <>
            <EyeOff className="w-4 h-4 mr-2" />
            Exit Edit Mode
          </>
        ) : (
          <>
            <Eye className="w-4 h-4 mr-2" />
            Edit Page
          </>
        )}
      </Button>
    </div>
  );
}