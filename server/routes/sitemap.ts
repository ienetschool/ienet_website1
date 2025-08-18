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

// Helper function to generate HTML sitemap with list format
function generateHTMLSitemap(urls: Array<{
  url: string;
  title: string;
  category: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
}>, baseUrl: string) {
  const groupedUrls = urls.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof urls>);

  const activePages = urls.filter(u => u.status === 'active');
  const inactivePages = urls.filter(u => u.status === 'inactive');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet Sitemap - Complete Site Map with Active Status</title>
    <meta name="description" content="Complete hierarchical sitemap of IeNet's IT services platform showing all active and inactive pages with status indicators.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6; 
            color: #2d3748; 
            background: #f7fafc;
            padding: 2rem;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { 
            color: #1a365d; 
            margin-bottom: 2rem; 
            font-size: 2.5rem;
            text-align: center;
            border-bottom: 4px solid #3182ce;
            padding-bottom: 1rem;
        }
        h2 { 
            color: #2c5282; 
            margin: 2.5rem 0 1rem 0; 
            font-size: 1.8rem;
            padding: 1rem;
            background: linear-gradient(135deg, #bee3f8, #90cdf4);
            border-radius: 8px;
            border-left: 6px solid #3182ce;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }
        .stat-card {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 25px -5px rgba(66, 153, 225, 0.3);
            transform: translateY(0);
            transition: transform 0.3s ease;
        }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            display: block;
        }
        .stat-label {
            font-size: 1.1rem;
            opacity: 0.95;
            font-weight: 500;
        }
        .sitemap-section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
            border: 2px solid #e2e8f0;
        }
        .url-list {
            list-style: none;
            padding: 0;
            margin-top: 1rem;
        }
        .url-item {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 0.8rem;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .url-item:hover {
            background: #edf2f7;
            border-color: #4299e1;
            transform: translateX(5px);
        }
        .url-link {
            color: #2b6cb0;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            flex-grow: 1;
        }
        .url-link:hover {
            color: #2c5282;
            text-decoration: underline;
        }
        .url-meta {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .status-badge {
            padding: 0.4rem 1rem;
            border-radius: 25px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-badge.active {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
        }
        .status-badge.inactive {
            background: linear-gradient(135deg, #ed8936, #dd6b20);
            color: white;
        }
        .last-updated-text {
            color: #718096;
            font-size: 0.85rem;
        }
        .footer-info {
            text-align: center;
            color: #718096;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px solid #e2e8f0;
            font-size: 0.95rem;
        }
        .footer-info a {
            color: #3182ce;
            text-decoration: none;
        }
        .footer-info a:hover {
            text-decoration: underline;
        }
        @media (max-width: 768px) {
            body { padding: 1rem; }
            h1 { font-size: 2rem; }
            .url-item { flex-direction: column; align-items: flex-start; }
            .url-meta { margin-top: 0.5rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌐 IeNet Complete Sitemap</h1>
        
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number">${urls.length}</span>
                <span class="stat-label">Total Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${activePages.length}</span>
                <span class="stat-label">Active Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${inactivePages.length}</span>
                <span class="stat-label">Inactive Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${Object.keys(groupedUrls).length}</span>
                <span class="stat-label">Categories</span>
            </div>
        </div>

        ${Object.entries(groupedUrls).map(([category, categoryUrls]) => `
        <div class="sitemap-section">
            <h2>📁 ${category} (${categoryUrls.length} pages)</h2>
            <ul class="url-list">
                ${categoryUrls.map(item => `
                <li class="url-item">
                    <a href="/${item.url.replace(/^https?:\/\/[^\/]+\//, '').replace(/^\/+/, '')}" class="url-link">${item.title}</a>
                    <div class="url-meta">
                        <span class="last-updated-text">Updated: ${item.lastUpdated}</span>
                        <span class="status-badge ${item.status}">${item.status}</span>
                    </div>
                </li>
                `).join('')}
            </ul>
        </div>
        `).join('')}

        <div class="footer-info">
            <p><strong>Sitemap generated on ${new Date().toLocaleString()}</strong></p>
            <p>Total Active Pages: ${activePages.length} | Total Inactive Pages: ${inactivePages.length}</p>
            <p>For technical support or questions, contact <a href="mailto:support@ienet.com">support@ienet.com</a></p>
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
    // Force HTTPS for all URLs
    const baseUrl = process.env.REPLIT_DEV_DOMAIN 
      ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
      : 'http://localhost:5000';
    
    console.log('Building sitemap with baseUrl:', baseUrl);

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

    // Force URLs to be relative paths only
    const allPages = [...staticPages, ...dynamicPages].map(page => ({
      ...page,
      url: page.url.replace(/^https?:\/\/[^\/]+/, '').replace(/^[^\/]/, '/$&')
    }));

    const htmlSitemap = generateHTMLSitemap(allPages, baseUrl);

    res.set('Content-Type', 'text/html');
    res.send(htmlSitemap);
  } catch (error) {
    console.error('Error generating HTML sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

// Sitemap status endpoint - JSON API
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

// Sitemap status dashboard - HTML view
router.get('/sitemap-status', async (req, res) => {
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

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet Sitemap Status Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        .container { 
            max-width: 1000px; 
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            padding: 3rem 2rem;
        }
        .stat-card {
            text-align: center;
            padding: 2rem;
            border-radius: 15px;
            background: linear-gradient(135deg, #f7fafc, #edf2f7);
            border: 2px solid #e2e8f0;
            transition: transform 0.3s ease;
        }
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            color: #2d3748;
            margin-bottom: 0.5rem;
            display: block;
        }
        .stat-label {
            font-size: 1.1rem;
            color: #4a5568;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-info {
            background: #f0fff4;
            border: 2px solid #68d391;
            border-radius: 15px;
            padding: 2rem;
            margin: 2rem;
            text-align: center;
        }
        .status-badge {
            display: inline-block;
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 1rem;
        }
        .timestamp {
            color: #718096;
            font-size: 0.9rem;
        }
        .actions {
            padding: 2rem;
            text-align: center;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            margin: 0 1rem;
            transition: all 0.3s ease;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(66, 153, 225, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌐 IeNet Sitemap Status</h1>
            <p>Complete Platform Overview & Statistics</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number">${stats.totalPages}</span>
                <span class="stat-label">Total Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.staticPages}</span>
                <span class="stat-label">Static Pages</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.serviceCategories}</span>
                <span class="stat-label">Service Categories</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.serviceDetails}</span>
                <span class="stat-label">Service Details</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.featureDetails}</span>
                <span class="stat-label">Feature Details</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${stats.projectPages}</span>
                <span class="stat-label">Project Pages</span>
            </div>
        </div>

        <div class="status-info">
            <div class="status-badge">${stats.status.toUpperCase()}</div>
            <p class="timestamp">Last Generated: ${new Date(stats.lastGenerated).toLocaleString()}</p>
        </div>

        <div class="actions">
            <a href="/sitemap" class="btn">View HTML Sitemap</a>
            <a href="/sitemap.xml" class="btn">View XML Sitemap</a>
            <a href="/api/sitemap/status" class="btn">JSON API</a>
        </div>
    </div>
</body>
</html>`;

    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error getting sitemap status dashboard:', error);
    res.status(500).json({ error: 'Failed to get sitemap status dashboard' });
  }
});

export default router;