import { db } from "./db";
import { serviceCategories, services, features, projects } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function extendDatabaseContent() {
  try {
    console.log("Starting database content extension...");

    // Get existing categories
    const existingCategories = await db.select().from(serviceCategories);
    const existingServices = await db.select().from(services);

    // Add more services to existing categories
    const additionalServices = [];

    // Website Development - Additional Services (8 more)
    const websiteDevCategoryId = existingCategories.find(c => c.slug === 'website-development')?.id;
    if (websiteDevCategoryId) {
      const moreWebServices = [
        {
          categoryId: websiteDevCategoryId,
          name: "Frontend Framework Development",
          slug: "frontend-framework-development",
          description: "Modern frontend development using React, Vue.js, Angular, and other cutting-edge frameworks",
          shortDescription: "Advanced frontend development with modern JavaScript frameworks",
          content: "Specialized frontend development services using the latest JavaScript frameworks and libraries. We build dynamic, interactive user interfaces with React, Vue.js, Angular, Svelte, and Next.js. Our frontend solutions include state management, component libraries, performance optimization, and seamless API integration.",
          icon: "layers",
          metaTitle: "Frontend Framework Development | Modern JavaScript Solutions",
          metaDescription: "Professional frontend development with React, Vue.js, Angular, and modern JavaScript frameworks.",
          isActive: true,
          sortOrder: 13
        },
        {
          categoryId: websiteDevCategoryId,
          name: "Backend API Development",
          slug: "backend-api-development",
          description: "Robust backend services and APIs built with Node.js, Python, PHP, and other server technologies",
          shortDescription: "Scalable backend development with modern server technologies",
          content: "Comprehensive backend development services creating robust, scalable server-side applications and APIs. We use Node.js, Python (Django/Flask), PHP (Laravel), Ruby on Rails, and Java to build secure, performant backend systems with database integration, authentication, and real-time capabilities.",
          icon: "server-cog",
          metaTitle: "Backend API Development | Server-Side Application Development",
          metaDescription: "Professional backend development with Node.js, Python, PHP, and modern server technologies.",
          isActive: true,
          sortOrder: 14
        },
        {
          categoryId: websiteDevCategoryId,
          name: "Full-Stack Development",
          slug: "full-stack-development",
          description: "Complete full-stack solutions combining frontend and backend expertise",
          shortDescription: "End-to-end web application development services",
          content: "Full-stack development services covering both frontend and backend development with seamless integration. We create complete web applications using modern technology stacks like MEAN, MERN, LAMP, and JAMstack. Our full-stack solutions include database design, API development, frontend interfaces, and deployment strategies.",
          icon: "layers-3",
          metaTitle: "Full-Stack Development | Complete Web Application Solutions",
          metaDescription: "Professional full-stack development with frontend, backend, and database integration.",
          isActive: true,
          sortOrder: 15
        },
        {
          categoryId: websiteDevCategoryId,
          name: "Headless CMS Solutions",
          slug: "headless-cms-solutions",
          description: "Modern headless CMS implementations for flexible content management",
          shortDescription: "Flexible headless CMS with API-driven content delivery",
          content: "Headless CMS solutions providing flexible content management with API-driven delivery. We implement and customize headless CMS platforms like Strapi, Sanity, Contentful, and Ghost, enabling content delivery across multiple channels including websites, mobile apps, and IoT devices.",
          icon: "database-zap",
          metaTitle: "Headless CMS Solutions | API-Driven Content Management",
          metaDescription: "Professional headless CMS implementation with flexible content delivery and API integration.",
          isActive: true,
          sortOrder: 16
        },
        {
          categoryId: websiteDevCategoryId,
          name: "Web Application Security",
          slug: "web-application-security",
          description: "Comprehensive web application security implementation and testing",
          shortDescription: "Advanced security measures for web applications",
          content: "Specialized web application security services including secure coding practices, vulnerability assessment, penetration testing, and security monitoring. We implement OWASP security guidelines, SSL/TLS encryption, secure authentication, input validation, and protection against common web vulnerabilities.",
          icon: "shield-check",
          metaTitle: "Web Application Security | Secure Development & Testing",
          metaDescription: "Professional web application security with OWASP guidelines and vulnerability protection.",
          isActive: true,
          sortOrder: 17
        },
        {
          categoryId: websiteDevCategoryId,
          name: "Web Performance Consulting",
          slug: "web-performance-consulting",
          description: "Expert consulting for website speed optimization and performance enhancement",
          shortDescription: "Performance consulting and optimization expertise",
          content: "Specialized web performance consulting services to optimize website speed, improve Core Web Vitals, and enhance user experience. We conduct performance audits, implement optimization strategies, monitor performance metrics, and provide ongoing consulting to maintain optimal website performance.",
          icon: "gauge",
          metaTitle: "Web Performance Consulting | Speed Optimization Expertise",
          metaDescription: "Professional web performance consulting with speed optimization and Core Web Vitals improvement.",
          isActive: true,
          sortOrder: 18
        },
        {
          categoryId: websiteDevCategoryId,
          name: "Custom Web Components",
          slug: "custom-web-components",
          description: "Reusable web components and design system development",
          shortDescription: "Custom components and design system creation",
          content: "Development of custom web components and comprehensive design systems for consistent user interfaces. We create reusable component libraries, style guides, and design tokens that can be used across multiple projects and platforms, ensuring brand consistency and development efficiency.",
          icon: "puzzle",
          metaTitle: "Custom Web Components | Design System Development",
          metaDescription: "Professional web component development with reusable design systems and component libraries.",
          isActive: true,
          sortOrder: 19
        },
        {
          categoryId: websiteDevCategoryId,
          name: "Internationalization Services",
          slug: "internationalization-services",
          description: "Multi-language website development and localization services",
          shortDescription: "Website internationalization and localization",
          content: "Comprehensive internationalization (i18n) and localization services for multi-language websites. We implement language switching, right-to-left (RTL) support, currency conversion, date/time localization, and cultural adaptation to help your website reach global audiences effectively.",
          icon: "globe-2",
          metaTitle: "Website Internationalization | Multi-Language Development",
          metaDescription: "Professional website internationalization and localization services for global audiences.",
          isActive: true,
          sortOrder: 20
        }
      ];
      additionalServices.push(...moreWebServices);
    }

    // Mobile App Development - Additional Services (10 services)
    const mobileDevCategoryId = existingCategories.find(c => c.slug === 'mobile-app-development')?.id;
    if (mobileDevCategoryId) {
      const mobileServices = [
        {
          categoryId: mobileDevCategoryId,
          name: "Native iOS Development",
          slug: "native-ios-development",
          description: "Native iOS app development using Swift and modern iOS frameworks",
          shortDescription: "Professional iOS app development with Swift and iOS frameworks",
          content: "Native iOS development services creating high-performance applications for iPhone and iPad. We use Swift, SwiftUI, UIKit, and iOS-specific frameworks to build apps that fully utilize iOS capabilities including Core Data, CloudKit, ARKit, and native iOS features.",
          icon: "smartphone",
          metaTitle: "Native iOS Development | iPhone & iPad App Development",
          metaDescription: "Professional native iOS development with Swift, SwiftUI, and iOS-specific frameworks.",
          isActive: true,
          sortOrder: 1
        },
        {
          categoryId: mobileDevCategoryId,
          name: "Native Android Development",
          slug: "native-android-development",
          description: "Native Android app development using Kotlin and Android frameworks",
          shortDescription: "Professional Android app development with Kotlin and Android SDK",
          content: "Native Android development services creating robust applications for Android devices. We use Kotlin, Java, Android Jetpack, and modern Android frameworks to build apps that leverage Android-specific features including Material Design, Android Architecture Components, and Google Play Services.",
          icon: "android",
          metaTitle: "Native Android Development | Professional Android Apps",
          metaDescription: "Professional native Android development with Kotlin, Java, and modern Android frameworks.",
          isActive: true,
          sortOrder: 2
        },
        {
          categoryId: mobileDevCategoryId,
          name: "Cross-Platform Development",
          slug: "cross-platform-development",
          description: "Cross-platform mobile development using React Native, Flutter, and Xamarin",
          shortDescription: "Multi-platform mobile apps with shared codebase",
          content: "Cross-platform mobile development services enabling code sharing between iOS and Android platforms. We use React Native, Flutter, and Xamarin to build high-quality mobile apps with native performance while reducing development time and costs through shared codebase approaches.",
          icon: "smartphone-nfc",
          metaTitle: "Cross-Platform Mobile Development | React Native & Flutter",
          metaDescription: "Professional cross-platform mobile development with React Native, Flutter, and shared codebase.",
          isActive: true,
          sortOrder: 3
        },
        {
          categoryId: mobileDevCategoryId,
          name: "Mobile UI/UX Design",
          slug: "mobile-ui-ux-design",
          description: "Mobile-specific user interface and experience design",
          shortDescription: "Mobile-optimized UI/UX design and prototyping",
          content: "Specialized mobile UI/UX design services focusing on mobile-specific interaction patterns, touch interfaces, and mobile user behaviors. We create intuitive designs that follow platform-specific guidelines (iOS Human Interface Guidelines and Material Design) while providing excellent user experiences.",
          icon: "palette",
          metaTitle: "Mobile UI/UX Design | Mobile Interface Design",
          metaDescription: "Professional mobile UI/UX design with platform-specific guidelines and touch-optimized interfaces.",
          isActive: true,
          sortOrder: 4
        },
        {
          categoryId: mobileDevCategoryId,
          name: "App Store Optimization",
          slug: "app-store-optimization",
          description: "App store optimization for better visibility and downloads",
          shortDescription: "ASO services for improved app store rankings",
          content: "App Store Optimization (ASO) services to improve your app's visibility and download rates in app stores. We optimize app titles, descriptions, keywords, screenshots, and reviews to increase organic discovery and downloads from both Apple App Store and Google Play Store.",
          icon: "trending-up",
          metaTitle: "App Store Optimization | ASO Services for Mobile Apps",
          metaDescription: "Professional app store optimization services for improved visibility and downloads.",
          isActive: true,
          sortOrder: 5
        },
        {
          categoryId: mobileDevCategoryId,
          name: "Mobile App Testing",
          slug: "mobile-app-testing",
          description: "Comprehensive mobile app testing across devices and platforms",
          shortDescription: "Complete mobile app testing and quality assurance",
          content: "Comprehensive mobile app testing services ensuring your app works flawlessly across different devices, operating systems, and usage scenarios. We perform functional testing, usability testing, performance testing, security testing, and automated testing to deliver high-quality mobile applications.",
          icon: "check-circle-2",
          metaTitle: "Mobile App Testing | Quality Assurance for Mobile Apps",
          metaDescription: "Professional mobile app testing services with comprehensive quality assurance across devices.",
          isActive: true,
          sortOrder: 6
        },
        {
          categoryId: mobileDevCategoryId,
          name: "Mobile Backend Services",
          slug: "mobile-backend-services",
          description: "Backend services and APIs specifically designed for mobile applications",
          shortDescription: "Mobile-optimized backend services and API development",
          content: "Backend services specifically designed for mobile applications including user authentication, push notifications, data synchronization, offline capabilities, and mobile-optimized APIs. We ensure efficient data usage, battery optimization, and seamless connectivity for mobile devices.",
          icon: "server",
          metaTitle: "Mobile Backend Services | Mobile-Optimized API Development",
          metaDescription: "Professional mobile backend services with push notifications, sync, and mobile-optimized APIs.",
          isActive: true,
          sortOrder: 7
        },
        {
          categoryId: mobileDevCategoryId,
          name: "Augmented Reality Apps",
          slug: "augmented-reality-apps",
          description: "AR mobile applications using ARKit, ARCore, and Unity",
          shortDescription: "Immersive AR mobile app development",
          content: "Augmented Reality mobile app development services creating immersive experiences using ARKit (iOS), ARCore (Android), and Unity 3D. We develop AR applications for retail, education, gaming, marketing, and industrial use cases with advanced computer vision and 3D rendering capabilities.",
          icon: "eye",
          metaTitle: "Augmented Reality Mobile Apps | AR Development Services",
          metaDescription: "Professional AR mobile app development with ARKit, ARCore, and immersive experiences.",
          isActive: true,
          sortOrder: 8
        },
        {
          categoryId: mobileDevCategoryId,
          name: "Mobile Commerce Apps",
          slug: "mobile-commerce-apps",
          description: "E-commerce mobile applications with payment integration",
          shortDescription: "Mobile commerce apps with secure payment processing",
          content: "Mobile commerce application development services creating feature-rich shopping apps with secure payment processing, product catalogs, shopping carts, order management, and customer accounts. We integrate with popular payment gateways and ensure PCI compliance for secure transactions.",
          icon: "shopping-cart",
          metaTitle: "Mobile Commerce Apps | E-commerce Mobile Applications",
          metaDescription: "Professional mobile commerce app development with secure payments and shopping features.",
          isActive: true,
          sortOrder: 9
        },
        {
          categoryId: mobileDevCategoryId,
          name: "Enterprise Mobile Solutions",
          slug: "enterprise-mobile-solutions",
          description: "Enterprise-grade mobile applications with security and integration",
          shortDescription: "Secure enterprise mobile apps with system integration",
          content: "Enterprise mobile solution development services creating secure, scalable applications for business use. We develop mobile apps with enterprise-grade security, system integration, offline capabilities, device management, and compliance features tailored for corporate environments.",
          icon: "building-2",
          metaTitle: "Enterprise Mobile Solutions | Business Mobile Applications",
          metaDescription: "Professional enterprise mobile development with security, integration, and business features.",
          isActive: true,
          sortOrder: 10
        }
      ];
      additionalServices.push(...mobileServices);
    }

    // AI & Machine Learning - Additional Services (8 services)
    const aiCategoryId = existingCategories.find(c => c.slug === 'ai-machine-learning')?.id;
    if (aiCategoryId) {
      const aiServices = [
        {
          categoryId: aiCategoryId,
          name: "Machine Learning Model Development",
          slug: "machine-learning-model-development",
          description: "Custom machine learning models for predictive analytics and automation",
          shortDescription: "Custom ML models for business intelligence and automation",
          content: "Machine learning model development services creating custom algorithms for predictive analytics, classification, regression, clustering, and recommendation systems. We use Python, TensorFlow, PyTorch, and scikit-learn to build, train, and deploy ML models tailored to your business needs.",
          icon: "brain",
          metaTitle: "Machine Learning Model Development | Custom ML Solutions",
          metaDescription: "Professional ML model development with predictive analytics and custom algorithms.",
          isActive: true,
          sortOrder: 1
        },
        {
          categoryId: aiCategoryId,
          name: "Natural Language Processing",
          slug: "natural-language-processing",
          description: "NLP solutions for text analysis, chatbots, and language understanding",
          shortDescription: "Advanced NLP for text analysis and language processing",
          content: "Natural Language Processing services including text analysis, sentiment analysis, language translation, chatbot development, and document processing. We implement NLP solutions using advanced techniques like transformers, BERT, GPT models, and custom language models for business applications.",
          icon: "message-square",
          metaTitle: "Natural Language Processing | NLP Solutions & Text Analysis",
          metaDescription: "Professional NLP services with text analysis, chatbots, and language understanding.",
          isActive: true,
          sortOrder: 2
        },
        {
          categoryId: aiCategoryId,
          name: "Computer Vision Solutions",
          slug: "computer-vision-solutions",
          description: "Computer vision applications for image recognition and analysis",
          shortDescription: "AI-powered image recognition and computer vision",
          content: "Computer vision solutions for image recognition, object detection, facial recognition, optical character recognition (OCR), and visual quality inspection. We develop CV applications using OpenCV, deep learning frameworks, and cloud vision APIs for various industries and use cases.",
          icon: "camera",
          metaTitle: "Computer Vision Solutions | Image Recognition & Analysis",
          metaDescription: "Professional computer vision services with image recognition and AI-powered analysis.",
          isActive: true,
          sortOrder: 3
        },
        {
          categoryId: aiCategoryId,
          name: "Predictive Analytics",
          slug: "predictive-analytics",
          description: "Data-driven predictive models for business forecasting and decision-making",
          shortDescription: "Business intelligence with predictive modeling",
          content: "Predictive analytics services using machine learning to forecast business trends, customer behavior, demand planning, and risk assessment. We build predictive models that help businesses make data-driven decisions and optimize operations through advanced statistical analysis and ML algorithms.",
          icon: "trending-up",
          metaTitle: "Predictive Analytics | Business Forecasting & ML Models",
          metaDescription: "Professional predictive analytics with ML models for business forecasting and optimization.",
          isActive: true,
          sortOrder: 4
        },
        {
          categoryId: aiCategoryId,
          name: "AI Chatbot Development",
          slug: "ai-chatbot-development",
          description: "Intelligent chatbots with natural language understanding",
          shortDescription: "Advanced AI chatbots with natural conversation abilities",
          content: "AI chatbot development services creating intelligent conversational interfaces with natural language understanding, context awareness, and integration capabilities. We build chatbots for customer service, sales support, technical assistance, and internal business processes using advanced NLP and ML techniques.",
          icon: "bot",
          metaTitle: "AI Chatbot Development | Intelligent Conversational Interfaces",
          metaDescription: "Professional AI chatbot development with natural language understanding and conversation abilities.",
          isActive: true,
          sortOrder: 5
        },
        {
          categoryId: aiCategoryId,
          name: "Recommendation Systems",
          slug: "recommendation-systems",
          description: "Personalized recommendation engines for enhanced user experience",
          shortDescription: "AI-powered recommendation engines and personalization",
          content: "Recommendation system development services creating personalized experiences for e-commerce, content platforms, and applications. We implement collaborative filtering, content-based filtering, and hybrid recommendation algorithms to increase user engagement and conversion rates.",
          icon: "heart",
          metaTitle: "AI Recommendation Systems | Personalized User Experiences",
          metaDescription: "Professional recommendation system development with personalized AI algorithms.",
          isActive: true,
          sortOrder: 6
        },
        {
          categoryId: aiCategoryId,
          name: "Deep Learning Solutions",
          slug: "deep-learning-solutions",
          description: "Advanced deep learning models for complex AI applications",
          shortDescription: "Custom deep learning models and neural networks",
          content: "Deep learning solution development using neural networks, convolutional neural networks (CNNs), recurrent neural networks (RNNs), and transformer architectures. We create sophisticated AI models for image processing, speech recognition, time series analysis, and complex pattern recognition tasks.",
          icon: "network",
          metaTitle: "Deep Learning Solutions | Neural Networks & AI Models",
          metaDescription: "Professional deep learning development with neural networks and advanced AI models.",
          isActive: true,
          sortOrder: 7
        },
        {
          categoryId: aiCategoryId,
          name: "AI Integration Services",
          slug: "ai-integration-services",
          description: "Integration of AI capabilities into existing systems and workflows",
          shortDescription: "Seamless AI integration into business systems",
          content: "AI integration services to incorporate artificial intelligence capabilities into existing business systems and workflows. We provide API development, model deployment, cloud AI services integration, and custom AI solutions that enhance current processes without disrupting established operations.",
          icon: "plug",
          metaTitle: "AI Integration Services | Business System AI Enhancement",
          metaDescription: "Professional AI integration services for existing systems and business workflows.",
          isActive: true,
          sortOrder: 8
        }
      ];
      additionalServices.push(...aiServices);
    }

    // E-commerce Solutions - Additional Services (12 services)
    const ecommerceCategoryId = existingCategories.find(c => c.slug === 'ecommerce-solutions')?.id;
    if (ecommerceCategoryId) {
      const ecommerceServices = [
        {
          categoryId: ecommerceCategoryId,
          name: "Custom E-commerce Development",
          slug: "custom-ecommerce-development",
          description: "Bespoke e-commerce platforms tailored to specific business requirements",
          shortDescription: "Custom-built e-commerce solutions for unique business needs",
          content: "Custom e-commerce development services creating tailored online stores that perfectly match your business model and requirements. We build from scratch using modern technologies to deliver unique shopping experiences with custom functionality, advanced features, and seamless integrations.",
          icon: "store",
          metaTitle: "Custom E-commerce Development | Bespoke Online Stores",
          metaDescription: "Professional custom e-commerce development with tailored solutions and unique functionality.",
          isActive: true,
          sortOrder: 1
        },
        {
          categoryId: ecommerceCategoryId,
          name: "Shopify Development",
          slug: "shopify-development",
          description: "Shopify store development, customization, and optimization",
          shortDescription: "Professional Shopify development and customization",
          content: "Comprehensive Shopify development services including store setup, theme customization, app integration, and performance optimization. We create beautiful, functional Shopify stores with custom features, payment integration, inventory management, and marketing tools to maximize sales.",
          icon: "shopping-bag",
          metaTitle: "Shopify Development | Professional Shopify Store Services",
          metaDescription: "Professional Shopify development with customization, optimization, and feature integration.",
          isActive: true,
          sortOrder: 2
        },
        {
          categoryId: ecommerceCategoryId,
          name: "WooCommerce Solutions",
          slug: "woocommerce-solutions",
          description: "WordPress WooCommerce development and customization",
          shortDescription: "WooCommerce development for WordPress-based stores",
          content: "WooCommerce development services creating powerful WordPress-based e-commerce solutions. We develop custom WooCommerce stores with advanced functionality, payment gateways, shipping integrations, product configurators, and performance optimization for scalable online businesses.",
          icon: "wordpress",
          metaTitle: "WooCommerce Development | WordPress E-commerce Solutions",
          metaDescription: "Professional WooCommerce development with WordPress integration and custom functionality.",
          isActive: true,
          sortOrder: 3
        },
        {
          categoryId: ecommerceCategoryId,
          name: "Magento Development",
          slug: "magento-development",
          description: "Magento e-commerce development for enterprise-level online stores",
          shortDescription: "Enterprise Magento development and customization",
          content: "Magento development services for enterprise-level e-commerce solutions with advanced features, multi-store management, B2B capabilities, and extensive customization options. We create scalable Magento stores with complex product catalogs, advanced pricing, and enterprise integrations.",
          icon: "building",
          metaTitle: "Magento Development | Enterprise E-commerce Solutions",
          metaDescription: "Professional Magento development for enterprise-level online stores and B2B solutions.",
          isActive: true,
          sortOrder: 4
        },
        {
          categoryId: ecommerceCategoryId,
          name: "Payment Gateway Integration",
          slug: "payment-gateway-integration",
          description: "Secure payment processing integration for e-commerce platforms",
          shortDescription: "Multiple payment gateway integration and processing",
          content: "Payment gateway integration services connecting your e-commerce store with secure payment processors including Stripe, PayPal, Square, and regional payment providers. We ensure PCI compliance, fraud protection, and seamless checkout experiences for customers worldwide.",
          icon: "credit-card",
          metaTitle: "Payment Gateway Integration | Secure E-commerce Payments",
          metaDescription: "Professional payment gateway integration with secure processing and PCI compliance.",
          isActive: true,
          sortOrder: 5
        },
        {
          categoryId: ecommerceCategoryId,
          name: "Inventory Management Systems",
          slug: "inventory-management-systems",
          description: "Advanced inventory management and warehouse integration",
          shortDescription: "Comprehensive inventory tracking and management",
          content: "Inventory management system development with real-time tracking, automated reordering, warehouse integration, multi-location support, and detailed reporting. We create systems that sync with your e-commerce platform to maintain accurate inventory levels and prevent stockouts.",
          icon: "package",
          metaTitle: "Inventory Management Systems | E-commerce Stock Control",
          metaDescription: "Professional inventory management systems with real-time tracking and warehouse integration.",
          isActive: true,
          sortOrder: 6
        },
        {
          categoryId: ecommerceCategoryId,
          name: "Multi-vendor Marketplaces",
          slug: "multi-vendor-marketplaces",
          description: "Marketplace platforms enabling multiple sellers and vendors",
          shortDescription: "Complete marketplace platforms with vendor management",
          content: "Multi-vendor marketplace development creating platforms where multiple sellers can list and sell products. Features include vendor registration, product management, commission tracking, payment distribution, dispute resolution, and comprehensive admin controls for marketplace operators.",
          icon: "users",
          metaTitle: "Multi-vendor Marketplaces | Marketplace Platform Development",
          metaDescription: "Professional multi-vendor marketplace development with vendor management and commission tracking.",
          isActive: true,
          sortOrder: 7
        },
        {
          categoryId: ecommerceCategoryId,
          name: "B2B E-commerce Solutions",
          slug: "b2b-ecommerce-solutions",
          description: "Business-to-business e-commerce platforms with enterprise features",
          shortDescription: "B2B e-commerce with wholesale and enterprise features",
          content: "B2B e-commerce development services creating platforms for business-to-business transactions with features like bulk ordering, custom pricing, quote requests, approval workflows, credit terms, and integration with ERP systems. Designed for wholesale and enterprise sales channels.",
          icon: "handshake",
          metaTitle: "B2B E-commerce Solutions | Business-to-Business Platforms",
          metaDescription: "Professional B2B e-commerce development with wholesale features and enterprise integration.",
          isActive: true,
          sortOrder: 8
        },
        {
          categoryId: ecommerceCategoryId,
          name: "Mobile Commerce Apps",
          slug: "mobile-commerce-apps",
          description: "Native mobile apps for e-commerce with seamless shopping experience",
          shortDescription: "Mobile shopping apps with native functionality",
          content: "Mobile commerce app development creating native iOS and Android shopping applications with seamless user experience, push notifications, mobile payments, offline browsing, and synchronization with web platforms. Optimized for mobile shopping behaviors and conversion.",
          icon: "smartphone",
          metaTitle: "Mobile Commerce Apps | Native E-commerce Mobile Applications",
          metaDescription: "Professional mobile commerce app development with native functionality and mobile optimization.",
          isActive: true,
          sortOrder: 9
        },
        {
          categoryId: ecommerceCategoryId,
          name: "E-commerce Analytics",
          slug: "ecommerce-analytics",
          description: "Advanced analytics and reporting for e-commerce optimization",
          shortDescription: "Business intelligence and analytics for online stores",
          content: "E-commerce analytics services providing comprehensive insights into sales performance, customer behavior, inventory trends, and marketing effectiveness. We implement advanced tracking, custom dashboards, and automated reporting to help optimize your online business operations.",
          icon: "bar-chart",
          metaTitle: "E-commerce Analytics | Business Intelligence for Online Stores",
          metaDescription: "Professional e-commerce analytics with sales insights and performance optimization.",
          isActive: true,
          sortOrder: 10
        },
        {
          categoryId: ecommerceCategoryId,
          name: "Subscription Commerce",
          slug: "subscription-commerce",
          description: "Subscription-based e-commerce platforms and recurring billing",
          shortDescription: "Subscription platforms with recurring billing management",
          content: "Subscription commerce development services creating platforms for recurring revenue models with subscription management, billing automation, customer retention tools, and analytics. Perfect for SaaS products, digital services, and physical subscription boxes.",
          icon: "repeat",
          metaTitle: "Subscription Commerce | Recurring Billing E-commerce Platforms",
          metaDescription: "Professional subscription commerce development with recurring billing and retention tools.",
          isActive: true,
          sortOrder: 11
        },
        {
          categoryId: ecommerceCategoryId,
          name: "E-commerce Migration",
          slug: "ecommerce-migration",
          description: "Platform migration services preserving data and functionality",
          shortDescription: "Seamless e-commerce platform migration services",
          content: "E-commerce migration services helping businesses move between platforms while preserving products, customers, orders, and SEO rankings. We handle complex migrations from legacy systems to modern platforms with minimal downtime and data integrity assurance.",
          icon: "move",
          metaTitle: "E-commerce Migration | Platform Transfer Services",
          metaDescription: "Professional e-commerce migration services with data preservation and minimal downtime.",
          isActive: true,
          sortOrder: 12
        }
      ];
      additionalServices.push(...ecommerceServices);
    }

    // Insert additional services
    if (additionalServices.length > 0) {
      const insertedAdditionalServices = await db.insert(services).values(additionalServices).returning();
      console.log(`Inserted ${insertedAdditionalServices.length} additional services`);

      // Now add extensive features for these new services
      const extensiveFeatures = [];

      // Add features for each new service (10-15 features per service)
      for (const service of insertedAdditionalServices) {
        // Generate features based on service type
        const serviceFeatures = generateFeaturesForService(service);
        extensiveFeatures.push(...serviceFeatures);
      }

      // Insert extensive features
      if (extensiveFeatures.length > 0) {
        const insertedExtensiveFeatures = await db.insert(features).values(extensiveFeatures).returning();
        console.log(`Inserted ${insertedExtensiveFeatures.length} extensive features`);
      }

      console.log(`Content extension completed successfully!`);
      console.log(`Added ${insertedAdditionalServices.length} services and ${extensiveFeatures.length} features`);
    }

    // Add more showcase projects
    const additionalProjects = [
      {
        title: "Financial Trading Platform",
        slug: "financial-trading-platform",
        description: "Advanced trading platform with real-time market data and algorithmic trading capabilities",
        shortDescription: "Professional trading platform with real-time data and algorithms",
        content: "A sophisticated financial trading platform providing real-time market data, advanced charting, algorithmic trading capabilities, portfolio management, and risk analysis tools. The platform includes order management, trade execution, compliance monitoring, and integration with major financial data providers and exchanges.",
        imageUrl: "/images/projects/trading-platform.jpg",
        demoUrl: "https://demo.trading-platform.ieNet.com",
        technologies: JSON.stringify(["React", "WebSocket", "Python", "PostgreSQL", "Redis", "Chart.js", "Algorithmic Trading"]),
        category: "Financial Technology",
        clientName: "Global Trading Solutions",
        completionDate: new Date('2024-01-25'),
        metaTitle: "Financial Trading Platform | Real-Time Trading Solutions",
        metaDescription: "Advanced financial trading platform with real-time market data and algorithmic trading capabilities.",
        isActive: true,
        isFeatured: true,
        sortOrder: 7
      },
      {
        title: "Smart Manufacturing IoT System",
        slug: "smart-manufacturing-iot-system",
        description: "IoT-enabled manufacturing system with predictive maintenance and quality control",
        shortDescription: "IoT manufacturing system with predictive analytics",
        content: "An intelligent manufacturing system integrating IoT sensors, predictive maintenance algorithms, quality control automation, and real-time production monitoring. The system includes machine learning models for failure prediction, automated quality inspection, production optimization, and comprehensive reporting dashboards.",
        imageUrl: "/images/projects/manufacturing-iot.jpg",
        demoUrl: "https://demo.manufacturing-iot.ieNet.com",
        technologies: JSON.stringify(["IoT", "Machine Learning", "Python", "InfluxDB", "Grafana", "MQTT", "Edge Computing"]),
        category: "Industrial IoT",
        clientName: "Advanced Manufacturing Corp",
        completionDate: new Date('2024-02-28'),
        metaTitle: "Smart Manufacturing IoT System | Industrial Automation",
        metaDescription: "IoT-enabled manufacturing system with predictive maintenance and intelligent quality control.",
        isActive: true,
        isFeatured: true,
        sortOrder: 8
      }
    ];

    const insertedAdditionalProjects = await db.insert(projects).values(additionalProjects).returning();
    console.log(`Inserted ${insertedAdditionalProjects.length} additional showcase projects`);

  } catch (error) {
    console.error("Error extending database content:", error);
    throw error;
  }
}

