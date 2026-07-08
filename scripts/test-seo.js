#!/usr/bin/env node

/**
 * SEO Validation Script
 * Tests critical SEO elements on the site
 */

const http = require('http');
const fs = require('fs');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const PAGES = [
  '/',
  '/projects',
  '/blog',
  '/contact',
  '/blog/can-7usat-rocket-telemetry',
  '/blog/on-premise-llm-bhel',
  '/blog/co-founding-easify'
];

const REQUIRED_META_TAGS = [
  'title',
  'description',
  'og:title',
  'og:description',
  'og:url',
  'og:image',
  'twitter:card',
  'twitter:title',
  'twitter:description'
];

const results = {
  passed: [],
  failed: [],
  warnings: []
};

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function checkMetaTags(html, page) {
  const missing = [];
  
  REQUIRED_META_TAGS.forEach(tag => {
    const patterns = [
      new RegExp(`<meta[^>]*name=["']${tag}["'][^>]*content=["'][^"']+["']`, 'i'),
      new RegExp(`<meta[^>]*property=["']${tag}["'][^>]*content=["'][^"']+["']`, 'i'),
      new RegExp(`<title>[^<]+</title>`, 'i')
    ];
    
    const found = patterns.some(pattern => pattern.test(html));
    if (!found) {
      missing.push(tag);
    }
  });
  
  return missing;
}

function checkStructuredData(html, page) {
  const schemaMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis);
  
  if (!schemaMatches || schemaMatches.length === 0) {
    return { valid: false, error: 'No structured data found' };
  }
  
  const schemas = [];
  const errors = [];
  
  schemaMatches.forEach((match, index) => {
    try {
      const jsonMatch = match.match(/>(.+?)</s);
      if (jsonMatch) {
        const schema = JSON.parse(jsonMatch[1]);
        schemas.push(schema['@type'] || 'Unknown');
        
        // Validate required properties
        if (!schema['@context']) {
          errors.push(`Schema ${index + 1}: Missing @context`);
        }
        if (!schema['@type']) {
          errors.push(`Schema ${index + 1}: Missing @type`);
        }
      }
    } catch (e) {
      errors.push(`Schema ${index + 1}: Invalid JSON - ${e.message}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    schemas: schemas,
    errors: errors,
    count: schemas.length
  };
}

function checkCanonical(html, page) {
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  return canonicalMatch ? canonicalMatch[1] : null;
}

function checkRobots(html) {
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  return robotsMatch ? robotsMatch[1] : 'Not found';
}

function checkHreflang(html) {
  const hreflangMatches = html.match(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["']/gi);
  return hreflangMatches ? hreflangMatches.length : 0;
}

function checkImageAltTags(html) {
  const images = html.match(/<img[^>]*>/gi) || [];
  const missingAlt = images.filter(img => !img.match(/alt=["'][^"']*["']/i));
  return {
    total: images.length,
    missingAlt: missingAlt.length
  };
}

function checkHeadingStructure(html) {
  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  const hasH2 = /<h2[^>]*>/i.test(html);
  
  return {
    h1Count,
    hasH2,
    valid: h1Count === 1 && hasH2
  };
}

async function testPage(page) {
  console.log(`\n🔍 Testing: ${page}`);
  
  try {
    const html = await fetchPage(`${BASE_URL}${page}`);
    const pageResults = {
      url: page,
      tests: {}
    };
    
    // Test 1: Meta Tags
    const missingMeta = checkMetaTags(html, page);
    pageResults.tests.metaTags = {
      passed: missingMeta.length === 0,
      missing: missingMeta
    };
    
    if (missingMeta.length === 0) {
      console.log('  ✅ All required meta tags present');
    } else {
      console.log(`  ❌ Missing meta tags: ${missingMeta.join(', ')}`);
    }
    
    // Test 2: Structured Data
    const schemaResults = checkStructuredData(html, page);
    pageResults.tests.structuredData = schemaResults;
    
    if (schemaResults.valid) {
      console.log(`  ✅ Structured data valid (${schemaResults.count} schemas: ${schemaResults.schemas.join(', ')})`);
    } else {
      console.log(`  ❌ Structured data issues: ${schemaResults.errors.join('; ')}`);
    }
    
    // Test 3: Canonical URL
    const canonical = checkCanonical(html, page);
    pageResults.tests.canonical = canonical;
    
    if (canonical) {
      console.log(`  ✅ Canonical URL: ${canonical}`);
    } else {
      console.log('  ⚠️  No canonical URL found');
    }
    
    // Test 4: Robots Meta
    const robots = checkRobots(html);
    pageResults.tests.robots = robots;
    console.log(`  ℹ️  Robots: ${robots}`);
    
    // Test 5: Hreflang
    const hreflangCount = checkHreflang(html);
    pageResults.tests.hreflang = hreflangCount;
    
    if (hreflangCount > 0) {
      console.log(`  ✅ Hreflang tags: ${hreflangCount}`);
    } else {
      console.log('  ⚠️  No hreflang tags');
    }
    
    // Test 6: Image Alt Tags
    const imageResults = checkImageAltTags(html);
    pageResults.tests.images = imageResults;
    
    if (imageResults.missingAlt === 0) {
      console.log(`  ✅ All ${imageResults.total} images have alt tags`);
    } else {
      console.log(`  ⚠️  ${imageResults.missingAlt}/${imageResults.total} images missing alt tags`);
    }
    
    // Test 7: Heading Structure
    const headingResults = checkHeadingStructure(html);
    pageResults.tests.headings = headingResults;
    
    if (headingResults.valid) {
      console.log('  ✅ Heading structure valid (1 H1, H2+ present)');
    } else {
      console.log(`  ⚠️  Heading structure: ${headingResults.h1Count} H1 tags, H2 present: ${headingResults.hasH2}`);
    }
    
    // Determine overall pass/fail
    const criticalFailed = !pageResults.tests.metaTags.passed || !pageResults.tests.structuredData.valid;
    
    if (criticalFailed) {
      results.failed.push(pageResults);
    } else {
      results.passed.push(pageResults);
    }
    
    return pageResults;
    
  } catch (error) {
    console.log(`  ❌ Error testing page: ${error.message}`);
    results.failed.push({
      url: page,
      error: error.message
    });
  }
}

async function runTests() {
  console.log('🚀 Starting SEO Validation Tests');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📄 Pages to test: ${PAGES.length}`);
  
  for (const page of PAGES) {
    await testPage(page);
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${results.passed.length}/${PAGES.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${PAGES.length}`);
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      total: PAGES.length,
      passed: results.passed.length,
      failed: results.failed.length
    },
    results: results
  };
  
  fs.writeFileSync('seo-report.json', JSON.stringify(report, null, 2));
  console.log('\n📄 Report saved to seo-report.json');
  
  // Exit with error if any tests failed
  if (results.failed.length > 0) {
    console.log('\n❌ SEO validation failed!');
    process.exit(1);
  } else {
    console.log('\n✅ All SEO validations passed!');
    process.exit(0);
  }
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
