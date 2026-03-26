export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  const base = `https://api.airtable.com/v0/${process.env.BASE_ID}/Signups`;
  const headers = {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json'
  };
  if (req.method === 'GET') {
    const params = req.url.includes('?') ? req.url.split('?')[1] : '';
    const r = await fetch(`${base}${params ? '?' + params : ''}`, { headers });
    res.status(200).json(await r.json());
  } else if (req.method === 'POST') {
    const r = await fetch(base, { method: 'POST', headers, body: JSON.stringify(req.body) });
    res.status(200).json(await r.json());
  } else if (req.method === 'PATCH') {
    const id = req.url.split('/').pop();
    const r = await fetch(`${base}/${id}`, { method: 'PATCH', headers, body: JSON.stringify(req.body) });
    res.status(200).json(await r.json());
  }
}
