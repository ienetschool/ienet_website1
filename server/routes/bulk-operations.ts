import type { Express } from "express";
import { storage } from "../storage";

export function registerBulkRoutes(app: Express) {
  // Bulk operations for pages
  app.post("/api/pages/bulk", async (req, res) => {
    try {
      const { action, pageIds, data } = req.body;

      switch (action) {
        case "publish":
          // Update all selected pages to published status
          for (const pageId of pageIds) {
            await storage.updatePageBuilderPage(pageId, { status: "published" });
          }
          res.json({ 
            success: true, 
            message: `Successfully published ${pageIds.length} page${pageIds.length === 1 ? '' : 's'}` 
          });
          break;

        case "unpublish":
          // Update all selected pages to draft status
          for (const pageId of pageIds) {
            await storage.updatePageBuilderPage(pageId, { status: "draft" });
          }
          res.json({ 
            success: true, 
            message: `Successfully unpublished ${pageIds.length} page${pageIds.length === 1 ? '' : 's'}` 
          });
          break;

        case "delete":
          // Delete all selected pages
          for (const pageId of pageIds) {
            await storage.deletePageBuilderPage(pageId);
          }
          res.json({ 
            success: true, 
            message: `Successfully deleted ${pageIds.length} page${pageIds.length === 1 ? '' : 's'}` 
          });
          break;

        default:
          res.status(400).json({ message: "Invalid bulk action" });
      }
    } catch (error) {
      console.error("Bulk operation error:", error);
      res.status(500).json({ message: "Failed to perform bulk operation" });
    }
  });
}