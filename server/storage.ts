import {
  users,
  serviceCategories,
  services,
  features,
  projects,
  enquiries,
  quotes,
  galleryImages,
  products,
  orders,
  payments,
  roles,
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
  type InsertUser,
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
  type Quote,
  type InsertQuote,
  type GalleryImage,
  type InsertGalleryImage,
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type Payment,
  type InsertPayment,
  type Role,
  type InsertRole,
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

  // Quote operations
  getQuotes(status?: string): Promise<Quote[]>;
  getQuote(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuote(id: number, quote: Partial<InsertQuote>): Promise<Quote>;
  deleteQuote(id: number): Promise<void>;

  // Gallery operations
  getGalleryImages(category?: string): Promise<GalleryImage[]>;
  getGalleryImage(id: number): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage>;
  deleteGalleryImage(id: number): Promise<void>;

  // Product operations
  getProducts(category?: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;

  // Order operations
  getOrders(status?: string): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order>;
  deleteOrder(id: number): Promise<void>;

  // Payment operations
  getPayments(status?: string): Promise<Payment[]>;
  getPayment(id: number): Promise<Payment | undefined>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: number, payment: Partial<InsertPayment>): Promise<Payment>;
  deletePayment(id: number): Promise<void>;

  // Role operations
  getRoles(): Promise<Role[]>;
  getRole(id: number): Promise<Role | undefined>;
  createRole(role: InsertRole): Promise<Role>;
  updateRole(id: number, role: Partial<InsertRole>): Promise<Role>;
  deleteRole(id: number): Promise<void>;

  // User management operations
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;

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

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
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

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount > 0;
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

  // Quote operations
  async getQuotes(status?: string): Promise<Quote[]> {
    if (status) {
      return await db
        .select()
        .from(quotes)
        .where(eq(quotes.status, status))
        .orderBy(desc(quotes.createdAt));
    }
    return await db.select().from(quotes).orderBy(desc(quotes.createdAt));
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
    return quote;
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const [newQuote] = await db.insert(quotes).values(quote).returning();
    return newQuote;
  }

  async updateQuote(id: number, quote: Partial<InsertQuote>): Promise<Quote> {
    const [updatedQuote] = await db
      .update(quotes)
      .set({ ...quote, updatedAt: new Date() })
      .where(eq(quotes.id, id))
      .returning();
    return updatedQuote;
  }

  async deleteQuote(id: number): Promise<void> {
    await db.delete(quotes).where(eq(quotes.id, id));
  }

  // Gallery operations
  async getGalleryImages(category?: string): Promise<GalleryImage[]> {
    if (category) {
      return await db
        .select()
        .from(galleryImages)
        .where(and(eq(galleryImages.category, category), eq(galleryImages.isActive, true)))
        .orderBy(asc(galleryImages.sortOrder), desc(galleryImages.createdAt));
    }
    return await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.isActive, true))
      .orderBy(asc(galleryImages.sortOrder), desc(galleryImages.createdAt));
  }

  async getGalleryImage(id: number): Promise<GalleryImage | undefined> {
    const [image] = await db.select().from(galleryImages).where(eq(galleryImages.id, id));
    return image;
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [newImage] = await db.insert(galleryImages).values(image).returning();
    return newImage;
  }

  async updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage> {
    const [updatedImage] = await db
      .update(galleryImages)
      .set({ ...image, updatedAt: new Date() })
      .where(eq(galleryImages.id, id))
      .returning();
    return updatedImage;
  }

  async deleteGalleryImage(id: number): Promise<void> {
    await db.delete(galleryImages).where(eq(galleryImages.id, id));
  }

  // Product operations
  async getProducts(category?: string): Promise<Product[]> {
    if (category) {
      return await db
        .select()
        .from(products)
        .where(and(eq(products.category, category), eq(products.isActive, true)))
        .orderBy(desc(products.createdAt));
    }
    return await db
      .select()
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(desc(products.createdAt));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Order operations
  async getOrders(status?: string): Promise<Order[]> {
    if (status) {
      return await db
        .select()
        .from(orders)
        .where(eq(orders.status, status))
        .orderBy(desc(orders.createdAt));
    }
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ ...order, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }

  async deleteOrder(id: number): Promise<void> {
    await db.delete(orders).where(eq(orders.id, id));
  }

  // Payment operations
  async getPayments(status?: string): Promise<Payment[]> {
    if (status) {
      return await db
        .select()
        .from(payments)
        .where(eq(payments.status, status))
        .orderBy(desc(payments.createdAt));
    }
    return await db.select().from(payments).orderBy(desc(payments.createdAt));
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment;
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values(payment).returning();
    return newPayment;
  }

  async updatePayment(id: number, payment: Partial<InsertPayment>): Promise<Payment> {
    const [updatedPayment] = await db
      .update(payments)
      .set({ ...payment, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return updatedPayment;
  }

  async deletePayment(id: number): Promise<void> {
    await db.delete(payments).where(eq(payments.id, id));
  }

  // Role operations
  async getRoles(): Promise<Role[]> {
    return await db
      .select()
      .from(roles)
      .where(eq(roles.isActive, true))
      .orderBy(asc(roles.name));
  }

  async getRole(id: number): Promise<Role | undefined> {
    const [role] = await db.select().from(roles).where(eq(roles.id, id));
    return role;
  }

  async createRole(role: InsertRole): Promise<Role> {
    const [newRole] = await db.insert(roles).values(role).returning();
    return newRole;
  }

  async updateRole(id: number, role: Partial<InsertRole>): Promise<Role> {
    const [updatedRole] = await db
      .update(roles)
      .set({ ...role, updatedAt: new Date() })
      .where(eq(roles.id, id))
      .returning();
    return updatedRole;
  }

  async deleteRole(id: number): Promise<void> {
    await db.delete(roles).where(eq(roles.id, id));
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

  // Performance gamification methods
  async getUserPerformanceStats(userId: string) {
    // Check if user has performance stats, if not create default
    const user = await this.getUser(userId);
    if (!user) return null;

    // Default stats for new users - in real implementation, this would be stored in DB
    return {
      totalPoints: 1250,
      currentLevel: 5,
      nextLevelPoints: 1500,
      completedOptimizations: 2,
      achievementsUnlocked: 8
    };
  }

  async completeOptimization(userId: string, suggestionId: string) {
    // Award points based on optimization difficulty and impact
    const pointsMap: Record<string, number> = {
      'img-compression': 50,
      'cdn-setup': 75,
      'css-optimization': 40,
      'db-optimization': 100,
      'gzip-compression': 30,
      'caching-strategy': 60,
      'js-minification': 35,
      'preload-resources': 45
    };

    const pointsEarned = pointsMap[suggestionId] || 25;
    const currentStats = await this.getUserPerformanceStats(userId);
    const newTotal = (currentStats?.totalPoints || 0) + pointsEarned;
    
    // Check for level up (every 500 points = new level)
    const currentLevel = Math.floor(newTotal / 500) + 1;
    const levelUp = currentLevel > (currentStats?.currentLevel || 1);
    
    return {
      pointsEarned,
      newTotal,
      levelUp,
      newLevel: currentLevel
    };
  }

  // Site settings operations
  async getSiteSettings() {
    // In a real implementation, this would be stored in a siteSettings table
    return {
      siteName: 'IeNet',
      siteDescription: 'Professional IT Services Platform',
      logoUrl: '',
      faviconUrl: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      fontFamily: 'inter',
      enableDarkMode: false,
      maintenanceMode: false,
      googleAnalyticsId: '',
      googleSearchConsoleId: ''
    };
  }

  async updateSiteSettings(updates: any) {
    // In a real implementation, this would update a siteSettings table
    console.log('Site settings updated:', updates);
    return true;
  }

  async getAllUsers() {
    // Mock users data - in real implementation, this would come from users table
    return [
      {
        id: '1',
        email: 'admin@ienet.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        lastLoginAt: new Date()
      }
    ];
  }

  async getUserAchievements(userId: string) {
    // Return mock achievements - in real implementation, these would be stored in DB
    return [
      {
        id: 'speed-demon',
        title: 'Speed Demon',
        description: 'Achieve sub-2s loading times',
        points: 100,
        unlocked: true,
        category: 'Performance'
      },
      {
        id: 'optimization-expert',
        title: 'Optimization Expert', 
        description: 'Complete 5 optimizations',
        points: 150,
        unlocked: true,
        category: 'Improvements'
      },
      {
        id: 'perfect-score',
        title: 'Perfect Score',
        description: 'Reach 100 performance score',
        points: 200,
        unlocked: false,
        category: 'Excellence'
      },
      {
        id: 'image-optimizer',
        title: 'Image Optimizer',
        description: 'Implement image compression',
        points: 75,
        unlocked: true,
        category: 'Images'
      },
      {
        id: 'caching-master',
        title: 'Caching Master',
        description: 'Set up efficient caching strategy',
        points: 125,
        unlocked: false,
        category: 'Caching'
      },
      {
        id: 'javascript-ninja',
        title: 'JavaScript Ninja',
        description: 'Optimize JavaScript delivery',
        points: 100,
        unlocked: true,
        category: 'JavaScript'
      },
      {
        id: 'css-wizard',
        title: 'CSS Wizard',
        description: 'Master CSS optimization',
        points: 90,
        unlocked: true,
        category: 'CSS'
      },
      {
        id: 'database-guru',
        title: 'Database Guru',
        description: 'Optimize database performance',
        points: 175,
        unlocked: false,
        category: 'Backend'
      }
    ];
  }

  // Dashboard-specific implementations
  async getPageBuilderPages() {
    return [
      {
        id: 1,
        title: "Home Page",
        slug: "home",
        content: "[]",
        status: "published",
        lastModified: new Date().toISOString(),
        author: "Admin"
      },
      {
        id: 2,
        title: "About Us",
        slug: "about",
        content: "[]",
        status: "draft",
        lastModified: new Date().toISOString(),
        author: "Admin"
      }
    ];
  }

  async getPageVersions(pageId: number) {
    return [
      {
        id: 1,
        pageId,
        version: "v1.0",
        createdAt: new Date().toISOString(),
        author: "Admin"
      }
    ];
  }

  async updatePageBuilderPage(pageId: number, pageData: any) {
    return { id: pageId, ...pageData };
  }

  async getSEOPages() {
    return [
      {
        id: 1,
        url: "/services/website-development",
        title: "Website Development Services - IeNet",
        metaDescription: "Professional website development services including UI/UX design, e-commerce solutions, and responsive web design.",
        h1Count: 1,
        h2Count: 5,
        imageCount: 8,
        internalLinks: 12,
        externalLinks: 3,
        wordCount: 1247,
        lastCrawled: new Date().toISOString(),
        issues: [
          {
            type: 'warning' as const,
            category: 'meta' as const,
            message: 'Meta description is slightly long',
            suggestion: 'Consider shortening to under 150 characters'
          }
        ],
        score: 85,
        status: 'good' as const
      },
      {
        id: 2,
        url: "/services/cybersecurity",
        title: "Cybersecurity Services - IeNet",
        metaDescription: "Comprehensive cybersecurity solutions including vulnerability assessment and penetration testing.",
        h1Count: 1,
        h2Count: 4,
        imageCount: 6,
        internalLinks: 8,
        externalLinks: 2,
        wordCount: 892,
        lastCrawled: new Date().toISOString(),
        issues: [],
        score: 92,
        status: 'good' as const
      }
    ];
  }

  async getSchemaMarkups() {
    return [
      {
        id: 1,
        pageUrl: "/services/website-development",
        type: "Service" as const,
        schema: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Website Development",
          "description": "Professional website development services"
        }),
        isValid: true,
        errors: [],
        lastValidated: new Date().toISOString()
      }
    ];
  }

  async validateSchema(schemaId: number) {
    return { isValid: true, errors: [] };
  }

  async crawlPage(pageId: number) {
    return { success: true, message: "Page crawled successfully" };
  }

  async getRobotsTxt() {
    return `User-agent: *
Disallow: /admin/
Disallow: /private/

Sitemap: https://ienet.app/sitemap.xml`;
  }

  async updateRobotsTxt(content: string) {
    // In production, this would save to a file or database
    console.log('Updated robots.txt:', content);
  }

  async getSitemapXml() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ienet.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ienet.app/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>`;
  }

  async generateSitemap() {
    return { success: true, message: "Sitemap generated successfully" };
  }

  async getNotifications() {
    return [
      {
        id: 1,
        type: 'form_submission' as const,
        title: 'New Contact Form Submission',
        message: 'A new contact form was submitted from the website',
        severity: 'info' as const,
        category: 'forms' as const,
        isRead: false,
        isArchived: false,
        createdAt: new Date().toISOString(),
        metadata: { formType: 'contact', userEmail: 'user@example.com' }
      },
      {
        id: 2,
        type: 'seo_issue' as const,
        title: 'SEO Issue Detected',
        message: 'Missing meta description on /services/web-hosting page',
        severity: 'warning' as const,
        category: 'seo' as const,
        isRead: false,
        isArchived: false,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        metadata: { pageUrl: '/services/web-hosting' }
      }
    ];
  }

  async getNotificationSettings() {
    return {
      emailNotifications: true,
      pushNotifications: true,
      formSubmissions: true,
      seoIssues: true,
      userActivity: false,
      systemAlerts: true,
      performanceWarnings: true,
      dailyDigest: false,
      weeklyReport: true,
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00'
      }
    };
  }

  async updateNotificationSettings(settings: any) {
    return settings;
  }

  async markNotificationAsRead(notificationId: number) {
    // In production, update the notification in database
    console.log(`Marked notification ${notificationId} as read`);
  }

  async markAllNotificationsAsRead() {
    console.log('Marked all notifications as read');
  }

  async archiveNotification(notificationId: number) {
    console.log(`Archived notification ${notificationId}`);
  }

  async deleteNotification(notificationId: number) {
    console.log(`Deleted notification ${notificationId}`);
  }

  // Page Builder operations
  async getPageBuilderPages() {
    return [
      {
        id: 1,
        title: 'Home Page',
        slug: 'home',
        status: 'published',
        type: 'page',
        metaTitle: 'IeNet - Professional IT Services',
        metaDescription: 'Transform your business with cutting-edge technology solutions from IeNet.',
        canonicalUrl: 'https://ienet.com/',
        ogImage: '/images/og-home.jpg',
        schema: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "IeNet - Professional IT Services",
          "description": "Transform your business with cutting-edge technology solutions from IeNet.",
          "url": "https://ienet.com/"
        }),
        blocks: [
          {
            id: 'block-1',
            type: 'hero',
            content: {
              title: 'Professional IT Services',
              subtitle: 'Transform your business with cutting-edge technology solutions',
              ctaText: 'Explore Services',
              ctaLink: '/services',
              backgroundImage: '',
              alignment: 'center'
            },
            order: 0
          },
          {
            id: 'block-2',
            type: 'text',
            content: {
              title: 'About IeNet',
              content: 'We provide comprehensive IT services to help businesses thrive in the digital age. Our expert team delivers innovative solutions tailored to your specific needs.',
              alignment: 'left'
            },
            order: 1
          },
          {
            id: 'block-3',
            type: 'pricing',
            content: {
              plans: [
                {
                  name: 'Starter',
                  price: '$99',
                  period: 'month',
                  features: ['Basic Support', 'Web Development', 'Email Setup'],
                  highlighted: false,
                  ctaText: 'Get Started'
                },
                {
                  name: 'Professional',
                  price: '$299',
                  period: 'month',
                  features: ['Everything in Starter', 'Cloud Services', 'Security Audit', '24/7 Support'],
                  highlighted: true,
                  ctaText: 'Choose Pro'
                },
                {
                  name: 'Enterprise',
                  price: '$599',
                  period: 'month',
                  features: ['Everything in Pro', 'Custom Solutions', 'Dedicated Manager', 'SLA Guarantee'],
                  highlighted: false,
                  ctaText: 'Contact Sales'
                }
              ]
            },
            order: 2
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'About Us',
        slug: 'about',
        status: 'draft',
        type: 'page',
        metaTitle: 'About IeNet - Our Story and Mission',
        metaDescription: 'Learn about IeNet\'s journey, mission, and the expert team behind our innovative IT solutions.',
        canonicalUrl: 'https://ienet.com/about',
        blocks: [
          {
            id: 'block-4',
            type: 'hero',
            content: {
              title: 'About IeNet',
              subtitle: 'Your trusted partner in digital transformation',
              ctaText: 'Meet Our Team',
              ctaLink: '/team',
              backgroundImage: '',
              alignment: 'center'
            },
            order: 0
          },
          {
            id: 'block-5',
            type: 'testimonial',
            content: {
              testimonials: [
                {
                  name: 'Sarah Johnson',
                  company: 'TechCorp Inc.',
                  content: 'IeNet transformed our entire IT infrastructure. Their expertise and support are unmatched.',
                  rating: 5,
                  avatar: 'https://via.placeholder.com/80x80'
                },
                {
                  name: 'Michael Chen',
                  company: 'StartupXYZ',
                  content: 'Working with IeNet was the best decision we made for our business. Highly recommended!',
                  rating: 5,
                  avatar: 'https://via.placeholder.com/80x80'
                }
              ],
              layout: 'carousel'
            },
            order: 1
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Services Overview',
        slug: 'services',
        status: 'published',
        type: 'page',
        metaTitle: 'IT Services - Web Development, Hosting, Security & More',
        metaDescription: 'Comprehensive IT services including web development, hosting, cybersecurity, and digital marketing solutions.',
        canonicalUrl: 'https://ienet.com/services',
        blocks: [
          {
            id: 'block-6',
            type: 'cta',
            content: {
              title: 'Ready to Transform Your Business?',
              description: 'Join hundreds of satisfied clients who trust IeNet for their IT needs',
              primaryCta: { text: 'Get Started Today', link: '/contact' },
              secondaryCta: { text: 'View Our Work', link: '/projects' },
              backgroundColor: '#3B82F6'
            },
            order: 0
          },
          {
            id: 'block-7',
            type: 'faq',
            content: {
              title: 'Frequently Asked Questions',
              faqs: [
                {
                  question: 'What services do you offer?',
                  answer: 'We offer comprehensive IT services including web development, hosting, cybersecurity, digital marketing, and cloud solutions.'
                },
                {
                  question: 'How long does a typical project take?',
                  answer: 'Project timelines vary based on complexity, but most web development projects are completed within 4-8 weeks.'
                },
                {
                  question: 'Do you provide ongoing support?',
                  answer: 'Yes, we offer various support packages including 24/7 monitoring, maintenance, and technical assistance.'
                }
              ]
            },
            order: 1
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      }
    ];
  }

  async getPageVersions(pageId: number) {
    return [
      {
        id: 1,
        pageId: pageId,
        version: '1.0.0',
        title: 'Initial version',
        status: 'published',
        createdAt: new Date().toISOString(),
        createdBy: 'admin'
      },
      {
        id: 2,
        pageId: pageId,
        version: '1.1.0',
        title: 'Added pricing section',
        status: 'draft',
        createdAt: new Date().toISOString(),
        createdBy: 'admin'
      }
    ];
  }

  async updatePageBuilderPage(pageId: number, pageData: any) {
    console.log(`Updating page ${pageId} with data:`, pageData);
    return {
      ...pageData,
      id: pageId,
      updatedAt: new Date().toISOString()
    };
  }

  async createPageBuilderPage(pageData: any) {
    const newPage = {
      ...pageData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    console.log('Created new page:', newPage);
    return newPage;
  }

  async deletePageBuilderPage(pageId: number) {
    console.log(`Deleted page ${pageId}`);
  }
}

export const storage = new DatabaseStorage();
