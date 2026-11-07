import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { posts } from '@/lib/posts.mjs';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';

const LatestWriting = () => (
  <section className="py-6 md:py-12" id="latest-writing" aria-labelledby="latest-writing-heading">
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6 space-y-3 md:space-y-6">
      <Reveal className="flex items-end justify-between gap-4">
        <h2 id="latest-writing-heading" className="text-2xl md:text-4xl font-bold text-primary">
          Latest Writing
        </h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          All posts
          <HiArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </Reveal>
      <RevealGroup as="ul" className="grid gap-3 md:gap-4 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <RevealItem as="li" key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex h-full flex-col rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-5 hover:border-white/30 transition-colors"
            >
              <time dateTime={post.published.slice(0, 10)} className="text-xs text-muted-foreground">
                {post.date}
              </time>
              <h3 className="mt-1 md:mt-2 text-base font-semibold text-primary leading-snug">{post.title}</h3>
              <p className="hidden md:block mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.description}</p>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

export default LatestWriting;
