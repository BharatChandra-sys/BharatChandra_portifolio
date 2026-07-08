const BASE_URL = 'https://bharatchandra.me';

// Blog posts — update dates when you publish new ones
const blogPosts = [
  {
    slug: 'can-7usat-rocket-telemetry',
    lastModified: '2026-06-10',
    priority: 0.85,
  },
  {
    slug: 'on-premise-llm-bhel',
    lastModified: '2026-05-15',
    priority: 0.85,
  },
  {
    slug: 'co-founding-easify',
    lastModified: '2026-04-20',
    priority: 0.80,
  },
];

export default function sitemap() {
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: '2026-07-08',
      changeFrequency: 'weekly',
      priority: 1.0,
      // Both photos on homepage — image sitemap entries help Google Images
      images: [
        `${BASE_URL}/bodapati-bharat-chandra.jpg`,
        `${BASE_URL}/bodapati-bharat-chandra-2.jpg`,
      ],
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: '2026-07-01',
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [
        `${BASE_URL}/bodapati-bharat-chandra.jpg`,
      ],
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: '2026-06-10',
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${BASE_URL}/bodapati-bharat-chandra.jpg`,
      ],
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: '2026-06-01',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'yearly',
    priority: post.priority,
    images: [
      `${BASE_URL}/bodapati-bharat-chandra.jpg`,
    ],
  }));

  return [...staticRoutes, ...blogRoutes];
}
