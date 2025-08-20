import type { Express } from "express";
import { storage } from "../storage";
import { isAuthenticated } from "../replitAuth";
import { 
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
  insertPricingPlanSchema
} from "@shared/schema";

export function registerCMSRoutes(app: Express) {
  
  // ============ CMS ADMINISTRATION ROUTES ============

  // Page Components API
  app.get('/api/page-components', async (req, res) => {
    try {
      const { pageType, pageId } = req.query;
      const components = await storage.getPageComponents(pageType as string, pageId as string);
      res.json(components);
    } catch (error) {
      console.error("Error fetching page components:", error);
      res.status(500).json({ message: "Failed to fetch page components" });
    }
  });

  app.post('/api/admin/page-components', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const componentData = insertPageComponentSchema.parse(req.body);
      const component = await storage.createPageComponent(componentData);
      
      // Log activity
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_PAGE_COMPONENT',
        resourceType: 'page_component',
        resourceId: component.id.toString(),
        newValues: componentData,
      });

      res.status(201).json(component);
    } catch (error) {
      console.error("Error creating page component:", error);
      res.status(500).json({ message: "Failed to create page component" });
    }
  });

  app.put('/api/admin/page-components/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      const oldComponent = await storage.getPageComponent(id);
      const componentData = insertPageComponentSchema.partial().parse(req.body);
      const component = await storage.updatePageComponent(id, componentData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'UPDATE_PAGE_COMPONENT',
        resourceType: 'page_component',
        resourceId: id.toString(),
        oldValues: oldComponent,
        newValues: componentData,
      });

      res.json(component);
    } catch (error) {
      console.error("Error updating page component:", error);
      res.status(500).json({ message: "Failed to update page component" });
    }
  });

  app.delete('/api/admin/page-components/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      await storage.deletePageComponent(id);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'DELETE_PAGE_COMPONENT',
        resourceType: 'page_component',
        resourceId: id.toString(),
      });

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting page component:", error);
      res.status(500).json({ message: "Failed to delete page component" });
    }
  });

  // Sliders API
  app.get('/api/sliders', async (req, res) => {
    try {
      const sliders = await storage.getSliders();
      res.json(sliders);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      res.status(500).json({ message: "Failed to fetch sliders" });
    }
  });

  app.post('/api/admin/sliders', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const sliderData = insertSliderSchema.parse(req.body);
      const slider = await storage.createSlider(sliderData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_SLIDER',
        resourceType: 'slider',
        resourceId: slider.id.toString(),
        newValues: sliderData,
      });

      res.status(201).json(slider);
    } catch (error) {
      console.error("Error creating slider:", error);
      res.status(500).json({ message: "Failed to create slider" });
    }
  });

  app.put('/api/admin/sliders/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      const sliderData = insertSliderSchema.partial().parse(req.body);
      const slider = await storage.updateSlider(id, sliderData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'UPDATE_SLIDER',
        resourceType: 'slider',
        resourceId: id.toString(),
        newValues: sliderData,
      });

      res.json(slider);
    } catch (error) {
      console.error("Error updating slider:", error);
      res.status(500).json({ message: "Failed to update slider" });
    }
  });

  app.delete('/api/admin/sliders/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      await storage.deleteSlider(id);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'DELETE_SLIDER',
        resourceType: 'slider',
        resourceId: id.toString(),
      });

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting slider:", error);
      res.status(500).json({ message: "Failed to delete slider" });
    }
  });

  // Testimonials API
  app.get('/api/testimonials', async (req, res) => {
    try {
      const featured = req.query.featured === 'true' ? true : req.query.featured === 'false' ? false : undefined;
      const testimonials = await storage.getTestimonials(featured);
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post('/api/admin/testimonials', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_TESTIMONIAL',
        resourceType: 'testimonial',
        resourceId: testimonial.id.toString(),
        newValues: testimonialData,
      });

      res.status(201).json(testimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.put('/api/admin/testimonials/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      const testimonialData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(id, testimonialData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'UPDATE_TESTIMONIAL',
        resourceType: 'testimonial',
        resourceId: id.toString(),
        newValues: testimonialData,
      });

      res.json(testimonial);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete('/api/admin/testimonials/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      await storage.deleteTestimonial(id);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'DELETE_TESTIMONIAL',
        resourceType: 'testimonial',
        resourceId: id.toString(),
      });

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Blog Posts API
  app.get('/api/blog-posts', async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined;
      const posts = await storage.getBlogPosts(published);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get('/api/blog-posts/:slug', async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post('/api/admin/blog-posts', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const postData = insertBlogPostSchema.parse({...req.body, authorId: user.id});
      const post = await storage.createBlogPost(postData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_BLOG_POST',
        resourceType: 'blog_post',
        resourceId: post.id.toString(),
        newValues: postData,
      });

      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.put('/api/admin/blog-posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      const postData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, postData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'UPDATE_BLOG_POST',
        resourceType: 'blog_post',
        resourceId: id.toString(),
        newValues: postData,
      });

      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete('/api/admin/blog-posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'DELETE_BLOG_POST',
        resourceType: 'blog_post',
        resourceId: id.toString(),
      });

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // FAQs API
  app.get('/api/faqs', async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const faqs = await storage.getFaqs(category);
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  app.post('/api/admin/faqs', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const faqData = insertFaqSchema.parse(req.body);
      const faq = await storage.createFaq(faqData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_FAQ',
        resourceType: 'faq',
        resourceId: faq.id.toString(),
        newValues: faqData,
      });

      res.status(201).json(faq);
    } catch (error) {
      console.error("Error creating FAQ:", error);
      res.status(500).json({ message: "Failed to create FAQ" });
    }
  });

  // Team Members API
  app.get('/api/team-members', async (req, res) => {
    try {
      const members = await storage.getTeamMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.post('/api/admin/team-members', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const memberData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(memberData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_TEAM_MEMBER',
        resourceType: 'team_member',
        resourceId: member.id.toString(),
        newValues: memberData,
      });

      res.status(201).json(member);
    } catch (error) {
      console.error("Error creating team member:", error);
      res.status(500).json({ message: "Failed to create team member" });
    }
  });

  // Menu Items API
  app.get('/api/menu-items', async (req, res) => {
    try {
      const location = req.query.location as string | undefined;
      const items = await storage.getMenuItems(location);
      res.json(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.post('/api/admin/menu-items', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const itemData = insertMenuItemSchema.parse(req.body);
      const item = await storage.createMenuItem(itemData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_MENU_ITEM',
        resourceType: 'menu_item',
        resourceId: item.id.toString(),
        newValues: itemData,
      });

      res.status(201).json(item);
    } catch (error) {
      console.error("Error creating menu item:", error);
      res.status(500).json({ message: "Failed to create menu item" });
    }
  });

  // Pricing Plans API
  app.get('/api/pricing-plans', async (req, res) => {
    try {
      const plans = await storage.getPricingPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching pricing plans:", error);
      res.status(500).json({ message: "Failed to fetch pricing plans" });
    }
  });

  app.post('/api/admin/pricing-plans', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const planData = insertPricingPlanSchema.parse(req.body);
      const plan = await storage.createPricingPlan(planData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_PRICING_PLAN',
        resourceType: 'pricing_plan',
        resourceId: plan.id.toString(),
        newValues: planData,
      });

      res.status(201).json(plan);
    } catch (error) {
      console.error("Error creating pricing plan:", error);
      res.status(500).json({ message: "Failed to create pricing plan" });
    }
  });

  // Analytics API
  app.post('/api/analytics/track', async (req, res) => {
    try {
      const eventData = insertAnalyticsEventSchema.parse({
        ...req.body,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });
      
      const event = await storage.createAnalyticsEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      console.error("Error tracking analytics:", error);
      res.status(500).json({ message: "Failed to track analytics" });
    }
  });

  app.get('/api/admin/analytics', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const eventType = req.query.eventType as string | undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const events = await storage.getAnalyticsEvents(eventType, limit);
      res.json(events);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Activity Logs API
  app.get('/api/admin/activity-logs', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const userId = req.query.userId as string | undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const logs = await storage.getActivityLogs(userId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  // Email Templates API
  app.get('/api/admin/email-templates', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const templates = await storage.getEmailTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching email templates:", error);
      res.status(500).json({ message: "Failed to fetch email templates" });
    }
  });

  app.post('/api/admin/email-templates', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const templateData = insertEmailTemplateSchema.parse(req.body);
      const template = await storage.createEmailTemplate(templateData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_EMAIL_TEMPLATE',
        resourceType: 'email_template',
        resourceId: template.id.toString(),
        newValues: templateData,
      });

      res.status(201).json(template);
    } catch (error) {
      console.error("Error creating email template:", error);
      res.status(500).json({ message: "Failed to create email template" });
    }
  });

  // Redirects API
  app.get('/api/admin/redirects', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const redirects = await storage.getRedirects();
      res.json(redirects);
    } catch (error) {
      console.error("Error fetching redirects:", error);
      res.status(500).json({ message: "Failed to fetch redirects" });
    }
  });

  app.post('/api/admin/redirects', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const redirectData = insertRedirectSchema.parse(req.body);
      const redirect = await storage.createRedirect(redirectData);
      
      await storage.createActivityLog({
        userId: user.id,
        action: 'CREATE_REDIRECT',
        resourceType: 'redirect',
        resourceId: redirect.id.toString(),
        newValues: redirectData,
      });

      res.status(201).json(redirect);
    } catch (error) {
      console.error("Error creating redirect:", error);
      res.status(500).json({ message: "Failed to create redirect" });
    }
  });
}