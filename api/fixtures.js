export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  const { league, date, season, fixture } = req.query;
  
  let endpoint = '';
  if (fixture) {
    endpoint = `fixtures/statistics?fixture=${fixture}`;
  } else {
    endpoint = `fixtures?date=${date}&league=${league}&season=${season||'2025'}`;
  }
  
  const response = await fetch(`https://v3.football.api-sports.io/${endpoint}`, {
    headers: {
      'x-apisports-key': '9793892ae437091b5e51ad1f076d66fe'
    }
  });
  
  const data = await response.json();
  res.status(200).json(data);
}
