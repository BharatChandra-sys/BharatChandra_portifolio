import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';

// Measured outcomes, straight after the hero so they're seen first.
const RESULTS = [
  {
    value: '<5ms',
    label: 'Telemetry latency',
    detail: 'CAN-7USAT ground control station, against a 15ms target.',
  },
  {
    value: '0.84ms',
    label: 'p95 agent loop',
    detail: 'AUVBrain, the autonomous underwater vehicle control stack.',
  },
  {
    value: 'Live',
    label: 'In production',
    detail: "Deepthi Hospitals' three-portal platform and the Vijetha Digital website.",
  },
];

const SEARCHES = [
  { label: 'Bodapati Bharat Chandra', href: 'https://www.google.com/search?q=Bodapati+Bharat+Chandra' },
  { label: 'GARI GITAM', href: 'https://www.google.com/search?q=GARI+GITAM' },
  { label: 'Vijetha Digital', href: 'https://www.google.com/search?q=Vijetha+Digital' },
  { label: 'Truvanta AI', href: 'https://www.google.com/search?q=Truvanta+AI' },
];

const CARD = 'rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.02] p-3 md:p-5';

const Results = () => (
  <section className="py-4 md:py-12" id="results" aria-labelledby="results-heading">
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6 space-y-3 md:space-y-6">
      <Reveal as="h2" id="results-heading" className="text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Results
      </Reveal>
      <RevealGroup as="ul" className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
        {RESULTS.map((result) => (
          <RevealItem as="li" key={result.label} className={CARD}>
            <p className="text-xl md:text-3xl font-bold text-primary">{result.value}</p>
            <p className="md:mt-1 text-xs md:text-sm font-medium text-primary/90">{result.label}</p>
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground leading-snug md:leading-relaxed">{result.detail}</p>
          </RevealItem>
        ))}
        <RevealItem as="li" className={CARD}>
          <p className="text-xl md:text-3xl font-bold text-primary">#1</p>
          <p className="md:mt-1 text-xs md:text-sm font-medium text-primary/90">On Google for branded searches</p>
          <ul className="mt-1 md:mt-2 md:space-y-1 text-xs md:text-sm text-muted-foreground leading-snug">
            {SEARCHES.map((search) => (
              <li key={search.label}>
                <a
                  href={search.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-primary transition-colors"
                >
                  {search.label}
                </a>
              </li>
            ))}
          </ul>
        </RevealItem>
      </RevealGroup>
    </div>
  </section>
);

export default Results;
