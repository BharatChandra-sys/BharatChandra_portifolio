#!/usr/bin/env node

/**
 * Schema.org Validation Script
 * Validates JSON-LD structured data against Schema.org specifications
 */

const http = require('http');
const fs = require('fs');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const PAGES = [
  { url: '/', requiredSchemas: ['Person', 'WebSite', 'BreadcrumbList', 'Organization', 'ContactPoint', 'FAQPage', 'ProfilePage', 'ItemList', 'EducationalOccupationalCredential'] },
  { url: '/projects', requiredSchemas: ['BreadcrumbList'] },
  { url: '/blog', requiredSchemas: ['Blog', 'BreadcrumbList'] },
  { url: '/contact', requiredSchemas: ['ContactPoint', 'BreadcrumbList'] }
];

const results = {
  passed: [],
  failed: [],
  totalSchemas: 0
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

function extractSchemas(html) {
  const schemaMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis);
  
  if (!schemaMatches) {
    return [];
  }
  
  const schemas = [];
  
  schemaMatches.forEach((match) => {
    try {
      const jsonMatch = match.match(/>(.+?)</s);
      if (jsonMatch) {
        const schema = JSON.parse(jsonMatch[1]);
        schemas.push(schema);
      }
    } catch (e) {
      console.error('Error parsing schema:', e.message);
    }
  });
  
  return schemas;
}

function validateSchema(schema, index) {
  const errors = [];
  const warnings = [];
  
  // Required properties for all schemas
  if (!schema['@context']) {
    errors.push(`Missing @context`);
  } else if (!schema['@context'].includes('schema.org')) {
    errors.push(`Invalid @context: must include schema.org`);
  }
  
  if (!schema['@type']) {
    errors.push(`Missing @type`);
  }
  
  // Type-specific validations
  const type = schema['@type'];
  
  switch (type) {
    case 'Person':
      if (!schema.name) errors.push('Person: missing name');
      if (!schema.email && !schema.sameAs) warnings.push('Person: no contact info');
      if (!schema['@id']) errors.push('Person: missing @id');
      break;
      
    case 'Organization':
      if (!schema.name) errors.push('Organization: missing name');
      if (!schema['@id']) errors.push('Organization: missing @id');
      if (schema.founder && !Array.isArray(schema.founder)) {
        warnings.push('Organization: founder should be an array');
      }
      if (schema.member && !Array.isArray(schema.member)) {
        warnings.push('Organization: member should be an array');
      }
      break;
      
    case 'WebSite':
      if (!schema.url) errors.push('WebSite: missing url');
      if (!schema.name) errors.push('WebSite: missing name');
      if (!schema['@id']) errors.push('WebSite: missing @id');
      if (!schema.inLanguage) warnings.push('WebSite: missing inLanguage');
      break;
      
    case 'BreadcrumbList':
      if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
        errors.push('BreadcrumbList: missing or invalid itemListElement array');
      } else {
        schema.itemListElement.forEach((item, i) => {
          if (!item['@type'] || item['@type'] !== 'ListItem') {
            errors.push(`BreadcrumbList item ${i}: invalid @type`);
          }
          if (typeof item.position !== 'number') {
            errors.push(`BreadcrumbList item ${i}: missing or invalid position`);
          }
          if (!item.name) {
            errors.push(`BreadcrumbList item ${i}: missing name`);
          }
        });
      }
      break;
      
    case 'ItemList':
      if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
        errors.push('ItemList: missing or invalid itemListElement array');
      } else {
        schema.itemListElement.forEach((listItem, i) => {
          if (!listItem.item) {
            errors.push(`ItemList ${i}: missing item`);
          } else {
            const item = listItem.item;
            if (!item['@type']) {
              errors.push(`ItemList ${i}: item missing @type`);
            }
            if (!item['@id']) {
              errors.push(`ItemList ${i}: item missing @id`);
            }
            if (item['@type'] === 'SoftwareSourceCode') {
              if (!item.author || !item.author['@type']) {
                errors.push(`ItemList ${i}: SoftwareSourceCode must have full author object`);
              }
              if (!item.dateCreated) warnings.push(`ItemList ${i}: missing dateCreated`);
              if (!item.license) warnings.push(`ItemList ${i}: missing license`);
            }
          }
        });
      }
      break;
      
    case 'ProfilePage':
      if (!schema['@id']) errors.push('ProfilePage: missing @id');
      if (!schema.dateCreated) warnings.push('ProfilePage: missing dateCreated');
      if (!schema.mainEntity) errors.push('ProfilePage: missing mainEntity');
      break;
      
    case 'FAQPage':
      if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
        errors.push('FAQPage: missing or invalid mainEntity array');
      }
      break;
      
    case 'EducationalOccupationalCredential':
      if (!schema['@id']) errors.push('EducationalOccupationalCredential: missing @id');
      if (!schema.name) errors.push('EducationalOccupationalCredential: missing name');
      if (!schema.validFrom) errors.push('EducationalOccupationalCredential: missing validFrom');
      // Check date format
      if (schema.validFrom && !/^\d{4}-\d{2}-\d{2}/.test(schema.validFrom)) {
        errors.push('EducationalOccupationalCredential: validFrom must be ISO 8601 format');
      }
      if (schema.validUntil && !/^\d{4}-\d{2}-\d{2}/.test(schema.validUntil)) {
        errors.push('EducationalOccupationalCredential: validUntil must be ISO 8601 format');
      }
      break;
      
    case 'ContactPoint':
      if (!schema.contactType) errors.push('ContactPoint: missing contactType');
      if (!schema.email && !schema.telephone) {
        errors.push('ContactPoint: must have email or telephone');
      }
      break;
  }
  
  return { errors, warnings };
}

