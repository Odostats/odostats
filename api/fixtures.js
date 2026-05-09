export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { league, date, season, fixture, standings, lineup, h2h, team, last } = req.query;
  
  let endpoint = '';
  if (standings) endpoint = `standings?league=${league}&season=${season||'2025'}`;
  else if (lineup) endpoint = `fixtures/lineups?fixture=${fixture}`;
  else if (h2h) endpoint = `fixtures/headtohead?h2h=${h2h}&last=${last||10}`;
  else if (team) endpoint = `fixtures?team=${team}&last=${last||5}&season=${season||'2025'}`;
  else if (fixture && !league) endpoint = `fixtures/statistics?fixture=${fixture}`;
  else endpoint = `fixtures?date=${date}&league=${league}&season=${season||'2025'}`;
  
  const response = await fetch(`https://v3.football.api-sports.io/${endpoint}`, {
    headers: { 'x-apisports-key': '9793892ae437091b5e51ad1f076d66fe' }
  });
  
  const data = await response.json();
  res.status(200).json(data);
}
