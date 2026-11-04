// Pure validation and escaping for the contact form, kept free of Next.js
// imports so it can be unit-tested with `node --test`.

export const LIMITS = { name: 100, email: 254, message: 5000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Line breaks in a name or email could inject extra email headers.
const singleLine = (value) => String(value).replace(/[\r\n\t]+/g, ' ').trim();

// Returns { ok: true, data } | { ok: true, spam: true } | { ok: false, error }.
export function validateContact(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request.' };
  }

  // Honeypot: hidden from people, so only bots fill it in.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return { ok: true, spam: true };
  }

  const { name, email, message } = body;
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return { ok: false, error: 'All fields are required.' };
  }

  const cleanName = singleLine(name);
  const cleanEmail = singleLine(email);
  const cleanMessage = message.trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { ok: false, error: 'All fields are required.' };
  }
  if (cleanName.length > LIMITS.name) {
    return { ok: false, error: `Name must be under ${LIMITS.name} characters.` };
  }
  if (cleanEmail.length > LIMITS.email || !EMAIL_PATTERN.test(cleanEmail)) {
    return { ok: false, error: 'Invalid email address.' };
  }
  if (cleanMessage.length > LIMITS.message) {
    return { ok: false, error: `Message must be under ${LIMITS.message} characters.` };
  }

  return { ok: true, data: { name: cleanName, email: cleanEmail, message: cleanMessage } };
}

// Fixed-window limiter. State lives in one server instance, so on serverless
// hosting this slows abuse rather than guaranteeing a global limit.
export function createRateLimiter({ limit = 5, windowMs = 10 * 60 * 1000, maxKeys = 5000 } = {}) {
  const hits = new Map();
  return function isAllowed(key, now = Date.now()) {
    const entry = hits.get(key);
    if (!entry || now - entry.start >= windowMs) {
      if (hits.size >= maxKeys) hits.clear();
      hits.set(key, { start: now, count: 1 });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  };
}
