const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

console.log('Starting Simple Production Server');

// Simple health check without database
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    message: 'Production server running',
    timestamp: new Date().toISOString()
  });
});

// Simple auth endpoint
app.get('/api/auth/user', (req, res) => {
  res.json(null);
});

// Hardcoded service categories (no database needed)
app.get('/api/service-categories', (req, res) => {
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
  res.json(categories);
});

// Hardcoded services
app.get('/api/services', (req, res) => {
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
  
  res.json(filteredServices);
});

// Hardcoded features
app.get('/api/features', (req, res) => {
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
  
  res.json(filteredFeatures);
});

// Hardcoded projects
app.get('/api/projects', (req, res) => {
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
  res.json(projects);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Simple Production API Server running on port ${PORT}`);
  console.log('No database required - using hardcoded data');
  console.log('Ready to serve API requests');
});

process.on('SIGINT', () => {
  console.log('Server shutting down');
  process.exit(0);
});