# 🚀 CI/CD Pipeline & Testing Setup

## Overview

Complete CI/CD pipeline with automated testing, SEO validation, performance monitoring, and security audits.

---

## 📦 What's Included

### 1. **GitHub Actions Workflows** (.github/workflows/ci.yml)
- ✅ Lint and type checking
- ✅ Build testing
- ✅ SEO validation
- ✅ Lighthouse performance audits
- ✅ Security vulnerability scanning
- ✅ Schema.org validation
- ✅ Automatic deployment to Vercel

### 2. **Testing Scripts**
- `scripts/test-seo.js` - SEO validation
- `scripts/test-schema.js` - Schema.org validation

### 3. **Configuration Files**
- `.lighthouserc.json` - Lighthouse CI configuration
- Updated `package.json` with test scripts

---

## 🛠️ Setup Instructions

### Step 1: Install Dependencies

```bash
npm install --save-dev @lhci/cli wait-on
```

### Step 2: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

1. **VERCEL_TOKEN**
   - Go to https://vercel.com/account/tokens
   - Create new token
   - Copy and paste as secret

2. **VERCEL_ORG_ID**
   - Run: `npx vercel link`
   - Open `.vercel/project.json`
   - Copy `orgId` value

3. **VERCEL_PROJECT_ID**
   - From same `.vercel/project.json` file
   - Copy `projectId` value

4. **NEXT_PUBLIC_GA_MEASUREMENT_ID** (optional)
   - Your Google Analytics measurement ID
   - Format: `G-XXXXXXXXXX`

### Step 3: Enable GitHub Actions

1. Go to repository → Actions tab
2. Enable workflows if disabled
3. Push changes to trigger first run

---

## 📋 Available NPM Scripts

### Testing

```bash
# Run SEO validation
npm run test:seo

# Run schema validation
npm run test:schema

# Run Lighthouse CI
npm run test:lighthouse

# Run all tests
npm run test:all
```

### Development

```bash
# Start dev server
npm run dev

# Build production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Analyze bundle size
npm run analyze
```

---

## 🔄 CI/CD Workflow

### On Push to `main` or `develop`:

1. **Lint & Type Check** (Job 1)
   - Runs ESLint
   - Checks for code quality issues
   - Uploads results as artifacts

2. **Build & Test** (Job 2)
   - Builds Next.js project
   - Verifies no build errors
   - Uploads build artifacts

3. **SEO Validation** (Job 3)
   - Checks meta tags on all pages
   - Validates structured data
   - Checks canonical URLs, robots meta
   - Validates image alt tags
   - Checks heading structure

4. **Lighthouse Audit** (Job 4)
   - Tests performance on key pages
   - Runs on home, projects, blog, contact
   - Enforces minimum scores:
     - Performance: 90+
     - Accessibility: 95+
     - Best Practices: 90+
     - SEO: 95+
   - Comments results on PRs

5. **Security Audit** (Job 5)
   - Runs `npm audit`
   - Checks for vulnerabilities
   - Reviews dependencies on PRs

6. **Schema Validation** (Job 6)
   - Validates all JSON-LD schemas
   - Checks required properties
   - Ensures proper formatting

7. **Deploy** (Job 7) - Only on `main` branch
   - Deploys to Vercel production
   - Only runs if all tests pass

---

## 🎯 Lighthouse CI Configuration

Located in `.lighthouserc.json`:

### Enforced Metrics

| Metric | Threshold | Type |
|--------|-----------|------|
| Performance Score | 90+ | Error |
| Accessibility Score | 95+ | Error |
| Best Practices Score | 90+ | Error |
| SEO Score | 95+ | Error |
| First Contentful Paint | <2000ms | Warn |
| Largest Contentful Paint | <2500ms | Error |
| Cumulative Layout Shift | <0.1 | Error |
| Total Blocking Time | <300ms | Warn |

### Tested Pages

1. Home (/)
2. Projects (/projects)
3. Blog (/blog)
4. Contact (/contact)

---

## 🔍 SEO Testing

The `test-seo.js` script validates:

