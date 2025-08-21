import type { Express } from "express";
import { storage } from "../storage";
import { isAuthenticated } from "../replitAuth";
import { z } from "zod";
import { insertPageSchema } from "@shared/schema";

export function registerPageRoutes(app: Express) {
  // Get all pages (with optional filtering)
  app.get('/api/pages', isAuthenticated, async (req, res) => {
    try {
      const pages = await storage.getPageBuilderPages();
      res.json(pages);
    } catch (error) {
      console.error('Error fetching pages:', error);
      res.status(500).json({ error: 'Failed to fetch pages' });
    }
  });

  // Get page by slug
  app.get('/api/pages/slug/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const page = await storage.getPageBySlug(slug);
      
      if (!page) {
        return res.status(404).json({ error: 'Page not found' });
      }
      
      res.json(page);
    } catch (error) {
      console.error('Error fetching page:', error);
      res.status(500).json({ error: 'Failed to fetch page' });
    }
  });

  // Create new page
  app.post('/api/pages', isAuthenticated, async (req, res) => {
    try {
      const pageData = insertPageSchema.parse(req.body);
      
      // Check if slug already exists
      const existingPage = await storage.getPageBySlug(pageData.slug);
      if (existingPage) {
        return res.status(400).json({ error: 'Page with this slug already exists' });
      }
      
      const newPage = await storage.createPageBuilderPage(pageData);
      res.status(201).json(newPage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      console.error('Error creating page:', error);
      res.status(500).json({ error: 'Failed to create page' });
    }
  });

  // Update page
  app.put('/api/pages/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // If slug is being updated, check for duplicates
      if (updateData.slug) {
        const existingPage = await storage.getPageBySlug(updateData.slug);
        if (existingPage && existingPage.id !== id) {
          return res.status(400).json({ error: 'Page with this slug already exists' });
        }
      }
      
      const updatedPage = await storage.updatePageBuilderPage(id, updateData);
      res.json(updatedPage);
    } catch (error) {
      console.error('Error updating page:', error);
      res.status(500).json({ error: 'Failed to update page' });
    }
  });

  // Delete page
  app.delete('/api/pages/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePageBuilderPage(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting page:', error);
      res.status(500).json({ error: 'Failed to delete page' });
    }
  });

  // Get page versions
  app.get('/api/pages/:id/versions', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const versions = await storage.getPageVersions(id);
      res.json(versions);
    } catch (error) {
      console.error('Error fetching page versions:', error);
      res.status(500).json({ error: 'Failed to fetch page versions' });
    }
  });

  // Publish/unpublish page
  app.patch('/api/pages/:id/status', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!['draft', 'published', 'archived'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      
      const updateData: any = { status };
      if (status === 'published') {
        updateData.publishedAt = new Date();
      }
      
      const updatedPage = await storage.updatePageBuilderPage(id, updateData);
      res.json(updatedPage);
    } catch (error) {
      console.error('Error updating page status:', error);
      res.status(500).json({ error: 'Failed to update page status' });
    }
  });
}