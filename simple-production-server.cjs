const http = require('http');
const url = require('url');

const PORT = 3001;
const HOST = '127.0.0.1';

console.log('=== STARTING SIMPLE PRODUCTION SERVER ===');
console.log('Time:', new Date().toISOString());
console.log('Host:', HOST);
console.log('Port:', PORT);

// Sample service categories data (matching your database structure)
const serviceCategories = [
  {
    id: 11,
    name: "Website Design & Development",
    slug: "website-design-development",
    description: "Comprehensive web solutions including custom website design, development, and optimization services.",
    icon: "globe",
    meta_title: "Website Design & Development Services | IeNet",
    meta_description: "Professional website design and development services including custom web solutions, responsive design, and modern web technologies."
  },
  {
    id: 12,
    name: "Mobile App Development",
    slug: "mobile-app-development", 
    description: "Native and cross-platform mobile application development for iOS and Android platforms.",
    icon: "smartphone",
    meta_title: "Mobile App Development Services | IeNet",
    meta_description: "Expert mobile app development for iOS and Android platforms with native and cross-platform solutions."
  },
  {
    id: 13,
    name: "E-commerce Solutions",
    slug: "ecommerce-solutions",
    description: "Complete e-commerce platform development and optimization services.",
    icon: "shopping-cart",
    meta_title: "E-commerce Solutions | IeNet",
    meta_description: "Professional e-commerce development services including online stores, payment integration, and shopping platforms."
  },
  {
    id: 14,
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "Comprehensive digital marketing services including SEO, social media, and online advertising.",
    icon: "trending-up",
    meta_title: "Digital Marketing Services | IeNet", 
    meta_description: "Complete digital marketing solutions including SEO, social media marketing, and online advertising campaigns."
  },
  {
    id: 15,
    name: "Cloud Services",
    slug: "cloud-services",
    description: "Cloud infrastructure, hosting, and migration services for modern businesses.",
    icon: "cloud",
    meta_title: "Cloud Services | IeNet",
    meta_description: "Professional cloud services including infrastructure setup, hosting solutions, and cloud migration."
  }
];

// Sample projects data
const projects = [
  {
    id: 4,
    title: "E-commerce Platform Redesign",
    slug: "ecommerce-platform-redesign",
    description: "Complete redesign and development of a modern e-commerce platform with enhanced user experience and performance optimization.",
    image_url: "/assets/project-ecommerce.jpg",
    client_name: "TechMart Solutions",
    project_url: "https://example-ecommerce.com",
    technologies: "React, Node.js, MongoDB, Stripe",
    completion_date: "2024-03-15",
    is_featured: true
  },
  {
    id: 5,
    title: "Corporate Website Development",
    slug: "corporate-website-development",
    description: "Professional corporate website with CMS integration and responsive design for better user engagement.",
    image_url: "/assets/project-corporate.jpg",
    client_name: "Global Industries Inc",
    project_url: "https://example-corporate.com",
    technologies: "WordPress, PHP, MySQL",
    completion_date: "2024-02-20",
    is_featured: false
  }
];

function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  });
  res.end(JSON.stringify(data));
}

function sendError(res, message, statusCode = 500) {
  sendJSON(res, { error: message }, statusCode);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  console.log(`${method} ${path}`);

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });
    res.end();
    return;
  }

  // Health check endpoint
  if (path === '/api/health') {
    console.log('🩺 Health check requested');
    sendJSON(res, {
      status: 'healthy',
      message: 'Simple Production Server Running',
      timestamp: new Date().toISOString(),
      server: 'ienet.online',
      port: PORT,
      database: 'simulated'
    });
    return;
  }

  // Auth endpoint
  if (path === '/api/auth/user') {
    console.log('Auth check - returning null');
    sendJSON(res, null);
    return;
  }

  // Service Categories endpoint
  if (path === '/api/service-categories') {
    console.log(`📂 Returning ${serviceCategories.length} service categories`);
    sendJSON(res, serviceCategories);
    return;
  }

  // Services endpoint
  if (path === '/api/services') {
    const categoryId = parsedUrl.query.categoryId;
    let services = [
      {
        id: 21,
        name: "Custom Website Design",
        slug: "custom-website-design",
        description: "Tailored website design solutions for your business needs.",
        categoryId: 11,
        meta_title: "Custom Website Design | IeNet",
        meta_description: "Professional custom website design services tailored to your business requirements."
      },
      {
        id: 22, 
        name: "Responsive Web Development",
        slug: "responsive-web-development",
        description: "Mobile-first responsive web development for all devices.",
        categoryId: 11,
        meta_title: "Responsive Web Development | IeNet",
        meta_description: "Mobile-first responsive web development ensuring optimal performance across all devices."
      }
    ];

    if (categoryId) {
      services = services.filter(s => s.categoryId === parseInt(categoryId));
      console.log(`🔧 Returning ${services.length} services for category ${categoryId}`);
    } else {
      console.log(`🔧 Returning ${services.length} services`);
    }
    
    sendJSON(res, services);
    return;
  }

  // Projects endpoint
  if (path === '/api/projects') {
    console.log(`🚀 Returning ${projects.length} projects`);
    sendJSON(res, projects);
    return;
  }

  // Features endpoint
  if (path === '/api/features') {
    const serviceId = parsedUrl.query.serviceId;
    let features = [
      {
        id: 31,
        name: "UI/UX Design",
        slug: "ui-ux-design",
        description: "Professional user interface and experience design.",
        serviceId: 21,
        meta_title: "UI/UX Design Services | IeNet",
        meta_description: "Professional UI/UX design services for optimal user experience."
      }
    ];

    if (serviceId) {
      features = features.filter(f => f.serviceId === parseInt(serviceId));
      console.log(`⚡ Returning ${features.length} features for service ${serviceId}`);
    } else {
      console.log(`⚡ Returning ${features.length} features`);
    }
    
    sendJSON(res, features);
    return;
  }

  // 404 handler
  console.log(`❓ 404 - ${method} ${path}`);
  sendError(res, 'Endpoint not found', 404);
});

server.listen(PORT, HOST, () => {
  console.log('========================================');
  console.log('🚀 SIMPLE PRODUCTION SERVER STARTED!');
  console.log('========================================');
  console.log(`✅ Server listening on: http://${HOST}:${PORT}`);
  console.log(`✅ Process ID: ${process.pid}`);
  console.log(`✅ Started at: ${new Date().toISOString()}`);
  console.log('========================================');
});

server.on('error', (error) => {
  console.error('🚨 Server error:', error);
  
  if (error.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use`);
    console.log('Run: pkill -f production-server');
  } else if (error.code === 'EACCES') {
    console.log(`❌ Permission denied to bind port ${PORT}`);
  }
  
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server shut down successfully');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('🔚 Received SIGTERM - shutting down');
  server.close(() => process.exit(0));
});