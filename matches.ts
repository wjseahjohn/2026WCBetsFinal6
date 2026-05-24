// lib/db.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface Bet {
  id: string;
  playerName: string;
  betType: 'match_result' | 'tournament_winner' | 'top_scorer';
  targetId: string;
  selection: string;
  odds: number;
  stake: number;
  potentialWin: number;
  actualWin?: number;
  settled: boolean;
  createdAt: string;
}

export interface PlayerStats {
  name: string;
  totalStaked: number;
  totalWon: number;
  netProfit: number;
  betsCount: number;
  wonCount: number;
}

const BETS_KEY = 'wc2026:bets';
const RESULTS_KEY = 'wc2026:results';

export async function getAllBets(): Promise<Bet[]> {
  try {
    const bets = await redis.get<Bet[]>(BETS_KEY);
    return bets || [];
  } catch {
    return [];
  }
}

export async function addBet(bet: Omit<Bet, 'id' | 'createdAt' | 'settled' | 'actualWin'>): Promise<Bet> {
  const newBet: Bet = {
    ...bet,
    id: `bet_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    settled: false,
  };
  const existing = await getAllBets();
  await redis.set(BETS_KEY, [...existing, newBet]);
  return newBet;
}

export async function getResults(): Promise<Record<string, string>> {
  try {
    const results = await redis.get<Record<string, string>>(RESULTS_KEY);
    return results || {};
  } catch {
    return {};
  }
}

export async function setResult(targetId: string, result: string): Promise<void> {
  const results = await getResults();
  results[targetId] = result;
  await redis.set(RESULTS_KEY, results);

  const bets = await getAllBets();
  const updated = bets.map(bet => {
    if (bet.targetId === targetId && !bet.settled) {
      const won = bet.selection === result;
      return {
        ...bet,
        settled: true,
        actualWin: won ? Math.round(bet.stake * bet.odds) : 0,
      };
    }
    return bet;
  });
  await redis.set(BETS_KEY, updated);
}

export async function getLeaderboard(): Promise<PlayerStats[]> {
  const bets = await getAllBets();
  const playerMap: Record<string, PlayerStats> = {};

  for (const bet of bets) {
    const name = bet.playerName;
    if (!playerMap[name]) {
      playerMap[name] = { name, totalStaked: 0, totalWon: 0, netProfit: 0, betsCount: 0, wonCount: 0 };
    }
    playerMap[name].totalStaked += bet.stake;
    playerMap[name].betsCount += 1;
    if (bet.settled && bet.actualWin !== undefined) {
      playerMap[name].totalWon += bet.actualWin;
      if (bet.actualWin > 0) playerMap[name].wonCount += 1;
    }
  }

  return Object.values(playerMap)
    .map(p => ({ ...p, netProfit: p.totalWon - p.totalStaked }))
    .sort((a, b) => b.netProfit - a.netProfit);
}
