app.get('/api/osint/overpass', async (req, res) => {
  const data = await watchtower.fetchAllOverpass(req.query.bbox);
  res.json(data);
});
