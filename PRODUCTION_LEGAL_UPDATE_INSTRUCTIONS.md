# Production Server Legal Pages Update Instructions

## CRITICAL: Updated Legal Pages for Indian Compliance

The development server has been successfully updated with Indian legal compliance. To apply these changes to the production server at **ienet.online**, you need to upload the updated files.

## Updated Files That Need to be Uploaded to Production:

### 1. Contact Page Updates
- **File**: `client/src/pages/Contact.tsx`
- **Changes**: 
  - Title changed from "Contact India Espectacular" to "Contact IeNet"
  - Address updated to India office: "101 Laxman Nagar Via Chadi, Laxman Nagar Road Siyolnagar, SIYOLENAGAR Phalodi, JODHPUR 342312"
  - Business hours updated to IST timezone

### 2. Privacy Policy Page Updates
- **File**: `client/src/pages/Privacy.tsx`
- **Changes**:
  - Company name updated from "India Espectacular" to "IeNet"
  - Indian data protection law compliance
  - India office address added
  - IST timezone for business hours

### 3. Terms of Service Page Updates
- **File**: `client/src/pages/Terms.tsx`
- **Changes**:
  - Company name updated from "India Espectacular" to "IeNet"
  - Governing law changed to "laws of India"
  - Jurisdiction: "Jodhpur District Courts, Rajasthan, India"
  - Indian Contract Act, 1872 compliance
  - India office address added

### 4. NEW: Cancellation & Refund Policy Page
- **File**: `client/src/pages/Refund.tsx` (NEW FILE)
- **Features**:
  - Complete Indian law compliance
  - Consumer Protection Act, 2019 references
  - RBI payment guidelines
  - Jodhpur District Courts jurisdiction
  - Comprehensive refund policies and timelines

### 5. Footer Updates
- **File**: `client/src/components/layout/Footer.tsx`
- **Changes**:
  - India office address updated
  - Added links to Privacy Policy, Terms, and Refund Policy pages

### 6. App Routing Updates
- **File**: `client/src/App.tsx`
- **Changes**:
  - Added `/refund` route for new Refund page
  - Route available for both authenticated and public users

## Quick Deployment Steps:

1. **Build the updated application**:
   ```bash
   npm run build
   ```

2. **Upload the new `dist` folder** to your production server directory (same as before)

3. **Restart the production server** to apply changes

## New Accessible Pages:

After deployment, these pages will be available on **ienet.online**:
- `/contact` - Updated Contact IeNet page
- `/privacy` - Updated Privacy Policy with Indian compliance
- `/terms` - Updated Terms of Service with Indian law
- `/refund` - NEW Cancellation & Refund Policy page

## Verification:

1. Check that `/contact` shows "Contact IeNet" instead of "Contact India Espectacular"
2. Verify India office address appears correctly on all pages
3. Confirm all business hours show IST timezone
4. Test that `/refund` page loads correctly with comprehensive policy

## Files Ready for Production:

All updated files are ready in your development environment. The changes maintain identical functionality while ensuring full Indian legal compliance and proper business information display.

**Status**: ✅ Development server updated and tested - Ready for production deployment