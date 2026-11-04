import Link from 'next/link';

export const LEGAL_UPDATED = '4 November 2026';
export const LEGAL_UPDATED_ISO = '2026-11-04';
export const CONTACT_EMAIL = 'bc833498@gmail.com';

export const Email = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
    {CONTACT_EMAIL}
  </a>
);

export const InlineLink = ({ href, children }) => {
  const external = href.startsWith('http');
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-primary underline underline-offset-2"
    >
      {children}
    </Link>
  );
};

export const Section = ({ title, children }) => (
  <section className="space-y-2 md:space-y-3">
    <h2 className="text-base md:text-xl font-semibold text-primary">{title}</h2>
    {children}
  </section>
);

export const List = ({ children }) => (
  <ul className="list-disc space-y-1.5 pl-5">{children}</ul>
);

export const LegalPage = ({ title, intro, children }) => (
  <article className="mx-auto w-full max-w-3xl px-4 md:px-6 py-4 md:py-16">
    <header className="space-y-2 mb-6 md:mb-10">
      <h1 className="text-2xl md:text-4xl font-bold text-primary">{title}</h1>
      <p className="text-xs md:text-sm text-muted-foreground">
        Last updated: <time dateTime={LEGAL_UPDATED_ISO}>{LEGAL_UPDATED}</time>
      </p>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{intro}</p>
    </header>
    <div className="space-y-6 md:space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
      {children}
    </div>
  </article>
);
