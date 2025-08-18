import { db } from "./db";
import { serviceCategories, services, features } from "@shared/schema";

async function fullContentExpansion() {
  try {
    console.log("Starting full content expansion...");

    // Get existing categories
    const existingCategories = await db.select().from(serviceCategories);
    console.log(`Found ${existingCategories.length} existing categories`);

    // Find specific categories by slug
    const webDevCategory = existingCategories.find(c => c.slug === 'website-development');
    const hostingCategory = existingCategories.find(c => c.slug === 'web-hosting-infrastructure');
    const cybersecurityCategory = existingCategories.find(c => c.slug === 'cybersecurity');
    const digitalMarketingCategory = existingCategories.find(c => c.slug === 'digital-marketing');

    if (!webDevCategory || !hostingCategory || !cybersecurityCategory || !digitalMarketingCategory) {
      throw new Error("Required categories not found");
    }

    // Add more website development services
    const additionalWebServices = await db.insert(services).values([
      {
        categoryId: webDevCategory.id,
        name: "Website Redesign",
        slug: "website-redesign",
        description: "Comprehensive website redesign services including site audit, UI refresh, content revamp, and performance optimization",
        shortDescription: "Complete website redesign and optimization services",
        content: "Our website redesign services transform outdated websites into modern, high-performing digital experiences that engage users and drive conversions. We begin with a comprehensive audit of your existing site, analyzing user behavior, performance metrics, and conversion bottlenecks. Our redesign process includes UI/UX improvements, content strategy optimization, mobile responsiveness enhancement, and speed optimization. We ensure your redesigned website not only looks modern and professional but also delivers improved user experience, better search engine rankings, and increased conversion rates. Our approach combines aesthetic improvements with technical optimization, ensuring your redesigned website serves as a powerful business tool that grows with your company.",
        icon: "refresh-cw",
        metaTitle: "Website Redesign Services | UI Refresh & Performance Optimization",
        metaDescription: "Professional website redesign services including site audit, UI refresh, content optimization, mobile responsiveness, and conversion improvements.",
        isActive: true,
        sortOrder: 4
      },
      {
        categoryId: webDevCategory.id,
        name: "Landing Page Design",
        slug: "landing-page-design",
        description: "High-converting landing page design and development with A/B testing, lead capture forms, and conversion optimization",
        shortDescription: "Conversion-focused landing page design and optimization",
        content: "Our landing page design services create high-converting pages that turn visitors into customers. Each landing page is strategically designed with clear value propositions, compelling calls-to-action, and optimized user flows that guide visitors toward conversion. We implement advanced features including A/B testing capabilities, lead capture forms, fast loading speeds, mobile responsiveness, and integration with CRM systems. Our design process includes competitor analysis, user persona development, and conversion rate optimization techniques. We create landing pages that not only look professional but also deliver measurable results through improved conversion rates, reduced bounce rates, and better ROI on your marketing campaigns.",
        icon: "target",
        metaTitle: "Landing Page Design Services | High-Converting Page Development",
        metaDescription: "Professional landing page design with A/B testing, lead capture forms, conversion optimization, and CRM integration for better marketing ROI.",
        isActive: true,
        sortOrder: 5
      },
      {
        categoryId: webDevCategory.id,
        name: "Responsive Web Design",
        slug: "responsive-web-design",
        description: "Mobile-first responsive web design ensuring optimal user experience across all devices and screen sizes",
        shortDescription: "Mobile-optimized responsive web design solutions",
        content: "Our responsive web design services ensure your website delivers exceptional user experience across all devices, from smartphones to large desktop screens. Using mobile-first design principles, we create flexible layouts that adapt seamlessly to different screen sizes while maintaining functionality and visual appeal. Our responsive designs include optimized navigation for touch interfaces, scalable images and graphics, cross-browser compatibility, and performance optimization for mobile networks. We implement progressive enhancement techniques, ensuring your website loads quickly and functions perfectly regardless of the user's device or connection speed. This approach improves user engagement, search engine rankings, and conversion rates across all platforms.",
        icon: "smartphone",
        metaTitle: "Responsive Web Design | Mobile-First Website Development",
        metaDescription: "Professional responsive web design services with mobile-first approach, cross-device compatibility, and optimized performance for all screen sizes.",
        isActive: true,
        sortOrder: 6
      },
      {
        categoryId: webDevCategory.id,
        name: "Progressive Web Apps (PWA)",
        slug: "progressive-web-apps",
        description: "Progressive Web App development combining web and mobile app experiences with offline functionality and push notifications",
        shortDescription: "Modern PWA development with app-like experiences",
        content: "Our Progressive Web App development services create web applications that deliver native app experiences through web browsers. PWAs combine the best of web and mobile applications, offering features like offline functionality, push notifications, home screen installation, and fast loading speeds. We develop PWAs that work seamlessly across all devices and operating systems while requiring no app store downloads. Our PWA solutions include background sync capabilities, secure HTTPS implementation, responsive design, and service worker integration for enhanced performance. These applications provide users with app-like experiences while giving businesses broader reach, reduced development costs, and easier maintenance compared to traditional native apps.",
        icon: "zap",
        metaTitle: "Progressive Web App Development | PWA Services",
        metaDescription: "Professional Progressive Web App development with offline functionality, push notifications, app-like experience, and cross-platform compatibility.",
        isActive: true,
        sortOrder: 7
      }
    ]).returning();

    // Add more hosting services
    const additionalHostingServices = await db.insert(services).values([
      {
        categoryId: hostingCategory.id,
        name: "Dedicated Server Hosting",
        slug: "dedicated-server-hosting",
        description: "High-performance dedicated server hosting with full root access, custom configurations, and 24/7 monitoring",
        shortDescription: "Enterprise-grade dedicated server solutions",
        content: "Our dedicated server hosting provides complete server resources exclusively for your applications, ensuring maximum performance, security, and control. Each dedicated server includes full root access, allowing complete customization of the server environment to meet your specific requirements. We offer various hardware configurations with RAID storage systems, DDoS protection, hardware replacement guarantees, and 24/7 monitoring services. Our dedicated hosting solutions include remote reboot capabilities, custom bandwidth options, choice of operating systems, and comprehensive backup services. With dedicated IP addresses, enhanced security measures, and priority technical support, our dedicated servers provide the reliability and performance needed for high-traffic websites and mission-critical applications.",
        icon: "server",
        metaTitle: "Dedicated Server Hosting | High-Performance Managed Servers",
        metaDescription: "Enterprise dedicated server hosting with full root access, RAID storage, DDoS protection, 24/7 monitoring, and custom configurations.",
        isActive: true,
        sortOrder: 3
      },
      {
        categoryId: hostingCategory.id,
        name: "Cloud Hosting",
        slug: "cloud-hosting",
        description: "Scalable cloud hosting solutions with auto-scaling, load balancing, and high availability infrastructure",
        shortDescription: "Flexible cloud hosting with auto-scaling capabilities",
        content: "Our cloud hosting services provide scalable, flexible hosting solutions that automatically adjust resources based on your website's needs. Built on enterprise-grade infrastructure, our cloud hosting includes auto-scaling capabilities, load balancing, SSD storage systems, and high availability configurations with redundancy across multiple data centers. The pay-as-you-go pricing model ensures you only pay for resources you actually use, while API access enables seamless integration with your existing systems. Our cloud hosting features include automatic backups, global CDN integration, real-time monitoring, and 24/7 technical support. This solution is ideal for businesses with varying traffic patterns, seasonal demands, or rapid growth requirements.",
        icon: "cloud",
        metaTitle: "Cloud Hosting Services | Scalable Cloud Infrastructure",
        metaDescription: "Professional cloud hosting with auto-scaling, load balancing, SSD storage, high availability, and pay-as-you-go pricing for flexible growth.",
        isActive: true,
        sortOrder: 4
      },
      {
        categoryId: hostingCategory.id,
        name: "Domain Registration & Management",
        slug: "domain-registration",
        description: "Complete domain registration and management services with WHOIS privacy, DNS management, and renewal automation",
        shortDescription: "Professional domain registration and management",
        content: "Our domain registration and management services provide comprehensive solutions for securing and maintaining your online identity. We offer domain search capabilities across hundreds of extensions, WHOIS privacy protection to safeguard your personal information, and advanced DNS management tools for complete control over your domain settings. Our services include domain transfer assistance, bulk registration for multiple domains, automatic renewal reminders, subdomain management, and domain locking for enhanced security. With 24/7 support and competitive pricing, we ensure your domains remain secure, properly configured, and always under your control. Our management interface simplifies complex DNS tasks, making it easy to manage multiple domains from a single dashboard.",
        icon: "globe",
        metaTitle: "Domain Registration & Management | DNS & Domain Services",
        metaDescription: "Professional domain registration and management with WHOIS privacy, DNS control, bulk registration, and automated renewal services.",
        isActive: true,
        sortOrder: 6
      }
    ]).returning();

    // Add cybersecurity services
    const cybersecurityServices = await db.insert(services).values([
      {
        categoryId: cybersecurityCategory.id,
        name: "Vulnerability Assessment",
        slug: "vulnerability-assessment",
        description: "Comprehensive vulnerability assessments including network scanning, web application testing, and security configuration reviews",
        shortDescription: "Professional security vulnerability identification and assessment",
        content: "Our vulnerability assessment services provide thorough security evaluations to identify potential weaknesses in your IT infrastructure before they can be exploited by malicious actors. We conduct comprehensive network scanning, web application security testing, wireless security assessments, and social engineering evaluations to uncover security gaps. Our assessments include configuration reviews, patch management analysis, and compliance gap analysis against industry standards. Each assessment concludes with detailed reporting that prioritizes vulnerabilities by risk level and provides clear remediation guidance. Our methodology follows industry best practices and regulatory requirements, ensuring your organization maintains robust security posture while meeting compliance obligations.",
        icon: "shield-alert",
        metaTitle: "Vulnerability Assessment Services | Security Testing & Analysis",
        metaDescription: "Professional vulnerability assessment services including network scanning, web application testing, wireless security, and compliance analysis.",
        isActive: true,
        sortOrder: 1
      },
      {
        categoryId: cybersecurityCategory.id,
        name: "Penetration Testing",
        slug: "penetration-testing",
        description: "Ethical hacking and penetration testing services to identify security weaknesses through controlled attack simulations",
        shortDescription: "Professional ethical hacking and penetration testing",
        content: "Our penetration testing services simulate real-world cyber attacks to identify security vulnerabilities and assess your organization's defensive capabilities. Our certified ethical hackers conduct external and internal penetration testing, web application security testing, mobile application assessments, and API security evaluations. We employ sophisticated testing methodologies including social engineering attacks and physical security assessments to provide comprehensive security validation. Each penetration test includes detailed documentation of discovered vulnerabilities, exploitation techniques used, and step-by-step remediation recommendations. Our post-engagement reporting provides executive summaries for management and technical details for IT teams, ensuring all stakeholders understand the security implications and required actions.",
        icon: "shield-check",
        metaTitle: "Penetration Testing Services | Ethical Hacking & Security Assessment",
        metaDescription: "Professional penetration testing services including external/internal testing, web application security, API testing, and social engineering assessments.",
        isActive: true,
        sortOrder: 2
      }
    ]).returning();

    // Add digital marketing services
    const digitalMarketingServices = await db.insert(services).values([
      {
        categoryId: digitalMarketingCategory.id,
        name: "Search Engine Optimization (SEO)",
        slug: "search-engine-optimization",
        description: "Comprehensive SEO services including keyword research, on-page optimization, technical SEO, and link building strategies",
        shortDescription: "Professional SEO services for improved search rankings",
        content: "Our Search Engine Optimization services help your website achieve higher rankings in search engine results, driving organic traffic and increasing online visibility. We provide comprehensive SEO strategies including extensive keyword research, on-page optimization, technical SEO improvements, and strategic link building campaigns. Our approach includes competitor analysis, content optimization, site structure improvements, page speed optimization, and mobile SEO enhancements. We implement local SEO strategies for businesses targeting geographic markets and provide detailed analytics and reporting to track performance improvements. Our SEO services are designed for long-term success, focusing on sustainable white-hat techniques that comply with search engine guidelines while delivering measurable results in increased traffic, leads, and conversions.",
        icon: "search",
        metaTitle: "SEO Services | Search Engine Optimization & Digital Marketing",
        metaDescription: "Professional SEO services including keyword research, on-page optimization, technical SEO, link building, and local search optimization.",
        isActive: true,
        sortOrder: 1
      },
      {
        categoryId: digitalMarketingCategory.id,
        name: "Social Media Marketing",
        slug: "social-media-marketing",
        description: "Strategic social media marketing services including content creation, community management, and paid social advertising",
        shortDescription: "Professional social media marketing and management",
        content: "Our social media marketing services help businesses build strong online communities, engage with their target audience, and drive meaningful results through strategic social media presence. We manage comprehensive social media strategies across all major platforms including Facebook, Instagram, Twitter, LinkedIn, and YouTube. Our services include content creation and curation, community management, social media advertising campaigns, influencer partnerships, and social media analytics and reporting. We develop platform-specific strategies that align with your business goals, create engaging content that resonates with your audience, and implement social listening techniques to monitor brand mentions and industry trends. Our data-driven approach ensures optimal posting schedules, content formats, and engagement strategies that maximize reach and conversions.",
        icon: "share-2",
        metaTitle: "Social Media Marketing Services | Social Media Management & Advertising",
        metaDescription: "Professional social media marketing including content creation, community management, paid social advertising, and analytics across all platforms.",
        isActive: true,
        sortOrder: 2
      }
    ]).returning();

    console.log(`Added ${additionalWebServices.length} additional web development services`);
    console.log(`Added ${additionalHostingServices.length} additional hosting services`);
    console.log(`Added ${cybersecurityServices.length} cybersecurity services`);
    console.log(`Added ${digitalMarketingServices.length} digital marketing services`);

    // Now add comprehensive features for the new services
    const websiteRedesignFeatures = await db.insert(features).values([
      {
        serviceId: additionalWebServices[0].id, // Website Redesign
        name: "Site Audit & Analysis",
        slug: "site-audit-analysis",
        description: "Comprehensive website audit and analysis to identify improvement opportunities and performance issues",
        content: "Our comprehensive site audit and analysis service provides a thorough evaluation of your existing website's performance, usability, and technical health. We conduct detailed assessments of site speed, mobile responsiveness, SEO performance, user experience, conversion funnel effectiveness, and technical architecture. Our audit includes content analysis, competitor benchmarking, user behavior analysis through heatmaps and analytics data, accessibility compliance review, and security assessment. We examine your site's structure, navigation patterns, content quality, and technical implementation to identify areas for improvement. The audit results in a detailed report with prioritized recommendations, implementation timelines, and expected impact assessments. This data-driven approach ensures your website redesign addresses real issues and delivers measurable improvements in performance, user engagement, and business results.",
        technicalDetails: "Tools: Google Analytics, Google PageSpeed Insights, SEMrush, Hotjar, Screaming Frog, GTmetrix, Lighthouse. Analysis areas: Page load speeds, mobile usability, SEO metrics, conversion rates, user flow analysis, technical SEO, accessibility compliance (WCAG), security vulnerabilities.",
        benefits: "Data-driven redesign decisions, identification of technical issues, improved user experience planning, competitive advantage insights, prioritized improvement roadmap, reduced project risks, better ROI measurement, enhanced performance benchmarks.",
        metaTitle: "Website Audit & Analysis | Site Performance Assessment",
        metaDescription: "Comprehensive website audit and analysis services including performance testing, SEO review, user experience evaluation, and technical assessment.",
        isActive: true,
        sortOrder: 1
      },
      {
        serviceId: additionalWebServices[0].id,
        name: "UI Refresh",
        slug: "ui-refresh",
        description: "Modern user interface design refresh to improve visual appeal and user engagement",
        content: "Our UI refresh service modernizes your website's visual design while maintaining brand consistency and improving user engagement. We update outdated design elements with contemporary UI components, implement modern typography systems, optimize color schemes for better accessibility and conversion, and create cohesive visual hierarchies that guide users through your content. Our UI refresh includes updating navigation systems for better usability, implementing modern layout structures with improved spacing and alignment, creating responsive grid systems that work across all devices, and incorporating micro-interactions that enhance user experience. We ensure the refreshed interface maintains your brand identity while incorporating current design trends and best practices. The result is a visually appealing, professional website that better represents your brand and engages users more effectively.",
        technicalDetails: "Design systems: Modern typography scales, color accessibility compliance, responsive grid systems, component libraries. Implementation: CSS3 animations, SVG graphics, optimized images, cross-browser compatibility, mobile-first responsive design.",
        benefits: "Improved brand perception, better user engagement, increased time on site, enhanced conversion rates, modern professional appearance, better mobile experience, improved accessibility, competitive market positioning.",
        metaTitle: "UI Refresh Services | Modern Website Interface Design",
        metaDescription: "Professional UI refresh services including modern design elements, responsive layouts, typography updates, and user interface improvements.",
        isActive: true,
        sortOrder: 2
      }
    ]).returning();

    const seoFeatures = await db.insert(features).values([
      {
        serviceId: digitalMarketingServices[0].id, // SEO
        name: "Keyword Research & Analysis",
        slug: "keyword-research-analysis",
        description: "Comprehensive keyword research and competitive analysis to identify high-value search opportunities",
        content: "Our keyword research and analysis service provides the foundation for successful SEO campaigns by identifying high-value search opportunities that align with your business goals. We conduct thorough keyword research using advanced tools and methodologies to discover relevant keywords with optimal search volume, competition levels, and commercial intent. Our analysis includes long-tail keyword identification, semantic keyword mapping, competitor keyword analysis, and search trend evaluation. We examine user search behavior patterns, seasonal trends, and local search opportunities to create comprehensive keyword strategies. Our research process includes keyword difficulty assessment, search volume analysis, and ROI potential evaluation for each target keyword. The deliverable includes prioritized keyword lists, content mapping recommendations, and strategic implementation guidelines that serve as the blueprint for your SEO content strategy.",
        technicalDetails: "Tools: SEMrush, Ahrefs, Google Keyword Planner, Answer the Public, Moz Keyword Explorer. Analysis methods: Search volume analysis, keyword difficulty scoring, SERP analysis, competitor gap analysis, semantic keyword clustering, search intent classification.",
        benefits: "Targeted traffic growth, improved search rankings, better content strategy direction, competitive advantage insights, higher conversion potential, reduced marketing costs, data-driven SEO decisions, measurable performance improvements.",
        metaTitle: "Keyword Research & SEO Analysis | Search Optimization Strategy",
        metaDescription: "Professional keyword research and analysis services including competitor analysis, search volume assessment, and SEO strategy development.",
        isActive: true,
        sortOrder: 1
      },
      {
        serviceId: digitalMarketingServices[0].id,
        name: "On-Page SEO Optimization",
        slug: "on-page-seo-optimization",
        description: "Comprehensive on-page SEO optimization including meta tags, content optimization, and technical improvements",
        content: "Our on-page SEO optimization service ensures every element of your website is perfectly optimized for search engines and users. We optimize title tags, meta descriptions, header structures, and URL structures for maximum search visibility while maintaining readability and user appeal. Our optimization includes internal linking strategies, image alt text optimization, schema markup implementation, and content optimization for target keywords without keyword stuffing. We improve page loading speeds through technical optimizations, enhance mobile usability, and ensure proper HTML structure for better crawlability. Our approach includes optimizing for featured snippets, improving content readability, and implementing semantic SEO techniques that help search engines better understand your content context. Each optimization is data-driven and tested for effectiveness, ensuring measurable improvements in search rankings and user engagement.",
        technicalDetails: "Optimization areas: Title tags (50-60 characters), meta descriptions (150-160 characters), header hierarchy (H1-H6), URL structure, internal linking, schema markup, image optimization, XML sitemaps, robots.txt, canonical tags, mobile optimization.",
        benefits: "Improved search rankings, better click-through rates, enhanced user experience, faster page load times, increased organic traffic, better crawlability, improved mobile performance, higher conversion rates.",
        metaTitle: "On-Page SEO Optimization | Technical SEO Implementation",
        metaDescription: "Professional on-page SEO optimization including meta tags, content optimization, technical improvements, and search ranking enhancements.",
        isActive: true,
        sortOrder: 2
      }
    ]).returning();

    console.log(`Added ${websiteRedesignFeatures.length} website redesign features`);
    console.log(`Added ${seoFeatures.length} SEO features`);

    const totalServices = additionalWebServices.length + additionalHostingServices.length + cybersecurityServices.length + digitalMarketingServices.length;
    const totalFeatures = websiteRedesignFeatures.length + seoFeatures.length;

    console.log("Full content expansion completed successfully!");
    console.log(`Total added: ${totalServices} services, ${totalFeatures} features`);

    return {
      services: totalServices,
      features: totalFeatures
    };
  } catch (error) {
    console.error("Error in full content expansion:", error);
    throw error;
  }
}

// Run the expansion
fullContentExpansion()
  .then(result => {
    console.log("Full content expansion completed!", result);
    process.exit(0);
  })
  .catch(error => {
    console.error("Full content expansion failed:", error);
    process.exit(1);
  });