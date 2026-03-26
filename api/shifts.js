export default async function handler(req, res) {
  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.BASE_ID}/Shifts?sort[0][field]=Event%20Date&sort[0][direction]=asc`,
    { headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` } }
  );
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
