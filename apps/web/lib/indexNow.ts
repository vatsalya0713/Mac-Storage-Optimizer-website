const INDEXNOW_KEY = '527ed575dde1478696d0b322fb9aa18e'
const SITE_URL = 'https://www.macdiskcleaner.com'

// IndexNow needs no Bing/Yandex account — just this self-generated key
// hosted at /{key}.txt (see apps/web/public/527ed...18e.txt) and a POST
// listing which URLs changed. Submits to Bing's endpoint; Bing shares
// IndexNow submissions with other participating search engines.
export async function submitToIndexNow(urls: string[]): Promise<{ ok: boolean; status: number }> {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'www.macdiskcleaner.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })
  return { ok: res.ok, status: res.status }
}
