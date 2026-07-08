// RSS Feed for Blog Posts

const BASE_URL = 'https://bharatchandra.me';

const posts = [
  {
    slug: 'can-7usat-rocket-telemetry',
    title: 'How I built CAN-7USAT rocket telemetry with sub-5ms latency',
    description: 'A technical breakdown of the real-time ground control station I built for GARI\'s IN-SPACe national rocketry competition entry — 46-byte binary packets, Kalman filtering, and a 6-state flight state machine.',
    pubDate: '2026-06-10T00:00:00Z',
    author: 'bc833498@gmail.com (Bodapati Bharat Chandra)',
    categories: ['Rocketry', 'FastAPI', 'WebSockets', 'Kalman Filter', 'Python']
  },
  {
    slug: 'on-premise-llm-bhel',
    title: 'Building a fully on-premise LLM pipeline at BHEL',
    description: 'How I built a production AI vendor compliance portal for BHEL that runs entirely on local infrastructure — no external APIs, no data leaving the network. FastAPI + Ollama + PyMuPDF.',
    pubDate: '2026-05-15T00:00:00Z',
    author: 'bc833498@gmail.com (Bodapati Bharat Chandra)',
    categories: ['LLM', 'FastAPI', 'Ollama', 'Production AI', 'BHEL']
  },
  {
    slug: 'co-founding-easify',
    title: 'Co-founding Easify: Smart pooling in Hyderabad',
    description: 'What I learned building a ride-pooling platform from scratch — architecture decisions, real-time matching, and the hardest part: getting people to actually use it.',
    pubDate: '2026-04-20T00:00:00Z',
    author: 'bc833498@gmail.com (Bodapati Bharat Chandra)',
    categories: ['Startup', 'FastAPI', 'PostgreSQL', 'Product', 'Easify']
  }
];

function generateRSS() {
  const itemsXML = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.pubDate).toUTCString()}</pubDate>
      <author>${post.author}</author>
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
