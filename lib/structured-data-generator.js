// Advanced Structured Data Generators
// Production-ready schema generators for complex use cases

const BASE_URL = 'https://bharatchandra.me';

/**
 * Generate complete Person schema with all relationships
 */
export function generateEnhancedPersonSchema(person) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    "name": person.name,
    "givenName": person.givenName,
    "familyName": person.familyName,
    "alternateName": person.alternateNames || [],
    "email": person.email,
    "telephone": person.telephone,
    "jobTitle": person.jobTitle,
    "description": person.description,
    "url": BASE_URL,
    "image": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/${person.image}`,
      "width": 400,
      "height": 400
    },
    "sameAs": person.socialLinks || [],
    "knowsAbout": person.skills || [],
    "knowsLanguage": person.languages?.map(lang => ({
      "@type": "Language",
      "name": lang
    })) || [],
    "alumniOf": person.education?.map(edu => ({
      "@type": "EducationalOrganization",
      "name": edu.institution,
      "url": edu.url
    })) || [],
    "worksFor": person.currentWork ? {
      "@type": "Organization",
      "name": person.currentWork.name,
      "url": person.currentWork.url
    } : undefined,
    "award": person.awards?.map(award => ({
      "@type": "Award",
      "name": award.name,
      "description": award.description,
      "dateAwarded": award.date
    })) || [],
    "workExample": person.projects?.map(project => ({
      "@type": "CreativeWork",
      "name": project.name,
      "url": project.url,
      "description": project.description
    })) || [],
    "address": person.address ? {
      "@type": "PostalAddress",
      "addressLocality": person.address.city,
      "addressRegion": person.address.region,
      "addressCountry": person.address.country,
      "postalCode": person.address.postalCode
    } : undefined,
    "nationality": person.nationality ? {
      "@type": "Country",
      "name": person.nationality
    } : undefined
  };
}

/**
 * Generate HowTo schema for tutorial blog posts
 */
export function generateHowToSchema({ name, description, steps, image, totalTime, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "image": image || `${BASE_URL}/og-image.png`,
    "totalTime": totalTime || "PT30M",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": `${url}#step-${index + 1}`,
      ...(step.image && { "image": step.image })
    })),
    "url": url
  };
}

/**
 * Generate VideoObject schema
 */
export function generateVideoSchema({ name, description, thumbnailUrl, uploadDate, duration, contentUrl, embedUrl }) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration, // ISO 8601 format (e.g., "PT1M30S" for 1 min 30 sec)
    "contentUrl": contentUrl,
    "embedUrl": embedUrl,
    "publisher": {
      "@type": "Person",
      "name": "Bodapati Bharat Chandra",
      "url": BASE_URL
    }
  };
}

/**
 * Generate Course schema for learning content
 */
export function generateCourseSchema({ name, description, provider, url, datePublished }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Person",
      "name": provider || "Bodapati Bharat Chandra",
      "url": BASE_URL
    },
    "url": url,
    "datePublished": datePublished,
    "educationalLevel": "Intermediate",
    "inLanguage": "en-IN",
    "isAccessibleForFree": true
  };
}

/**
 * Generate AggregateRating schema
 */
export function generateAggregateRatingSchema({ ratingValue, reviewCount, bestRating = 5 }) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": ratingValue,
    "reviewCount": reviewCount,
    "bestRating": bestRating,
    "worstRating": 1
  };
}

/**
 * Generate Review schema
 */
export function generateReviewSchema({ author, datePublished, reviewBody, ratingValue }) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
    "reviewBody": reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": ratingValue,
      "bestRating": 5,
      "worstRating": 1
    }
  };
}

/**
 * Generate Event schema (for hackathons, conferences)
 */
export function generateEventSchema({ name, description, startDate, endDate, location, organizer, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": location.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location.city,
        "addressCountry": location.country
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": organizer,
      "url": url
    }
  };
}

/**
 * Generate SpeakableSpecification for voice search
 */
export function generateSpeakableSchema(cssSelectors) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelectors // e.g., ["#title", "#summary"]
    }
  };
}

/**
 * Generate SearchAction for site search
 */
export function generateSearchActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate SoftwareApplication schema (for web apps)
 */
export function generateSoftwareApplicationSchema({ name, description, applicationCategory, offers, aggregateRating }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": applicationCategory, // e.g., "DeveloperApplication"
    "operatingSystem": "Web Browser",
    "offers": offers ? {
      "@type": "Offer",
      "price": offers.price || "0",
      "priceCurrency": offers.currency || "USD"
    } : {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    ...(aggregateRating && { aggregateRating })
  };
}

/**
 * Generate complete Blog with BlogPosting array
 */
export function generateBlogWithPostingsSchema(posts) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Bodapati Bharat Chandra - Technical Writing",
    "description": "Technical writing on production systems, AI/ML, and startup architecture",
    "url": `${BASE_URL}/blog`,
    "author": {
      "@type": "Person",
      "name": "Bodapati Bharat Chandra",
      "@id": `${BASE_URL}/#person`
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/blog/${post.slug}`,
      "headline": post.title,
      "description": post.description,
      "datePublished": post.published,
      "dateModified": post.modified || post.published,
      "author": { "@id": `${BASE_URL}/#person` },
      "url": `${BASE_URL}/blog/${post.slug}`,
      "keywords": post.keywords,
      "articleSection": post.section,
      "wordCount": post.wordCount,
      "timeRequired": `PT${Math.ceil(post.wordCount / 200)}M`
    }))
  };
}

const structuredDataGenerator = {
  generateEnhancedPersonSchema,
  generateHowToSchema,
  generateVideoSchema,
  generateCourseSchema,
  generateAggregateRatingSchema,
  generateReviewSchema,
  generateEventSchema,
  generateSpeakableSchema,
  generateSearchActionSchema,
  generateSoftwareApplicationSchema,
  generateBlogWithPostingsSchema,
};

export default structuredDataGenerator;
