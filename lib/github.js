// Server-side GitHub data for the homepage. Fetched once an hour and shared by
// all visitors, so nobody's browser hits GitHub's per-IP rate limit. If GitHub
// is unreachable, the fallback keeps the section populated.

const GITHUB_USER = 'BharatChandra-sys';

// Pinned repos — shown in this exact order
export const PINNED_REPOS = [
  'TruvantaAI',
  'diabetic-ulcer-ai-system',
  'rocket-simulator',
  'Email-Automation-for-Form',
  'CAN-7USAT-Ground-Control-Backend',
  'AUVBrain',
];

// Preferred descriptions, used over whatever is set on GitHub
export const REPO_DESCRIPTIONS = {
  'TruvantaAI': 'Browser-based fake news analyzer — Logistic Regression on 10,000+ labeled samples, sub-second response, LLM reasoning layer for verdict explanations. 90% validation accuracy. Won HackXplore — IEEE-SSIT VJIT, April 2026.',
  'rocket-simulator': 'Physics-based rocket flight simulator modelling thrust, drag, gravity and multi-stage separation. Outputs altitude, velocity and acceleration curves. Built for GARI rocketry trajectory analysis.',
  'Email-Automation-for-Form': 'Automated email pipeline triggered by form submissions. FastAPI backend, SMTP integration, Jinja2 template engine, and queue-based delivery with retry logic.',
  'diabetic-ulcer-ai-system': 'Explainable AI for diabetic ulcer risk — Custom CNN + Grad-CAM heatmaps + SHAP values + MLflow tracking. Won AI Day Hackathon — GITAM × Kodryx AI, March 2026.',
  'CAN-7USAT-Ground-Control-Backend': 'Real-time ground control for IN-SPACe Rocketry Competition 2026. 46-byte telemetry decode, Kalman filter fusion, 6-state FSM, WebSocket broadcast. <5ms end-to-end latency.',
  'AUVBrain': 'Full autonomous control stack for an underwater vehicle. observe→decide→act agent loop, 4-DOF thruster control, offline LLM + rules-based fallback. p95 agent loop: 0.84ms.',
};

const FALLBACK_LANGUAGES = {
  'TruvantaAI': 'Python',
  'diabetic-ulcer-ai-system': 'Python',
  'rocket-simulator': 'Python',
  'Email-Automation-for-Form': 'JavaScript',
  'CAN-7USAT-Ground-Control-Backend': 'Python',
  'AUVBrain': 'Python',
};

const fallbackRepo = (name) => ({
  id: name,
  name,
  html_url: `https://github.com/${GITHUB_USER}/${name}`,
  description: REPO_DESCRIPTIONS[name],
  language: FALLBACK_LANGUAGES[name],
  topics: [],
  stargazers_count: null,
  forks_count: null,
});

// Keeps only the fields the card renders, so the page doesn't carry the full
// GitHub payload. Always returns every pinned repo, in order.
export function selectPinnedRepos(data) {
  const byName = new Map((Array.isArray(data) ? data : []).map((repo) => [repo.name, repo]));
  return PINNED_REPOS.map((name) => {
    const repo = byName.get(name);
    if (!repo || repo.fork || repo.private) return fallbackRepo(name);
    return {
      id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      description: REPO_DESCRIPTIONS[name] || repo.description,
      language: repo.language,
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
    };
  });
}

export async function getPinnedRepos() {
  try {
    const headers = { Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    return selectPinnedRepos(await res.json());
  } catch (err) {
    console.error('[GitHub]', err.message);
    return selectPinnedRepos([]);
  }
}