async function testPage(page) {
  console.log(`\n🔍 Testing: ${page.url}`);
  
  try {
    const html = await fetchPage(`${BASE_URL}${page.url}`);
    const schemas = extractSchemas(html);
    
    console.log(`  📋 Found ${schemas.length} schema(s)`);
    results.totalSchemas += schemas.length;
    
    const pageResults = {
      url: page.url,
      found: [],
      missing: [],
      errors: [],
      warnings: []
    };
    
    // Check for required schemas
    const foundTypes = schemas.map(s => s['@type']);
    page.requiredSchemas.forEach(required => {
      if (foundTypes.includes(required)) {
        pageResults.found.push(required);
        console.log(`  ✅ ${required}`);
      } else {
        pageResults.missing.push(required);
        console.log(`  ❌ Missing: ${required}`);
      }
    });
    
    // Validate each schema
    schemas.forEach((schema, index) => {
      const type = schema['@type'] || 'Unknown';
      const validation = validateSchema(schema, index);
      
      if (validation.errors.length > 0) {
        validation.errors.forEach(error => {
          console.log(`  ❌ ${error}`);
          pageResults.errors.push({ schema: type, error });
        });
      }
      
      if (validation.warnings.length > 0) {
        validation.warnings.forEach(warning => {
          console.log(`  ⚠️  ${warning}`);
          pageResults.warnings.push({ schema: type, warning });
        });
      }
    });
    
    // Determine pass/fail
    const hasCriticalIssues = pageResults.missing.length > 0 || pageResults.errors.length > 0;
    
    if (hasCriticalIssues) {
      results.failed.push(pageResults);
    } else {
      results.passed.push(pageResults);
    }
    
    return pageResults;
    
  } catch (error) {
    console.log(`  ❌ Error testing page: ${error.message}`);
    results.failed.push({
      url: page.url,
      error: error.message
    });
  }
}

async function runTests() {
  console.log('🚀 Starting Schema.org Validation Tests');
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
  console.log(`📋 Total schemas found: ${results.totalSchemas}`);
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      total: PAGES.length,
      passed: results.passed.length,
      failed: results.failed.length,
      totalSchemas: results.totalSchemas
    },
    results: results
  };
  
  fs.writeFileSync('schema-report.json', JSON.stringify(report, null, 2));
  console.log('\n📄 Report saved to schema-report.json');
  
  // Exit with error if any tests failed
  if (results.failed.length > 0) {
    console.log('\n❌ Schema validation failed!');
    process.exit(1);
  } else {
    console.log('\n✅ All schema validations passed!');
    process.exit(0);
  }
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
