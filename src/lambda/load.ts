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

  const gameStats = gameData.playerstats.stats as {
    name: string;
    value: number;
  }[];

  function findStat(property: string): number {
    const stat = gameStats.find(s => s.name === property);

    if (!stat) {
      return 0;
    }

    return stat.value;
  }

  const name = playerData.response.players[0].personaname;
  const pic = playerData.response.players[0].avatarfull;

  const stats = {
    kills: {
      kills: findStat('total_kills'),
      deaths: findStat('total_deaths'),
      kd: (findStat('total_kills') / findStat('total_deaths')).toFixed(3)
    },
    objectives: {
      bombPlants: findStat('total_planted_bombs'),
      bombDefusal: findStat('total_defused_bombs')
    },
    matches: {
      roundsWon: findStat('total_wins'),
      wins: findStat('total_matches_won'),
      total: findStat('total_matches_won')
    },
    weapons: {
      ak47: findStat('total_kills_ak47'),
      awp: findStat('total_kills_awp'),
      deagle: findStat('total_kills_deagle'),
      knife: findStat('total_kills_knife'),
      m4a1: findStat('total_kills_m4a1')
    }
  };

  return {
    statusCode: 202,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ stats, name, pic })
  };
}
