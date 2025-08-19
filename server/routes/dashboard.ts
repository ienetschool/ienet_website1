import type { Express } from "express";
import { storage } from "../storage";

export function registerDashboardRoutes(app: Express) {
  
  // Dashboard stats endpoint
  app.get('/api/dashboard/stats', async (req, res) => {
    try {
      const pages = await storage.getPageBuilderPages();
      const services = await storage.getServices();
      const features = await storage.getFeatures();
      const projects = await storage.getProjects();
      const enquiries = await storage.getEnquiries();
      
      const stats = {
        totalPages: pages.length,
        totalServices: services.length,
        totalFeatures: features.length,
        totalProjects: projects.length,
        totalEnquiries: enquiries.length,
        totalUsers: 1, // For now, just admin user
        monthlyVisits: 12547,
        seoScore: 95,
        recentActivity: [
          {
            id: '1',
            action: 'Created new service',
            user: 'Admin',
            timestamp: new Date().toISOString(),
            type: 'create' as const
          },
          {
            id: '2',
            action: 'Updated feature page',
            user: 'Admin',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            type: 'update' as const
          }
        ]
      };
      
      res.json(stats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({ message: 'Failed to fetch dashboard stats' });
    }
  });
  
  // Analytics routes
  app.get('/api/dashboard/analytics', async (req, res) => {
    try {
      // Mock analytics data for now - in production, integrate with Google Analytics
      const analyticsData = {
        overview: {
          totalViews: 12547,
          uniqueVisitors: 8934,
          bounceRate: 67,
          avgSessionDuration: "3m 42s",
          pageViews: 18923,
          liveVisitors: 23
        },
        trends: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          views: Math.floor(Math.random() * 1000) + 500,
          visitors: Math.floor(Math.random() * 500) + 200,
          sessions: Math.floor(Math.random() * 300) + 150
        })),
        topPages: [
          { page: '/services/website-development', views: 2341, change: 12 },
          { page: '/services/cybersecurity', views: 1892, change: -5 },
          { page: '/projects/optical-store', views: 1567, change: 8 },
          { page: '/about', views: 1234, change: 15 },
          { page: '/contact', views: 987, change: -2 }
        ],
        devices: [
          { type: 'Desktop', percentage: 52, color: '#0088FE' },
          { type: 'Mobile', percentage: 38, color: '#00C49F' },
          { type: 'Tablet', percentage: 10, color: '#FFBB28' }
        ],
        queryStats: {
          totalQueries: 45678,
          slowQueries: 23,
          avgResponseTime: 142,
          errorRate: 2.1
        },
        schemaErrors: []
      };

      res.json(analyticsData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
  });

  // Page builder routes
  app.get('/api/dashboard/pages', async (req, res) => {
    try {
      const pages = await storage.getPageBuilderPages();
      res.json(pages);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
      res.status(500).json({ error: 'Failed to fetch pages' });
    }
  });

  app.get('/api/dashboard/pages/:id/versions', async (req, res) => {
    try {
      const pageId = parseInt(req.params.id);
      const versions = await storage.getPageVersions(pageId);
      res.json(versions);
    } catch (error) {
      console.error('Failed to fetch page versions:', error);
      res.status(500).json({ error: 'Failed to fetch page versions' });
    }
  });

  app.put('/api/dashboard/pages/:id', async (req, res) => {
    try {
      const pageId = parseInt(req.params.id);
      const pageData = req.body;
      const updatedPage = await storage.updatePageBuilderPage(pageId, pageData);
      res.json(updatedPage);
    } catch (error) {
      console.error('Failed to update page:', error);
      res.status(500).json({ error: 'Failed to update page' });
    }
  });

  // SEO Manager routes
  app.get('/api/dashboard/seo/pages', async (req, res) => {
    try {
      const seoPages = await storage.getSEOPages();
      res.json(seoPages);
    } catch (error) {
      console.error('Failed to fetch SEO pages:', error);
      res.status(500).json({ error: 'Failed to fetch SEO pages' });
    }
  });

  app.get('/api/dashboard/seo/redirects', async (req, res) => {
    try {
      const redirects = await storage.getRedirects();
      res.json(redirects);
    } catch (error) {
      console.error('Failed to fetch redirects:', error);
      res.status(500).json({ error: 'Failed to fetch redirects' });
    }
  });

  app.post('/api/dashboard/seo/redirects', async (req, res) => {
    try {
      const redirectData = req.body;
      const redirect = await storage.createRedirect(redirectData);
      res.json(redirect);
    } catch (error) {
      console.error('Failed to create redirect:', error);
      res.status(500).json({ error: 'Failed to create redirect' });
    }
  });

  app.get('/api/dashboard/seo/schemas', async (req, res) => {
    try {
      const schemas = await storage.getSchemaMarkups();
      res.json(schemas);
    } catch (error) {
      console.error('Failed to fetch schemas:', error);
      res.status(500).json({ error: 'Failed to fetch schemas' });
    }
  });

  app.post('/api/dashboard/seo/schemas/:id/validate', async (req, res) => {
    try {
      const schemaId = parseInt(req.params.id);
      const result = await storage.validateSchema(schemaId);
      res.json(result);
    } catch (error) {
      console.error('Failed to validate schema:', error);
      res.status(500).json({ error: 'Failed to validate schema' });
    }
  });

  app.post('/api/dashboard/seo/crawl/:id', async (req, res) => {
    try {
      const pageId = parseInt(req.params.id);
      const result = await storage.crawlPage(pageId);
      res.json(result);
    } catch (error) {
      console.error('Failed to crawl page:', error);
      res.status(500).json({ error: 'Failed to crawl page' });
    }
  });

  app.get('/api/dashboard/seo/robots', async (req, res) => {
    try {
      const robotsTxt = await storage.getRobotsTxt();
      res.set('Content-Type', 'text/plain');
      res.send(robotsTxt);
    } catch (error) {
      console.error('Failed to fetch robots.txt:', error);
      res.status(500).send('Failed to fetch robots.txt');
    }
  });

  app.put('/api/dashboard/seo/robots', async (req, res) => {
    try {
      const robotsTxt = req.body;
      await storage.updateRobotsTxt(robotsTxt);
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to update robots.txt:', error);
      res.status(500).json({ error: 'Failed to update robots.txt' });
    }
  });

  app.get('/api/dashboard/seo/sitemap', async (req, res) => {
    try {
      const sitemapXml = await storage.getSitemapXml();
      res.set('Content-Type', 'application/xml');
      res.send(sitemapXml);
    } catch (error) {
      console.error('Failed to fetch sitemap:', error);
      res.status(500).send('Failed to fetch sitemap');
    }
  });

  app.post('/api/dashboard/seo/sitemap/generate', async (req, res) => {
    try {
      const result = await storage.generateSitemap();
      res.json(result);
    } catch (error) {
      console.error('Failed to generate sitemap:', error);
      res.status(500).json({ error: 'Failed to generate sitemap' });
    }
  });

  // Notifications routes
  app.get('/api/dashboard/notifications', async (req, res) => {
    try {
      const notifications = await storage.getNotifications();
      res.json(notifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });

  app.get('/api/dashboard/notifications/settings', async (req, res) => {
    try {
      const settings = await storage.getNotificationSettings();
      res.json(settings);
    } catch (error) {
      console.error('Failed to fetch notification settings:', error);
      res.status(500).json({ error: 'Failed to fetch notification settings' });
    }
  });

  app.put('/api/dashboard/notifications/settings', async (req, res) => {
    try {
      const settings = req.body;
      const updatedSettings = await storage.updateNotificationSettings(settings);
      res.json(updatedSettings);
    } catch (error) {
      console.error('Failed to update notification settings:', error);
      res.status(500).json({ error: 'Failed to update notification settings' });
    }
  });

  app.put('/api/dashboard/notifications/:id/read', async (req, res) => {
    try {
      const notificationId = parseInt(req.params.id);
      await storage.markNotificationAsRead(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      res.status(500).json({ error: 'Failed to mark notification as read' });
    }
  });

  app.put('/api/dashboard/notifications/read-all', async (req, res) => {
    try {
      await storage.markAllNotificationsAsRead();
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      res.status(500).json({ error: 'Failed to mark all notifications as read' });
    }
  });

  app.put('/api/dashboard/notifications/:id/archive', async (req, res) => {
    try {
      const notificationId = parseInt(req.params.id);
      await storage.archiveNotification(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to archive notification:', error);
      res.status(500).json({ error: 'Failed to archive notification' });
    }
  });

  app.delete('/api/dashboard/notifications/:id', async (req, res) => {
    try {
      const notificationId = parseInt(req.params.id);
      await storage.deleteNotification(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to delete notification:', error);
      res.status(500).json({ error: 'Failed to delete notification' });
    }
  });
}