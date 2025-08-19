import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Mock data for demonstration
const mockPages = [
  {
    id: 1,
    title: 'Home Page',
    slug: 'home',
    status: 'published',
    blocks: [],
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2, 
    title: 'About Us',
    slug: 'about',
    status: 'draft',
    blocks: [],
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Contact',
    slug: 'contact', 
    status: 'published',
    blocks: [],
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// GET /api/pages - List pages with pagination and filtering
router.get('/', (req, res) => {
  const { 
    page = '1', 
    limit = '20', 
    search = '', 
    sort = 'id', 
    dir = 'asc',
    filters = {}
  } = req.query;

  let filteredPages = mockPages;

  // Search
  if (search) {
    const searchTerm = search.toString().toLowerCase();
    filteredPages = filteredPages.filter(page => 
      page.title.toLowerCase().includes(searchTerm) ||
      page.slug.toLowerCase().includes(searchTerm)
    );
  }

  // Apply filters
  if (typeof filters === 'object' && filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredPages = filteredPages.filter(page => 
          (page as any)[key] === value
        );
      }
    });
  }

  // Sort
  filteredPages.sort((a, b) => {
    const aVal = (a as any)[sort.toString()];
    const bVal = (b as any)[sort.toString()];
    if (dir === 'desc') {
      return aVal < bVal ? 1 : -1;
    }
    return aVal > bVal ? 1 : -1;
  });

  // Pagination
  const pageNum = parseInt(page.toString());
  const limitNum = parseInt(limit.toString());
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedPages = filteredPages.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPages.length / limitNum);

  res.json({
    data: paginatedPages,
    total: filteredPages.length,
    page: pageNum,
    limit: limitNum,
    totalPages
  });
});

// GET /api/pages/:id - Get single page
router.get('/:id', (req, res) => {
  const page = mockPages.find(p => p.id === parseInt(req.params.id));
  if (!page) {
    return res.status(404).json({ error: 'Page not found' });
  }
  res.json(page);
});

// POST /api/pages/save - Save page builder data
router.post('/save', (req, res) => {
  try {
    const { pageId, components, timestamp } = req.body;
    
    // In a real app, save to database
    console.log('Saving page builder data:', { pageId, components: components?.length, timestamp });
    
    res.json({ 
      success: true, 
      message: 'Page builder data saved successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to save page builder data' 
    });
  }
});

// POST /api/pages/live-edit - Save live editor changes
router.post('/live-edit', (req, res) => {
  try {
    const { pageId, elements, timestamp } = req.body;
    
    // In a real app, save to database
    console.log('Saving live editor changes:', { pageId, elements: elements?.length, timestamp });
    
    res.json({ 
      success: true, 
      message: 'Live editor changes saved successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to save live editor changes' 
    });
  }
});

// DELETE /api/pages/batch - Batch delete pages
router.delete('/batch', (req, res) => {
  try {
    const { ids } = req.body;
    
    // In a real app, delete from database
    console.log('Batch deleting pages:', ids);
    
    res.json({ 
      success: true, 
      message: `${ids.length} pages deleted successfully` 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete pages' 
    });
  }
});

// GET /api/pages/export - Export pages data
router.get('/export', (req, res) => {
  const { format = 'json' } = req.query;
  
  try {
    if (format === 'csv') {
      const csvData = 'id,title,slug,status,createdAt,updatedAt\n' +
        mockPages.map(page => 
          `${page.id},"${page.title}","${page.slug}","${page.status}","${page.createdAt}","${page.updatedAt}"`
        ).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="pages.csv"');
      return res.send(csvData);
    }
    
    res.json(mockPages);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to export pages' 
    });
  }
});

export default router;