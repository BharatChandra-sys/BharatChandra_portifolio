// Atom Feed (alternative to RSS) for Blog Posts

const BASE_URL = 'https://bharatchandra.me';

const posts = [
  {
    slug: 'can-7usat-rocket-telemetry',
    title: 'How I built CAN-7USAT rocket telemetry with sub-5ms latency',
    description: 'A technical breakdown of the real-time ground control station I built for GARI\'s IN-SPACe national rocketry competition entry — 46-byte binary packets, Kalman filtering, and a 6-state flight state machine.',
    published: '2026-06-10T00:00:00Z',
    updated: '2026-06-10T00:00:00Z',
    categories: ['Rocketry', 'FastAPI', 'WebSockets', 'Kalman Filter', 'Python']
  },
  {
    slug: 'on-premise-llm-bhel',
    title: 'Building a fully on-premise LLM pipeline at BHEL',
    description: 'How I built a production AI vendor compliance portal for BHEL that runs entirely on local infrastructure — no external APIs, no data leaving the network. FastAPI + Ollama + PyMuPDF.',
    published: '2026-05-15T00:00:00Z',
    updated: '2026-05-15T00:00:00Z',
    categories: ['LLM', 'FastAPI', 'Ollama', 'Production AI', 'BHEL']
  },
  {
    slug: 'co-founding-easify',
    title: 'Co-founding Easify: Smart pooling in Hyderabad',
    description: 'What I learned building a ride-pooling platform from scratch — architecture decisions, real-time matching, and the hardest part: getting people to actually use it.',
    published: '2026-04-20T00:00:00Z',
    updated: '2026-04-20T00:00:00Z',
    categories: ['Startup', 'FastAPI', 'PostgreSQL', 'Product', 'Easify']
  }
];

function generateAtom() {
  const entriesXML = posts.map(post => `
    <entry>
      <title>${post.title}</title>
      <link href="${BASE_URL}/blog/${post.slug}" rel="alternate" type="text/html" />
      <id>${BASE_URL}/blog/${post.slug}</id>
      <published>${post.published}</published>
      <updated>${post.updated}</updated>
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
