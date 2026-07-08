#!/usr/bin/env node

/**
 * SEO Validation Script
 * 
 * Run this after building your Next.js app to validate SEO implementation.
 * 
 * Usage:
 *   node validate-seo.js
 * 
 * Or add to package.json:
 *   "scripts": {
 *     "validate:seo": "node validate-seo.js"
 *   }
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bharatchandra.me';
const LOCAL_URL = 'http://localhost:3000';

// Use local URL if testing locally, otherwise use production
const TEST_URL = process.argv.includes('--local') ? LOCAL_URL : BASE_URL;

const PAGES_TO_TEST = [
  '/',
  '/blog',
  '/blog/can-7usat-rocket-telemetry',
  '/blog/on-premise-llm-bhel',
  '/blog/co-founding-easify',
  '/projects',
  '/contact',
];

const REQUIRED_SCHEMAS = {
  '/': ['Person', 'WebSite', 'BreadcrumbList', 'ProfilePage', 'ItemList', 'FAQPage', 'EducationalOccupationalCredential'],
  '/blog/can-7usat-rocket-telemetry': ['Article'],
  '/blog/on-premise-llm-bhel': ['Article'],
  '/blog/co-founding-easify': ['Article'],
};

const REQUIRED_META_TAGS = [
  'description',
  'keywords',
  'og:title',
  'og:description',
  'og:url',
  'og:type',
  'twitter:card',
  'twitter:title',
];

console.log('\n🔍 SEO Validation Starting...\n');
console.log(`Testing URL: ${TEST_URL}\n`);

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', reject);
  });
}

function extractSchemas(html) {
  const schemaRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gs;
  const matches = [...html.matchAll(schemaRegex)];
  return matches.map(match => {
    try {
      return JSON.parse(match[1]);
    } catch (e) {
      return null;
    }
  }).filter(Boolean);
}

function extractMetaTags(html) {
  const metaRegex = /<meta[^>]*>/g;
  const matches = [...html.matchAll(metaRegex)];
  const tags = {};
  
  matches.forEach(match => {
    const tag = match[0];
    const nameMatch = tag.match(/name=["']([^"']+)["']/);
    const propertyMatch = tag.match(/property=["']([^"']+)["']/);
    const contentMatch = tag.match(/content=["']([^"']+)["']/);
    
    const key = nameMatch ? nameMatch[1] : (propertyMatch ? propertyMatch[1] : null);
    const value = contentMatch ? contentMatch[1] : null;
    
    if (key && value) {
      tags[key] = value;
    }
  });
  
  return tags;
}

function checkHreflang(html) {
  const hreflangRegex = /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*>/g;
  const matches = [...html.matchAll(hreflangRegex)];
  return matches.map(m => m[1]);
}

function checkPreconnect(html) {
  const preconnectRegex = /<link[^>]*rel=["']preconnect["'][^>]*href=["']([^"']+)["'][^>]*>/g;
  const matches = [...html.matchAll(preconnectRegex)];
  return matches.map(m => m[1]);
}

async function validatePage(path) {
  console.log(`\n📄 Testing: ${path}`);
  console.log('─'.repeat(50));
  
  try {
    const url = TEST_URL + path;
    const { status, html } = await fetchPage(url);
    
    if (status !== 200) {
      console.log(`❌ Status: ${status} (Expected 200)`);
      return false;
    }
    console.log(`✅ Status: ${status}`);
    
    // Check schemas
    const schemas = extractSchemas(html);
    const schemaTypes = schemas.map(s => s['@type']).filter(Boolean);
    console.log(`\n📊 Found ${schemas.length} schema(s): ${schemaTypes.join(', ')}`);
    
    if (REQUIRED_SCHEMAS[path]) {
      const missing = REQUIRED_SCHEMAS[path].filter(required => !schemaTypes.includes(required));
      if (missing.length > 0) {
        console.log(`❌ Missing schemas: ${missing.join(', ')}`);
        return false;
      } else {
        console.log(`✅ All required schemas present`);
      }
    }
    
    // Check meta tags
    const metaTags = extractMetaTags(html);
    const missingMeta = REQUIRED_META_TAGS.filter(tag => !metaTags[tag]);
    
    if (missingMeta.length > 0) {
      console.log(`\n⚠️  Missing meta tags: ${missingMeta.join(', ')}`);
    } else {
      console.log(`\n✅ All required meta tags present`);
    }
    
    // Check hreflang (only on home page)
    if (path === '/') {
      const hreflangs = checkHreflang(html);
      console.log(`\n🌍 Hreflang tags: ${hreflangs.length > 0 ? hreflangs.join(', ') : 'None found'}`);
      if (hreflangs.length === 0) {
        console.log(`⚠️  No hreflang tags found (expected: en-IN, en, x-default)`);
      } else {
        console.log(`✅ Hreflang tags present`);
      }
      
      // Check preconnect
      const preconnects = checkPreconnect(html);
      console.log(`\n⚡ Preconnect hints: ${preconnects.length > 0 ? preconnects.join(', ') : 'None found'}`);
      if (preconnects.length > 0) {
        console.log(`✅ Performance hints present`);
      }
    }
    
    // Check for Article schema details on blog posts
    if (path.includes('/blog/') && path !== '/blog') {
      const articleSchema = schemas.find(s => s['@type'] === 'Article');
      if (articleSchema) {
        const hasPublished = !!articleSchema.datePublished;
        const hasAuthor = !!articleSchema.author;
        const hasPublisher = !!articleSchema.publisher;
        
        console.log(`\n📝 Article Schema Details:`);
        console.log(`   ${hasPublished ? '✅' : '❌'} datePublished: ${articleSchema.datePublished || 'Missing'}`);
        console.log(`   ${hasAuthor ? '✅' : '❌'} author: ${articleSchema.author?.name || 'Missing'}`);
        console.log(`   ${hasPublisher ? '✅' : '❌'} publisher: ${articleSchema.publisher?.name || 'Missing'}`);
        
        if (!hasPublished || !hasAuthor || !hasPublisher) {
          return false;
        }
      }
    }
    
    console.log(`\n✅ Page validation passed`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

async function runValidation() {
  let passed = 0;
  let failed = 0;
  
  for (const page of PAGES_TO_TEST) {
    const result = await validatePage(page);
    if (result) {
      passed++;
    } else {
      failed++;
    }
  }
  
  console.log('\n' + '═'.repeat(50));
  console.log(`\n📊 Validation Summary:`);
  console.log(`   ✅ Passed: ${passed}/${PAGES_TO_TEST.length}`);
  console.log(`   ❌ Failed: ${failed}/${PAGES_TO_TEST.length}`);
  
  if (failed === 0) {
    console.log('\n🎉 All SEO validations passed!\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some validations failed. Review the output above.\n');
    process.exit(1);
  }
}

// Show usage
if (process.argv.includes('--help')) {
  console.log(`
Usage:
  node validate-seo.js [--local] [--help]

Options:
  --local   Test against localhost:3000 instead of production
  --help    Show this help message

Examples:
  node validate-seo.js              # Test production site
  node validate-seo.js --local      # Test local development server

Before running:
  Production: Ensure site is deployed and accessible
  Local: Run 'npm run dev' or 'npm run build && npm start' first
  `);
  process.exit(0);
}

// Run validation
runValidation().catch(err => {
  console.error('\n❌ Validation failed:', err.message);
  process.exit(1);
});
