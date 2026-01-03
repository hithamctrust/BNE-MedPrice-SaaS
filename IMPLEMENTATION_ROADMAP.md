# MedPrice SaaS Implementation Roadmap

## Status: Infrastructure Setup Complete ✅

This document outlines the completed and pending work for converting the MedPrice AI Extractor into a fully functional SaaS platform with Stripe billing, Supabase auth, and multi-user support.

## Completed ✅

### Phase 1: Infrastructure & Configuration

1. **Supabase Setup**
   - Database schema created with:
     - `profiles` table (user profile data with Stripe customer ID)
     - `subscriptions` table (monthly plans tracking)
     - `document_credits` table (extra document purchases)
     - `documents` table (file processing history)
   - All necessary indexes created for performance
   - Status: **READY**
   - Credentials: Stored in Vercel environment variables

2. **Stripe Configuration**
   - Product: "MedPrice Subscription" - $120/month (20 documents included)
   - Product: "Extra Document Credit" - $5 per document
   - Price IDs generated and ready to use
   - Webhook endpoints configured in Vercel
   - Status: **READY**

3. **GitHub Repository**
   - Repo created: `hithamctrust/BNE-MedPrice-SaaS`
   - `package.json` with all dependencies (Next.js, Supabase, Stripe, Nodemailer, etc.)
   - `.gitignore` for Node.js/Next.js projects
   - `.env.example` with all required configuration variables
   - Status: **READY**

4. **Vercel Deployment**
   - Project imported and configured
   - Deployment infrastructure ready
   - Custom domain mapping planned: `medprice.bne-crm.com`
   - Status: **INFRASTRUCTURE READY** (awaiting Next.js app files)

5. **Email Configuration**
   - SMTP server: mail.spacemail.com:465 (SSL)
   - From address: support@bne-crm.com
   - Ready for transactional emails (welcome, invoices, notifications)
   - Status: **READY**

## Pending: Next.js App Implementation

### Phase 2: Frontend & Authentication (Priority 1)

Needs to be added to `/app` directory:

1. **Layout & Pages**
   - `app/layout.tsx` - Root layout with Supabase provider
   - `app/page.tsx` - Landing page
   - `app/dashboard/page.tsx` - Main SaaS dashboard
   - `app/pricing/page.tsx` - Pricing page
   - `app/auth/` - Auth pages (login, signup, reset password)

2. **Authentication**
   - Integrate Supabase Auth with Next.js
   - Email/password authentication
   - Implement password reset flow
   - Create middleware for protected routes
   - User session management

3. **Styling & UI**
   - Tailwind CSS configuration (already in dependencies)
   - Reusable React components
   - Form components for user input
   - Modal/dialog components

### Phase 3: SaaS Features (Priority 1)

1. **Subscription Management**
   - Subscription checkout via Stripe
   - Subscription status dashboard
   - Cancel/upgrade options
   - Display current usage (X of 20 documents used this month)

2. **Document Upload & Processing**
   - File upload interface (reuse from original MedPrice AI Extractor)
   - Provider form (name, entity type, discount rate)
   - Call Gemini API to process documents
   - Track document count against quota
   - Display results in table format

3. **Metering & Extra Credits**
   - Track monthly document usage
   - Block uploads when quota reached
   - Offer one-click purchase of extra credits ($5 each)
   - Stripe Payment Link for additional documents

### Phase 4: API Routes & Backend (Priority 2)

1. **Authentication API**
   - `api/auth/signin` - Login endpoint
   - `api/auth/signup` - Registration endpoint
   - `api/auth/refresh` - Session refresh

2. **Stripe Integration**
   - `api/stripe/create-checkout-session` - Create subscription checkout
   - `api/stripe/create-payment-intent` - Create payment for extra docs
   - `api/stripe/webhook` - Handle Stripe events:
     - `checkout.session.completed` → Create subscription in DB
     - `invoice.payment_succeeded` → Reset monthly quota
     - `invoice.payment_failed` → Send failure notification
     - `customer.subscription.deleted` → Mark as canceled

3. **Document Processing API**
   - `api/process-document` - Main endpoint to:
     - Verify authentication
     - Check monthly quota
     - Upload file to Gemini
     - Return extracted data
     - Update document count
   - `api/documents` - List user's documents

4. **User Management API**
   - `api/user/profile` - Get/update user profile
   - `api/user/subscription` - Get subscription status
   - `api/user/usage` - Get document usage stats

