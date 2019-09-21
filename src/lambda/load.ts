import axios from 'axios';

export async function handler() {
  const key = process.env.KEY;
  const steamid = process.env.STEAMID;

  const [{ data: gameData }, { data: playerData }] = await Promise.all([
    axios({
      url: `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=730&key=${key}&steamid=${steamid}`
    }),
    axios({
      url: `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${steamid}`
    })
  ]);

  const stats = gameData.playerstats.stats as { name: string; value: number }[];

  const stat = stats.find(s => s.name === 'total_kills_awp');

  let awpKills = 0;
  if (stat) {
    awpKills = stat.value;
  }

  const name = playerData.response.players[0].personaname;
  const pic = playerData.response.players[0].avatarfull;

  return {
    statusCode: 202,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ awpKills, name, pic })
  };
}
