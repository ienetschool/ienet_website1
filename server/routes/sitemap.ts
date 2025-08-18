import { Router } from 'express';
import { db } from '../db';
import { serviceCategories, services, features, projects } from '../../shared/schema';

const router = Router();

// Helper function to generate XML sitemap
function generateXMLSitemap(urls: Array<{
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}>) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
}

// Helper function to generate HTML sitemap
function generateHTMLSitemap(urls: Array<{
  url: string;
  title: string;
  category: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
}>) {
  const groupedUrls = urls.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof urls>);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet Sitemap - Complete Site Structure</title>
    <meta name="description" content="Complete sitemap of IeNet's IT services platform with all pages, services, and resources.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6; 
            color: #333; 
            background: #f8fafc;
            padding: 2rem;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { 
            color: #1e40af; 
            margin-bottom: 2rem; 
            font-size: 2.5rem;
            text-align: center;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 1rem;
        }
        h2 { 
            color: #1e40af; 
            margin: 2rem 0 1rem 0; 
            font-size: 1.5rem;
            background: linear-gradient(135deg, #3b82f6, #1e40af);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .sitemap-section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
        }
        .url-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        .url-item {
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1rem;
            transition: all 0.3s ease;
            position: relative;
        }
        .url-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
            border-color: #3b82f6;
        }
        .url-item a {
            color: #1e40af;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            display: block;
            margin-bottom: 0.5rem;
        }
        .url-item a:hover {
            color: #3b82f6;
            text-decoration: underline;
        }
        .url-meta {
            font-size: 0.875rem;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.5rem;
        }
        .status {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        .status.active {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
        }
        .status.inactive {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 3rem;
        }
        .stat-card {
            background: linear-gradient(135deg, #3b82f6, #1e40af);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            display: block;
        }
        .stat-label {
            font-size: 1rem;
            opacity: 0.9;
        }
        .last-updated {
            text-align: center;
            color: #64748b;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
            font-size: 0.875rem;
        }
        @media (max-width: 768px) {
            body { padding: 1rem; }
            h1 { font-size: 2rem; }
            .url-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>IeNet Complete Sitemap</h1>
        
        <div class="stats">
            <div class="stat-card">
                <span class="stat-number">${urls.length}</span>
                <span class="stat-label">Total Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${urls.filter(u => u.status === 'active').length}</span>
                <span class="stat-label">Active Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${Object.keys(groupedUrls).length}</span>
                <span class="stat-label">Categories</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${new Date().toLocaleDateString()}</span>
                <span class="stat-label">Last Updated</span>
            </div>
        </div>

        ${Object.entries(groupedUrls).map(([category, categoryUrls]) => `
        <div class="sitemap-section">
            <h2>${category}</h2>
            <div class="url-grid">
                ${categoryUrls.map(item => `
                <div class="url-item">
                    <a href="${item.url}" target="_blank">${item.title}</a>
                    <div class="url-meta">
                        <span>Updated: ${item.lastUpdated}</span>
                        <span class="status ${item.status}">${item.status}</span>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        `).join('')}

        <div class="last-updated">
            <p>Sitemap generated on ${new Date().toLocaleString()}</p>
            <p>For technical support, contact <a href="mailto:support@ienet.com">support@ienet.com</a></p>
        </div>
    </div>
</body>
</html>`;
}

// XML Sitemap endpoint
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.REPLIT_DEV_DOMAIN 
      ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
      : 'http://localhost:5000';

    // Static pages
    const staticUrls = [
      { loc: `${baseUrl}/`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '1.0' },
      { loc: `${baseUrl}/services`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.9' },
      { loc: `${baseUrl}/projects`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
      { loc: `${baseUrl}/industries`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { loc: `${baseUrl}/about`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
      { loc: `${baseUrl}/contact`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
      { loc: `${baseUrl}/faq`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.6' },
      { loc: `${baseUrl}/pricing`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
      { loc: `${baseUrl}/blog`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.8' },
      { loc: `${baseUrl}/careers`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.7' },
      { loc: `${baseUrl}/privacy-policy`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.3' },
      { loc: `${baseUrl}/terms-of-service`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.3' },
    ];

    // Dynamic service pages
    const categories = await db.select().from(serviceCategories);
    const allServices = await db.select().from(services);
    const allFeatures = await db.select().from(features);
    const allProjects = await db.select().from(projects);

    const dynamicUrls = [];

    // Service category pages
    for (const category of categories) {
      dynamicUrls.push({
        loc: `${baseUrl}/services/${category.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      });
    }

    // Service detail pages
    for (const service of allServices) {
      const category = categories.find(c => c.id === service.categoryId);
      if (category) {
        dynamicUrls.push({
          loc: `${baseUrl}/services/${category.slug}/${service.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: '0.7'
        });
      }
    }

    // Feature detail pages
    for (const feature of allFeatures) {
      const service = allServices.find(s => s.id === feature.serviceId);
      if (service) {
        const category = categories.find(c => c.id === service.categoryId);
        if (category) {
          dynamicUrls.push({
            loc: `${baseUrl}/services/${category.slug}/${service.slug}/${feature.slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'monthly',
            priority: '0.6'
          });
        }
      }
    }

    // Project detail pages
    for (const project of allProjects) {
      dynamicUrls.push({
        loc: `${baseUrl}/projects/${project.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.6'
      });
    }

    const allUrls = [...staticUrls, ...dynamicUrls];
    const xmlSitemap = generateXMLSitemap(allUrls);

    res.set('Content-Type', 'application/xml');
    res.send(xmlSitemap);
  } catch (error) {
    console.error('Error generating XML sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

// HTML Sitemap endpoint
router.get('/sitemap', async (req, res) => {
  try {
    const baseUrl = process.env.REPLIT_DEV_DOMAIN 
      ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
      : 'http://localhost:5000';

    // Static pages with live status
    const staticPages = [
      { url: '/', title: 'Home', category: 'Core Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/services', title: 'Services', category: 'Core Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/projects', title: 'Projects', category: 'Core Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/industries', title: 'Industries', category: 'Core Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/about', title: 'About Us', category: 'Company Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/contact', title: 'Contact', category: 'Company Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/faq', title: 'FAQ', category: 'Support Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/pricing', title: 'Pricing', category: 'Support Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/blog', title: 'Blog', category: 'Content Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/careers', title: 'Careers', category: 'Company Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/privacy-policy', title: 'Privacy Policy', category: 'Legal Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
      { url: '/terms-of-service', title: 'Terms of Service', category: 'Legal Pages', status: 'active' as const, lastUpdated: '2025-01-18' },
    ];

    // Dynamic pages
    const categories = await db.select().from(serviceCategories);
    const allServices = await db.select().from(services);
    const allFeatures = await db.select().from(features);
    const allProjects = await db.select().from(projects);

    const dynamicPages = [];

    // Service category pages
    for (const category of categories) {
      dynamicPages.push({
        url: `/services/${category.slug}`,
        title: category.name,
        category: 'Service Categories',
        status: 'active' as const,
        lastUpdated: '2025-01-18'
      });
    }

    // Service detail pages
    for (const service of allServices) {
      const category = categories.find(c => c.id === service.categoryId);
      if (category) {
        dynamicPages.push({
          url: `/services/${category.slug}/${service.slug}`,
          title: service.name,
          category: 'Service Details',
          status: 'active' as const,
          lastUpdated: '2025-01-18'
        });
      }
    }

    // Feature detail pages
    for (const feature of allFeatures) {
      const service = allServices.find(s => s.id === feature.serviceId);
      if (service) {
        const category = categories.find(c => c.id === service.categoryId);
        if (category) {
          dynamicPages.push({
            url: `/services/${category.slug}/${service.slug}/${feature.slug}`,
            title: feature.name,
            category: 'Feature Details',
            status: 'active' as const,
            lastUpdated: '2025-01-18'
          });
        }
      }
    }

    // Project detail pages
    for (const project of allProjects) {
      dynamicPages.push({
        url: `/projects/${project.slug}`,
        title: project.title,
        category: 'Project Showcases',
        status: 'active' as const,
        lastUpdated: '2025-01-18'
      });
    }

    const allPages = [...staticPages, ...dynamicPages].map(page => {
      const fullUrl = page.url.startsWith('http') ? page.url : `${baseUrl}${page.url}`;
      return {
        ...page,
        url: fullUrl
      };
    });

    const htmlSitemap = generateHTMLSitemap(allPages);

    res.set('Content-Type', 'text/html');
    res.send(htmlSitemap);
  } catch (error) {
    console.error('Error generating HTML sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

// Sitemap status endpoint
router.get('/sitemap/status', async (req, res) => {
  try {
    const categories = await db.select().from(serviceCategories);
    const allServices = await db.select().from(services);
    const allFeatures = await db.select().from(features);
    const allProjects = await db.select().from(projects);

    const stats = {
      totalPages: 12 + categories.length + allServices.length + allFeatures.length + allProjects.length,
      staticPages: 12,
      serviceCategories: categories.length,
      serviceDetails: allServices.length,
      featureDetails: allFeatures.length,
      projectPages: allProjects.length,
      lastGenerated: new Date().toISOString(),
      status: 'active'
    };

    res.json(stats);
  } catch (error) {
    console.error('Error getting sitemap status:', error);
    res.status(500).json({ error: 'Failed to get sitemap status' });
  }
});

export default router;