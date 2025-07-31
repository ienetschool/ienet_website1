import { db } from "./db";
import { serviceCategories, services, features, projects, siteSettings } from "@shared/schema";

export async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Clear existing data (in reverse order of dependencies)
    await db.delete(features);
    await db.delete(services);
    await db.delete(serviceCategories);
    await db.delete(projects);
    await db.delete(siteSettings);

    // Seed Service Categories
    const categoryData = [
      {
        name: "Website Development",
        slug: "website-development",
        description: "Custom websites, e-commerce platforms, and web applications built with modern technologies",
        icon: "code",
        color: "primary",
        metaTitle: "Website Development Services | Custom Web Solutions",
        metaDescription: "Professional website development services including custom websites, e-commerce platforms, and web applications built with modern technologies.",
        isActive: true,
        sortOrder: 1
      },
      {
        name: "Web Hosting & Infrastructure",
        slug: "web-hosting",
        description: "Reliable hosting solutions from shared hosting to dedicated servers and cloud infrastructure",
        icon: "server",
        color: "emerald",
        metaTitle: "Web Hosting & Infrastructure Services | Reliable Hosting Solutions",
        metaDescription: "Professional web hosting and infrastructure services including shared hosting, VPS, cloud hosting, and dedicated servers.",
        isActive: true,
        sortOrder: 2
      },
      {
        name: "Cybersecurity",
        slug: "cybersecurity",
        description: "Comprehensive security services to protect your digital assets and ensure compliance",
        icon: "shield",
        color: "red",
        metaTitle: "Cybersecurity Services | Digital Asset Protection",
        metaDescription: "Comprehensive cybersecurity services including vulnerability assessment, penetration testing, security audits, and managed security.",
        isActive: true,
        sortOrder: 3
      },
      {
        name: "Mobile App Development",
        slug: "mobile-development",
        description: "Native and cross-platform mobile applications for iOS and Android platforms",
        icon: "smartphone",
        color: "purple",
        metaTitle: "Mobile App Development | iOS & Android Apps",
        metaDescription: "Professional mobile app development services for iOS and Android platforms using native and cross-platform technologies.",
        isActive: true,
        sortOrder: 4
      },
      {
        name: "Database Management",
        slug: "database-management",
        description: "Database design, optimization, and management services for optimal performance",
        icon: "database",
        color: "amber",
        metaTitle: "Database Management Services | Database Design & Optimization",
        metaDescription: "Professional database management services including database design, optimization, backup, and performance tuning.",
        isActive: true,
        sortOrder: 5
      },
      {
        name: "DevOps & Automation",
        slug: "devops-automation",
        description: "CI/CD pipelines, infrastructure automation, and deployment optimization",
        icon: "cog",
        color: "indigo",
        metaTitle: "DevOps & Automation Services | CI/CD and Infrastructure",
        metaDescription: "Professional DevOps and automation services including CI/CD pipelines, infrastructure automation, and deployment optimization.",
        isActive: true,
        sortOrder: 6
      }
    ];

    const insertedCategories = await db.insert(serviceCategories).values(categoryData).returning();
    console.log(`Inserted ${insertedCategories.length} service categories`);

    // Seed Services
    const serviceData = [
      // Website Development Services
      {
        categoryId: insertedCategories[0].id, // Website Development
        name: "UI/UX Design",
        slug: "ui-ux-design",
        description: "User interface and user experience design services focusing on creating intuitive and engaging digital experiences",
        shortDescription: "Professional UI/UX design for optimal user experiences",
        content: "Our UI/UX design services combine creativity with functionality to create digital experiences that users love. We follow a user-centered design approach, conducting thorough research and testing to ensure your application or website not only looks great but also provides an intuitive and efficient user journey. Our team specializes in wireframing, prototyping, user research, and visual design to create interfaces that drive engagement and conversions.",
        icon: "paintbrush",
        metaTitle: "UI/UX Design Services | User Experience Design",
        metaDescription: "Professional UI/UX design services focusing on creating intuitive and engaging digital experiences that drive user engagement.",
        isActive: true,
        sortOrder: 1
      },
      {
        categoryId: insertedCategories[0].id, // Website Development
        name: "E-commerce Development",
        slug: "ecommerce-development",
        description: "Complete e-commerce solutions with shopping carts, payment gateways, and inventory management",
        shortDescription: "Full-featured e-commerce platforms for online businesses",
        content: "We build comprehensive e-commerce solutions that help businesses sell online effectively. Our e-commerce platforms include shopping cart functionality, secure payment processing, inventory management, order tracking, customer management, and administrative dashboards. We work with popular platforms like Shopify, WooCommerce, and Magento, as well as custom solutions tailored to your specific business needs.",
        icon: "shopping-cart",
        metaTitle: "E-commerce Development Services | Online Store Solutions",
        metaDescription: "Professional e-commerce development services including shopping carts, payment gateways, and inventory management systems.",
        isActive: true,
        sortOrder: 2
      },
      {
        categoryId: insertedCategories[0].id, // Website Development
        name: "CMS Development",
        slug: "cms-development",
        description: "Content management systems that make it easy to update and maintain your website",
        shortDescription: "Custom content management systems for easy website maintenance",
        content: "Our content management system development services provide you with the tools to easily manage your website content without technical expertise. We create custom CMS solutions and also work with popular platforms like WordPress, Drupal, and Strapi. Our CMS solutions include user-friendly admin panels, content scheduling, media management, SEO tools, and multi-user permissions.",
        icon: "edit",
        metaTitle: "CMS Development Services | Content Management Systems",
        metaDescription: "Professional CMS development services for easy website content management with user-friendly admin panels and SEO tools.",
        isActive: true,
        sortOrder: 3
      },
      {
        categoryId: insertedCategories[0].id, // Website Development
        name: "Progressive Web Apps",
        slug: "progressive-web-apps",
        description: "Modern web applications that work like native mobile apps with offline capabilities",
        shortDescription: "Web apps with native mobile app features and offline support",
        content: "Progressive Web Apps (PWAs) combine the best of web and mobile app experiences. They load quickly, work offline, can be installed on devices, and provide native app-like functionality through web browsers. Our PWA development includes service workers for offline functionality, push notifications, responsive design, and app-like navigation patterns.",
        icon: "smartphone",
        metaTitle: "Progressive Web App Development | PWA Services",
        metaDescription: "Professional Progressive Web App development services with offline capabilities, push notifications, and native app features.",
        isActive: true,
        sortOrder: 4
      },

      // Web Hosting Services
      {
        categoryId: insertedCategories[1].id, // Web Hosting
        name: "Shared Hosting",
        slug: "shared-hosting",
        description: "Cost-effective hosting solution perfect for small to medium websites",
        shortDescription: "Affordable shared hosting for small to medium websites",
        content: "Our shared hosting solutions provide reliable and affordable web hosting for small to medium websites. Each hosting package includes email accounts, databases, SSL certificates, regular backups, and 24/7 technical support. Our servers are optimized for performance and security, ensuring your website loads quickly and stays online.",
        icon: "server",
        metaTitle: "Shared Web Hosting Services | Affordable Website Hosting",
        metaDescription: "Cost-effective shared hosting solutions with email accounts, databases, SSL certificates, and 24/7 support.",
        isActive: true,
        sortOrder: 1
      },
      {
        categoryId: insertedCategories[1].id, // Web Hosting
        name: "VPS Hosting",
        slug: "vps-hosting",
        description: "Virtual private servers with dedicated resources and full root access",
        shortDescription: "Dedicated virtual servers with full control and guaranteed resources",
        content: "Virtual Private Server hosting provides dedicated resources and full control over your hosting environment. Our VPS solutions include guaranteed CPU, RAM, and storage, root access for custom configurations, choice of operating systems, and scalable resources. Perfect for growing websites, applications, and development environments that need more control and resources than shared hosting.",
        icon: "hard-drive",
        metaTitle: "VPS Hosting Services | Virtual Private Servers",
        metaDescription: "Professional VPS hosting with dedicated resources, full root access, and scalable configurations for growing websites.",
        isActive: true,
        sortOrder: 2
      },
      {
        categoryId: insertedCategories[1].id, // Web Hosting
        name: "Cloud Hosting",
        slug: "cloud-hosting",
        description: "Scalable cloud infrastructure with high availability and automatic scaling",
        shortDescription: "Scalable cloud hosting with high availability and auto-scaling",
        content: "Our cloud hosting solutions leverage distributed infrastructure to provide high availability, automatic scaling, and optimal performance. Benefits include load balancing across multiple servers, automatic failover, pay-as-you-scale pricing, global CDN integration, and advanced security features. Ideal for high-traffic websites and applications that require maximum uptime and performance.",
        icon: "cloud",
        metaTitle: "Cloud Hosting Services | Scalable Cloud Infrastructure",
        metaDescription: "Professional cloud hosting with high availability, automatic scaling, load balancing, and global CDN integration.",
        isActive: true,
        sortOrder: 3
      },
      {
        categoryId: insertedCategories[1].id, // Web Hosting
        name: "Domain Registration",
        slug: "domain-registration",
        description: "Domain name registration and management services with DNS control",
        shortDescription: "Domain registration and DNS management services",
        content: "Complete domain name services including registration, renewal, transfers, and DNS management. We support all major TLDs (.com, .org, .net, .co, etc.) and provide advanced DNS management tools, domain forwarding, email forwarding, and WHOIS privacy protection. Our domain management interface makes it easy to control all aspects of your domain names.",
        icon: "globe",
        metaTitle: "Domain Registration Services | Domain Names & DNS",
        metaDescription: "Professional domain registration and DNS management services with privacy protection and advanced DNS tools.",
        isActive: true,
        sortOrder: 4
      },

      // Cybersecurity Services
      {
        categoryId: insertedCategories[2].id, // Cybersecurity
        name: "Vulnerability Assessment",
        slug: "vulnerability-assessment",
        description: "Comprehensive security assessments to identify potential vulnerabilities in your systems",
        shortDescription: "Thorough security assessments to identify system vulnerabilities",
        content: "Our vulnerability assessment services provide comprehensive security evaluations of your IT infrastructure, applications, and networks. We use automated scanning tools and manual testing techniques to identify potential security weaknesses, misconfigurations, and compliance issues. Each assessment includes detailed reports with risk ratings, remediation recommendations, and implementation guidance.",
        icon: "search",
        metaTitle: "Vulnerability Assessment Services | Security Evaluations",
        metaDescription: "Comprehensive vulnerability assessment services to identify and remediate security weaknesses in your IT infrastructure.",
        isActive: true,
        sortOrder: 1
      },
      {
        categoryId: insertedCategories[2].id, // Cybersecurity
        name: "Penetration Testing",
        slug: "penetration-testing",
        description: "Ethical hacking services to test your security defenses and identify weaknesses",
        shortDescription: "Ethical hacking to test and strengthen security defenses",
        content: "Penetration testing simulates real-world cyber attacks to evaluate the effectiveness of your security controls. Our certified ethical hackers use the same techniques as malicious attackers to identify vulnerabilities that could be exploited. Testing covers web applications, networks, wireless systems, and social engineering vectors. Results include detailed findings, proof-of-concept exploits, and prioritized remediation steps.",
        icon: "shield-alert",
        metaTitle: "Penetration Testing Services | Ethical Hacking",
        metaDescription: "Professional penetration testing services using ethical hacking techniques to identify and remediate security vulnerabilities.",
        isActive: true,
        sortOrder: 2
      },
      {
        categoryId: insertedCategories[2].id, // Cybersecurity
        name: "Security Audits",
        slug: "security-audits",
        description: "Comprehensive security reviews of policies, procedures, and technical controls",
        shortDescription: "Complete security reviews of policies and technical controls",
        content: "Security audits provide comprehensive reviews of your organization's security posture, including policies, procedures, technical controls, and compliance status. Our audits cover information security governance, risk management, access controls, data protection, incident response, and regulatory compliance requirements like GDPR, HIPAA, and SOX.",
        icon: "clipboard-check",
        metaTitle: "Security Audit Services | Comprehensive Security Reviews",
        metaDescription: "Professional security audit services covering policies, procedures, technical controls, and compliance requirements.",
        isActive: true,
        sortOrder: 3
      },
      {
        categoryId: insertedCategories[2].id, // Cybersecurity
        name: "Managed Security",
        slug: "managed-security",
        description: "24/7 security monitoring and incident response services",
        shortDescription: "Round-the-clock security monitoring and incident response",
        content: "Our managed security services provide 24/7 monitoring, threat detection, and incident response capabilities. Services include security information and event management (SIEM), threat intelligence, vulnerability management, security awareness training, and compliance monitoring. Our security operations center (SOC) provides continuous monitoring and rapid response to security incidents.",
        icon: "shield-check",
        metaTitle: "Managed Security Services | 24/7 Security Monitoring",
        metaDescription: "Professional managed security services with 24/7 monitoring, threat detection, and incident response capabilities.",
        isActive: true,
        sortOrder: 4
      }
    ];

    const insertedServices = await db.insert(services).values(serviceData).returning();
    console.log(`Inserted ${insertedServices.length} services`);

    // Seed Features (for UI/UX Design service as an example)
    const uiUxService = insertedServices.find(s => s.slug === 'ui-ux-design');
    if (uiUxService) {
      const featureData = [
        {
          serviceId: uiUxService.id,
          name: "Wireframing & Prototyping",
          slug: "wireframing-prototyping",
          description: "Create detailed wireframes and interactive prototypes to visualize the user experience before development",
          content: "Our wireframing and prototyping services help visualize your application's structure and user flow before development begins. We create low-fidelity wireframes to establish layout and functionality, then develop high-fidelity prototypes with interactive elements. This process helps identify usability issues early, saves development time, and ensures stakeholder alignment on the final product vision.",
          technicalDetails: "We use industry-standard tools like Figma, Sketch, Adobe XD, and InVision to create wireframes and prototypes. Our process includes user journey mapping, information architecture, interaction design, and usability testing of prototypes.",
          benefits: "Wireframing and prototyping reduce development costs by identifying issues early, improve stakeholder communication through visual representation, enable user testing before development, and provide clear specifications for developers.",
          metaTitle: "Wireframing & Prototyping Services | UI/UX Design",
          metaDescription: "Professional wireframing and prototyping services to visualize user experience and validate design concepts before development.",
          isActive: true,
          sortOrder: 1
        },
        {
          serviceId: uiUxService.id,
          name: "User Journey Mapping",
          slug: "user-journey-mapping",
          description: "Analyze and optimize the complete user experience across all touchpoints",
          content: "User journey mapping involves analyzing every interaction users have with your product or service, from initial awareness to post-purchase support. We identify pain points, opportunities for improvement, and moments of delight throughout the customer experience. This comprehensive view helps optimize each touchpoint for better user satisfaction and business outcomes.",
          technicalDetails: "Our user journey mapping process includes user research, persona development, touchpoint identification, emotion mapping, and opportunity analysis. We use tools like Miro, Lucidchart, and specialized journey mapping software.",
          benefits: "User journey mapping improves customer satisfaction by identifying and addressing pain points, increases conversion rates by optimizing key touchpoints, enhances user retention through better experiences, and aligns teams around user-centered design principles.",
          metaTitle: "User Journey Mapping Services | UX Optimization",
          metaDescription: "Professional user journey mapping services to analyze and optimize the complete user experience across all touchpoints.",
          isActive: true,
          sortOrder: 2
        },
        {
          serviceId: uiUxService.id,
          name: "Usability Testing",
          slug: "usability-testing",
          description: "Test interfaces with real users to identify usability issues and improvement opportunities",
          content: "Usability testing involves observing real users as they interact with your interface to identify usability problems and areas for improvement. We conduct moderated and unmoderated testing sessions, analyze user behavior, and provide actionable recommendations to enhance the user experience. Testing can be performed on existing products or prototypes.",
          technicalDetails: "Our usability testing includes test planning, participant recruitment, session moderation, data analysis, and reporting. We use tools like UserTesting, Hotjar, Maze, and in-person testing facilities for comprehensive evaluation.",
          benefits: "Usability testing provides objective insights into user behavior, identifies specific usability issues before they impact users, validates design decisions with real user data, and improves overall product usability and user satisfaction.",
          metaTitle: "Usability Testing Services | User Experience Validation",
          metaDescription: "Professional usability testing services to identify usability issues and validate design decisions with real user feedback.",
          isActive: true,
          sortOrder: 3
        }
      ];

      const insertedFeatures = await db.insert(features).values(featureData).returning();
      console.log(`Inserted ${insertedFeatures.length} features`);
    }

    // Seed Projects
    const projectData = [
      {
        title: "Optical Store Management System",
        slug: "optical-store-management",
        description: "A comprehensive management system for optical stores featuring inventory management, prescription tracking, customer records, and sales reporting. The system streamlines operations for optical retailers and eye care professionals.",
        shortDescription: "Complete inventory, prescription, and customer management system for optical stores",
        content: "This optical store management system was designed to address the unique needs of optical retailers and eye care professionals. The system includes comprehensive inventory management for frames, lenses, and accessories, prescription tracking with integration to eye examination equipment, customer relationship management with purchase history and insurance information, appointment scheduling, sales reporting and analytics, and multi-location support for chain stores. The system also includes features for lens cutting specifications, frame fitting notes, and warranty tracking.",
        imageUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        demoUrl: "https://demo-optical.example.com",
        technologies: JSON.stringify(["React", "Node.js", "PostgreSQL", "Express", "Redux"]),
        category: "Management System",
        clientName: "VisionCare Optics",
        completionDate: new Date("2023-08-15"),
        metaTitle: "Optical Store Management System | Case Study",
        metaDescription: "Comprehensive optical store management system with inventory management, prescription tracking, and customer records.",
        isActive: true,
        isFeatured: true,
        sortOrder: 1
      },
      {
        title: "Hospital Management System",
        slug: "hospital-management-system",
        description: "An integrated hospital management system covering patient records, appointment scheduling, billing, inventory, staff management, and reporting. Designed to improve efficiency and patient care in healthcare facilities.",
        shortDescription: "Integrated patient records, scheduling, billing, and inventory management for hospitals",
        content: "This comprehensive hospital management system was developed to streamline operations across all departments of a multi-specialty hospital. Key modules include patient registration and electronic health records (EHR), appointment scheduling and queue management, billing and insurance claim processing, pharmacy and inventory management, laboratory information system (LIS), radiology information system (RIS), staff scheduling and payroll integration, bed and room management, emergency department workflow, and comprehensive reporting and analytics. The system ensures HIPAA compliance and integrates with existing medical equipment and third-party systems.",
        imageUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        demoUrl: "https://demo-hospital.example.com",
        technologies: JSON.stringify(["Angular", "Java Spring Boot", "PostgreSQL", "Redis", "Docker"]),
        category: "Management System",
        clientName: "City General Hospital",
        completionDate: new Date("2023-06-20"),
        metaTitle: "Hospital Management System | Healthcare IT Case Study",
        metaDescription: "Integrated hospital management system with patient records, scheduling, billing, and comprehensive healthcare modules.",
        isActive: true,
        isFeatured: true,
        sortOrder: 2
      },
      {
        title: "School Management System",
        slug: "school-management-system",
        description: "A complete school management platform covering student information, grades, attendance, parent communication, staff management, and academic reporting for educational institutions.",
        shortDescription: "Complete student information, grades, attendance, and parent portal system",
        content: "This school management system was developed to digitize and streamline all aspects of school administration and academic management. The platform includes student information system (SIS) with enrollment and records management, gradebook and assessment tracking, attendance monitoring with automated notifications, parent and student portals for real-time access to information, teacher and staff management with role-based permissions, timetable and class scheduling, library management system, fee management and payment processing, transportation management, examination and report card generation, and comprehensive analytics for academic performance tracking.",
        imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        demoUrl: "https://demo-school.example.com",
        technologies: JSON.stringify(["Vue.js", "Laravel", "MySQL", "Redis", "WebSocket"]),
        category: "Management System",
        clientName: "Bright Future Academy",
        completionDate: new Date("2023-05-10"),
        metaTitle: "School Management System | Education Technology Case Study",
        metaDescription: "Comprehensive school management system with student information, grades, attendance, and parent communication features.",
        isActive: true,
        isFeatured: true,
        sortOrder: 3
      },
      {
        title: "Hotel Management System",
        slug: "hotel-management-system",
        description: "A comprehensive hotel management solution covering reservations, guest services, housekeeping, billing, and property management for hospitality businesses.",
        shortDescription: "Complete reservation, guest services, and property management for hotels",
        content: "This hotel management system was designed to handle all aspects of hotel operations from reservation to checkout. Core features include online booking system with real-time availability, guest check-in and check-out processing, room assignment and housekeeping management, point-of-sale (POS) for restaurants and amenities, billing and payment processing with multiple payment gateways, guest services and concierge features, inventory management for housekeeping and food service, staff scheduling and management, reporting and analytics for occupancy, revenue, and guest satisfaction, and integration with channel managers and online travel agencies (OTAs).",
        imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        demoUrl: "https://demo-hotel.example.com",
        technologies: JSON.stringify(["React", "Django", "PostgreSQL", "Celery", "Stripe API"]),
        category: "Management System",
        clientName: "Grand Plaza Hotel",
        completionDate: new Date("2023-07-30"),
        metaTitle: "Hotel Management System | Hospitality Software Case Study",
        metaDescription: "Comprehensive hotel management system with reservations, guest services, housekeeping, and billing features.",
        isActive: true,
        isFeatured: true,
        sortOrder: 4
      },
      {
        title: "HR & Payroll Management System",
        slug: "hr-payroll-system",
        description: "An integrated HR and payroll management system covering employee records, attendance, leave management, payroll processing, and performance evaluation.",
        shortDescription: "Complete HR and payroll solution with employee management and automation",
        content: "This HR and payroll management system streamlines all human resource operations and payroll processing. Features include employee information management with document storage, time and attendance tracking with biometric integration, leave management with approval workflows, payroll processing with tax calculations and compliance, performance evaluation and goal tracking, recruitment and onboarding processes, training and development tracking, employee self-service portal, organizational chart and reporting structure, and comprehensive HR analytics and reporting.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        technologies: JSON.stringify(["React", "Node.js", "MongoDB", "Express", "PDF Generation"]),
        category: "Management System",
        clientName: "TechCorp Solutions",
        completionDate: new Date("2023-04-15"),
        metaTitle: "HR & Payroll Management System | Human Resources Software",
        metaDescription: "Integrated HR and payroll management system with employee records, attendance, and automated payroll processing.",
        isActive: true,
        isFeatured: false,
        sortOrder: 5
      },
      {
        title: "Accounting Management System",
        slug: "accounting-management-system",
        description: "A comprehensive accounting solution covering general ledger, accounts payable/receivable, financial reporting, and tax management for businesses.",
        shortDescription: "Complete accounting software with financial reporting and tax management",
        content: "This accounting management system provides complete financial management capabilities for small to medium businesses. Core features include general ledger with chart of accounts customization, accounts payable and receivable management, invoice generation and payment tracking, bank reconciliation and transaction matching, financial reporting including P&L, balance sheet, and cash flow statements, tax calculation and reporting, multi-currency support, budgeting and forecasting tools, expense tracking and approval workflows, and integration with banking and payment systems.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        technologies: JSON.stringify(["Angular", "Spring Boot", "PostgreSQL", "JasperReports", "REST API"]),
        category: "Management System",
        clientName: "Smith & Associates CPA",
        completionDate: new Date("2023-09-20"),
        metaTitle: "Accounting Management System | Financial Software Case Study",
        metaDescription: "Comprehensive accounting management system with general ledger, financial reporting, and tax management features.",
        isActive: true,
        isFeatured: false,
        sortOrder: 6
      }
    ];

    const insertedProjects = await db.insert(projects).values(projectData).returning();
    console.log(`Inserted ${insertedProjects.length} projects`);

    // Seed Site Settings
    const settingsData = [
      {
        key: "site_name",
        value: "IeNet",
        type: "text",
        description: "Website name"
      },
      {
        key: "site_description",
        value: "Enterprise IT solutions that drive digital transformation and business growth",
        type: "text",
        description: "Website description"
      },
      {
        key: "contact_email",
        value: "hello@ienet.com",
        type: "text",
        description: "Primary contact email"
      },
      {
        key: "contact_phone",
        value: "+1 (555) 123-4567",
        type: "text",
        description: "Primary contact phone"
      },
      {
        key: "office_address",
        value: "New York, NY",
        type: "text",
        description: "Office location"
      },
      {
        key: "business_hours",
        value: "Mon-Fri: 9AM-6PM EST",
        type: "text",
        description: "Business operating hours"
      }
    ];

    const insertedSettings = await db.insert(siteSettings).values(settingsData).returning();
    console.log(`Inserted ${insertedSettings.length} site settings`);

    console.log("Database seeding completed successfully!");
    
    return {
      categories: insertedCategories.length,
      services: insertedServices.length,
      features: insertedFeatures ? insertedFeatures.length : 0,
      projects: insertedProjects.length,
      settings: insertedSettings.length
    };

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then((result) => {
      console.log("Seeding completed:", result);
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}
