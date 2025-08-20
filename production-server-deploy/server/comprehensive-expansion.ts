import { db } from "./db";
import { serviceCategories, services, features } from "@shared/schema";

async function expandDatabaseContent() {
  try {
    console.log("Starting comprehensive database expansion...");

    // Clear existing data to rebuild with full structure
    await db.delete(features);
    await db.delete(services);
    await db.delete(serviceCategories);

    // Create comprehensive service categories
    const categoryInserts = await db.insert(serviceCategories).values([
      {
        name: "Website Design & Development",
        slug: "website-development",
        description: "Comprehensive web development services including custom websites, e-commerce platforms, and progressive web applications built with cutting-edge technologies",
        icon: "code",
        color: "blue",
        metaTitle: "Professional Website Development Services | Custom Web Solutions",
        metaDescription: "Expert website development services including UI/UX design, e-commerce development, CMS solutions, and responsive web design. Transform your digital presence with our comprehensive web development solutions.",
        isActive: true,
        sortOrder: 1
      },
      {
        name: "Web Hosting & Infrastructure",
        slug: "web-hosting-infrastructure",
        description: "Reliable hosting solutions from shared hosting to dedicated servers, cloud infrastructure, and managed services with 99.9% uptime guarantee",
        icon: "server",
        color: "green",
        metaTitle: "Web Hosting & Cloud Infrastructure Services | Reliable Hosting Solutions",
        metaDescription: "Professional web hosting and infrastructure services including shared hosting, VPS, cloud hosting, dedicated servers, and managed WordPress hosting with 24/7 support.",
        isActive: true,
        sortOrder: 2
      },
      {
        name: "Cybersecurity Services",
        slug: "cybersecurity",
        description: "Comprehensive security services including vulnerability assessments, penetration testing, security audits, and managed security solutions to protect your digital assets",
        icon: "shield",
        color: "red",
        metaTitle: "Cybersecurity Services | Digital Asset Protection & Security Solutions",
        metaDescription: "Professional cybersecurity services including vulnerability assessment, penetration testing, security audits, managed security, and compliance solutions to protect your business.",
        isActive: true,
        sortOrder: 3
      },
      {
        name: "Digital Marketing",
        slug: "digital-marketing",
        description: "Data-driven digital marketing strategies including SEO, PPC, social media marketing, content marketing, and email marketing to grow your online presence",
        icon: "trending-up",
        color: "purple",
        metaTitle: "Digital Marketing Services | SEO, PPC, Social Media & Content Marketing",
        metaDescription: "Comprehensive digital marketing services including search engine optimization, pay-per-click advertising, social media marketing, and content strategy to boost your online visibility.",
        isActive: true,
        sortOrder: 4
      },
      {
        name: "E-commerce Solutions",
        slug: "ecommerce-solutions",
        description: "Complete e-commerce development services including online store creation, payment integration, inventory management, and multi-channel selling platforms",
        icon: "shopping-cart",
        color: "orange",
        metaTitle: "E-commerce Development Services | Online Store Solutions",
        metaDescription: "Professional e-commerce development services including custom online stores, marketplace integration, payment gateways, inventory management, and mobile commerce solutions.",
        isActive: true,
        sortOrder: 5
      },
      {
        name: "Cloud Services",
        slug: "cloud-services",
        description: "Enterprise cloud solutions including cloud migration, infrastructure as a service, platform as a service, and hybrid cloud deployments",
        icon: "cloud",
        color: "cyan",
        metaTitle: "Cloud Services & Migration | Enterprise Cloud Solutions",
        metaDescription: "Professional cloud services including cloud migration, AWS/Azure/GCP solutions, hybrid cloud deployment, and managed cloud infrastructure for businesses.",
        isActive: true,
        sortOrder: 6
      },
      {
        name: "IT Consulting",
        slug: "it-consulting",
        description: "Strategic IT consulting services including digital transformation, technology audits, IT strategy development, and system integration consulting",
        icon: "users",
        color: "indigo",
        metaTitle: "IT Consulting Services | Digital Transformation & Technology Strategy",
        metaDescription: "Expert IT consulting services including digital transformation, technology audits, IT strategy planning, system integration, and business process optimization.",
        isActive: true,
        sortOrder: 7
      },
      {
        name: "Mobile App Development",
        slug: "mobile-development",
        description: "Native and cross-platform mobile app development for iOS and Android, including hybrid apps, progressive web apps, and enterprise mobile solutions",
        icon: "smartphone",
        color: "pink",
        metaTitle: "Mobile App Development | iOS & Android App Development Services",
        metaDescription: "Professional mobile app development services for iOS and Android platforms, including native apps, cross-platform solutions, and enterprise mobile applications.",
        isActive: true,
        sortOrder: 8
      },
      {
        name: "Data Analytics & AI",
        slug: "data-analytics-ai",
        description: "Advanced data analytics, business intelligence, machine learning, and artificial intelligence solutions to transform your business data into actionable insights",
        icon: "bar-chart",
        color: "teal",
        metaTitle: "Data Analytics & AI Solutions | Business Intelligence & Machine Learning",
        metaDescription: "Advanced data analytics, AI, and machine learning services including business intelligence, predictive analytics, data visualization, and automated decision systems.",
        isActive: true,
        sortOrder: 9
      },
      {
        name: "Software Development",
        slug: "software-development",
        description: "Custom software development services including enterprise applications, SaaS platforms, API development, and legacy system modernization",
        icon: "code2",
        color: "violet",
        metaTitle: "Custom Software Development | Enterprise Applications & SaaS Solutions",
        metaDescription: "Professional custom software development services including enterprise applications, SaaS platforms, API development, microservices, and legacy system modernization.",
        isActive: true,
        sortOrder: 10
      },
      {
        name: "DevOps & Automation",
        slug: "devops-automation",
        description: "DevOps implementation, CI/CD pipelines, infrastructure automation, containerization, and deployment automation to streamline your development workflow",
        icon: "git-branch",
        color: "emerald",
        metaTitle: "DevOps & Automation Services | CI/CD, Infrastructure & Deployment Automation",
        metaDescription: "Professional DevOps services including CI/CD pipelines, infrastructure automation, containerization, monitoring, and deployment automation for efficient development workflows.",
        isActive: true,
        sortOrder: 11
      },
      {
        name: "Network & Infrastructure",
        slug: "network-infrastructure",
        description: "Network design, implementation, and management services including LAN/WAN setup, network security, monitoring, and infrastructure optimization",
        icon: "network",
        color: "slate",
        metaTitle: "Network & Infrastructure Services | Network Design & Management",
        metaDescription: "Professional network and infrastructure services including network design, implementation, security, monitoring, and optimization for business connectivity.",
        isActive: true,
        sortOrder: 12
      },
      {
        name: "Database Solutions",
        slug: "database-solutions",
        description: "Database design, optimization, migration, and management services for SQL and NoSQL databases with high availability and performance tuning",
        icon: "database",
        color: "amber",
        metaTitle: "Database Solutions | Database Design, Optimization & Management",
        metaDescription: "Professional database services including database design, optimization, migration, backup solutions, and performance tuning for SQL and NoSQL databases.",
        isActive: true,
        sortOrder: 13
      },
      {
        name: "Maintenance & Support",
        slug: "maintenance-support",
        description: "Comprehensive IT maintenance and support services including 24/7 monitoring, helpdesk support, system updates, and proactive maintenance",
        icon: "wrench",
        color: "gray",
        metaTitle: "IT Maintenance & Support Services | 24/7 Technical Support",
        metaDescription: "Professional IT maintenance and support services including 24/7 monitoring, helpdesk support, system maintenance, updates, and technical assistance.",
        isActive: true,
        sortOrder: 14
      },
      {
        name: "Training & Education",
        slug: "training-education",
        description: "Professional IT training and education services including technical workshops, certification programs, and custom training solutions for teams",
        icon: "graduation-cap",
        color: "rose",
        metaTitle: "IT Training & Education Services | Technical Training & Certification",
        metaDescription: "Professional IT training and education services including technical workshops, certification programs, online training, and custom learning solutions for teams.",
        isActive: true,
        sortOrder: 15
      }
    ]).returning();

    console.log(`Inserted ${categoryInserts.length} service categories`);

    // Website Design & Development services
    const webDevServices = await db.insert(services).values([
      {
        categoryId: categoryInserts[0].id, // Website Development
        name: "UI/UX Design",
        slug: "ui-ux-design",
        description: "Professional user interface and user experience design services creating intuitive, engaging, and conversion-focused digital experiences",
        shortDescription: "Expert UI/UX design services for web and mobile applications",
        content: "Our UI/UX design services focus on creating exceptional user experiences that drive engagement and conversions. We combine user research, wireframing, prototyping, and visual design to deliver interfaces that users love and businesses profit from. Our design process includes comprehensive user journey mapping, accessibility considerations, and responsive design principles to ensure your digital products perform excellently across all devices and user groups.",
        icon: "palette",
        metaTitle: "UI/UX Design Services | User Interface & Experience Design",
        metaDescription: "Professional UI/UX design services including wireframing, prototyping, user research, and responsive design for web and mobile applications.",
        isActive: true,
        sortOrder: 1
      },
      {
        categoryId: categoryInserts[0].id,
        name: "E-commerce Development",
        slug: "ecommerce-development",
        description: "Comprehensive e-commerce development services including online store creation, payment integration, and inventory management systems",
        shortDescription: "Full-featured e-commerce development solutions",
        content: "Our e-commerce development services provide complete online selling solutions from concept to launch. We specialize in creating scalable, secure, and user-friendly online stores that convert visitors into customers. Our solutions include payment gateway integration, inventory management, order processing, customer account management, and multi-currency support. We work with leading platforms and custom solutions to ensure your e-commerce site meets your specific business needs and scales with your growth.",
        icon: "shopping-bag",
        metaTitle: "E-commerce Development Services | Online Store Development",
        metaDescription: "Professional e-commerce development services including online store creation, payment integration, inventory management, and shopping cart functionality.",
        isActive: true,
        sortOrder: 2
      },
      {
        categoryId: categoryInserts[0].id,
        name: "CMS Development",
        slug: "cms-development",
        description: "Custom content management system development and WordPress customization services for easy content management",
        shortDescription: "Professional CMS development and WordPress solutions",
        content: "Our CMS development services empower you to manage your website content with ease. We specialize in WordPress customization, custom CMS development, and headless CMS solutions that give you complete control over your digital content. Our services include theme development, plugin creation, content migration, multisite setup, and security hardening. We ensure your CMS is user-friendly, secure, and scalable to meet your growing content management needs.",
        icon: "edit",
        metaTitle: "CMS Development Services | WordPress & Custom CMS Solutions",
        metaDescription: "Professional CMS development services including WordPress customization, plugin development, theme design, and custom content management solutions.",
        isActive: true,
        sortOrder: 3
      }
    ]).returning();

    console.log(`Inserted ${webDevServices.length} website development services`);

    // Create features for UI/UX Design service
    const uiUxFeatures = await db.insert(features).values([
      {
        serviceId: webDevServices[0].id, // UI/UX Design
        name: "Wireframing & Prototyping",
        slug: "wireframing-prototyping",
        description: "Professional wireframing and prototyping services to visualize and test user interfaces before development",
        content: "Our wireframing and prototyping services provide a clear blueprint for your digital products before development begins. We create detailed wireframes that outline the structure, layout, and functionality of each page, followed by interactive prototypes that simulate the user experience. This process helps identify usability issues early, reduces development costs, and ensures stakeholder alignment. We use industry-leading tools like Figma, Sketch, and Adobe XD to create pixel-perfect wireframes and clickable prototypes that serve as comprehensive guides for developers. Our prototypes include user flow demonstrations, interaction animations, and responsive behavior across different screen sizes. This thorough prototyping phase significantly reduces revision cycles during development and ensures the final product matches your vision and user expectations.",
        technicalDetails: "Tools: Figma, Sketch, Adobe XD, InVision, Principle. Deliverables: Low-fidelity wireframes, high-fidelity prototypes, interactive clickable demos, user flow diagrams, annotation documents. Process: Information architecture analysis, user journey mapping, iterative design refinement, stakeholder review cycles, handoff documentation for developers.",
        benefits: "Reduced development costs through early problem identification, improved stakeholder communication, faster development cycles, better user experience validation, clear development guidelines, reduced post-launch revisions, enhanced project predictability.",
        metaTitle: "Wireframing & Prototyping Services | UI/UX Design Process",
        metaDescription: "Professional wireframing and prototyping services using Figma, Sketch, and Adobe XD to create interactive prototypes and user flow demonstrations.",
        isActive: true,
        sortOrder: 1
      },
      {
        serviceId: webDevServices[0].id,
        name: "User Journey Mapping",
        slug: "user-journey-mapping",
        description: "Comprehensive user journey mapping to optimize user experience and identify improvement opportunities",
        content: "User journey mapping is a critical component of our UX design process that visualizes the complete experience users have with your digital product. We analyze every touchpoint, from initial awareness through conversion and beyond, identifying pain points, opportunities, and moments of delight. Our team conducts user research, creates detailed personas, and maps out emotional journeys to understand user motivations and behaviors at each stage. This process reveals gaps in the user experience and highlights opportunities for optimization. We create comprehensive journey maps that include user actions, thoughts, emotions, and pain points, providing valuable insights for design decisions. These maps serve as reference documents throughout the design and development process, ensuring all team members understand the user's perspective and work toward creating solutions that address real user needs and business objectives.",
        technicalDetails: "Methods: User interviews, surveys, analytics analysis, persona development, touchpoint identification. Deliverables: Journey maps, persona profiles, pain point analysis, opportunity identification, emotion mapping, stakeholder workshops. Tools: Miro, Figma, UserVoice, analytics platforms.",
        benefits: "Enhanced user understanding, identification of optimization opportunities, improved cross-team alignment, data-driven design decisions, reduced user friction, increased conversion rates, better product-market fit, improved customer satisfaction.",
        metaTitle: "User Journey Mapping Services | UX Research & Analysis",
        metaDescription: "Professional user journey mapping services including persona development, touchpoint analysis, and user experience optimization strategies.",
        isActive: true,
        sortOrder: 2
      }
    ]).returning();

    console.log(`Inserted ${uiUxFeatures.length} UI/UX features`);

    // Add Web Hosting services
    const hostingServices = await db.insert(services).values([
      {
        categoryId: categoryInserts[1].id, // Web Hosting
        name: "Shared Web Hosting",
        slug: "shared-hosting",
        description: "Affordable shared hosting solutions perfect for small to medium websites with reliable performance and 24/7 support",
        shortDescription: "Cost-effective shared hosting with cPanel and SSL",
        content: "Our shared hosting solutions provide an ideal entry point for businesses looking to establish their online presence without breaking the budget. Despite being shared, our hosting infrastructure ensures reliable performance through optimized server configurations and resource management. Each shared hosting account includes cPanel access for easy website management, free SSL certificates for security, unlimited bandwidth to handle traffic spikes, and daily automated backups to protect your data. Our one-click installers make it easy to set up popular applications like WordPress, Drupal, and Joomla. With 24/7 technical support, email hosting capabilities, and uptime monitoring, our shared hosting provides everything needed to maintain a professional web presence. Our hosting environment is optimized for speed and security, with regular updates and malware scanning to keep your website safe and performing well.",
        icon: "server",
        metaTitle: "Shared Web Hosting | Affordable Hosting with cPanel & SSL",
        metaDescription: "Reliable shared web hosting with cPanel access, free SSL certificates, unlimited bandwidth, daily backups, and 24/7 support for your website.",
        isActive: true,
        sortOrder: 1
      },
      {
        categoryId: categoryInserts[1].id,
        name: "VPS Hosting",
        slug: "vps-hosting",
        description: "Virtual Private Server hosting with dedicated resources, root access, and scalable performance for growing websites",
        shortDescription: "Powerful VPS hosting with dedicated resources and full control",
        content: "Our VPS hosting solutions provide the perfect balance between shared hosting affordability and dedicated server power. With guaranteed dedicated resources, you get consistent performance regardless of other users' activities. Each VPS includes root access for complete server control, SSD storage for lightning-fast data access, and the ability to scale resources on-demand as your website grows. Our managed VPS services include server monitoring, security updates, firewall configuration, and performance optimization, allowing you to focus on your business while we handle the technical details. Choose from various Linux distributions, get a dedicated IP address, and enjoy the flexibility to install custom software and configure your server environment to meet your specific requirements. With automatic backups, DDoS protection, and 24/7 monitoring, your VPS hosting provides enterprise-level reliability at a fraction of the cost.",
        icon: "hard-drive",
        metaTitle: "VPS Hosting Services | Virtual Private Server with Root Access",
        metaDescription: "Professional VPS hosting with dedicated resources, SSD storage, root access, scalable performance, and managed services for growing websites.",
        isActive: true,
        sortOrder: 2
      }
    ]).returning();

    console.log(`Inserted ${hostingServices.length} hosting services`);

    // Add hosting features
    const hostingFeatures = await db.insert(features).values([
      {
        serviceId: hostingServices[0].id, // Shared Hosting
        name: "cPanel Access",
        slug: "cpanel-access",
        description: "User-friendly cPanel control panel for easy website and hosting management",
        content: "Our shared hosting includes comprehensive cPanel access, providing you with an intuitive web-based interface to manage all aspects of your hosting account. cPanel simplifies complex server management tasks through its user-friendly dashboard, allowing you to manage files, databases, email accounts, and domains without technical expertise. The control panel includes a file manager for uploading and organizing website files, database management tools for MySQL databases, email account creation and management, subdomain setup, DNS management, and backup restoration capabilities. Advanced features include cron job scheduling, SSL certificate management, website statistics, and one-click script installations. With cPanel, you have complete control over your hosting environment while enjoying the simplicity of a graphical interface. Regular updates ensure you have access to the latest features and security enhancements, making website management accessible to users of all technical skill levels.",
        technicalDetails: "Features: File Manager with edit capabilities, MySQL database management, phpMyAdmin access, Email account management, DNS zone editor, Subdomain management, SSL/TLS management, Website statistics, Backup wizard, Cron jobs, Error logs, Hotlink protection, IP blocking.",
        benefits: "Easy website management without technical knowledge, comprehensive hosting control, streamlined file and database management, simplified email setup, automated backup management, enhanced security controls, time-saving automation features.",
        metaTitle: "cPanel Hosting Management | Web Hosting Control Panel",
        metaDescription: "Professional cPanel access for web hosting management including file management, database control, email setup, and website administration tools.",
        isActive: true,
        sortOrder: 1
      }
    ]).returning();

    console.log("Comprehensive database expansion completed successfully!");
    console.log(`Total created: ${categoryInserts.length} categories, ${webDevServices.length + hostingServices.length} services, ${uiUxFeatures.length + hostingFeatures.length} features`);

    return {
      categories: categoryInserts.length,
      services: webDevServices.length + hostingServices.length,
      features: uiUxFeatures.length + hostingFeatures.length
    };
  } catch (error) {
    console.error("Error expanding database:", error);
    throw error;
  }
}

// Run the expansion
expandDatabaseContent()
  .then(result => {
    console.log("Database expansion completed successfully!", result);
    process.exit(0);
  })
  .catch(error => {
    console.error("Database expansion failed:", error);
    process.exit(1);
  });