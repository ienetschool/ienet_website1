import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Eye, EyeOff, Edit, CheckSquare } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
type Page = {
  id: string;
  title: string;
  slug: string;
  status: string;
  viewCount?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

interface BulkActionToolbarProps {
  selectedPages: Page[];
  onClearSelection: () => void;
}

export function BulkActionToolbar({ selectedPages, onClearSelection }: BulkActionToolbarProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ action: string; label: string } | null>(null);

  const bulkActionMutation = useMutation({
    mutationFn: ({ action, pageIds, data }: { action: string; pageIds: string[]; data?: any }) =>
      apiRequest("/api/pages/bulk", "POST", { action, pageIds, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
      toast({ 
        title: "Success", 
        description: data.message || `${variables.action} operation completed successfully` 
      });
      onClearSelection();
      setIsConfirmDialogOpen(false);
      setPendingAction(null);
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Bulk operation failed", 
        variant: "destructive" 
      });
      console.error("Bulk operation error:", error);
    }
  });

  const handleBulkAction = (action: string, label: string, data?: any) => {
    if (action === "delete") {
      setPendingAction({ action, label });
      setIsConfirmDialogOpen(true);
    } else {
      bulkActionMutation.mutate({ 
        action, 
        pageIds: selectedPages.map(p => p.id),
        data 
      });
    }
  };

  const confirmAction = () => {
    if (pendingAction) {
      bulkActionMutation.mutate({ 
        action: pendingAction.action, 
        pageIds: selectedPages.map(p => p.id) 
      });
    }
  };

  if (selectedPages.length === 0) return null;

  const publishedCount = selectedPages.filter(p => p.status === "published").length;
  const draftCount = selectedPages.filter(p => p.status === "draft").length;

  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 border rounded-lg mb-6">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="flex items-center gap-1">
          <CheckSquare className="w-3 h-3" />
          {selectedPages.length} selected
        </Badge>
        <div className="flex gap-2 text-sm text-muted-foreground">
          {publishedCount > 0 && <span>{publishedCount} published</span>}
          {draftCount > 0 && <span>{draftCount} draft</span>}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Select onValueChange={(action) => {
          switch (action) {
            case "publish":
              handleBulkAction("publish", "Publish Pages");
              break;
            case "unpublish":
              handleBulkAction("unpublish", "Unpublish Pages");
              break;
            case "delete":
              handleBulkAction("delete", "Delete Pages");
              break;
          }
        }}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Bulk Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="publish" disabled={publishedCount === selectedPages.length}>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Publish
              </div>
            </SelectItem>
            <SelectItem value="unpublish" disabled={draftCount === selectedPages.length}>
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4" />
                Unpublish
              </div>
            </SelectItem>
            <SelectItem value="delete" className="text-destructive focus:text-destructive">
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={onClearSelection}
          data-testid="button-clear-selection"
        >
          Clear Selection
        </Button>

        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Bulk Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to {pendingAction?.label.toLowerCase()} {selectedPages.length} page{selectedPages.length === 1 ? '' : 's'}?
                {pendingAction?.action === "delete" && (
                  <span className="block mt-2 text-destructive font-medium">
                    This action cannot be undone.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsConfirmDialogOpen(false)}
                data-testid="button-cancel-bulk-action"
              >
                Cancel
              </Button>
              <Button
                variant={pendingAction?.action === "delete" ? "destructive" : "default"}
                onClick={confirmAction}
                disabled={bulkActionMutation.isPending}
                data-testid="button-confirm-bulk-action"
              >
                {bulkActionMutation.isPending ? "Processing..." : pendingAction?.label}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}