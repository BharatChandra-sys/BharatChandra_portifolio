import { BASE_URL, posts, postUrl } from '@/lib/posts.mjs';

export default function sitemap() {
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: '2026-08-25',
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
      lastModified: '2026-07-10',
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

  const legalRoutes = ['privacy', 'terms'].map((page) => ({
    url: `${BASE_URL}/${page}`,
    lastModified: '2026-11-04',
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  const blogRoutes = posts.map((post) => ({
    url: postUrl(post.slug),
    lastModified: post.published.slice(0, 10),
    changeFrequency: 'yearly',
    priority: post.priority,
    images: [
      `${BASE_URL}/bodapati-bharat-chandra.jpg`,
    ],
  }));

  return [...staticRoutes, ...legalRoutes, ...blogRoutes];
}
