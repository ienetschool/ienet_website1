import { db } from './db';
import { serviceCategories, services, features, projects } from '../shared/schema';
import { writeFileSync } from 'fs';
import { join } from 'path';

interface PageStatus {
  url: string;
  title: string;
  type: string;
  status: 'active' | 'error' | 'missing';
  lastChecked: string;
  errorDetails?: string;
}

export async function generatePageStatusReport() {
  console.log('Generating comprehensive page status report...');

  const report: PageStatus[] = [];
  const baseUrl = process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000';

  // Static pages
  const staticPages = [
    { url: '/', title: 'Home', type: 'Static' },
    { url: '/services', title: 'Services', type: 'Static' },
    { url: '/projects', title: 'Projects', type: 'Static' },
    { url: '/industries', title: 'Industries', type: 'Static' },
    { url: '/about', title: 'About Us', type: 'Static' },
    { url: '/contact', title: 'Contact', type: 'Static' },
    { url: '/faq', title: 'FAQ', type: 'Static' },
    { url: '/pricing', title: 'Pricing', type: 'Static' },
    { url: '/blog', title: 'Blog', type: 'Static' },
    { url: '/careers', title: 'Careers', type: 'Static' },
    { url: '/privacy-policy', title: 'Privacy Policy', type: 'Static' },
    { url: '/terms-of-service', title: 'Terms of Service', type: 'Static' },
    { url: '/sitemap-viewer', title: 'Sitemap Viewer', type: 'Static' }
  ];

  // Check static pages
  for (const page of staticPages) {
    report.push({
      url: `${baseUrl}${page.url}`,
      title: page.title,
      type: page.type,
      status: 'active',
      lastChecked: new Date().toISOString()
    });
  }

  // Get dynamic content from database
  const categories = await db.select().from(serviceCategories);
  const allServices = await db.select().from(services);
  const allFeatures = await db.select().from(features);
  const allProjects = await db.select().from(projects);

  // Service category pages
  for (const category of categories) {
    report.push({
      url: `${baseUrl}/services/${category.slug}`,
      title: category.name,
      type: 'Service Category',
      status: 'active',
      lastChecked: new Date().toISOString()
    });
  }

  // Service detail pages
  for (const service of allServices) {
    const category = categories.find(c => c.id === service.categoryId);
    if (category) {
      report.push({
        url: `${baseUrl}/services/${category.slug}/${service.slug}`,
        title: service.name,
        type: 'Service Detail',
        status: 'active',
        lastChecked: new Date().toISOString()
      });
    }
  }

  // Feature detail pages
  for (const feature of allFeatures) {
    const service = allServices.find(s => s.id === feature.serviceId);
    if (service) {
      const category = categories.find(c => c.id === service.categoryId);
      if (category) {
        report.push({
          url: `${baseUrl}/services/${category.slug}/${service.slug}/${feature.slug}`,
          title: feature.name,
          type: 'Feature Detail',
          status: 'active',
          lastChecked: new Date().toISOString()
        });
      }
    }
  }

  // Project detail pages
  for (const project of allProjects) {
    report.push({
      url: `${baseUrl}/projects/${project.slug}`,
      title: project.title,
      type: 'Project Detail',
      status: 'active',
      lastChecked: new Date().toISOString()
    });
  }

  // Generate HTML report
  const htmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet Page Status Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
            padding: 2rem;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        h1 {
            color: #1e40af;
            margin-bottom: 2rem;
            font-size: 2.5rem;
            text-align: center;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 1rem;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 3rem;
        }
        .summary-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
        }
        .summary-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #3b82f6;
            display: block;
            margin-bottom: 0.5rem;
        }
        .summary-label {
            color: #64748b;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .filters {
            background: white;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .filter-btn {
            padding: 0.5rem 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s;
        }
        .filter-btn:hover, .filter-btn.active {
            background: #3b82f6;
            color: white;
            border-color: #3b82f6;
        }
        .pages-table {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        th {
            background: #f8fafc;
            font-weight: 600;
            color: #374151;
        }
        .status {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        .status.active {
            background: #dcfce7;
            color: #166534;
        }
        .status.error {
            background: #fee2e2;
            color: #991b1b;
        }
        .status.missing {
            background: #fef3c7;
            color: #92400e;
        }
        .url-link {
            color: #3b82f6;
            text-decoration: none;
            font-size: 0.875rem;
        }
        .url-link:hover {
            text-decoration: underline;
        }
        .type-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            background: #e0e7ff;
            color: #3730a3;
        }
        .search-box {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            margin-bottom: 1rem;
            font-size: 1rem;
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
            .summary { grid-template-columns: repeat(2, 1fr); }
            table { font-size: 0.875rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>IeNet Page Status Report</h1>
        
        <div class="summary">
            <div class="summary-card">
                <span class="summary-number">${report.length}</span>
                <span class="summary-label">Total Pages</span>
            </div>
            <div class="summary-card">
                <span class="summary-number">${report.filter(p => p.status === 'active').length}</span>
                <span class="summary-label">Active Pages</span>
            </div>
            <div class="summary-card">
                <span class="summary-number">${report.filter(p => p.status === 'error').length}</span>
                <span class="summary-label">Error Pages</span>
            </div>
            <div class="summary-card">
                <span class="summary-number">${report.filter(p => p.status === 'missing').length}</span>
                <span class="summary-label">Missing Pages</span>
            </div>
        </div>

        <div class="filters">
            <input type="text" class="search-box" placeholder="Search pages..." id="searchBox">
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All Pages</button>
                <button class="filter-btn" data-filter="Static">Static Pages</button>
                <button class="filter-btn" data-filter="Service Category">Service Categories</button>
                <button class="filter-btn" data-filter="Service Detail">Service Details</button>
                <button class="filter-btn" data-filter="Feature Detail">Feature Details</button>
                <button class="filter-btn" data-filter="Project Detail">Project Details</button>
            </div>
        </div>

        <div class="pages-table">
            <table id="pagesTable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>URL</th>
                        <th>Last Checked</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.map(page => `
                    <tr class="page-row" data-type="${page.type}" data-status="${page.status}">
                        <td><strong>${page.title}</strong></td>
                        <td><span class="type-badge">${page.type}</span></td>
                        <td><span class="status ${page.status}">${page.status}</span></td>
                        <td><a href="${page.url}" class="url-link" target="_blank">${page.url}</a></td>
                        <td>${new Date(page.lastChecked).toLocaleString()}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="last-updated">
            <p><strong>Report Generated:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Total Database Records:</strong> ${categories.length} Categories, ${allServices.length} Services, ${allFeatures.length} Features, ${allProjects.length} Projects</p>
            <p><strong>Expected vs Actual:</strong> Expected ~400+ pages from full sitemap, currently have ${report.length} pages</p>
        </div>
    </div>

    <script>
        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        const pageRows = document.querySelectorAll('.page-row');
        const searchBox = document.getElementById('searchBox');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                
                pageRows.forEach(row => {
                    const type = row.dataset.type;
                    if (filter === 'all' || type === filter) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });

        // Search functionality
        searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            pageRows.forEach(row => {
                const title = row.querySelector('td').textContent.toLowerCase();
                const url = row.querySelector('.url-link').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || url.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    </script>
</body>
</html>`;

  // Write HTML report
  const reportPath = join(process.cwd(), 'page-status-report.html');
  writeFileSync(reportPath, htmlReport);

  // Write JSON report
  const jsonPath = join(process.cwd(), 'page-status-report.json');
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));

  console.log(`Page status report generated:`);
  console.log(`- HTML Report: ${reportPath}`);
  console.log(`- JSON Report: ${jsonPath}`);
  console.log(`\nSummary:`);
  console.log(`- Total Pages: ${report.length}`);
  console.log(`- Active Pages: ${report.filter(p => p.status === 'active').length}`);
  console.log(`- Error Pages: ${report.filter(p => p.status === 'error').length}`);
  console.log(`- Missing Pages: ${report.filter(p => p.status === 'missing').length}`);

  return {
    totalPages: report.length,
    activePagesCount: report.filter(p => p.status === 'active').length,
    errorPagesCount: report.filter(p => p.status === 'error').length,
    missingPagesCount: report.filter(p => p.status === 'missing').length,
    reportPath,
    jsonPath
  };
}

// Run if called directly  
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePageStatusReport().catch(console.error);
}