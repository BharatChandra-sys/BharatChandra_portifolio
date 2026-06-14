import { BlogPost } from '../components/BlogPost';

export const metadata = {
  title: "Co-founding Easify: Smart pooling in Hyderabad — Bharat Chandra",
  description: "Bharat Chandra writes about co-founding Easify, a smart ride-pooling platform in Hyderabad — architecture decisions, real-time matching, and what actually makes people use a product.",
  keywords: "Bharat Chandra, Easify, pooling startup Hyderabad, co-founder, FastAPI startup, ride pooling India",
  openGraph: {
    title: "Co-founding Easify — Bharat Chandra",
    description: "Building a ride-pooling platform from scratch in Hyderabad.",
    url: "https://bharatchandra.me/blog/co-founding-easify",
  },
};

const content = `
I'm Bharat Chandra, and alongside my work at BHEL and GARI, I co-founded Easify — a smart pooling service platform for Hyderabad.

## The problem we're solving

Hyderabad has a commute problem. A lot of people travel similar routes at similar times, and there's no lightweight way to coordinate sharing those trips. Existing solutions are either too expensive, too complex to use, or just not trusted.

Easify is the direct answer: connect people going the same way, make the economics work for everyone, keep the interface dead simple.

## What I built

I own the backend and the system architecture. The stack:

- **FastAPI** — async API server
- **PostgreSQL** — relational data model for users, routes, rides, payments
- **WebSockets** — real-time ride matching and status updates
- **JWT auth** — role-based access (rider, driver, admin)
- **Razorpay** — payment integration

The hardest architectural decision was the matching algorithm. Real-time matching with reasonable latency requires thinking carefully about data structures. We use a spatial index on pickup points and filter by time window first, then route similarity.

## What I learned about building products

The technical stuff is the easy part. The hard part is:

**Trust.** People don't get into a car with a stranger based on a well-designed app. They do it because someone they know already did it. The first 50 users determine everything.

**Simplicity.** Every feature I wanted to add, I cut. The MVP is embarrassingly minimal. That's correct.

**Feedback loops.** The only way to know if the matching algorithm is good enough is to watch real people use it and ask them immediately after.

## Where we are

We're in early launch phase in Hyderabad. The platform is live. The real work now is not technical — it's getting those first 50 users who actually commit to using it regularly.

If you're in Hyderabad and interested, reach out.

— Bharat Chandra, Co-founder, Easify
`;

export default function Page() {
  return (
    <BlogPost
      title="Co-founding Easify: Smart pooling in Hyderabad"
      date="April 2026"
      tags={["Startup", "FastAPI", "PostgreSQL", "Product", "Hyderabad"]}
      content={content}
    />
  );
}
