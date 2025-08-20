import { Router } from 'express';

const router = Router();

// Mock pages data for demonstration
const mockPages = [
  {
    id: '1',
    title: 'Home Page',
    slug: 'home',
    type: 'page',
    status: 'published',
    lastModified: new Date().toISOString(),
    elements: [],
    seoData: {},
    schemaData: []
  },
  {
    id: '2',
    title: 'About Us',
    slug: 'about',
    type: 'page',
    status: 'published',
    lastModified: new Date().toISOString(),
    elements: [],
    seoData: {},
    schemaData: []
  },
  {
    id: '3',
    title: 'Contact',
    slug: 'contact',
    type: 'page',
    status: 'draft',
    lastModified: new Date().toISOString(),
    elements: [],
    seoData: {},
    schemaData: []
  }
];

// GET /api/pages - Get all pages
router.get('/', (req, res) => {
  res.json({
    data: mockPages,
    total: mockPages.length
  });
});

// GET /api/pages/:id - Get single page
router.get('/:id', (req, res) => {
  const page = mockPages.find(p => p.id === req.params.id);
  if (!page) {
    return res.status(404).json({ error: 'Page not found' });
  }
  res.json(page);
});

// POST /api/pages - Create new page
router.post('/', (req, res) => {
  const newPage = {
    id: Date.now().toString(),
    title: req.body.title || 'New Page',
    slug: req.body.slug || `page-${Date.now()}`,
    type: req.body.type || 'page',
    status: req.body.status || 'draft',
    lastModified: new Date().toISOString(),
    elements: req.body.elements || [],
    seoData: req.body.seoData || {},
    schemaData: req.body.schemaData || []
  };
  
  mockPages.push(newPage);
  res.status(201).json(newPage);
});

// PUT /api/pages/:id - Update page
router.put('/:id', (req, res) => {
  const pageIndex = mockPages.findIndex(p => p.id === req.params.id);
  if (pageIndex === -1) {
    return res.status(404).json({ error: 'Page not found' });
  }
  
  mockPages[pageIndex] = {
    ...mockPages[pageIndex],
    ...req.body,
    lastModified: new Date().toISOString()
  };
  
  res.json(mockPages[pageIndex]);
});

// DELETE /api/pages/:id - Delete page
router.delete('/:id', (req, res) => {
  const pageIndex = mockPages.findIndex(p => p.id === req.params.id);
  if (pageIndex === -1) {
    return res.status(404).json({ error: 'Page not found' });
  }
  
  mockPages.splice(pageIndex, 1);
  res.status(204).send();
});

export default router;