### Phase 5: Email Notifications (Priority 3)

1. **Transactional Emails**
   - Welcome email on signup
   - Subscription confirmation
   - Document processing complete
   - Invoice/receipt emails
   - Payment failure notifications
   - Usage threshold alerts (75% of quota used)
   - Quota exhausted warning

2. **SMTP Configuration**
   - Initialize Nodemailer with spacemail.com
   - Email templates (HTML)
   - Scheduled/async sending

## Environment Variables Required

Add these to Vercel and `.env.local`:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_SUBSCRIPTION_120=
STRIPE_PRICE_EXTRA_DOC_5=

# Gemini/Google AI
GOOGLE_API_KEY=
GEMINI_APP_ENDPOINT=

# SMTP
SMTP_HOST=mail.spacemail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=support@bne-crm.com
SMTP_PASS=
SMTP_FROM_EMAIL=support@bne-crm.com
SMTP_FROM_NAME=MedPrice AI

# App Config
NEXT_PUBLIC_APP_URL=https://medprice.bne-crm.com
NODE_ENV=production
```

## Architecture Overview

```
Client (Next.js/React)
    ↓
Vercel (Hosting)
    ↓
┌─────────────────────────────────────────┐
│  API Routes (Next.js)                   │
│  - Auth handlers                        │
│  - Stripe webhooks                      │
│  - Document processing                  │
│  - User management                      │
└─────────────────────────────────────────┘
    ↓         ↓         ↓         ↓
  Supabase  Stripe   Gemini   Nodemailer
  (Auth/DB) (Billing) (AI)   (Email)
```

## Database Flow

1. User signs up → Supabase creates profile
2. User subscribes → Stripe checkout → Webhook creates subscription record
3. User uploads doc → Check quota → Call Gemini → Save to documents table → Decrement usage
4. Monthly reset → Stripe `invoice.payment_succeeded` → Reset usage counter
5. Extra credits → Stripe payment → Increment `extra_docs_purchased`

## Deployment Checklist

- [ ] All Next.js app files created (pages, components, API routes)
- [ ] Environment variables added to Vercel
- [ ] Domain `medprice.bne-crm.com` configured in Spaceship DNS
- [ ] SSL certificate configured
- [ ] Stripe webhook endpoint verified
- [ ] Email templates tested
- [ ] User authentication flow tested end-to-end
- [ ] Subscription flow tested with Stripe test mode
- [ ] Document processing tested
- [ ] Monthly usage reset tested
- [ ] Error handling and logging implemented
- [ ] Rate limiting implemented
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Monitoring/observability setup (Vercel Analytics, Sentry, etc.)

## Next Steps for Developer

1. Clone repo locally or use GitHub Codespaces
2. Create `/app` directory structure with pages and components
3. Copy UI components from original BNE-MedPrice-AI-Extractor where possible
4. Implement authentication with Supabase Auth UI
5. Build dashboard with subscription status and usage meters
6. Create document processing workflow
7. Implement Stripe integration with webhooks
8. Add email notifications via Nodemailer
9. Test entire flow with Stripe test mode
10. Deploy to Vercel with production environment variables
11. Configure custom domain in Spaceship
12. Monitor for errors and iterate

## Key Files to Create

```
app/
  ├── layout.tsx
  ├── page.tsx
  ├── (auth)/
  │   ├── login/page.tsx
  │   ├── signup/page.tsx
  │   └── reset-password/page.tsx
  ├── dashboard/
  │   └── page.tsx
  ├── pricing/page.tsx
  └── api/
      ├── auth/
      ├── stripe/
      ├── process-document.ts
      └── user/

components/
  ├── Header.tsx
  ├── Footer.tsx
  ├── SubscriptionCard.tsx
  ├── QuotaMeter.tsx
  ├── DocumentUploader.tsx
  ├── ResultsTable.tsx
  └── ...

utils/
  ├── supabase-client.ts
  ├── stripe-client.ts
  ├── gemini-api.ts
  ├── mailer.ts
  └── ...

lib/
  ├── auth.ts
  ├── billing.ts
  ├── quota.ts
  └── ...
```

## Support & Questions

Refer to:
- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs/api
- Next.js Docs: https://nextjs.org/docs
- Original BNE-MedPrice-AI-Extractor: https://github.com/hithamctrust/BNE-MedPrice-AI-Extractor
