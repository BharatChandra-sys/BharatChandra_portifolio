export default function sitemap() {
  const baseUrl = 'https://bharatchandra.me';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/can-7usat-rocket-telemetry`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/on-premise-llm-bhel`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/co-founding-easify`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];
}
