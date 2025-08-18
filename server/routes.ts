import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupSimpleAuth, isAuthenticated } from "./simple-auth";
import { registerCMSRoutes } from "./routes/cms";
import { registerPerformanceRoutes } from "./routes/performance";
import { registerDashboardRoutes } from "./routes/dashboard";
import { registerUserRoutes } from "./routes/users";
import { 
  insertServiceCategorySchema,
  insertServiceSchema,
  insertFeatureSchema,
  insertProjectSchema,
  insertEnquirySchema,
  insertSiteSettingSchema,
  insertPageComponentSchema,
  insertSliderSchema,
  insertTestimonialSchema,
  insertBlogPostSchema,
  insertFaqSchema,
  insertTeamMemberSchema,
  insertRedirectSchema,
  insertEmailTemplateSchema,
  insertAnalyticsEventSchema,
  insertMenuItemSchema,
  insertPricingPlanSchema,
  insertActivityLogSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  setupSimpleAuth(app);

  // Register CMS administration routes
  registerCMSRoutes(app);

  // Register performance dashboard routes  
  registerPerformanceRoutes(app);

  // Register comprehensive dashboard routes
  registerDashboardRoutes(app);

  // Register user management routes
  registerUserRoutes(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public API routes

  // Service Categories
  app.get('/api/service-categories', async (req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching service categories:", error);
      res.status(500).json({ message: "Failed to fetch service categories" });
    }
  });

  app.get('/api/service-categories/:slug', async (req, res) => {
    try {
      const category = await storage.getServiceCategory(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Service category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching service category:", error);
      res.status(500).json({ message: "Failed to fetch service category" });
    }
  });

  // Services
  app.get('/api/services', async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const services = await storage.getServices(categoryId);
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get('/api/services/:categorySlug/:serviceSlug', async (req, res) => {
    try {
      const service = await storage.getService(req.params.categorySlug, req.params.serviceSlug);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Features
  app.get('/api/features', async (req, res) => {
    try {
      const serviceId = req.query.serviceId ? parseInt(req.query.serviceId as string) : undefined;
      const features = await storage.getFeatures(serviceId);
      res.json(features);
    } catch (error) {
      console.error("Error fetching features:", error);
      res.status(500).json({ message: "Failed to fetch features" });
    }
  });

  app.get('/api/features/:categorySlug/:serviceSlug/:featureSlug', async (req, res) => {
    try {
      const feature = await storage.getFeature(
        req.params.categorySlug,
        req.params.serviceSlug,
        req.params.featureSlug
      );
      if (!feature) {
        return res.status(404).json({ message: "Feature not found" });
      }
      res.json(feature);
    } catch (error) {
      console.error("Error fetching feature:", error);
      res.status(500).json({ message: "Failed to fetch feature" });
    }
  });

  // Projects
  app.get('/api/projects', async (req, res) => {
    try {
      const featured = req.query.featured === 'true' ? true : req.query.featured === 'false' ? false : undefined;
      const projects = await storage.getProjects(featured);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:slug', async (req, res) => {
    try {
      const project = await storage.getProject(req.params.slug);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const enquiryData = insertEnquirySchema.parse(req.body);
      const enquiry = await storage.createEnquiry(enquiryData);
      
      // TODO: Send email notification
      
      res.status(201).json({ message: "Enquiry submitted successfully", id: enquiry.id });
    } catch (error) {
      console.error("Error creating enquiry:", error);
      res.status(500).json({ message: "Failed to submit enquiry" });
    }
  });

  // Admin API routes (protected)
  
  // Admin Service Categories
  app.post('/api/admin/service-categories', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const categoryData = insertServiceCategorySchema.parse(req.body);
      const category = await storage.createServiceCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating service category:", error);
      res.status(500).json({ message: "Failed to create service category" });
    }
  });

  app.put('/api/admin/service-categories/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      const categoryData = insertServiceCategorySchema.partial().parse(req.body);
      const category = await storage.updateServiceCategory(id, categoryData);
      res.json(category);
    } catch (error) {
      console.error("Error updating service category:", error);
      res.status(500).json({ message: "Failed to update service category" });
    }
  });

  app.delete('/api/admin/service-categories/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      await storage.deleteServiceCategory(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service category:", error);
      res.status(500).json({ message: "Failed to delete service category" });
    }
  });

  // Admin Services
  app.get('/api/admin/services', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.post('/api/admin/services', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  app.put('/api/admin/services/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      const serviceData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, serviceData);
      res.json(service);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  app.delete('/api/admin/services/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      await storage.deleteService(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Admin Features
  app.get('/api/admin/features', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const features = await storage.getFeatures();
      res.json(features);
    } catch (error) {
      console.error("Error fetching features:", error);
      res.status(500).json({ message: "Failed to fetch features" });
    }
  });

  app.post('/api/admin/features', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const featureData = insertFeatureSchema.parse(req.body);
      const feature = await storage.createFeature(featureData);
      res.status(201).json(feature);
    } catch (error) {
      console.error("Error creating feature:", error);
      res.status(500).json({ message: "Failed to create feature" });
    }
  });

  app.put('/api/admin/features/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      const featureData = insertFeatureSchema.partial().parse(req.body);
      const feature = await storage.updateFeature(id, featureData);
      res.json(feature);
    } catch (error) {
      console.error("Error updating feature:", error);
      res.status(500).json({ message: "Failed to update feature" });
    }
  });

  app.delete('/api/admin/features/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      await storage.deleteFeature(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting feature:", error);
      res.status(500).json({ message: "Failed to delete feature" });
    }
  });

  // Admin Projects
  app.get('/api/admin/projects', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post('/api/admin/projects', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.put('/api/admin/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, projectData);
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete('/api/admin/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      await storage.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Admin Enquiries
  app.get('/api/admin/enquiries', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const status = req.query.status as string | undefined;
      const enquiries = await storage.getEnquiries(status);
      res.json(enquiries);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      res.status(500).json({ message: "Failed to fetch enquiries" });
    }
  });

  app.put('/api/admin/enquiries/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      const enquiryData = req.body;
      const enquiry = await storage.updateEnquiry(id, enquiryData);
      res.json(enquiry);
    } catch (error) {
      console.error("Error updating enquiry:", error);
      res.status(500).json({ message: "Failed to update enquiry" });
    }
  });

  // Sitemap Routes
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.replit.app' 
        : `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}`;

      // Static pages
      const staticUrls = [
        { loc: `${baseUrl}/`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '1.0' },
        { loc: `${baseUrl}/services`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.9' },
        { loc: `${baseUrl}/projects`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
        { loc: `${baseUrl}/industries`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
        { loc: `${baseUrl}/about`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
        { loc: `${baseUrl}/contact`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
        { loc: `${baseUrl}/faq`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.6' },
        { loc: `${baseUrl}/pricing`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
        { loc: `${baseUrl}/blog`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.8' },
        { loc: `${baseUrl}/careers`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.7' },
        { loc: `${baseUrl}/privacy-policy`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.3' },
        { loc: `${baseUrl}/terms-of-service`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.3' },
      ];

      // Dynamic service pages
      const categories = await storage.getServiceCategories();
      const allServices = await storage.getServices();
      const allFeatures = await storage.getFeatures();
      const allProjects = await storage.getProjects();

      const dynamicUrls = [];

      // Service category pages
      for (const category of categories) {
        dynamicUrls.push({
          loc: `${baseUrl}/services/${category.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: '0.8'
        });
      }

      // Service detail pages
      for (const service of allServices) {
        const category = categories.find(c => c.id === service.categoryId);
        if (category) {
          dynamicUrls.push({
            loc: `${baseUrl}/services/${category.slug}/${service.slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: '0.7'
          });
        }
      }

      // Feature detail pages
      for (const feature of allFeatures) {
        const service = allServices.find(s => s.id === feature.serviceId);
        if (service) {
          const category = categories.find(c => c.id === service.categoryId);
          if (category) {
            dynamicUrls.push({
              loc: `${baseUrl}/services/${category.slug}/${service.slug}/${feature.slug}`,
              lastmod: new Date().toISOString(),
              changefreq: 'monthly',
              priority: '0.6'
            });
          }
        }
      }

      // Project detail pages
      for (const project of allProjects) {
        dynamicUrls.push({
          loc: `${baseUrl}/projects/${project.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: '0.6'
        });
      }

      const allUrls = [...staticUrls, ...dynamicUrls];
      
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      res.set('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error) {
      console.error('Error generating XML sitemap:', error);
      res.status(500).json({ error: 'Failed to generate sitemap' });
    }
  });

  // HTML Sitemap
  app.get('/sitemap', async (req, res) => {
    try {
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.replit.app' 
        : `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}`;

      // Static pages with live status
      const staticPages = [
        { url: '/', title: 'Home', category: 'Core Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/services', title: 'Services', category: 'Core Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/projects', title: 'Projects', category: 'Core Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/industries', title: 'Industries', category: 'Core Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/about', title: 'About Us', category: 'Company Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/contact', title: 'Contact', category: 'Company Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/faq', title: 'FAQ', category: 'Support Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/pricing', title: 'Pricing', category: 'Support Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/blog', title: 'Blog', category: 'Content Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/careers', title: 'Careers', category: 'Company Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/privacy-policy', title: 'Privacy Policy', category: 'Legal Pages', status: 'active', lastUpdated: '2025-01-18' },
        { url: '/terms-of-service', title: 'Terms of Service', category: 'Legal Pages', status: 'active', lastUpdated: '2025-01-18' },
      ];

      // Dynamic pages
      const categories = await storage.getServiceCategories();
      const allServices = await storage.getServices();
      const allFeatures = await storage.getFeatures();
      const allProjects = await storage.getProjects();

      const dynamicPages = [];

      // Service category pages
      for (const category of categories) {
        dynamicPages.push({
          url: `/services/${category.slug}`,
          title: category.name,
          category: 'Service Categories',
          status: 'active',
          lastUpdated: '2025-01-18'
        });
      }

      // Service detail pages
      for (const service of allServices) {
        const category = categories.find(c => c.id === service.categoryId);
        if (category) {
          dynamicPages.push({
            url: `/services/${category.slug}/${service.slug}`,
            title: service.name,
            category: 'Service Details',
            status: 'active',
            lastUpdated: '2025-01-18'
          });
        }
      }

      // Feature detail pages
      for (const feature of allFeatures) {
        const service = allServices.find(s => s.id === feature.serviceId);
        if (service) {
          const category = categories.find(c => c.id === service.categoryId);
          if (category) {
            dynamicPages.push({
              url: `/services/${category.slug}/${service.slug}/${feature.slug}`,
              title: feature.name,
              category: 'Feature Details',
              status: 'active',
              lastUpdated: '2025-01-18'
            });
          }
        }
      }

      // Project detail pages
      for (const project of allProjects) {
        dynamicPages.push({
          url: `/projects/${project.slug}`,
          title: project.title,
          category: 'Project Showcases',
          status: 'active',
          lastUpdated: '2025-01-18'
        });
      }

      const allPages = [...staticPages, ...dynamicPages].map(page => ({
        ...page,
        url: `${baseUrl}${page.url}`
      }));

      // Group pages by category
      const groupedUrls = allPages.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {} as Record<string, typeof allPages>);

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet Sitemap - Complete Site Structure</title>
    <meta name="description" content="Complete sitemap of IeNet's IT services platform with all pages, services, and resources.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6; 
            color: #333; 
            background: #f8fafc;
            padding: 2rem;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { 
            color: #1e40af; 
            margin-bottom: 2rem; 
            font-size: 2.5rem;
            text-align: center;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 1rem;
        }
        h2 { 
            color: #1e40af; 
            margin: 2rem 0 1rem 0; 
            font-size: 1.5rem;
            background: linear-gradient(135deg, #3b82f6, #1e40af);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .sitemap-section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
        }
        .url-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        .url-item {
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1rem;
            transition: all 0.3s ease;
            position: relative;
        }
        .url-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
            border-color: #3b82f6;
        }
        .url-item a {
            color: #1e40af;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            display: block;
            margin-bottom: 0.5rem;
        }
        .url-item a:hover {
            color: #3b82f6;
            text-decoration: underline;
        }
        .url-meta {
            font-size: 0.875rem;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.5rem;
        }
        .status {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        .status.active {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 3rem;
        }
        .stat-card {
            background: linear-gradient(135deg, #3b82f6, #1e40af);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            display: block;
        }
        .stat-label {
            font-size: 1rem;
            opacity: 0.9;
        }
        .last-updated {
            text-align: center;
            color: #64748b;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
            font-size: 0.875rem;
        }
        @media (max-width: 768px) {
            body { padding: 1rem; }
            h1 { font-size: 2rem; }
            .url-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>IeNet Complete Sitemap</h1>
        
        <div class="stats">
            <div class="stat-card">
                <span class="stat-number">${allPages.length}</span>
                <span class="stat-label">Total Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${allPages.filter(u => u.status === 'active').length}</span>
                <span class="stat-label">Active Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${Object.keys(groupedUrls).length}</span>
                <span class="stat-label">Categories</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${new Date().toLocaleDateString()}</span>
                <span class="stat-label">Last Updated</span>
            </div>
        </div>

        ${Object.entries(groupedUrls).map(([category, categoryUrls]) => `
        <div class="sitemap-section">
            <h2>${category}</h2>
            <div class="url-grid">
                ${categoryUrls.map(item => `
                <div class="url-item">
                    <a href="${item.url}" target="_blank">${item.title}</a>
                    <div class="url-meta">
                        <span>Updated: ${item.lastUpdated}</span>
                        <span class="status ${item.status}">${item.status}</span>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        `).join('')}

        <div class="last-updated">
            <p>Sitemap generated on ${new Date().toLocaleString()}</p>
            <p>For technical support, contact <a href="mailto:support@ienet.com">support@ienet.com</a></p>
        </div>
    </div>
</body>
</html>`;

      res.set('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      console.error('Error generating HTML sitemap:', error);
      res.status(500).json({ error: 'Failed to generate sitemap' });
    }
  });

  // Sitemap status endpoint
  app.get('/api/sitemap/status', async (req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      const allServices = await storage.getServices();
      const allFeatures = await storage.getFeatures();
      const allProjects = await storage.getProjects();

      const stats = {
        totalPages: 12 + categories.length + allServices.length + allFeatures.length + allProjects.length,
        staticPages: 12,
        serviceCategories: categories.length,
        serviceDetails: allServices.length,
        featureDetails: allFeatures.length,
        projectPages: allProjects.length,
        lastGenerated: new Date().toISOString(),
        status: 'active'
      };

      res.json(stats);
    } catch (error) {
      console.error('Error getting sitemap status:', error);
      res.status(500).json({ error: 'Failed to get sitemap status' });
    }
  });

  // Sitemap status dashboard - HTML view
  app.get('/sitemap-status', async (req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      const allServices = await storage.getServices();
      const allFeatures = await storage.getFeatures();
      const allProjects = await storage.getProjects();

      const stats = {
        totalPages: 12 + categories.length + allServices.length + allFeatures.length + allProjects.length,
        staticPages: 12,
        serviceCategories: categories.length,
        serviceDetails: allServices.length,
        featureDetails: allFeatures.length,
        projectPages: allProjects.length,
        lastGenerated: new Date().toISOString(),
        status: 'active'
      };

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet Sitemap Status Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        .container { 
            max-width: 1000px; 
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            padding: 3rem 2rem;
        }
        .stat-card {
            text-align: center;
            padding: 2rem;
            border-radius: 15px;
            background: linear-gradient(135deg, #f7fafc, #edf2f7);
            border: 2px solid #e2e8f0;
            transition: transform 0.3s ease;
        }
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            color: #2d3748;
            margin-bottom: 0.5rem;
            display: block;
        }
        .stat-label {
            font-size: 1.1rem;
            color: #4a5568;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-info {
            background: #f0fff4;
            border: 2px solid #68d391;
            border-radius: 15px;
            padding: 2rem;
            margin: 2rem;
            text-align: center;
        }
        .status-badge {
            display: inline-block;
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 1rem;
        }
        .timestamp {
            color: #718096;
            font-size: 0.9rem;
        }
        .actions {
            padding: 2rem;
            text-align: center;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            margin: 0 1rem;
            transition: all 0.3s ease;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(66, 153, 225, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌐 IeNet Sitemap Status</h1>
            <p>Complete Platform Overview & Statistics</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number">${stats.totalPages}</span>
                <span class="stat-label">Total Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.staticPages}</span>
                <span class="stat-label">Static Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.serviceCategories}</span>
                <span class="stat-label">Service Categories</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.serviceDetails}</span>
                <span class="stat-label">Service Details</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.featureDetails}</span>
                <span class="stat-label">Feature Details</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.projectPages}</span>
                <span class="stat-label">Project Pages</span>
            </div>
        </div>

        <div class="status-info">
            <div class="status-badge">${stats.status.toUpperCase()}</div>
            <p class="timestamp">Last Generated: ${new Date(stats.lastGenerated).toLocaleString()}</p>
        </div>

        <div class="actions">
            <a href="/sitemap" class="btn">View HTML Sitemap</a>
            <a href="/sitemap.xml" class="btn">View XML Sitemap</a>
            <a href="/api/sitemap/status" class="btn">JSON API</a>
        </div>
    </div>
</body>
</html>`;

      res.set('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    } catch (error) {
      console.error('Error getting sitemap status dashboard:', error);
      res.status(500).json({ error: 'Failed to get sitemap status dashboard' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