function generateFeaturesForService(service: any) {
  const features = [];
  const baseFeatures = [
    {
      name: "Requirements Analysis",
      slug: `${service.slug}-requirements-analysis`,
      description: "Comprehensive analysis of project requirements and technical specifications",
      content: "Detailed requirements analysis including stakeholder interviews, technical specification documentation, user story creation, and project scope definition to ensure clear understanding of project goals and deliverables.",
      technicalDetails: "Requirements gathering using industry-standard methodologies, documentation in structured formats, and validation with stakeholders.",
      benefits: "Clear project scope, reduced development risks, accurate time estimates, and stakeholder alignment.",
      metaTitle: `${service.name} Requirements Analysis | Project Planning`,
      metaDescription: `Professional requirements analysis for ${service.name} ensuring clear project scope and deliverables.`,
      sortOrder: 1
    },
    {
      name: "Technical Architecture Design",
      slug: `${service.slug}-technical-architecture`,
      description: "Scalable technical architecture planning and system design",
      content: "Comprehensive technical architecture design including system components, data flow diagrams, technology stack selection, scalability planning, and integration points to ensure robust and maintainable solutions.",
      technicalDetails: "Architecture documentation, technology evaluation, scalability analysis, and integration planning.",
      benefits: "Scalable solutions, reduced technical debt, improved maintainability, and future-proof architecture.",
      metaTitle: `${service.name} Technical Architecture | System Design`,
      metaDescription: `Professional technical architecture design for ${service.name} with scalability and maintainability.`,
      sortOrder: 2
    },
    {
      name: "User Experience Design",
      slug: `${service.slug}-user-experience-design`,
      description: "User-centered design approach with usability testing and optimization",
      content: "User experience design services including user research, persona development, user journey mapping, wireframing, prototyping, and usability testing to create intuitive and engaging user interfaces.",
      technicalDetails: "UX research methodologies, design thinking processes, prototyping tools, and usability testing protocols.",
      benefits: "Improved user satisfaction, higher conversion rates, reduced support costs, and competitive advantage.",
      metaTitle: `${service.name} UX Design | User Experience Optimization`,
      metaDescription: `Professional UX design for ${service.name} with user research and conversion optimization.`,
      sortOrder: 3
    },
    {
      name: "Security Implementation",
      slug: `${service.slug}-security-implementation`,
      description: "Comprehensive security measures and vulnerability protection",
      content: "Security implementation including authentication systems, data encryption, access controls, vulnerability assessments, and compliance with industry security standards to protect against cyber threats.",
      technicalDetails: "Security frameworks, encryption protocols, access control mechanisms, and vulnerability scanning tools.",
      benefits: "Data protection, regulatory compliance, reduced security risks, and customer trust.",
      metaTitle: `${service.name} Security | Comprehensive Protection`,
      metaDescription: `Professional security implementation for ${service.name} with vulnerability protection and compliance.`,
      sortOrder: 4
    },
    {
      name: "Performance Optimization",
      slug: `${service.slug}-performance-optimization`,
      description: "System performance optimization and scalability improvements",
      content: "Performance optimization services including code optimization, database tuning, caching strategies, load balancing, and monitoring to ensure optimal system performance under various load conditions.",
      technicalDetails: "Performance profiling, database optimization, caching mechanisms, and monitoring tools.",
      benefits: "Faster response times, improved user experience, cost efficiency, and higher capacity.",
      metaTitle: `${service.name} Performance | Speed Optimization`,
      metaDescription: `Professional performance optimization for ${service.name} improving speed and scalability.`,
      sortOrder: 5
    },
    {
      name: "Quality Assurance Testing",
      slug: `${service.slug}-quality-assurance`,
      description: "Comprehensive testing strategies ensuring reliability and functionality",
      content: "Quality assurance testing including functional testing, integration testing, performance testing, security testing, and user acceptance testing to ensure high-quality deliverables.",
      technicalDetails: "Testing frameworks, automated testing tools, test case management, and defect tracking systems.",
      benefits: "Reduced bugs, improved reliability, faster deployment, and customer satisfaction.",
      metaTitle: `${service.name} QA Testing | Quality Assurance`,
      metaDescription: `Professional quality assurance testing for ${service.name} ensuring reliability and functionality.`,
      sortOrder: 6
    },
    {
      name: "Integration Services",
      slug: `${service.slug}-integration-services`,
      description: "Seamless integration with existing systems and third-party services",
      content: "Integration services connecting your solution with existing systems, third-party APIs, databases, and external services to ensure seamless data flow and functionality across your technology ecosystem.",
      technicalDetails: "API development, data mapping, system connectors, and integration testing.",
      benefits: "Seamless workflows, data consistency, reduced manual work, and improved efficiency.",
      metaTitle: `${service.name} Integration | System Connectivity`,
      metaDescription: `Professional integration services for ${service.name} connecting systems and services.`,
      sortOrder: 7
    },
    {
      name: "Documentation & Training",
      slug: `${service.slug}-documentation-training`,
      description: "Comprehensive documentation and user training programs",
      content: "Documentation and training services including technical documentation, user manuals, training materials, video tutorials, and hands-on training sessions to ensure successful adoption and usage.",
      technicalDetails: "Documentation standards, training methodologies, e-learning platforms, and knowledge management systems.",
      benefits: "Faster user adoption, reduced support costs, improved efficiency, and knowledge retention.",
      metaTitle: `${service.name} Documentation | Training Programs`,
      metaDescription: `Professional documentation and training for ${service.name} ensuring successful adoption.`,
      sortOrder: 8
    },
    {
      name: "Deployment & Launch",
      slug: `${service.slug}-deployment-launch`,
      description: "Smooth deployment process with monitoring and launch support",
      content: "Deployment and launch services including production environment setup, deployment automation, monitoring configuration, launch planning, and post-launch support to ensure successful go-live.",
      technicalDetails: "Deployment pipelines, environment configuration, monitoring tools, and launch procedures.",
      benefits: "Smooth launches, reduced downtime, quick issue resolution, and successful project delivery.",
      metaTitle: `${service.name} Deployment | Launch Support`,
      metaDescription: `Professional deployment and launch services for ${service.name} with monitoring and support.`,
      sortOrder: 9
    },
    {
      name: "Ongoing Support & Maintenance",
      slug: `${service.slug}-support-maintenance`,
      description: "Continuous support and maintenance services for long-term success",
      content: "Ongoing support and maintenance services including bug fixes, feature updates, performance monitoring, security updates, and technical support to ensure continued success and optimal performance.",
      technicalDetails: "Support ticketing systems, maintenance schedules, monitoring tools, and update procedures.",
      benefits: "Continued reliability, improved features, security updates, and peace of mind.",
      metaTitle: `${service.name} Support | Ongoing Maintenance`,
      metaDescription: `Professional support and maintenance for ${service.name} ensuring long-term success.`,
      sortOrder: 10
    }
  ];

  // Add service ID to features
  baseFeatures.forEach(feature => {
    (feature as any).serviceId = service.id;
    features.push(feature);
  });

  return features;
}