### ✅ Meta Tags
- Title tag present
- Description tag present
- OpenGraph tags (title, description, url, image)
- Twitter Card tags

### ✅ Structured Data
- JSON-LD schemas present
- Valid JSON formatting
- Required properties present

### ✅ Technical SEO
- Canonical URL
- Robots meta tag
- Hreflang tags
- Image alt tags
- Heading structure (1 H1, H2+ present)

### Output

- Console output with pass/fail status
- JSON report saved to `seo-report.json`
- Uploaded as GitHub Actions artifact

---

## 📋 Schema.org Validation

The `test-schema.js` script validates:

### ✅ Schema Types Checked

| Page | Required Schemas |
|------|------------------|
| Home | Person, WebSite, BreadcrumbList, Organization (2), ContactPoint, FAQPage, ProfilePage, ItemList, EducationalOccupationalCredential |
| Projects | BreadcrumbList |
| Blog | Blog, BreadcrumbList |
| Contact | ContactPoint, BreadcrumbList |

### ✅ Validations

1. **Required Properties**
   - @context (must include schema.org)
   - @type
   - @id (where required)

2. **Type-Specific Checks**
   - Person: name, email/sameAs
   - Organization: name, @id, founder/member arrays
   - WebSite: url, name, inLanguage
   - BreadcrumbList: itemListElement array
   - ItemList: proper author objects, dates, licenses
   - ProfilePage: @id, dateCreated, mainEntity
   - EducationalOccupationalCredential: ISO 8601 dates

### Output

- Console output with validation results
- JSON report saved to `schema-report.json`
- Uploaded as GitHub Actions artifact

---

## 🔒 Security Features

### npm audit
- Runs on every push
- Checks for known vulnerabilities
- Fails on moderate+ severity issues

### Dependency Review
- Analyzes new dependencies in PRs
- Checks for security advisories
- Prevents malicious packages

---

## 📊 Viewing Results

### In GitHub Actions

1. Go to repository → Actions tab
2. Click on latest workflow run
3. View job results and logs
4. Download artifacts (reports)

### Locally

```bash
# Run tests locally
npm run test:all

# View reports
cat seo-report.json
cat schema-report.json
```

---

## 🚨 Troubleshooting

### Build Fails

```bash
# Check locally first
npm run build

# Check specific issues
npm run lint
```

### Test Fails

```bash
# Run tests locally with server
npm run build
npm run start &
npm run test:seo
npm run test:schema
```

### Lighthouse Fails

- Check Core Web Vitals in browser DevTools
- Use PageSpeed Insights: https://pagespeed.web.dev/
- Review .lighthouserc.json thresholds

### Deployment Fails

- Verify Vercel secrets are correct
- Check Vercel dashboard for errors
- Ensure all tests pass before deployment

---

## 🎯 Best Practices

### Before Committing

```bash
# Always run locally first
npm run lint
npm run build
npm run test:all
```

### For Pull Requests

- All CI checks must pass
- Review Lighthouse results
- Check for security issues
- Verify SEO validations

### For Production

- Only merge to `main` when all tests pass
- Monitor deployment in Vercel
- Check live site after deployment
- Validate with external tools

---

## 📈 Continuous Improvement

### Weekly Tasks

1. Review CI/CD logs for patterns
2. Check Lighthouse scores trend
3. Monitor build times
4. Review security advisories

### Monthly Tasks

1. Update dependencies
2. Review and adjust Lighthouse thresholds
3. Add new pages to test coverage
4. Audit and improve Core Web Vitals

---

## 🔗 External Tools

After deployment, validate with:

- **Schema.org Validator**: https://validator.schema.org/
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Google Search Console**: https://search.google.com/search-console/

---

## ✅ Success Metrics

Your CI/CD is working when:

- ✅ All GitHub Actions checks pass
- ✅ Lighthouse scores meet thresholds
- ✅ Zero schema validation errors
- ✅ Zero SEO validation errors
- ✅ Zero security vulnerabilities
- ✅ Automatic deployment to Vercel succeeds
- ✅ Live site validates externally

---

**Ready to Deploy!** 🚀

Push your changes to trigger the first CI/CD run.
