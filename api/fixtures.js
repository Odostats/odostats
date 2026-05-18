export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const q = req.query;
  let endpoint = '';

  if (q.standings) {
    endpoint = `standings?league=${q.league}&season=${q.season || '2025'}`;
  } else if (q.lineup) {
    endpoint = `fixtures/lineups?fixture=${q.fixture}`;
  } else if (q.playerStats) {
    endpoint = `fixtures/players?fixture=${q.fixture}`;
  } else if (q.stats) {
    endpoint = `fixtures/statistics?fixture=${q.fixture}`;
  } else if (q.odds) {
    endpoint = `odds?fixture=${q.fixture}&bookmaker=1`;
  } else if (q.team) {
    endpoint = `fixtures?team=${q.team}&last=${q.last || 5}&season=${q.season || '2025'}`;
  } else if (q.h2h) {
    endpoint = `fixtures/headtohead?h2h=${q.h2h}&last=10`;
  } else if (q.player) {
    endpoint = `players?id=${q.player}&season=2025`;
  } else if (q.playerFixtures) {
    endpoint = `fixtures?season=2025&player=${q.playerFixtures}&last=5`;
  } else if (q.searchPlayer) {
    endpoint = `players?search=${q.searchPlayer}&season=2025`;
  } else if (q.teams) {
    endpoint = `teams?league=${q.teams}&season=2025`;
  } else if (q.search) {
    endpoint = `teams?search=${q.search}`;
  } else if (q.events) {
    endpoint = `fixtures/events?fixture=${q.fixture}`;
  } else {
    endpoint = `fixtures?date=${q.date}&league=${q.league}&season=${q.season || '2025'}`;
  }

  try {
    const response = await fetch(`https://v3.football.api-sports.io/${endpoint}`, {
      headers: {
        'x-apisports-key': '9793892ae437091b5e51ad1f076d66fe',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });
    
    if (!response.ok) {
      res.status(response.status).json({ error: 'API error', status: response.status });
      return;
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
}