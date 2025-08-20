// Sitemap generation utilities for SEO

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

interface SitemapData {
  categories: Array<{ id: number; name: string; slug: string; }>;
  services: Array<{ id: number; categorySlug: string; name: string; slug: string; }>;
  features: Array<{ id: number; categorySlug: string; serviceSlug: string; name: string; slug: string; }>;
  projects: Array<{ id: number; name: string; slug: string; }>;
}

export const generateSitemapEntries = (data: SitemapData, baseUrl: string = ''): SitemapEntry[] => {
  const entries: SitemapEntry[] = [];
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: '/', priority: 1.0, changeFreq: 'weekly' as const },
    { url: '/services', priority: 0.9, changeFreq: 'weekly' as const },
    { url: '/projects', priority: 0.8, changeFreq: 'weekly' as const },
    { url: '/about', priority: 0.7, changeFreq: 'monthly' as const },
    { url: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
  ];

  staticPages.forEach(page => {
    entries.push({
      url: `${baseUrl}${page.url}`,
      lastModified: now,
      changeFrequency: page.changeFreq,
      priority: page.priority
    });
  });

  // Service category pages (Tier 1)
  data.categories.forEach(category => {
    entries.push({
      url: `${baseUrl}/services/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    });
  });

  // Sub-service pages (Tier 2) 
  data.services.forEach(service => {
    entries.push({
      url: `${baseUrl}/services/${service.categorySlug}/${service.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    });
  });

  // Feature pages (Tier 3)
  data.features.forEach(feature => {
    entries.push({
      url: `${baseUrl}/services/${feature.categorySlug}/${feature.serviceSlug}/${feature.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
    });
  });

  // Project pages
  data.projects.forEach(project => {
    entries.push({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    });
  });

  return entries;
};

export const generateXMLSitemap = (entries: SitemapEntry[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>';
  
  const urls = entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n');

  return xmlHeader + urlsetOpen + urls + '\n' + urlsetClose;
};

// Robots.txt content generation
export const generateRobotsTxt = (baseUrl: string): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Allow specific SEO-important paths
Allow: /services/
Allow: /projects/
Allow: /about
Allow: /contact

# Block search and filter parameters
Disallow: /*?search=
Disallow: /*?filter=
Disallow: /*?sort=`;
};

// Generate structured sitemap for search console
export const generateHTMLSitemap = (entries: SitemapEntry[]): string => {
  const groupedEntries = entries.reduce((acc, entry) => {
    const pathParts = entry.url.split('/').filter(part => part);
    const section = pathParts[0] || 'root';
    
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(entry);
    
    return acc;
  }, {} as Record<string, SitemapEntry[]>);

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet - Website Sitemap</title>
    <meta name="description" content="Complete sitemap of IeNet's IT services, solutions, and resources.">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #374151; margin-top: 30px; }
        ul { list-style: none; padding: 0; }
        li { margin: 8px 0; }
        a { color: #2563eb; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .priority { color: #6b7280; font-size: 0.9em; margin-left: 10px; }
    </style>
</head>
<body>
    <h1>IeNet Website Sitemap</h1>
    <p>Comprehensive listing of all pages and services on our website.</p>`;

  Object.entries(groupedEntries).forEach(([section, sectionEntries]) => {
    const sectionTitle = section === 'root' ? 'Main Pages' : 
                        section.charAt(0).toUpperCase() + section.slice(1);
    
    html += `\n    <h2>${sectionTitle}</h2>\n    <ul>`;
    
    sectionEntries.forEach(entry => {
      const url = entry.url.replace(/^https?:\/\/[^\/]+/, '');
      const title = url.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Home';
      
      html += `\n        <li>
            <a href="${url}">${title}</a>
            <span class="priority">Priority: ${entry.priority}</span>
        </li>`;
    });
    
    html += '\n    </ul>';
  });

  html += `\n    <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280;">
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        <p>For technical support or questions, <a href="/contact">contact us</a>.</p>
    </footer>
</body>
</html>`;

  return html;
};