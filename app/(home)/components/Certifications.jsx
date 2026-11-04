const CERTIFICATIONS = [
  { name: 'Claude 101', issuer: 'Anthropic', href: 'https://verify.skilljar.com/c/6qyg2f6iwuwh' },
  { name: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', href: 'https://verify.skilljar.com/c/ctihx48bajoo' },
  {
    name: 'Building RAG Apps Using MongoDB',
    issuer: 'MongoDB',
    href: 'https://www.credly.com/badges/399dbc99-c0c2-4e1d-9561-00b226c8f56b/linked_in_profile',
  },
];

const Certifications = () => (
  <section className="py-4 md:py-12" id="certifications" aria-labelledby="certifications-heading">
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6 space-y-3 md:space-y-6">
      <h2 id="certifications-heading" className="text-xl md:text-4xl font-bold text-primary">
        Certifications
      </h2>
      <ul className="grid gap-2 md:gap-4 md:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <li key={cert.href}>
            <a
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Verify ${cert.name}, ${cert.issuer}`}
              className="flex h-full flex-wrap items-baseline gap-x-2 md:flex-col md:items-stretch rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.02] p-3 md:p-5 hover:border-white/30 transition-colors"
            >
              <span className="text-xs md:text-base font-medium text-primary leading-snug">{cert.name}</span>
              <span className="md:mt-1 text-xs md:text-sm text-muted-foreground">{cert.issuer}</span>
              <span className="md:mt-3 text-xs md:text-sm text-muted-foreground underline underline-offset-2">Verify ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Certifications;
