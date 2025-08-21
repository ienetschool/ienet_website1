import type { Express } from "express";
import { storage } from "../storage";
import { insertContentTemplateSchema } from "@shared/schema";
import { isAuthenticated } from "../replitAuth";

export function registerTemplateRoutes(app: Express) {
  // Get all content templates
  app.get("/api/templates", isAuthenticated, async (req, res) => {
    try {
      const templates = await storage.getContentTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  // Get single template
  app.get("/api/templates/:id", isAuthenticated, async (req, res) => {
    try {
      const template = await storage.getContentTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  // Create new template
  app.post("/api/templates", isAuthenticated, async (req, res) => {
    try {
      const validated = insertContentTemplateSchema.parse(req.body);
      const template = await storage.createContentTemplate(validated);
      res.status(201).json(template);
    } catch (error) {
      console.error("Error creating template:", error);
      res.status(500).json({ message: "Failed to create template" });
    }
  });

  // Update template
  app.put("/api/templates/:id", isAuthenticated, async (req, res) => {
    try {
      const validated = insertContentTemplateSchema.partial().parse(req.body);
      const template = await storage.updateContentTemplate(req.params.id, validated);
      res.json(template);
    } catch (error) {
      console.error("Error updating template:", error);
      res.status(500).json({ message: "Failed to update template" });
    }
  });

  // Delete template
  app.delete("/api/templates/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteContentTemplate(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting template:", error);
      res.status(500).json({ message: "Failed to delete template" });
    }
  });
}