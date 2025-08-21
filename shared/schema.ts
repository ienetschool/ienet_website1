import { sql } from 'drizzle-orm';
import { 
  index, 
  jsonb, 
  pgTable, 
  timestamp, 
  varchar, 
  text, 
  boolean,
  integer,
  serial,
  pgEnum,
  decimal,
  date
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - mandatory for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - mandatory for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  username: varchar("username", { length: 100 }).unique(),
  password: varchar("password", { length: 255 }),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user").notNull(), // 'admin', 'seo_manager', 'content_editor', 'query_manager', 'user'
  permissions: jsonb("permissions"), // JSON object with module permissions
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  loginAttempts: integer("login_attempts").default(0),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  twoFactorSecret: varchar("two_factor_secret"),
  passwordResetToken: varchar("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Service categories (Main Services)
export const serviceCategories = pgTable("service_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  color: varchar("color", { length: 50 }),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Sub-services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => serviceCategories.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  content: text("content"),
  icon: varchar("icon", { length: 100 }),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Feature details
export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content"),
  technicalDetails: text("technical_details"),
  benefits: text("benefits"),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects showcase
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  content: text("content"),
  imageUrl: varchar("image_url", { length: 500 }),
  demoUrl: varchar("demo_url", { length: 500 }),
  technologies: text("technologies"), // JSON array of tech stack
  category: varchar("category", { length: 100 }),
  clientName: varchar("client_name", { length: 255 }),
  completionDate: timestamp("completion_date"),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact enquiries
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  serviceInterest: varchar("service_interest", { length: 255 }),
  budgetRange: varchar("budget_range", { length: 100 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("new"), // 'new', 'contacted', 'qualified', 'closed'
  source: varchar("source", { length: 100 }).default("website"),
  pageUrl: varchar("page_url", { length: 1000 }), // Hidden field - page where form was submitted
  userIp: varchar("user_ip", { length: 45 }), // Hidden field - user's IP address
  userAgent: text("user_agent"), // Hidden field - user's browser info
  referrer: varchar("referrer", { length: 1000 }), // Hidden field - referring page
  assignedTo: varchar("assigned_to").references(() => users.id),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Site settings
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  type: varchar("type", { length: 50 }).default("text"), // 'text', 'number', 'boolean', 'json'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Page builder components
export const pageComponents = pgTable("page_components", {
  id: serial("id").primaryKey(),
  pageType: varchar("page_type", { length: 100 }).notNull(), // 'home', 'service', 'about', etc.
  pageId: varchar("page_id", { length: 255 }), // Reference to specific page (optional)
  componentType: varchar("component_type", { length: 100 }).notNull(), // 'hero', 'features', 'cta', etc.
  title: varchar("title", { length: 500 }),
  content: text("content"),
  settings: jsonb("settings"), // Component-specific settings
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Homepage sliders
export const sliders = pgTable("sliders", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  ctaText: varchar("cta_text", { length: 100 }),
  ctaUrl: varchar("cta_url", { length: 500 }),
  backgroundType: varchar("background_type", { length: 50 }).default("image"), // 'image', 'video', 'gradient'
  backgroundValue: text("background_value"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Client testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientCompany: varchar("client_company", { length: 255 }),
  clientPosition: varchar("client_position", { length: 255 }),
  clientImage: varchar("client_image", { length: 500 }),
  testimonial: text("testimonial").notNull(),
  rating: integer("rating").default(5), // 1-5 stars
  projectType: varchar("project_type", { length: 100 }),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featuredImage: varchar("featured_image", { length: 500 }),
  authorId: varchar("author_id").references(() => users.id).notNull(),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array of tags
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  readTime: integer("read_time"), // in minutes
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// FAQ items
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Team members
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  bio: text("bio"),
  image: varchar("image", { length: 500 }),
  email: varchar("email", { length: 255 }),
  linkedin: varchar("linkedin", { length: 500 }),
  twitter: varchar("twitter", { length: 500 }),
  skills: text("skills"), // JSON array of skills
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// SEO redirects
export const redirects = pgTable("redirects", {
  id: serial("id").primaryKey(),
  fromUrl: varchar("from_url", { length: 1000 }).notNull(),
  toUrl: varchar("to_url", { length: 1000 }).notNull(),
  redirectType: varchar("redirect_type", { length: 10 }).default("301"), // '301', '302'
  isActive: boolean("is_active").default(true),
  hitCount: integer("hit_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Email templates
export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  htmlContent: text("html_content").notNull(),
  textContent: text("text_content"),
  templateType: varchar("template_type", { length: 100 }).notNull(), // 'welcome', 'lead_notification', 'password_reset'
  variables: text("variables"), // JSON array of available variables
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Analytics tracking
export const analyticsEvents = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  eventType: varchar("event_type", { length: 100 }).notNull(), // 'page_view', 'form_submit', 'download'
  pagePath: varchar("page_path", { length: 1000 }),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),
  referrer: varchar("referrer", { length: 1000 }),
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  sessionId: varchar("session_id", { length: 255 }),
  userId: varchar("user_id").references(() => users.id),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Menu items
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  menuLocation: varchar("menu_location", { length: 100 }).notNull(), // 'header', 'footer', 'sidebar'
  parentId: integer("parent_id"),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }),
  icon: varchar("icon", { length: 100 }),
  description: text("description"),
  openInNewTab: boolean("open_in_new_tab").default(false),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Pricing plans
export const pricingPlans = pgTable("pricing_plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(), // in cents
  billingPeriod: varchar("billing_period", { length: 50 }).default("monthly"), // 'monthly', 'yearly', 'one-time'
  features: text("features"), // JSON array of features
  isPopular: boolean("is_popular").default(false),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Quotes/Estimates
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientEmail: varchar("client_email", { length: 255 }).notNull(),
  clientPhone: varchar("client_phone", { length: 50 }),
  clientCompany: varchar("client_company", { length: 255 }),
  projectTitle: varchar("project_title", { length: 500 }).notNull(),
  projectDescription: text("project_description").notNull(),
  services: text("services"), // JSON array of requested services
  estimatedBudget: integer("estimated_budget"), // in cents
  timelineWeeks: integer("timeline_weeks"),
  status: varchar("status", { length: 50 }).default("pending"), // 'pending', 'sent', 'accepted', 'rejected', 'expired'
  validUntil: timestamp("valid_until"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Gallery images
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array of tags
  altText: varchar("alt_text", { length: 255 }),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  price: integer("price").notNull(), // in cents
  salePrice: integer("sale_price"), // in cents
  sku: varchar("sku", { length: 100 }).unique(),
  stockQuantity: integer("stock_quantity").default(0),
  images: text("images"), // JSON array of image URLs
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array of tags
  features: text("features"), // JSON array of product features
  specifications: text("specifications"), // JSON object of specs
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 50 }),
  billingAddress: jsonb("billing_address"),
  shippingAddress: jsonb("shipping_address"),
  items: jsonb("items"), // Array of order items with product details
  subtotal: integer("subtotal").notNull(), // in cents
  tax: integer("tax").default(0), // in cents
  shipping: integer("shipping").default(0), // in cents
  total: integer("total").notNull(), // in cents
  status: varchar("status", { length: 50 }).default("pending"), // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"), // 'pending', 'paid', 'failed', 'refunded'
  paymentMethod: varchar("payment_method", { length: 50 }),
  paymentId: varchar("payment_id", { length: 255 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  paymentId: varchar("payment_id", { length: 255 }).notNull(),
  amount: integer("amount").notNull(), // in cents
  currency: varchar("currency", { length: 3 }).default("USD"),
  status: varchar("status", { length: 50 }).notNull(), // 'pending', 'completed', 'failed', 'cancelled', 'refunded'
  method: varchar("method", { length: 50 }).notNull(), // 'stripe', 'paypal', 'bank_transfer'
  gatewayResponse: jsonb("gateway_response"),
  refundAmount: integer("refund_amount").default(0),
  refundReason: text("refund_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User roles
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  displayName: varchar("display_name", { length: 255 }).notNull(),
  description: text("description"),
  permissions: jsonb("permissions"), // JSON object with module permissions
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Activity logs
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  action: varchar("action", { length: 255 }).notNull(),
  resourceType: varchar("resource_type", { length: 100 }), // 'service', 'project', 'user', etc.
  resourceId: varchar("resource_id", { length: 255 }),
  oldValues: jsonb("old_values"),
  newValues: jsonb("new_values"),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const serviceCategoriesRelations = relations(serviceCategories, ({ many }) => ({
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  category: one(serviceCategories, {
    fields: [services.categoryId],
    references: [serviceCategories.id],
  }),
  features: many(features),
}));

export const featuresRelations = relations(features, ({ one }) => ({
  service: one(services, {
    fields: [features.serviceId],
    references: [services.id],
  }),
}));

export const enquiriesRelations = relations(enquiries, ({ one }) => ({
  assignedUser: one(users, {
    fields: [enquiries.assignedTo],
    references: [users.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  parent: one(menuItems, {
    fields: [menuItems.parentId],
    references: [menuItems.id],
  }),
  children: many(menuItems),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const analyticsEventsRelations = relations(analyticsEvents, ({ one }) => ({
  user: one(users, {
    fields: [analyticsEvents.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertServiceCategorySchema = createInsertSchema(serviceCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFeatureSchema = createInsertSchema(features).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEnquirySchema = createInsertSchema(enquiries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  source: true,
  respondedAt: true,
});

export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPageComponentSchema = createInsertSchema(pageComponents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSliderSchema = createInsertSchema(sliders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRedirectSchema = createInsertSchema(redirects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  hitCount: true,
});

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  createdAt: true,
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPricingPlanSchema = createInsertSchema(pricingPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRoleSchema = createInsertSchema(roles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Role = typeof roles.$inferSelect;
export type InsertRole = z.infer<typeof insertRoleSchema>;
export type ServiceCategory = typeof serviceCategories.$inferSelect;
export type InsertServiceCategory = z.infer<typeof insertServiceCategorySchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Feature = typeof features.$inferSelect;
export type InsertFeature = z.infer<typeof insertFeatureSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Enquiry = typeof enquiries.$inferSelect;
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
export type PageComponent = typeof pageComponents.$inferSelect;
export type InsertPageComponent = z.infer<typeof insertPageComponentSchema>;
export type Slider = typeof sliders.$inferSelect;
export type InsertSlider = z.infer<typeof insertSliderSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Faq = typeof faqs.$inferSelect;
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type Redirect = typeof redirects.$inferSelect;
export type InsertRedirect = z.infer<typeof insertRedirectSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type PricingPlan = typeof pricingPlans.$inferSelect;
export type InsertPricingPlan = z.infer<typeof insertPricingPlanSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;

// Advanced CMS & Page Builder Tables
export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  slug: varchar("slug").unique().notNull(),
  content: jsonb("content"), // Page builder blocks as JSON
  metaTitle: varchar("meta_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: varchar("canonical_url"),
  ogTitle: varchar("og_title"),
  ogDescription: text("og_description"),
  ogImage: varchar("og_image"),
  schema: jsonb("schema"), // JSON-LD schema
  status: varchar("status").default("draft"), // draft, published, archived
  publishedAt: timestamp("published_at"),
  authorId: varchar("author_id").references(() => users.id),
  parentId: varchar("parent_id"), // For hierarchical pages
  sortOrder: integer("sort_order").default(0),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pageVersions = pgTable("page_versions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").references(() => pages.id, { onDelete: "cascade" }),
  version: integer("version").notNull(),
  title: varchar("title"),
  content: jsonb("content"),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pageBlocks = pgTable("page_blocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // hero, faq, cta, pricing, text, image, etc.
  template: jsonb("template"), // Block structure template
  preview: varchar("preview"), // Preview image URL
  category: varchar("category"), // hero, content, forms, etc.
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Content templates for rapid page creation
export const contentTemplates = pgTable("content_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  content: jsonb("content").notNull(),
  category: varchar("category"),
  thumbnail: varchar("thumbnail"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Advanced SEO & Analytics Tables
export const seoSettings = pgTable("seo_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").references(() => pages.id, { onDelete: "cascade" }),
  focusKeyword: varchar("focus_keyword"),
  keywordDensity: decimal("keyword_density"),
  readabilityScore: integer("readability_score"),
  seoScore: integer("seo_score"),
  issues: jsonb("issues"), // SEO issues array
  suggestions: jsonb("suggestions"), // SEO suggestions
  lastAnalyzed: timestamp("last_analyzed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").references(() => pages.id),
  date: date("date").notNull(),
  visitors: integer("visitors").default(0),
  pageViews: integer("page_views").default(0),
  bounceRate: decimal("bounce_rate"),
  avgSessionDuration: integer("avg_session_duration"),
  topKeywords: jsonb("top_keywords"),
  referrers: jsonb("referrers"),
  devices: jsonb("devices"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Advanced Lead Management Tables
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  company: varchar("company"),
  service: varchar("service"),
  message: text("message"),
  source: varchar("source"), // page URL where form was submitted
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
  location: jsonb("location"), // Geolocation data
  utmSource: varchar("utm_source"),
  utmMedium: varchar("utm_medium"),
  utmCampaign: varchar("utm_campaign"),
  utmTerm: varchar("utm_term"),
  utmContent: varchar("utm_content"),
  status: varchar("status").default("new"), // new, contacted, qualified, converted, closed
  priority: varchar("priority").default("medium"), // low, medium, high
  assignedTo: varchar("assigned_to").references(() => users.id),
  tags: jsonb("tags"),
  notes: text("notes"),
  followUpDate: timestamp("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leadActivities = pgTable("lead_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id, { onDelete: "cascade" }),
  type: varchar("type").notNull(), // call, email, meeting, note
  subject: varchar("subject"),
  description: text("description"),
  userId: varchar("user_id").references(() => users.id),
  scheduledAt: timestamp("scheduled_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Advanced Email Management
export const emailQueue = pgTable("email_queue", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  to: varchar("to").notNull(),
  from: varchar("from"),
  subject: varchar("subject").notNull(),
  body: text("body").notNull(),
  status: varchar("status").default("pending"), // pending, sent, failed
  attempts: integer("attempts").default(0),
  lastAttempt: timestamp("last_attempt"),
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Advanced Site Design & UI Tables
export const advancedSliders = pgTable("advanced_sliders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  subtitle: text("subtitle"),
  image: varchar("image").notNull(),
  backgroundVideo: varchar("background_video"),
  ctaText: varchar("cta_text"),
  ctaUrl: varchar("cta_url"),
  ctaStyle: varchar("cta_style").default("primary"), // primary, secondary, outline
  textAlign: varchar("text_align").default("left"), // left, center, right
  overlayOpacity: decimal("overlay_opacity").default("0.5"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const advancedTestimonials = pgTable("advanced_testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  role: varchar("role"),
  company: varchar("company"),
  companyLogo: varchar("company_logo"),
  avatar: varchar("avatar"),
  rating: integer("rating").default(5),
  content: text("content").notNull(),
  videoUrl: varchar("video_url"), // For video testimonials
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Advanced Menu System
export const megaMenuItems = pgTable("mega_menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  parentId: integer("parent_id").references(() => menuItems.id),
  title: varchar("title").notNull(),
  url: varchar("url"),
  icon: varchar("icon"),
  image: varchar("image"),
  description: text("description"),
  columnIndex: integer("column_index").default(0),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Security & Maintenance
export const backups = pgTable("backups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: varchar("filename").notNull(),
  size: integer("size"),
  type: varchar("type").default("full"), // full, incremental
  status: varchar("status").default("completed"), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

export const loginAttempts = pgTable("login_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull(),
  ipAddress: varchar("ip_address").notNull(),
  userAgent: varchar("user_agent"),
  success: boolean("success").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Payment Gateway (Optional)
export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  amount: decimal("amount").notNull(),
  currency: varchar("currency").default("USD"),
  status: varchar("status").notNull(), // pending, completed, failed, refunded
  gateway: varchar("gateway").notNull(), // stripe, paypal, razorpay
  gatewayTransactionId: varchar("gateway_transaction_id"),
  description: text("description"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// A/B Testing Utility
export const abTests = pgTable("ab_tests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  pageId: varchar("page_id").references(() => pages.id),
  variantA: jsonb("variant_a"), // Original version
  variantB: jsonb("variant_b"), // Test version
  trafficSplit: integer("traffic_split").default(50), // Percentage for variant B
  isActive: boolean("is_active").default(true),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  conversions: jsonb("conversions"), // Conversion tracking data
  createdAt: timestamp("created_at").defaultNow(),
});

// Advanced Schema Insert Types
export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
});

export const insertContentTemplateSchema = createInsertSchema(contentTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAdvancedSliderSchema = createInsertSchema(advancedSliders).omit({
  id: true,
  createdAt: true,
});

export const insertAdvancedTestimonialSchema = createInsertSchema(advancedTestimonials).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertABTestSchema = createInsertSchema(abTests).omit({
  id: true,
  createdAt: true,
});

// Advanced Export Types
export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type ContentTemplate = typeof contentTemplates.$inferSelect;
export type InsertContentTemplate = z.infer<typeof insertContentTemplateSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type AdvancedSlider = typeof advancedSliders.$inferSelect;
export type InsertAdvancedSlider = z.infer<typeof insertAdvancedSliderSchema>;
export type AdvancedTestimonial = typeof advancedTestimonials.$inferSelect;
export type InsertAdvancedTestimonial = z.infer<typeof insertAdvancedTestimonialSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type ABTest = typeof abTests.$inferSelect;
export type InsertABTest = z.infer<typeof insertABTestSchema>;
