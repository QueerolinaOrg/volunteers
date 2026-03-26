export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const base = `https://api.airtable.com/v0/${process.env.BASE_ID}/Shifts`;
  const headers = {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json'
  };

  if (req.method === 'GET') {
    // single record lookup e.g. /api/shifts/recXXXX
    const parts = req.url.split('/').filter(Boolean);
    const recordId = parts[parts.length - 1];
    if (recordId && recordId.startsWith('rec')) {
      const r = await fetch(`${base}/${recordId}`, { headers });
      res.status(200).json(await r.json());
    } else {
      const r = await fetch(`${base}?sort[0][field]=Event%20Date&sort[0][direction]=asc`, { headers });
      res.status(200).json(await r.json());
    }
  } else if (req.method === 'POST') {
    const r = await fetch(base, { method: 'POST', headers, body: JSON.stringify(req.body) });
    res.status(200).json(await r.json());
  } else if (req.method === 'DELETE') {
    const parts = req.url.split('/').filter(Boolean);
    const recordId = parts[parts.length - 1];
    const r = await fetch(`${base}/${recordId}`, { method: 'DELETE', headers });
    res.status(200).json(await r.json());
  }
}
