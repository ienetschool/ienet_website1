# IMMEDIATE PRODUCTION UPDATE REQUIRED

## Critical Issues to Fix:
1. **Legal pages not showing correct company names and addresses**
2. **Services and features not loading properly on production**
3. **Page titles missing on some pages**
4. **Search engine optimization service missing from database**

## Files Updated and Ready for Production:

### 1. Contact Page (`client/src/pages/Contact.tsx`)
- Title: "Contact IeNet" 
- Address: "101 SIYOL NAGAR, Laxman Nagar Road Via Chadi, Phalodi, JODHPUR 342312"
- Business hours in IST

### 2. Privacy Policy (`client/src/pages/Privacy.tsx`)
- Company: "India Espectacular"
- Updated address format
- Indian data protection compliance

### 3. Terms of Service (`client/src/pages/Terms.tsx`)
- Company: "India Espectacular" 
- Indian governing law (Jodhpur District Courts)
- Updated address format

### 4. NEW: Refund Policy (`client/src/pages/Refund.tsx`)
- Complete cancellation & refund policy
- Indian Consumer Protection Act compliance
- Company: "India Espectacular"

### 5. Footer (`client/src/components/layout/Footer.tsx`)
- Updated India office address format
- Added links to all legal pages

### 6. App Routing (`client/src/App.tsx`)
- Added `/refund` route for new policy page

## Production Server Database Fix:

The service "search-engine-optimization" is missing from your production database. Add this to MySQL:

```sql
INSERT INTO services (name, slug, description, category_id, display_order) 
VALUES ('Search Engine Optimization', 'search-engine-optimization', 'Comprehensive SEO services to improve search rankings', 
(SELECT id FROM service_categories WHERE slug = 'digital-marketing-seo'), 1);
```

## Deployment Steps:

1. **Upload new dist folder** (already built and ready)
2. **Add the missing SEO service to MySQL database**
3. **Restart the production server**

## Updated Production Server File:

The `mysql-production-server.cjs` file is ready with all necessary routes and API endpoints.

## Complete Updates Included in This Deployment:

### Contact Page (/contact):
- Title: "Contact IeNet" (as requested)
- Address: "101 SIYOL NAGAR, Laxman Nagar Road Via Chadi, Phalodi, JODHPUR 342312"
- Business hours in IST timezone
- India office information updated

### Privacy Policy (/privacy):
- Company name: "India Espectacular" (throughout the page)
- Indian data protection law compliance
- Updated India office address format
- IST timezone for business hours

### Terms of Service (/terms):
- Company name: "India Espectacular" (throughout the page)
- Indian governing law with Jodhpur District Courts jurisdiction
- Indian Contract Act, 1872 compliance
- Updated India office address format

### NEW Refund Policy (/refund):
- Complete cancellation and refund policy page
- Company name: "India Espectacular"
- Indian Consumer Protection Act, 2019 compliance
- RBI payment guidelines reference
- Updated India office address format

### Footer (all pages):
- Updated India office address format
- Added links to Privacy, Terms, and Refund policies

## Verification Checklist:

After deployment, verify:
- [ ] `/contact` shows "Contact IeNet" with India office address
- [ ] `/privacy` shows "India Espectacular" with updated address
- [ ] `/terms` shows "India Espectacular" with Indian law compliance  
- [ ] `/refund` loads correctly with "India Espectacular" and full policy
- [ ] All pages show correct address: "101 SIYOL NAGAR, Laxman Nagar Road Via Chadi, Phalodi, JODHPUR 342312"
- [ ] Footer shows updated address and legal page links
- [ ] Services and features load properly
- [ ] SEO service page loads: `/services/digital-marketing-seo/search-engine-optimization`

**Status**: Ready for immediate production deployment