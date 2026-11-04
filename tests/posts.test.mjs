import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getRelatedPosts, posts } from '../lib/posts.mjs';

test('every post in lib/posts.mjs has a page, and every page has a post', () => {
  const pages = fs
    .readdirSync('app/(blog)/blog', { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(`app/(blog)/blog/${entry.name}/page.jsx`))
    .map((entry) => entry.name)
    .sort();
  assert.deepEqual(posts.map((post) => post.slug).sort(), pages);
});

test('posts are newest first with valid dates', () => {
  const times = posts.map((post) => Date.parse(post.published));
  times.forEach((time) => assert.ok(Number.isFinite(time)));
  assert.deepEqual(times, [...times].sort((a, b) => b - a));
});

test('related posts never include the current post', () => {
  for (const post of posts) {
    const related = getRelatedPosts(post.slug);
    assert.equal(related.length, 2);
    assert.ok(related.every((item) => item.slug !== post.slug));
  }
});

test('the blog index schema lists every post', () => {
  const schema = fs.readFileSync('app/blog-index-schema.js', 'utf8');
  for (const post of posts) assert.ok(schema.includes(`/blog/${post.slug}`), post.slug);
});
