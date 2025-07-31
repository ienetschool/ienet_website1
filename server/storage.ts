import {
  users,
  serviceCategories,
  services,
  features,
  projects,
  enquiries,
  siteSettings,
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
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, like, sql } from "drizzle-orm";

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
    const query = db.select().from(services).where(eq(services.isActive, true));
    
    if (categoryId) {
      query.where(and(eq(services.isActive, true), eq(services.categoryId, categoryId)));
    }
    
    return await query.orderBy(asc(services.sortOrder), asc(services.name));
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
    const query = db.select().from(features).where(eq(features.isActive, true));
    
    if (serviceId) {
      query.where(and(eq(features.isActive, true), eq(features.serviceId, serviceId)));
    }
    
    return await query.orderBy(asc(features.sortOrder), asc(features.name));
  }

  async getFeature(categorySlug: string, serviceSlug: string, featureSlug: string): Promise<Feature | undefined> {
    const [feature] = await db
      .select()
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
    return feature?.features;
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
    let query = db.select().from(projects).where(eq(projects.isActive, true));
    
    if (featured !== undefined) {
      query = query.where(and(eq(projects.isActive, true), eq(projects.isFeatured, featured)));
    }
    
    return await query.orderBy(asc(projects.sortOrder), desc(projects.createdAt));
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
    let query = db.select().from(enquiries);
    
    if (status) {
      query = query.where(eq(enquiries.status, status));
    }
    
    return await query.orderBy(desc(enquiries.createdAt));
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
}

export const storage = new DatabaseStorage();
