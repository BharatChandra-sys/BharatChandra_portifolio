// SEO Utility Functions
// Helper functions for generating consistent SEO metadata

const BASE_URL = 'https://bharatchandra.me';
const SITE_NAME = 'Bodapati Bharat Chandra';
const DEFAULT_AUTHOR = 'Bodapati Bharat Chandra';
const DEFAULT_IMAGE = `${BASE_URL}/bodapati-bharat-chandra.jpg`;

/**
 * Generate complete metadata for a page
 * @param {Object} options - Metadata options
 * @returns {Object} Next.js metadata object
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = [DEFAULT_AUTHOR],
  section,
  tags = [],
}) {
  const url = `${BASE_URL}${path}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: fullTitle,
    description,
    keywords: Array.isArray(keywords) ? keywords : [keywords],
    
    alternates: {
      canonical: url,
      languages: {
        'en-IN': url,
        'en': url,
        'x-default': url,
      },
    },

    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: 'en_IN',
      images: [
        {
          url: image,
          width: type === 'article' ? 1200 : 400,
          height: type === 'article' ? 630 : 400,
          alt: title || SITE_NAME,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
        section,
        tags,
      }),
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@BharatChandra',
      site: '@BharatChandra',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

/**
 * Generate Article schema
 * @param {Object} options - Article options
 * @returns {Object} Article schema object
 */
export function generateArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author = DEFAULT_AUTHOR,
  image = DEFAULT_IMAGE,
  keywords = [],
  section,
  wordCount,
  language = 'en-IN',
}) {
  const readingTime = wordCount ? Math.ceil(wordCount / 200) : 4; // 200 words per minute

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      "name": author,
      "url": BASE_URL,
      "@id": `${BASE_URL}/#person`
    },
    publisher: {
      "@type": "Person",
      "name": author,
      "url": BASE_URL
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    keywords: Array.isArray(keywords) ? keywords : [keywords],
    articleSection: section,
    wordCount,
    timeRequired: `PT${readingTime}M`,
    inLanguage: language,
  };
}

/**
 * Generate BreadcrumbList schema
 * @param {Array} crumbs - Array of {name, url} objects
 * @returns {Object} BreadcrumbList schema
 */
export function generateBreadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * Generate SoftwareSourceCode schema
 * @param {Object} options - Project options
 * @returns {Object} SoftwareSourceCode schema
 */
export function generateProjectSchema({
  name,
  description,
  codeRepository,
  programmingLanguages = [],
  author = DEFAULT_AUTHOR,
  url,
  dateCreated,
  keywords = [],
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name,
    description,
    codeRepository,
    programmingLanguage: programmingLanguages,
    author: {
      "@type": "Person",
      "name": author,
      "@id": `${BASE_URL}/#person`
    },
    ...(url && { url }),
    ...(dateCreated && { dateCreated }),
    ...(keywords.length > 0 && { keywords }),
  };
}

/**
 * Calculate reading time from text
 * @param {string} text - Article text
 * @param {number} wordsPerMinute - Reading speed (default: 200)
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate meta tags for social sharing
 * @param {Object} options - Social meta options
 * @returns {Array} Array of meta tag objects
 */
export function generateSocialMeta({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
}) {
  return [
    // Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SITE_NAME },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:creator', content: '@BharatChandra' },
    { name: 'twitter:site', content: '@BharatChandra' },
  ];
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 160) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Generate SEO-friendly slug from title
 * @param {string} title - Title to slugify
 * @returns {string} URL-friendly slug
 */
export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract excerpt from content
 * @param {string} content - Full content
 * @param {number} length - Excerpt length
 * @returns {string} Excerpt
 */
export function extractExcerpt(content, length = 160) {
  // Remove markdown/HTML
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*|__|~~|`/g, '') // Remove formatting
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links but keep text
    .replace(/!\[[^\]]*\]\([^\)]+\)/g, '') // Remove images
    .trim();
  
  return truncateText(plainText, length);
}

const seoUtils = {
  generateMetadata,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateProjectSchema,
  calculateReadingTime,
  generateSocialMeta,
  truncateText,
  slugify,
  extractExcerpt,
  BASE_URL,
  SITE_NAME,
};

export default seoUtils;
