const express = require('express');
const app = express();
const PORT = 3001;

// Enable logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

console.log('=== STARTING PRODUCTION SERVER ===');
console.log('Port:', PORT);
console.log('Time:', new Date().toISOString());

// Test endpoint
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// Health check
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ 
    status: 'healthy',
    message: 'Production server running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Auth endpoint
app.get('/api/auth/user', (req, res) => {
  console.log('Auth check requested');
  res.json(null);
});

// Service categories with logging
app.get('/api/service-categories', (req, res) => {
  console.log('Service categories requested');
  const categories = [
    {
      id: 1,
      name: 'Website Design & Development',
      slug: 'website-design-development',
      description: 'Comprehensive web design and development services',
      icon: 'Globe'
    },
    {
      id: 2,
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      description: 'Complete digital marketing solutions',
      icon: 'TrendingUp'
    },
    {
      id: 3,
      name: 'E-commerce Solutions',
      slug: 'ecommerce-solutions',
      description: 'Professional e-commerce platforms',
      icon: 'ShoppingCart'
    },
    {
      id: 4,
      name: 'Mobile App Development',
      slug: 'mobile-app-development',
      description: 'Custom mobile application development',
      icon: 'Smartphone'
    },
    {
      id: 5,
      name: 'Cloud Services',
      slug: 'cloud-services',
      description: 'Enterprise cloud computing solutions',
      icon: 'Cloud'
    }
  ];
  
  console.log(`Returning ${categories.length} categories`);
  res.json(categories);
});

// Services with logging
app.get('/api/services', (req, res) => {
  console.log('Services requested, categoryId:', req.query.categoryId);
  const services = [
    {
      id: 1,
      name: 'Custom Website Design',
      slug: 'custom-website-design',
      description: 'Bespoke website design solutions',
      categoryId: 1
    },
    {
      id: 2,
      name: 'E-commerce Development',
      slug: 'ecommerce-development',
      description: 'Full-featured online stores',
      categoryId: 1
    },
    {
      id: 3,
      name: 'SEO Optimization',
      slug: 'seo-optimization',
      description: 'Search engine optimization services',
      categoryId: 2
    },
    {
      id: 4,
      name: 'Social Media Marketing',
      slug: 'social-media-marketing',
      description: 'Comprehensive social media strategies',
      categoryId: 2
    }
  ];

  let filteredServices = services;
  if (req.query.categoryId) {
    filteredServices = services.filter(s => s.categoryId === parseInt(req.query.categoryId));
  }
  
  console.log(`Returning ${filteredServices.length} services`);
  res.json(filteredServices);
});

// Features with logging
app.get('/api/features', (req, res) => {
  console.log('Features requested, serviceId:', req.query.serviceId);
  const features = [
    {
      id: 1,
      name: 'Responsive Design',
      slug: 'responsive-design',
      description: 'Mobile-first responsive web design',
      serviceId: 1
    },
    {
      id: 2,
      name: 'User Experience Design',
      slug: 'user-experience-design',
      description: 'Intuitive user interface design',
      serviceId: 1
    },
    {
      id: 3,
      name: 'Payment Gateway Integration',
      slug: 'payment-gateway-integration',
      description: 'Secure payment processing',
      serviceId: 2
    }
  ];

  let filteredFeatures = features;
  if (req.query.serviceId) {
    filteredFeatures = features.filter(f => f.serviceId === parseInt(req.query.serviceId));
  }
  
  console.log(`Returning ${filteredFeatures.length} features`);
  res.json(filteredFeatures);
});

// Projects with logging
app.get('/api/projects', (req, res) => {
  console.log('Projects requested');
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform Redesign',
      slug: 'ecommerce-platform-redesign',
      description: 'Complete redesign of major e-commerce platform with modern UI/UX'
    },
    {
      id: 2,
      title: 'Healthcare Management System',
      slug: 'healthcare-management-system',
      description: 'Comprehensive healthcare management solution for hospitals'
    },
    {
      id: 3,
      title: 'Education Portal Development',
      slug: 'education-portal-development',
      description: 'Modern learning management system for educational institutions'
    },
    {
      id: 4,
      title: 'Restaurant Booking App',
      slug: 'restaurant-booking-app',
      description: 'Mobile app for restaurant reservations and table management'
    }
  ];
  
  console.log(`Returning ${projects.length} projects`);
  res.json(projects);
});

// Catch all for debugging
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log('=== SERVER STARTED SUCCESSFULLY ===');
  console.log(`API Server running on http://127.0.0.1:${PORT}`);
  console.log('Time:', new Date().toISOString());
  console.log('Process ID:', process.pid);
  console.log('Available endpoints:');
  console.log('  GET /test');
  console.log('  GET /api/health');
  console.log('  GET /api/service-categories');
  console.log('  GET /api/services');
  console.log('  GET /api/features');
  console.log('  GET /api/projects');
  console.log('=== SERVER READY ===');
});

server.on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('=== SHUTTING DOWN SERVER ===');
  server.close(() => {
    console.log('Server shut down gracefully');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('=== TERMINATING SERVER ===');
  server.close(() => {
    console.log('Server terminated gracefully');
    process.exit(0);
  });
});