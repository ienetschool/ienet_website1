import { db } from "./db";
import { 
  serviceCategories, 
  services, 
  features, 
  projects, 
  pages,
  users,
  roles,
  enquiries,
  quotes,
  sliders,
  testimonials,
  galleryImages,
  products,
  orders,
  payments,
  siteSettings
} from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Starting comprehensive database seeding...");

  try {
    // Clear existing data (if any)
    console.log("🧹 Clearing existing data...");
    await db.delete(payments);
    await db.delete(orders);
    await db.delete(products);
    await db.delete(galleryImages);
    await db.delete(testimonials);
    await db.delete(sliders);
    await db.delete(quotes);
    await db.delete(enquiries);
    await db.delete(features);
    await db.delete(services);
    await db.delete(serviceCategories);
    await db.delete(projects);
    await db.delete(pages);
    await db.delete(users);
    await db.delete(roles);
    await db.delete(siteSettings);

    // 1. Seed Roles
    console.log("👥 Seeding roles...");
    const rolesData = await db.insert(roles).values([
      { name: "admin", displayName: "Administrator", description: "Full system access", permissions: ["all"] },
      { name: "editor", displayName: "Content Editor", description: "Content management access", permissions: ["read", "write", "edit"] },
      { name: "user", displayName: "Regular User", description: "Basic user access", permissions: ["read"] }
    ]).returning();

    // 2. Seed Users
    console.log("👤 Seeding users...");
    const usersData = await db.insert(users).values([
      {
        username: "admin",
        email: "admin@ienet.com",
        password: "admin123", // In production, this should be hashed
        role: "admin",
        firstName: "Admin",
        lastName: "User",
        isActive: true
      },
      {
        username: "editor",
        email: "editor@ienet.com",
        password: "editor123",
        role: "editor",
        firstName: "Content",
        lastName: "Editor",
        isActive: true
      }
    ]).returning();

    // 3. Seed Service Categories
    console.log("🏢 Seeding service categories...");
    const categoriesData = await db.insert(serviceCategories).values([
      {
        name: "Website Design & Development",
        slug: "website-design-development",
        description: "Custom website solutions from concept to deployment with modern responsive design and cutting-edge functionality.",
        icon: "Globe",
        color: "blue",
        isActive: true,
        sortOrder: 1
      },
      {
        name: "Digital Marketing & SEO",
        slug: "digital-marketing-seo",
        description: "Comprehensive digital marketing strategies including SEO, SEM, social media marketing, and content marketing.",
        icon: "TrendingUp",
        color: "green",
        isActive: true,
        sortOrder: 2
      },
      {
        name: "Cloud Infrastructure & DevOps",
        slug: "cloud-infrastructure-devops",
        description: "Scalable cloud solutions, infrastructure automation, and DevOps implementation for modern businesses.",
        icon: "Cloud",
        color: "purple",
        isActive: true,
        sortOrder: 3
      },
      {
        name: "Mobile App Development",
        slug: "mobile-app-development",
        description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
        icon: "Smartphone",
        color: "orange",
        isActive: true,
        sortOrder: 4
      },
      {
        name: "E-commerce Solutions",
        slug: "ecommerce-solutions",
        description: "Complete e-commerce platforms with payment integration, inventory management, and customer analytics.",
        icon: "ShoppingCart",
        color: "red",
        isActive: true,
        sortOrder: 5
      },
      {
        name: "Cybersecurity Services",
        slug: "cybersecurity-services",
        description: "Comprehensive security audits, threat protection, and compliance solutions for enterprise environments.",
        icon: "Shield",
        color: "indigo",
        isActive: true,
        sortOrder: 6
      },
      {
        name: "Data Analytics & BI",
        slug: "data-analytics-bi",
        description: "Business intelligence solutions, data visualization, and advanced analytics for data-driven decisions.",
        icon: "BarChart",
        color: "teal",
        isActive: true,
        sortOrder: 7
      },
      {
        name: "Enterprise Software",
        slug: "enterprise-software",
        description: "Custom enterprise applications, CRM systems, and business process automation solutions.",
        icon: "Building",
        color: "gray",
        isActive: true,
        sortOrder: 8
      },
      {
        name: "AI & Machine Learning",
        slug: "ai-machine-learning",
        description: "Artificial intelligence solutions, machine learning models, and intelligent automation systems.",
        icon: "Brain",
        color: "pink",
        isActive: true,
        sortOrder: 9
      },
      {
        name: "IT Consulting & Support",
        slug: "it-consulting-support",
        description: "Expert IT consulting, system integration, and 24/7 technical support for business continuity.",
        icon: "Headphones",
        color: "yellow",
        isActive: true,
        sortOrder: 10
      }
    ]).returning();

    // 4. Seed Services (Sub-services)
    console.log("🔧 Seeding services...");
    const servicesData = [];
    
    // Website Design & Development Services
    const webDevServices = [
      "Custom Website Development", "Responsive Web Design", "E-commerce Website", "Landing Page Design",
      "WordPress Development", "React/Next.js Development", "Vue.js Development", "Angular Development",
      "Progressive Web Apps", "Website Redesign", "CMS Development", "API Development",
      "Database Design", "Frontend Development", "Backend Development", "Full-Stack Development"
    ];

    // Digital Marketing Services
    const marketingServices = [
      "Search Engine Optimization", "Pay-Per-Click Advertising", "Social Media Marketing", "Content Marketing",
      "Email Marketing", "Conversion Rate Optimization", "Google Ads Management", "Facebook Advertising",
      "LinkedIn Marketing", "Instagram Marketing", "YouTube Marketing", "Influencer Marketing",
      "Marketing Analytics", "Brand Strategy", "Online Reputation Management"
    ];

    // Cloud & DevOps Services
    const cloudServices = [
      "AWS Solutions", "Azure Cloud Services", "Google Cloud Platform", "Docker Containerization",
      "Kubernetes Orchestration", "CI/CD Pipeline Setup", "Infrastructure as Code", "Cloud Migration",
      "Server Management", "Load Balancing", "Auto-scaling Setup", "Monitoring & Alerting",
      "Backup & Disaster Recovery", "Cloud Security", "Performance Optimization"
    ];

    // Add services for each category
    for (let i = 0; i < categoriesData.length; i++) {
      const category = categoriesData[i];
      let serviceNames = [];
      
      switch (i) {
        case 0: serviceNames = webDevServices; break;
        case 1: serviceNames = marketingServices; break;
        case 2: serviceNames = cloudServices; break;
        default:
          serviceNames = [
            `${category.name} Consulting`,
            `${category.name} Implementation`,
            `${category.name} Maintenance`,
            `${category.name} Optimization`,
            `${category.name} Support`,
            `${category.name} Training`,
            `Advanced ${category.name}`,
            `Custom ${category.name}`,
            `Enterprise ${category.name}`,
            `${category.name} Integration`
          ];
      }

      for (let j = 0; j < serviceNames.length; j++) {
        const serviceName = serviceNames[j];
        const serviceData = {
          categoryId: category.id,
          name: serviceName,
          slug: serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: `Professional ${serviceName.toLowerCase()} services with industry-leading expertise and proven results.`,
          price: Math.floor(Math.random() * 5000) + 500,
          duration: `${Math.floor(Math.random() * 12) + 1} weeks`,
          isActive: true,
          sortOrder: j + 1,
          features: [
            "Professional Implementation",
            "Quality Assurance",
            "24/7 Support",
            "Documentation Included"
          ]
        };
        servicesData.push(serviceData);
      }
    }

    const insertedServices = await db.insert(services).values(servicesData).returning();

    // 5. Seed Features
    console.log("⚡ Seeding features...");
    const featuresData = [];
    
    for (const service of insertedServices) {
      const featureNames = [
        "Basic Implementation",
        "Advanced Configuration",
        "Custom Integration",
        "Premium Support",
        "Analytics & Reporting",
        "Security Enhancement",
        "Performance Optimization",
        "Mobile Optimization",
        "SEO Enhancement",
        "Training & Documentation"
      ];

      for (let k = 0; k < featureNames.length; k++) {
        featuresData.push({
          serviceId: service.id,
          name: featureNames[k],
          slug: `${service.slug}-${featureNames[k].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          description: `${featureNames[k]} for ${service.name} with professional implementation and ongoing support.`,
          icon: "Star",
          isActive: true,
          sortOrder: k + 1
        });
      }
    }

    await db.insert(features).values(featuresData);

    // 6. Seed Projects
    console.log("📁 Seeding projects...");
    const projectsData = [
      {
        title: "E-commerce Platform Redesign",
        slug: "ecommerce-platform-redesign",
        description: "Complete redesign and development of a modern e-commerce platform with enhanced user experience.",
        image: "/images/project-1.jpg",
        category: "E-commerce",
        technologies: JSON.stringify(["React", "Node.js", "MongoDB", "Stripe"]),
        clientName: "TechStore Inc.",
        projectUrl: "https://example.com",
        status: "completed",
        isFeatured: true,
        sortOrder: 1
      },
      {
        title: "Enterprise CRM System",
        slug: "enterprise-crm-system",
        description: "Custom CRM system development for large enterprise with advanced analytics and reporting.",
        image: "/images/project-2.jpg",
        category: "Enterprise Software",
        technologies: JSON.stringify(["Vue.js", "Laravel", "PostgreSQL", "Docker"]),
        clientName: "Global Corp Ltd.",
        projectUrl: "https://example.com",
        status: "completed",
        isFeatured: true,
        sortOrder: 2
      },
      {
        title: "Mobile Banking Application",
        slug: "mobile-banking-app",
        description: "Secure mobile banking application with biometric authentication and real-time transactions.",
        image: "/images/project-3.jpg",
        category: "Mobile Development",
        technologies: JSON.stringify(["React Native", "Node.js", "AWS", "PostgreSQL"]),
        clientName: "SecureBank",
        projectUrl: "https://example.com",
        status: "completed",
        isFeatured: true,
        sortOrder: 3
      }
    ];

    await db.insert(projects).values(projectsData);

    // 7. Seed Pages
    console.log("📄 Seeding pages...");
    const pagesData = [
      {
        title: "Home Page",
        slug: "home",
        content: "Welcome to IeNet - Your premier destination for professional IT services and solutions.",
        metaTitle: "IeNet - Professional IT Services & Solutions",
        metaDescription: "Leading provider of web development, digital marketing, cloud solutions, and enterprise software services.",
        status: "published",
        type: "home",
        isHomePage: true,
        sortOrder: 1
      },
      {
        title: "About Us",
        slug: "about",
        content: "Learn more about IeNet's mission, vision, and our expert team of technology professionals.",
        metaTitle: "About IeNet - Professional IT Services Company",
        metaDescription: "Discover IeNet's story, our expert team, and our commitment to delivering exceptional IT solutions.",
        status: "draft",
        type: "page",
        isHomePage: false,
        sortOrder: 2
      },
      {
        title: "Contact",
        slug: "contact",
        content: "Get in touch with our team for professional IT services and consultation.",
        metaTitle: "Contact IeNet - Get Professional IT Services",
        metaDescription: "Contact IeNet for expert IT consulting, web development, and digital solutions. Free consultation available.",
        status: "published",
        type: "page",
        isHomePage: false,
        sortOrder: 3
      }
    ];

    await db.insert(pages).values(pagesData);

    // 8. Seed Additional Data
    console.log("🎨 Seeding additional dashboard data...");
    
    // Enquiries (Contacts)
    await db.insert(enquiries).values([
      {
        name: "John Smith",
        email: "john@example.com",
        phone: "+1-555-0123",
        company: "Tech Solutions Inc.",
        message: "Interested in web development services",
        source: "website",
        status: "new",
        serviceInterest: "Web Development"
      },
      {
        name: "Sarah Johnson",
        email: "sarah@company.com",
        phone: "+1-555-0124",
        company: "Digital Marketing Co.",
        message: "Need SEO consultation",
        source: "referral",
        status: "contacted",
        serviceInterest: "SEO Services"
      }
    ]);

    // Quotes
    await db.insert(quotes).values([
      {
        clientName: "ABC Corporation",
        clientEmail: "contact@abc.com",
        projectTitle: "E-commerce Website",
        projectDescription: "Full e-commerce platform with payment integration",
        estimatedBudget: 1500000, // in cents
        timelineWeeks: 8,
        status: "pending"
      }
    ]);

    // Sliders
    await db.insert(sliders).values([
      {
        title: "Professional IT Services",
        subtitle: "Transform Your Business with Technology",
        imageUrl: "/images/slider-1.jpg",
        ctaUrl: "/services",
        isActive: true,
        sortOrder: 1
      },
      {
        title: "Expert Web Development",
        subtitle: "Custom Solutions for Your Digital Presence",
        imageUrl: "/images/slider-2.jpg",
        ctaUrl: "/services/web-development",
        isActive: true,
        sortOrder: 2
      }
    ]);

    // Testimonials
    await db.insert(testimonials).values([
      {
        clientName: "Michael Chen",
        clientCompany: "InnovateTech",
        clientPosition: "CTO",
        testimonial: "IeNet delivered exceptional results on our enterprise project. Their expertise and professionalism exceeded our expectations.",
        rating: 5,
        clientImage: "/images/client-1.jpg",
        isActive: true,
        sortOrder: 1
      },
      {
        clientName: "Emily Rodriguez",
        clientCompany: "StartupX",
        clientPosition: "Founder",
        testimonial: "The team at IeNet transformed our vision into reality. Highly recommended for any technology project.",
        rating: 5,
        clientImage: "/images/client-2.jpg",
        isActive: true,
        sortOrder: 2
      }
    ]);

    // Gallery Images
    await db.insert(galleryImages).values([
      {
        title: "Modern Website Design",
        description: "Responsive web design showcase",
        imageUrl: "/images/gallery-1.jpg",
        category: "Web Design",
        tags: JSON.stringify(["responsive", "modern", "design"]),
        isActive: true,
        sortOrder: 1
      },
      {
        title: "Mobile App Interface",
        description: "Clean mobile app UI design",
        imageUrl: "/images/gallery-2.jpg",
        category: "Mobile Design",
        tags: JSON.stringify(["mobile", "ui", "clean"]),
        isActive: true,
        sortOrder: 2
      }
    ]);

    // Products
    await db.insert(products).values([
      {
        name: "Website Development Package",
        description: "Complete website development with modern design and functionality",
        price: 2999,
        category: "Web Development",
        slug: "website-development-package",
        images: JSON.stringify(["/images/product-1.jpg"]),
        features: JSON.stringify(["Responsive Design", "SEO Optimized", "CMS Integration", "1 Year Support"]),
        isActive: true,
        stockQuantity: 100,
        sortOrder: 1
      },
      {
        name: "SEO Optimization Service",
        description: "Comprehensive SEO service to improve search rankings",
        price: 999,
        category: "Digital Marketing",
        slug: "seo-optimization-service",
        images: JSON.stringify(["/images/product-2.jpg"]),
        features: JSON.stringify(["Keyword Research", "On-page SEO", "Link Building", "Monthly Reports"]),
        isActive: true,
        stockQuantity: 50,
        sortOrder: 2
      }
    ]);

    // Site Settings
    await db.insert(siteSettings).values([
      { key: "site_name", value: "IeNet - Professional IT Services" },
      { key: "site_description", value: "Leading provider of professional IT services and digital solutions" },
      { key: "contact_email", value: "contact@ienet.com" },
      { key: "contact_phone", value: "+1-555-0123" },
      { key: "business_address", value: "123 Tech Street, Digital City, TC 12345" },
      { key: "social_facebook", value: "https://facebook.com/ienet" },
      { key: "social_twitter", value: "https://twitter.com/ienet" },
      { key: "social_linkedin", value: "https://linkedin.com/company/ienet" }
    ]);

    console.log("✅ Database seeding completed successfully!");
    
    // Print summary
    const summary = await db.execute(`
      SELECT 
        (SELECT COUNT(*) FROM service_categories) as categories,
        (SELECT COUNT(*) FROM services) as services,
        (SELECT COUNT(*) FROM features) as features,
        (SELECT COUNT(*) FROM projects) as projects,
        (SELECT COUNT(*) FROM pages) as pages,
        (SELECT COUNT(*) FROM enquiries) as contacts,
        (SELECT COUNT(*) FROM quotes) as quotes,
        (SELECT COUNT(*) FROM users) as users
    `);
    
    console.log("📊 Seeding Summary:");
    console.log(summary.rows[0]);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seeder
seedDatabase()
  .then(() => {
    console.log("🎉 Database seeding completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Database seeding failed:", error);
    process.exit(1);
  });