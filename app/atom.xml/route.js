// Atom Feed (alternative to RSS) for Blog Posts

import { BASE_URL, posts } from '@/lib/posts.mjs';

function generateAtom() {
  const entriesXML = posts.map(post => `
    <entry>
      <title><![CDATA[${post.title}]]></title>
      <link href="${BASE_URL}/blog/${post.slug}" rel="alternate" type="text/html" />
      <id>${BASE_URL}/blog/${post.slug}</id>
      <published>${post.published}</published>
      <updated>${post.published}</updated>
      <author>
        <name>Bodapati Bharat Chandra</name>
        <email>bc833498@gmail.com</email>
        <uri>${BASE_URL}</uri>
      </author>
      <summary type="html"><![CDATA[${post.description}]]></summary>
      ${post.categories.map(cat => `<category term="${cat}" />`).join('\n      ')}
    </entry>
  `).join('');

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Bodapati Bharat Chandra - Technical Writing</title>
  <link href="${BASE_URL}/blog" rel="alternate" type="text/html" />
  <link href="${BASE_URL}/atom.xml" rel="self" type="application/atom+xml" />
  <id>${BASE_URL}/blog</id>
  <updated>${new Date().toISOString()}</updated>
  <subtitle>Technical writing on production systems, rocket telemetry, LLMs, and startup architecture</subtitle>
  <author>
    <name>Bodapati Bharat Chandra</name>
    <email>bc833498@gmail.com</email>
    <uri>${BASE_URL}</uri>
  </author>
  <rights>Copyright © ${new Date().getFullYear()} Bodapati Bharat Chandra</rights>
  ${entriesXML}
</feed>`;
}

export async function GET() {
  const atom = generateAtom();
  
  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
