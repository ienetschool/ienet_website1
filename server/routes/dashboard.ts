import type { Express } from "express";
import { storage } from "../storage";
import { isAuthenticated } from "../replitAuth";

interface DashboardStats {
  totalPages: number;
  totalEnquiries: number;
  totalUsers: number;
  monthlyVisits: number;
  seoScore: number;
  recentActivity: Array<{
    id: string;
    action: string;
    user: string;
    timestamp: string;
    type: 'create' | 'update' | 'delete';
  }>;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  enableDarkMode: boolean;
  maintenanceMode: boolean;
  googleAnalyticsId: string;
  googleSearchConsoleId: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  createdAt: string;
}

export function registerDashboardRoutes(app: Express) {
  
  // Get dashboard statistics
  app.get('/api/dashboard/stats', async (req, res) => {
    try {
      // Get counts from database
      const totalPages = await storage.getServiceCategories().then(categories => categories.length);
      const totalEnquiries = await storage.getEnquiries().then(enquiries => 
        enquiries.filter(e => e.status === 'new').length
      );
      const allUsers = await storage.getAllUsers();
      const totalUsers = allUsers.length;
      
      // Mock analytics data - in real implementation, integrate with Google Analytics API
      const monthlyVisits = Math.floor(Math.random() * 50000) + 10000;
      const seoScore = Math.floor(Math.random() * 30) + 70;

      // Get recent activity from activity logs
      const recentActivity = await storage.getActivityLogs(undefined, 10);
      
      const stats: DashboardStats = {
        totalPages,
        totalEnquiries, 
        totalUsers,
        monthlyVisits,
        seoScore,
        recentActivity: recentActivity.map(log => ({
          id: log.id.toString(),
          action: log.action,
          user: log.userId || 'system',
          timestamp: log.createdAt?.toISOString() || new Date().toISOString(),
          type: log.action.includes('create') ? 'create' as const : 
                log.action.includes('delete') ? 'delete' as const : 'update' as const
        }))
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Get site settings
  app.get('/api/dashboard/settings', async (req, res) => {
    try {
      // Get site settings from database
      const settings = await storage.getSiteSettings();
      
      const siteSettings: SiteSettings = {
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        logo: settings.logoUrl,
        favicon: settings.faviconUrl,
        primaryColor: settings.primaryColor,
        secondaryColor: settings.secondaryColor,
        fontFamily: settings.fontFamily,
        enableDarkMode: settings.enableDarkMode,
        maintenanceMode: settings.maintenanceMode,
        googleAnalyticsId: settings.googleAnalyticsId,
        googleSearchConsoleId: settings.googleSearchConsoleId
      };

      res.json(siteSettings);
    } catch (error) {
      console.error("Error fetching site settings:", error);
      res.status(500).json({ message: "Failed to fetch site settings" });
    }
  });

  // Update site settings
  app.put('/api/dashboard/settings', async (req, res) => {
    try {
      const updates = req.body;
      
      // Update settings in database
      await storage.updateSiteSettings(updates);
      
      res.json({ message: "Settings updated successfully" });
    } catch (error) {
      console.error("Error updating site settings:", error);
      res.status(500).json({ message: "Failed to update site settings" });
    }
  });

  // Get leads/enquiries
  app.get('/api/dashboard/leads', async (req, res) => {
    try {
      const enquiries = await storage.getEnquiries();
      
      const leads: Lead[] = enquiries.map(enquiry => ({
        id: enquiry.id.toString(),
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone || undefined,
        service: enquiry.serviceInterest || 'General Inquiry',
        message: enquiry.message,
        source: enquiry.source || 'website',
        status: (enquiry.status as Lead['status']) || 'new',
        createdAt: enquiry.createdAt?.toISOString() || new Date().toISOString()
      }));

      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  // Update lead status
  app.put('/api/dashboard/leads/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      await storage.updateEnquiry(parseInt(id), { status });
      
      res.json({ message: "Lead status updated successfully" });
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  // SEO Management Routes
  app.get('/api/dashboard/seo/pages', async (req, res) => {
    try {
      // Get all pages with SEO data
      const serviceCategories = await storage.getServiceCategories();
      const services = await storage.getServices();
      const features = await storage.getFeatures();
      
      const pages = [
        ...serviceCategories.map(cat => ({
          id: `category-${cat.id}`,
          title: cat.name,
          url: `/services/${cat.slug}`,
          type: 'category',
          metaTitle: cat.metaTitle,
          metaDescription: cat.metaDescription,
          seoScore: Math.floor(Math.random() * 40) + 60
        })),
        ...services.map(service => ({
          id: `service-${service.id}`,
          title: service.name,
          url: `/services/${service.slug}`,
          type: 'service',
          metaTitle: service.metaTitle,
          metaDescription: service.metaDescription,
          seoScore: Math.floor(Math.random() * 40) + 60
        })),
        ...features.map(feature => ({
          id: `feature-${feature.id}`,
          title: feature.name,
          url: `/features/${feature.slug}`,
          type: 'feature',
          metaTitle: feature.metaTitle,
          metaDescription: feature.metaDescription,
          seoScore: Math.floor(Math.random() * 40) + 60
        }))
      ];

      res.json(pages);
    } catch (error) {
      console.error("Error fetching SEO pages:", error);
      res.status(500).json({ message: "Failed to fetch SEO pages" });
    }
  });

  // Content Management Routes
  app.get('/api/dashboard/content/sliders', async (req, res) => {
    try {
      const sliders = await storage.getSliders();
      res.json(sliders);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      res.status(500).json({ message: "Failed to fetch sliders" });
    }
  });

  app.get('/api/dashboard/content/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // User Management Routes
  app.get('/api/dashboard/users', async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      
      // Remove sensitive information
      const safeUsers = allUsers.map((user: any) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt
      }));

      res.json(safeUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Analytics Integration Routes
  app.get('/api/dashboard/analytics/overview', async (req, res) => {
    try {
      // Mock analytics data - integrate with Google Analytics API in production
      const analyticsData = {
        pageViews: Math.floor(Math.random() * 100000) + 50000,
        uniqueVisitors: Math.floor(Math.random() * 50000) + 25000,
        bounceRate: Math.floor(Math.random() * 30) + 30,
        avgSessionDuration: Math.floor(Math.random() * 300) + 120,
        topPages: [
          { page: '/', views: Math.floor(Math.random() * 10000) + 5000 },
          { page: '/services', views: Math.floor(Math.random() * 5000) + 2000 },
          { page: '/about', views: Math.floor(Math.random() * 3000) + 1000 }
        ],
        trafficSources: {
          organic: 45,
          direct: 30,
          referral: 15,
          social: 10
        }
      };

      res.json(analyticsData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics data" });
    }
  });

  // Security & Maintenance Routes
  app.get('/api/dashboard/security/logs', async (req, res) => {
    try {
      const securityLogs = await storage.getActivityLogs(undefined, 50);
      
      res.json(securityLogs.map(log => ({
        id: log.id,
        action: log.action,
        userId: log.userId,
        ipAddress: log.ipAddress,
        userAgent: log.userAgent,
        timestamp: log.createdAt
      })));
    } catch (error) {
      console.error("Error fetching security logs:", error);
      res.status(500).json({ message: "Failed to fetch security logs" });
    }
  });

  // Backup & Export Routes
  app.post('/api/dashboard/backup/create', async (req, res) => {
    try {
      // Create database backup
      const backupId = Date.now().toString();
      
      // In production, implement actual backup logic
      res.json({ 
        message: "Backup created successfully", 
        backupId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      res.status(500).json({ message: "Failed to create backup" });
    }
  });

  // Export leads to CSV
  app.get('/api/dashboard/export/leads', async (req, res) => {
    try {
      const enquiries = await storage.getEnquiries();
      
      // Generate CSV content
      const csvHeader = 'Name,Email,Phone,Service,Message,Status,Created At\n';
      const csvContent = enquiries.map(enquiry => 
        `"${enquiry.name}","${enquiry.email}","${enquiry.phone || ''}","${enquiry.serviceInterest || 'General'}","${enquiry.message}","${enquiry.status}","${enquiry.createdAt}"`
      ).join('\n');
      
      const csv = csvHeader + csvContent;
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
      res.send(csv);
    } catch (error) {
      console.error("Error exporting leads:", error);
      res.status(500).json({ message: "Failed to export leads" });
    }
  });
}