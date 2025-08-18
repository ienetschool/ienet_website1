import {
  users,
  serviceCategories,
  services,
  features,
  projects,
  enquiries,
  siteSettings,
  pageComponents,
  sliders,
  testimonials,
  blogPosts,
  faqs,
  teamMembers,
  redirects,
  emailTemplates,
  analyticsEvents,
  menuItems,
  pricingPlans,
  activityLogs,
  type User,
  type UpsertUser,
  type ServiceCategory,
  type InsertServiceCategory,
  type Service,
  type InsertService,
  type Feature,
  type InsertFeature,
  type Project,
  type InsertProject,
  type Enquiry,
  type InsertEnquiry,
  type SiteSetting,
  type InsertSiteSetting,
  type PageComponent,
  type InsertPageComponent,
  type Slider,
  type InsertSlider,
  type Testimonial,
  type InsertTestimonial,
  type BlogPost,
  type InsertBlogPost,
  type Faq,
  type InsertFaq,
  type TeamMember,
  type InsertTeamMember,
  type Redirect,
  type InsertRedirect,
  type EmailTemplate,
  type InsertEmailTemplate,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  type MenuItem,
  type InsertMenuItem,
  type PricingPlan,
  type InsertPricingPlan,
  type ActivityLog,
  type InsertActivityLog,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, like, sql, or } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Service Category operations
  getServiceCategories(): Promise<ServiceCategory[]>;
  getServiceCategory(slug: string): Promise<ServiceCategory | undefined>;
  createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory>;
  updateServiceCategory(id: number, category: Partial<InsertServiceCategory>): Promise<ServiceCategory>;
  deleteServiceCategory(id: number): Promise<void>;

  // Service operations
  getServices(categoryId?: number): Promise<Service[]>;
  getService(categorySlug: string, serviceSlug: string): Promise<Service | undefined>;
  getServiceById(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;

  // Feature operations
  getFeatures(serviceId?: number): Promise<Feature[]>;
  getFeature(categorySlug: string, serviceSlug: string, featureSlug: string): Promise<Feature | undefined>;
  getFeatureById(id: number): Promise<Feature | undefined>;
  createFeature(feature: InsertFeature): Promise<Feature>;
  updateFeature(id: number, feature: Partial<InsertFeature>): Promise<Feature>;
  deleteFeature(id: number): Promise<void>;

  // Project operations
  getProjects(featured?: boolean): Promise<Project[]>;
  getProject(slug: string): Promise<Project | undefined>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Enquiry operations
  getEnquiries(status?: string): Promise<Enquiry[]>;
  getEnquiry(id: number): Promise<Enquiry | undefined>;
  createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry>;
  updateEnquiry(id: number, enquiry: Partial<Enquiry>): Promise<Enquiry>;
  deleteEnquiry(id: number): Promise<void>;

  // Site settings operations
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  upsertSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
  deleteSiteSetting(key: string): Promise<void>;

  // Page component operations
  getPageComponents(pageType?: string, pageId?: string): Promise<PageComponent[]>;
  getPageComponent(id: number): Promise<PageComponent | undefined>;
  createPageComponent(component: InsertPageComponent): Promise<PageComponent>;
  updatePageComponent(id: number, component: Partial<InsertPageComponent>): Promise<PageComponent>;
  deletePageComponent(id: number): Promise<void>;

  // Slider operations
  getSliders(): Promise<Slider[]>;
  getSlider(id: number): Promise<Slider | undefined>;
  createSlider(slider: InsertSlider): Promise<Slider>;
  updateSlider(id: number, slider: Partial<InsertSlider>): Promise<Slider>;
  deleteSlider(id: number): Promise<void>;

  // Testimonial operations
  getTestimonials(featured?: boolean): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;

  // Blog post operations
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // FAQ operations
  getFaqs(category?: string): Promise<Faq[]>;
  getFaq(id: number): Promise<Faq | undefined>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  updateFaq(id: number, faq: Partial<InsertFaq>): Promise<Faq>;
  deleteFaq(id: number): Promise<void>;

  // Team member operations
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: number): Promise<void>;

  // Redirect operations
  getRedirects(): Promise<Redirect[]>;
  getRedirect(fromUrl: string): Promise<Redirect | undefined>;
  createRedirect(redirect: InsertRedirect): Promise<Redirect>;
  updateRedirect(id: number, redirect: Partial<InsertRedirect>): Promise<Redirect>;
  deleteRedirect(id: number): Promise<void>;

  // Email template operations
  getEmailTemplates(): Promise<EmailTemplate[]>;
  getEmailTemplate(templateType: string): Promise<EmailTemplate | undefined>;
  createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate>;
  updateEmailTemplate(id: number, template: Partial<InsertEmailTemplate>): Promise<EmailTemplate>;
  deleteEmailTemplate(id: number): Promise<void>;

  // Analytics operations
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(eventType?: string, limit?: number): Promise<AnalyticsEvent[]>;
  
  // Menu item operations
  getMenuItems(location?: string): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: number): Promise<void>;

  // Pricing plan operations
  getPricingPlans(): Promise<PricingPlan[]>;
  getPricingPlan(id: number): Promise<PricingPlan | undefined>;
  createPricingPlan(plan: InsertPricingPlan): Promise<PricingPlan>;
  updatePricingPlan(id: number, plan: Partial<InsertPricingPlan>): Promise<PricingPlan>;
  deletePricingPlan(id: number): Promise<void>;

  // Activity log operations
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getActivityLogs(userId?: string, limit?: number): Promise<ActivityLog[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Service Category operations
  async getServiceCategories(): Promise<ServiceCategory[]> {
    return await db
      .select()
      .from(serviceCategories)
      .where(eq(serviceCategories.isActive, true))
      .orderBy(asc(serviceCategories.sortOrder), asc(serviceCategories.name));
  }

  async getServiceCategory(slug: string): Promise<ServiceCategory | undefined> {
    const [category] = await db
      .select()
      .from(serviceCategories)
      .where(and(eq(serviceCategories.slug, slug), eq(serviceCategories.isActive, true)));
    return category;
  }

  async createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory> {
    const [newCategory] = await db
      .insert(serviceCategories)
      .values(category)
      .returning();
    return newCategory;
  }

  async updateServiceCategory(id: number, category: Partial<InsertServiceCategory>): Promise<ServiceCategory> {
    const [updatedCategory] = await db
      .update(serviceCategories)
      .set({ ...category, updatedAt: new Date() })
      .where(eq(serviceCategories.id, id))
      .returning();
    return updatedCategory;
  }

  async deleteServiceCategory(id: number): Promise<void> {
    await db.delete(serviceCategories).where(eq(serviceCategories.id, id));
  }

  // Service operations
  async getServices(categoryId?: number): Promise<Service[]> {
    if (categoryId) {
      return await db
        .select()
        .from(services)
        .where(and(eq(services.isActive, true), eq(services.categoryId, categoryId)))
        .orderBy(asc(services.sortOrder), asc(services.name));
    }
    
    return await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(asc(services.sortOrder), asc(services.name));
  }

  async getService(categorySlug: string, serviceSlug: string): Promise<Service | undefined> {
    const [service] = await db
      .select()
      .from(services)
      .innerJoin(serviceCategories, eq(services.categoryId, serviceCategories.id))
      .where(
        and(
          eq(serviceCategories.slug, categorySlug),
          eq(services.slug, serviceSlug),
          eq(services.isActive, true),
          eq(serviceCategories.isActive, true)
        )
      );
    return service?.services;
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const [updatedService] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Feature operations
  async getFeatures(serviceId?: number): Promise<Feature[]> {
    if (serviceId) {
      return await db
        .select()
        .from(features)
        .where(and(eq(features.isActive, true), eq(features.serviceId, serviceId)))
        .orderBy(asc(features.sortOrder), asc(features.name));
    }
    
    return await db
      .select()
      .from(features)
      .where(eq(features.isActive, true))
      .orderBy(asc(features.sortOrder), asc(features.name));
  }

  async getFeature(categorySlug: string, serviceSlug: string, featureSlug: string): Promise<Feature | undefined> {
    try {
      const [result] = await db
        .select({
          id: features.id,
          serviceId: features.serviceId,
          name: features.name,
          slug: features.slug,
          description: features.description,
          metaTitle: features.metaTitle,
          metaDescription: features.metaDescription,
          content: features.content,
          technicalDetails: features.technicalDetails,
          benefits: features.benefits,
          isActive: features.isActive,
          sortOrder: features.sortOrder,
          createdAt: features.createdAt,
          updatedAt: features.updatedAt
        })
        .from(features)
        .innerJoin(services, eq(features.serviceId, services.id))
        .innerJoin(serviceCategories, eq(services.categoryId, serviceCategories.id))
        .where(
          and(
            eq(serviceCategories.slug, categorySlug),
            eq(services.slug, serviceSlug),
            eq(features.slug, featureSlug),
            eq(features.isActive, true),
            eq(services.isActive, true),
            eq(serviceCategories.isActive, true)
          )
        );
      return result;
    } catch (error) {
      console.error('Error in getFeature:', error);
      return undefined;
    }
  }

  async getFeatureById(id: number): Promise<Feature | undefined> {
    const [feature] = await db.select().from(features).where(eq(features.id, id));
    return feature;
  }

  async createFeature(feature: InsertFeature): Promise<Feature> {
    const [newFeature] = await db.insert(features).values(feature).returning();
    return newFeature;
  }

  async updateFeature(id: number, feature: Partial<InsertFeature>): Promise<Feature> {
    const [updatedFeature] = await db
      .update(features)
      .set({ ...feature, updatedAt: new Date() })
      .where(eq(features.id, id))
      .returning();
    return updatedFeature;
  }

  async deleteFeature(id: number): Promise<void> {
    await db.delete(features).where(eq(features.id, id));
  }

  // Project operations
  async getProjects(featured?: boolean): Promise<Project[]> {
    if (featured !== undefined) {
      return await db
        .select()
        .from(projects)
        .where(and(eq(projects.isActive, true), eq(projects.isFeatured, featured)))
        .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
    }
    
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isActive, true))
      .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }

  async getProject(slug: string): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.isActive, true)));
    return project;
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Enquiry operations
  async getEnquiries(status?: string): Promise<Enquiry[]> {
    if (status) {
      return await db
        .select()
        .from(enquiries)
        .where(eq(enquiries.status, status))
        .orderBy(desc(enquiries.createdAt));
    }
    
    return await db
      .select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt));
  }

  async getEnquiry(id: number): Promise<Enquiry | undefined> {
    const [enquiry] = await db.select().from(enquiries).where(eq(enquiries.id, id));
    return enquiry;
  }

  async createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry> {
    const [newEnquiry] = await db.insert(enquiries).values(enquiry).returning();
    return newEnquiry;
  }

  async updateEnquiry(id: number, enquiry: Partial<Enquiry>): Promise<Enquiry> {
    const [updatedEnquiry] = await db
      .update(enquiries)
      .set({ ...enquiry, updatedAt: new Date() })
      .where(eq(enquiries.id, id))
      .returning();
    return updatedEnquiry;
  }

  async deleteEnquiry(id: number): Promise<void> {
    await db.delete(enquiries).where(eq(enquiries.id, id));
  }

  // Site settings operations
  async getSiteSettings(): Promise<SiteSetting[]> {
    return await db.select().from(siteSettings).orderBy(asc(siteSettings.key));
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting;
  }

  async upsertSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting> {
    const [upsertedSetting] = await db
      .insert(siteSettings)
      .values(setting)
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          ...setting,
          updatedAt: new Date(),
        },
      })
      .returning();
    return upsertedSetting;
  }

  async deleteSiteSetting(key: string): Promise<void> {
    await db.delete(siteSettings).where(eq(siteSettings.key, key));
  }

  // Page component operations
  async getPageComponents(pageType?: string, pageId?: string): Promise<PageComponent[]> {
    let query = db.select().from(pageComponents).where(eq(pageComponents.isActive, true));
    
    if (pageType) {
      query = query.where(eq(pageComponents.pageType, pageType));
    }
    if (pageId) {
      query = query.where(eq(pageComponents.pageId, pageId));
    }
    
    return await query.orderBy(asc(pageComponents.sortOrder));
  }

  async getPageComponent(id: number): Promise<PageComponent | undefined> {
    const [component] = await db.select().from(pageComponents).where(eq(pageComponents.id, id));
    return component;
  }

  async createPageComponent(component: InsertPageComponent): Promise<PageComponent> {
    const [newComponent] = await db.insert(pageComponents).values(component).returning();
    return newComponent;
  }

  async updatePageComponent(id: number, component: Partial<InsertPageComponent>): Promise<PageComponent> {
    const [updatedComponent] = await db
      .update(pageComponents)
      .set({ ...component, updatedAt: new Date() })
      .where(eq(pageComponents.id, id))
      .returning();
    return updatedComponent;
  }

  async deletePageComponent(id: number): Promise<void> {
    await db.delete(pageComponents).where(eq(pageComponents.id, id));
  }

  // Slider operations
  async getSliders(): Promise<Slider[]> {
    return await db
      .select()
      .from(sliders)
      .where(eq(sliders.isActive, true))
      .orderBy(asc(sliders.sortOrder));
  }

  async getSlider(id: number): Promise<Slider | undefined> {
    const [slider] = await db.select().from(sliders).where(eq(sliders.id, id));
    return slider;
  }

  async createSlider(slider: InsertSlider): Promise<Slider> {
    const [newSlider] = await db.insert(sliders).values(slider).returning();
    return newSlider;
  }

  async updateSlider(id: number, slider: Partial<InsertSlider>): Promise<Slider> {
    const [updatedSlider] = await db
      .update(sliders)
      .set({ ...slider, updatedAt: new Date() })
      .where(eq(sliders.id, id))
      .returning();
    return updatedSlider;
  }

  async deleteSlider(id: number): Promise<void> {
    await db.delete(sliders).where(eq(sliders.id, id));
  }

  // Testimonial operations
  async getTestimonials(featured?: boolean): Promise<Testimonial[]> {
    if (featured !== undefined) {
      return await db
        .select()
        .from(testimonials)
        .where(and(eq(testimonials.isActive, true), eq(testimonials.isFeatured, featured)))
        .orderBy(asc(testimonials.sortOrder));
    }
    
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(asc(testimonials.sortOrder));
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Blog post operations
  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    if (published !== undefined) {
      return await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.isPublished, published))
        .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));
    }
    
    return await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)));
    return post;
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // FAQ operations
  async getFaqs(category?: string): Promise<Faq[]> {
    if (category) {
      return await db
        .select()
        .from(faqs)
        .where(and(eq(faqs.isActive, true), eq(faqs.category, category)))
        .orderBy(asc(faqs.sortOrder));
    }
    
    return await db
      .select()
      .from(faqs)
      .where(eq(faqs.isActive, true))
      .orderBy(asc(faqs.sortOrder));
  }

  async getFaq(id: number): Promise<Faq | undefined> {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
    return faq;
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [newFaq] = await db.insert(faqs).values(faq).returning();
    return newFaq;
  }

  async updateFaq(id: number, faq: Partial<InsertFaq>): Promise<Faq> {
    const [updatedFaq] = await db
      .update(faqs)
      .set({ ...faq, updatedAt: new Date() })
      .where(eq(faqs.id, id))
      .returning();
    return updatedFaq;
  }

  async deleteFaq(id: number): Promise<void> {
    await db.delete(faqs).where(eq(faqs.id, id));
  }

  // Team member operations
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true))
      .orderBy(asc(teamMembers.sortOrder));
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [updatedMember] = await db
      .update(teamMembers)
      .set({ ...member, updatedAt: new Date() })
      .where(eq(teamMembers.id, id))
      .returning();
    return updatedMember;
  }

  async deleteTeamMember(id: number): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  // Redirect operations
  async getRedirects(): Promise<Redirect[]> {
    return await db
      .select()
      .from(redirects)
      .where(eq(redirects.isActive, true))
      .orderBy(desc(redirects.createdAt));
  }

  async getRedirect(fromUrl: string): Promise<Redirect | undefined> {
    const [redirect] = await db
      .select()
      .from(redirects)
      .where(and(eq(redirects.fromUrl, fromUrl), eq(redirects.isActive, true)));
    return redirect;
  }

  async createRedirect(redirect: InsertRedirect): Promise<Redirect> {
    const [newRedirect] = await db.insert(redirects).values(redirect).returning();
    return newRedirect;
  }

  async updateRedirect(id: number, redirect: Partial<InsertRedirect>): Promise<Redirect> {
    const [updatedRedirect] = await db
      .update(redirects)
      .set({ ...redirect, updatedAt: new Date() })
      .where(eq(redirects.id, id))
      .returning();
    return updatedRedirect;
  }

  async deleteRedirect(id: number): Promise<void> {
    await db.delete(redirects).where(eq(redirects.id, id));
  }

  // Email template operations
  async getEmailTemplates(): Promise<EmailTemplate[]> {
    return await db
      .select()
      .from(emailTemplates)
      .where(eq(emailTemplates.isActive, true))
      .orderBy(asc(emailTemplates.name));
  }

  async getEmailTemplate(templateType: string): Promise<EmailTemplate | undefined> {
    const [template] = await db
      .select()
      .from(emailTemplates)
      .where(and(eq(emailTemplates.templateType, templateType), eq(emailTemplates.isActive, true)));
    return template;
  }

  async createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate> {
    const [newTemplate] = await db.insert(emailTemplates).values(template).returning();
    return newTemplate;
  }

  async updateEmailTemplate(id: number, template: Partial<InsertEmailTemplate>): Promise<EmailTemplate> {
    const [updatedTemplate] = await db
      .update(emailTemplates)
      .set({ ...template, updatedAt: new Date() })
      .where(eq(emailTemplates.id, id))
      .returning();
    return updatedTemplate;
  }

  async deleteEmailTemplate(id: number): Promise<void> {
    await db.delete(emailTemplates).where(eq(emailTemplates.id, id));
  }

  // Analytics operations
  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [newEvent] = await db.insert(analyticsEvents).values(event).returning();
    return newEvent;
  }

  async getAnalyticsEvents(eventType?: string, limit: number = 1000): Promise<AnalyticsEvent[]> {
    let query = db.select().from(analyticsEvents);
    
    if (eventType) {
      query = query.where(eq(analyticsEvents.eventType, eventType));
    }
    
    return await query
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(limit);
  }

  // Menu item operations
  async getMenuItems(location?: string): Promise<MenuItem[]> {
    if (location) {
      return await db
        .select()
        .from(menuItems)
        .where(and(eq(menuItems.menuLocation, location), eq(menuItems.isActive, true)))
        .orderBy(asc(menuItems.sortOrder));
    }
    
    return await db
      .select()
      .from(menuItems)
      .where(eq(menuItems.isActive, true))
      .orderBy(asc(menuItems.sortOrder));
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    const [item] = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return item;
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }

  async updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem> {
    const [updatedItem] = await db
      .update(menuItems)
      .set({ ...item, updatedAt: new Date() })
      .where(eq(menuItems.id, id))
      .returning();
    return updatedItem;
  }

  async deleteMenuItem(id: number): Promise<void> {
    await db.delete(menuItems).where(eq(menuItems.id, id));
  }

  // Pricing plan operations
  async getPricingPlans(): Promise<PricingPlan[]> {
    return await db
      .select()
      .from(pricingPlans)
      .where(eq(pricingPlans.isActive, true))
      .orderBy(asc(pricingPlans.sortOrder));
  }

  async getPricingPlan(id: number): Promise<PricingPlan | undefined> {
    const [plan] = await db.select().from(pricingPlans).where(eq(pricingPlans.id, id));
    return plan;
  }

  async createPricingPlan(plan: InsertPricingPlan): Promise<PricingPlan> {
    const [newPlan] = await db.insert(pricingPlans).values(plan).returning();
    return newPlan;
  }

  async updatePricingPlan(id: number, plan: Partial<InsertPricingPlan>): Promise<PricingPlan> {
    const [updatedPlan] = await db
      .update(pricingPlans)
      .set({ ...plan, updatedAt: new Date() })
      .where(eq(pricingPlans.id, id))
      .returning();
    return updatedPlan;
  }

  async deletePricingPlan(id: number): Promise<void> {
    await db.delete(pricingPlans).where(eq(pricingPlans.id, id));
  }

  // Activity log operations
  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const [newLog] = await db.insert(activityLogs).values(log).returning();
    return newLog;
  }

  async getActivityLogs(userId?: string, limit: number = 100): Promise<ActivityLog[]> {
    let query = db.select().from(activityLogs);
    
    if (userId) {
      query = query.where(eq(activityLogs.userId, userId));
    }
    
    return await query
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
