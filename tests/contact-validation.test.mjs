import test from 'node:test';
import assert from 'node:assert/strict';
import { createRateLimiter, escapeHtml, validateContact, LIMITS } from '../lib/contact-validation.mjs';

const valid = { name: 'Asha', email: 'asha@example.com', message: 'Hello there' };

test('accepts a normal submission', () => {
  assert.deepEqual(validateContact(valid), { ok: true, data: valid });
});

test('rejects missing, non-string and malformed fields', () => {
  assert.equal(validateContact(null).ok, false);
  assert.equal(validateContact({ ...valid, name: '   ' }).ok, false);
  assert.equal(validateContact({ ...valid, message: 42 }).ok, false);
  assert.equal(validateContact({ ...valid, email: 'not-an-email' }).ok, false);
});

test('enforces length limits', () => {
  assert.equal(validateContact({ ...valid, name: 'a'.repeat(LIMITS.name + 1) }).ok, false);
  assert.equal(validateContact({ ...valid, message: 'a'.repeat(LIMITS.message + 1) }).ok, false);
});

test('flags honeypot submissions as spam', () => {
  assert.deepEqual(validateContact({ ...valid, website: 'http://spam.example' }), { ok: true, spam: true });
});

test('strips line breaks that could inject email headers', () => {
  const result = validateContact({ ...valid, name: 'Asha\r\nBcc: victim@example.com' });
  assert.equal(result.data.name, 'Asha Bcc: victim@example.com');
});

test('escapes HTML metacharacters', () => {
  assert.equal(
    escapeHtml(`<img src=x onerror="a('b')">&`),
    '&lt;img src=x onerror=&quot;a(&#39;b&#39;)&quot;&gt;&amp;'
  );
});

test('rate limiter blocks after the limit and resets after the window', () => {
  const isAllowed = createRateLimiter({ limit: 2, windowMs: 1000 });
  assert.equal(isAllowed('ip', 0), true);
  assert.equal(isAllowed('ip', 1), true);
  assert.equal(isAllowed('ip', 2), false);
  assert.equal(isAllowed('other', 2), true);
  assert.equal(isAllowed('ip', 1000), true);
});
