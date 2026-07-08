/**
 * IndexNow API Route — submits all site URLs to Bing/Edge for instant indexing.
 *
 * Bing's IndexNow protocol bypasses the normal crawl queue, letting Bing index
 * new or updated pages immediately. This is the Bing equivalent of requesting
 * indexing via Google Search Console.
 *
 * Usage: POST https://bharatchandra.me/api/indexnow
 * (Protect with a secret header or call from a deploy hook)
 *
 * Docs: https://www.indexnow.org/documentation
 */

const BASE_URL = 'https://bharatchandra.me';

// Must match the filename in /public/
// The file at /public/bharatchandra-indexnow.txt contains this key.
const INDEXNOW_KEY = 'bharatchandra-indexnow-key-bc833';

const URLS_TO_SUBMIT = [
  BASE_URL,
  `${BASE_URL}/projects`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/blog/can-7usat-rocket-telemetry`,
  `${BASE_URL}/blog/on-premise-llm-bhel`,
  `${BASE_URL}/blog/co-founding-easify`,
  `${BASE_URL}/contact`,
  `${BASE_URL}/bodapati-bharat-chandra.jpg`,
  `${BASE_URL}/bodapati-bharat-chandra-2.jpg`,
];

export async function POST() {
  try {
    const payload = {
      host: 'bharatchandra.me',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/bharatchandra-indexnow.txt`,
      urlList: URLS_TO_SUBMIT,
    };

    // Submit to Bing (also accepted by Yandex, Seznam, and other IndexNow members)
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      return Response.json({
        success: true,
        message: 'IndexNow submission accepted by Bing',
        urlsSubmitted: URLS_TO_SUBMIT.length,
        status: response.status,
      });
    }

    const text = await response.text();
    return Response.json(
      { success: false, message: 'IndexNow submission failed', status: response.status, detail: text },
      { status: 500 }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: 'IndexNow request error', error: err.message },
      { status: 500 }
    );
  }
}

// GET — return key verification (Bing may call this to verify ownership)
export async function GET() {
  return Response.json({
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/bharatchandra-indexnow.txt`,
    urls: URLS_TO_SUBMIT,
    instructions: 'POST this endpoint to submit all URLs to Bing IndexNow',
  });
}
