// RSS Feed for Blog Posts

import { BASE_URL, posts } from '@/lib/posts.mjs';

const AUTHOR = 'bc833498@gmail.com (Bodapati Bharat Chandra)';

function generateRSS() {
  const itemsXML = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.published).toUTCString()}</pubDate>
      <author>${AUTHOR}</author>
      ${post.categories.map(cat => `<category>${cat}</category>`).join('\n      ')}
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bodapati Bharat Chandra - Technical Writing</title>
    <link>${BASE_URL}/blog</link>
    <description>Technical writing on production systems, rocket telemetry, LLMs, and startup architecture by Bodapati Bharat Chandra</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/bodapati-bharat-chandra.jpg</url>
      <title>Bodapati Bharat Chandra</title>
      <link>${BASE_URL}</link>
    </image>
    ${itemsXML}
  </channel>
</rss>`;
}

export async function GET() {
  const rss = generateRSS();
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
