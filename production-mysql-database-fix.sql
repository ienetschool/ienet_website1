-- Fix for missing search-engine-optimization service on production
-- Run this on your production MySQL database

-- Check if digital-marketing-seo category exists
SELECT id, name, slug FROM service_categories WHERE slug = 'digital-marketing-seo';

-- If the above returns a result, use this INSERT (replace X with the actual category ID):
INSERT INTO services (name, slug, description, category_id, display_order, created_at, updated_at) 
VALUES (
    'Search Engine Optimization', 
    'search-engine-optimization', 
    'Comprehensive SEO services to improve your website search engine rankings and visibility', 
    (SELECT id FROM service_categories WHERE slug = 'digital-marketing-seo'), 
    1,
    NOW(),
    NOW()
);

-- Add some features for the SEO service
INSERT INTO features (name, slug, description, service_id, display_order, created_at, updated_at)
SELECT 
    'On-Page SEO Optimization',
    'on-page-seo-optimization',
    'Complete optimization of your website pages for better search engine visibility',
    s.id,
    1,
    NOW(),
    NOW()
FROM services s WHERE s.slug = 'search-engine-optimization';

INSERT INTO features (name, slug, description, service_id, display_order, created_at, updated_at)
SELECT 
    'Keyword Research & Strategy',
    'keyword-research-strategy',
    'Comprehensive keyword analysis and strategy development for targeted traffic',
    s.id,
    2,
    NOW(),
    NOW()
FROM services s WHERE s.slug = 'search-engine-optimization';

INSERT INTO features (name, slug, description, service_id, display_order, created_at, updated_at)
SELECT 
    'Technical SEO Audit',
    'technical-seo-audit',
    'Complete technical analysis and optimization of your website infrastructure',
    s.id,
    3,
    NOW(),
    NOW()
FROM services s WHERE s.slug = 'search-engine-optimization';

-- Verify the insertion
SELECT s.name as service_name, s.slug as service_slug, c.name as category_name
FROM services s 
JOIN service_categories c ON s.category_id = c.id 
WHERE s.slug = 'search-engine-optimization';