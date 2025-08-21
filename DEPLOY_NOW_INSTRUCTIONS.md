# DEPLOY TO PRODUCTION SERVER NOW

## What You Need to Do:

### Step 1: Upload Files to Your Production Server
Upload these files from your Replit environment to your production server:

1. **Upload the entire `dist/` folder** to replace your current production website files
2. **Upload `updated-production-server-with-fixes.cjs`** (rename it to match your current server file name)

### Step 2: Update Production Database
Connect to your production MySQL database and run these commands:

```sql
USE ienet_database;

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
```

### Step 3: Restart Your Production Server
After uploading files and updating the database, restart your Node.js production server.

### Step 4: Test the Deployment
Visit these URLs to confirm everything works:
- https://www.ienet.online/contact
- https://www.ienet.online/privacy
- https://www.ienet.online/terms
- https://www.ienet.online/refund
- https://www.ienet.online/services/digital-marketing-seo/search-engine-optimization

## Files Ready for Upload:
✅ `dist/` folder - Complete application with all updates
✅ `updated-production-server-with-fixes.cjs` - Production server file
✅ `production-mysql-database-fix.sql` - Database update commands

## What This Deployment Will Fix:
1. Contact page will show "Contact IeNet" with India office address
2. Privacy Policy will show "India Espectacular" with Indian compliance
3. Terms of Service will show "India Espectacular" with Indian law
4. New Refund Policy page will be available at /refund
5. All pages will show correct India office address
6. Missing SEO service will be added to database
7. Services and features will load properly

**Ready for deployment now!**