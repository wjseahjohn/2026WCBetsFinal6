// lib/matches.ts
export type BetType = 'match_result' | 'tournament_winner' | 'top_scorer' | 'semifinal_team';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  group: string;
  date: string;
  venue: string;
  odds: { home: number; draw: number; away: number };
  result?: 'home' | 'draw' | 'away';
}

export interface TournamentBet {
  id: string;
  type: 'tournament_winner';
  team: string;
  flag: string;
  odds: number;
}

export interface TopScorerBet {
  id: string;
  type: 'top_scorer';
  player: string;
  team: string;
  flag: string;
  odds: number;
}

// Group Stage Matches - 2026 FIFA World Cup (first ~48 matches shown, grouped)
export const GROUP_STAGE_MATCHES: Match[] = [
  // Group A
  { id: 'A1', homeTeam: 'USA', awayTeam: 'Jamaica', homeFlag: '🇺🇸', awayFlag: '🇯🇲', group: 'A', date: '2026-06-11', venue: 'MetLife Stadium, New York', odds: { home: 1.35, draw: 4.50, away: 9.00 } },
  { id: 'A2', homeTeam: 'Panama', awayTeam: 'Canada', homeFlag: '🇵🇦', awayFlag: '🇨🇦', group: 'A', date: '2026-06-11', venue: 'SoFi Stadium, LA', odds: { home: 3.20, draw: 3.10, away: 2.30 } },
  { id: 'A3', homeTeam: 'USA', awayTeam: 'Panama', homeFlag: '🇺🇸', awayFlag: '🇵🇦', group: 'A', date: '2026-06-15', venue: 'AT&T Stadium, Dallas', odds: { home: 1.45, draw: 4.20, away: 7.50 } },
  { id: 'A4', homeTeam: 'Canada', awayTeam: 'Jamaica', homeFlag: '🇨🇦', awayFlag: '🇯🇲', group: 'A', date: '2026-06-15', venue: 'BMO Field, Toronto', odds: { home: 1.70, draw: 3.60, away: 5.50 } },
  { id: 'A5', homeTeam: 'Canada', awayTeam: 'USA', homeFlag: '🇨🇦', awayFlag: '🇺🇸', group: 'A', date: '2026-06-19', venue: 'Estadio Azteca, Mexico City', odds: { home: 3.80, draw: 3.20, away: 2.00 } },
  { id: 'A6', homeTeam: 'Jamaica', awayTeam: 'Panama', homeFlag: '🇯🇲', awayFlag: '🇵🇦', group: 'A', date: '2026-06-19', venue: 'Rose Bowl, LA', odds: { home: 2.60, draw: 3.10, away: 2.80 } },

  // Group B
  { id: 'B1', homeTeam: 'Spain', awayTeam: 'Senegal', homeFlag: '🇪🇸', awayFlag: '🇸🇳', group: 'B', date: '2026-06-12', venue: 'MetLife Stadium, New York', odds: { home: 1.55, draw: 4.00, away: 6.50 } },
  { id: 'B2', homeTeam: 'Morocco', awayTeam: 'Brazil', homeFlag: '🇲🇦', awayFlag: '🇧🇷', group: 'B', date: '2026-06-12', venue: 'Rose Bowl, LA', odds: { home: 5.50, draw: 4.00, away: 1.60 } },
  { id: 'B3', homeTeam: 'Spain', awayTeam: 'Brazil', homeFlag: '🇪🇸', awayFlag: '🇧🇷', group: 'B', date: '2026-06-16', venue: 'AT&T Stadium, Dallas', odds: { home: 2.60, draw: 3.20, away: 2.70 } },
  { id: 'B4', homeTeam: 'Senegal', awayTeam: 'Morocco', homeFlag: '🇸🇳', awayFlag: '🇲🇦', group: 'B', date: '2026-06-16', venue: 'SoFi Stadium, LA', odds: { home: 2.80, draw: 3.10, away: 2.60 } },
  { id: 'B5', homeTeam: 'Brazil', awayTeam: 'Senegal', homeFlag: '🇧🇷', awayFlag: '🇸🇳', group: 'B', date: '2026-06-20', venue: 'Levi\'s Stadium, SF', odds: { home: 1.65, draw: 3.80, away: 5.50 } },
  { id: 'B6', homeTeam: 'Morocco', awayTeam: 'Spain', homeFlag: '🇲🇦', awayFlag: '🇪🇸', group: 'B', date: '2026-06-20', venue: 'Estadio Azteca, Mexico City', odds: { home: 5.00, draw: 3.80, away: 1.70 } },

  // Group C
  { id: 'C1', homeTeam: 'Argentina', awayTeam: 'Chile', homeFlag: '🇦🇷', awayFlag: '🇨🇱', group: 'C', date: '2026-06-12', venue: 'Hard Rock Stadium, Miami', odds: { home: 1.25, draw: 5.50, away: 12.00 } },
  { id: 'C2', homeTeam: 'Peru', awayTeam: 'Ecuador', homeFlag: '🇵🇪', awayFlag: '🇪🇨', group: 'C', date: '2026-06-12', venue: 'NRG Stadium, Houston', odds: { home: 2.60, draw: 3.10, away: 2.80 } },
  { id: 'C3', homeTeam: 'Argentina', awayTeam: 'Peru', homeFlag: '🇦🇷', awayFlag: '🇵🇪', group: 'C', date: '2026-06-16', venue: 'MetLife Stadium, New York', odds: { home: 1.30, draw: 5.00, away: 10.00 } },
  { id: 'C4', homeTeam: 'Ecuador', awayTeam: 'Chile', homeFlag: '🇪🇨', awayFlag: '🇨🇱', group: 'C', date: '2026-06-16', venue: 'Rose Bowl, LA', odds: { home: 2.20, draw: 3.20, away: 3.40 } },
  { id: 'C5', homeTeam: 'Ecuador', awayTeam: 'Argentina', homeFlag: '🇪🇨', awayFlag: '🇦🇷', group: 'C', date: '2026-06-20', venue: 'Estadio Azteca, Mexico City', odds: { home: 9.00, draw: 5.00, away: 1.30 } },
  { id: 'C6', homeTeam: 'Chile', awayTeam: 'Peru', homeFlag: '🇨🇱', awayFlag: '🇵🇪', group: 'C', date: '2026-06-20', venue: 'AT&T Stadium, Dallas', odds: { home: 2.20, draw: 3.20, away: 3.40 } },

  // Group D
  { id: 'D1', homeTeam: 'France', awayTeam: 'Mexico', homeFlag: '🇫🇷', awayFlag: '🇲🇽', group: 'D', date: '2026-06-13', venue: 'Estadio Azteca, Mexico City', odds: { home: 1.80, draw: 3.80, away: 4.50 } },
  { id: 'D2', homeTeam: 'Germany', awayTeam: 'Japan', homeFlag: '🇩🇪', awayFlag: '🇯🇵', group: 'D', date: '2026-06-13', venue: 'Rose Bowl, LA', odds: { home: 2.20, draw: 3.40, away: 3.40 } },
  { id: 'D3', homeTeam: 'France', awayTeam: 'Germany', homeFlag: '🇫🇷', awayFlag: '🇩🇪', group: 'D', date: '2026-06-17', venue: 'MetLife Stadium, New York', odds: { home: 2.20, draw: 3.30, away: 3.30 } },
  { id: 'D4', homeTeam: 'Japan', awayTeam: 'Mexico', homeFlag: '🇯🇵', awayFlag: '🇲🇽', group: 'D', date: '2026-06-17', venue: 'NRG Stadium, Houston', odds: { home: 2.50, draw: 3.20, away: 2.90 } },
  { id: 'D5', homeTeam: 'Germany', awayTeam: 'Mexico', homeFlag: '🇩🇪', awayFlag: '🇲🇽', group: 'D', date: '2026-06-21', venue: 'AT&T Stadium, Dallas', odds: { home: 1.85, draw: 3.60, away: 4.50 } },
  { id: 'D6', homeTeam: 'Japan', awayTeam: 'France', homeFlag: '🇯🇵', awayFlag: '🇫🇷', group: 'D', date: '2026-06-21', venue: 'SoFi Stadium, LA', odds: { home: 4.50, draw: 3.80, away: 1.80 } },

  // Group E
  { id: 'E1', homeTeam: 'England', awayTeam: 'South Korea', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇰🇷', group: 'E', date: '2026-06-13', venue: 'Levi\'s Stadium, SF', odds: { home: 1.55, draw: 4.00, away: 6.00 } },
  { id: 'E2', homeTeam: 'Colombia', awayTeam: 'Cameroon', homeFlag: '🇨🇴', awayFlag: '🇨🇲', group: 'E', date: '2026-06-13', venue: 'Hard Rock Stadium, Miami', odds: { home: 1.80, draw: 3.60, away: 5.00 } },
  { id: 'E3', homeTeam: 'England', awayTeam: 'Colombia', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇨🇴', group: 'E', date: '2026-06-17', venue: 'Rose Bowl, LA', odds: { home: 1.75, draw: 3.60, away: 5.00 } },
  { id: 'E4', homeTeam: 'South Korea', awayTeam: 'Cameroon', homeFlag: '🇰🇷', awayFlag: '🇨🇲', group: 'E', date: '2026-06-17', venue: 'Estadio Azteca, Mexico City', odds: { home: 1.90, draw: 3.50, away: 4.20 } },
  { id: 'E5', homeTeam: 'Colombia', awayTeam: 'South Korea', homeFlag: '🇨🇴', awayFlag: '🇰🇷', group: 'E', date: '2026-06-21', venue: 'MetLife Stadium, New York', odds: { home: 2.20, draw: 3.30, away: 3.30 } },
  { id: 'E6', homeTeam: 'Cameroon', awayTeam: 'England', homeFlag: '🇨🇲', awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'E', date: '2026-06-21', venue: 'NRG Stadium, Houston', odds: { home: 7.00, draw: 4.20, away: 1.50 } },

  // Group F
  { id: 'F1', homeTeam: 'Portugal', awayTeam: 'Croatia', homeFlag: '🇵🇹', awayFlag: '🇭🇷', group: 'F', date: '2026-06-14', venue: 'AT&T Stadium, Dallas', odds: { home: 1.95, draw: 3.50, away: 4.00 } },
  { id: 'F2', homeTeam: 'Netherlands', awayTeam: 'Nigeria', homeFlag: '🇳🇱', awayFlag: '🇳🇬', group: 'F', date: '2026-06-14', venue: 'SoFi Stadium, LA', odds: { home: 1.70, draw: 3.80, away: 5.50 } },
  { id: 'F3', homeTeam: 'Portugal', awayTeam: 'Netherlands', homeFlag: '🇵🇹', awayFlag: '🇳🇱', group: 'F', date: '2026-06-18', venue: 'MetLife Stadium, New York', odds: { home: 2.30, draw: 3.30, away: 3.10 } },
  { id: 'F4', homeTeam: 'Croatia', awayTeam: 'Nigeria', homeFlag: '🇭🇷', awayFlag: '🇳🇬', group: 'F', date: '2026-06-18', venue: 'Hard Rock Stadium, Miami', odds: { home: 1.90, draw: 3.50, away: 4.30 } },
  { id: 'F5', homeTeam: 'Netherlands', awayTeam: 'Croatia', homeFlag: '🇳🇱', awayFlag: '🇭🇷', group: 'F', date: '2026-06-22', venue: 'Rose Bowl, LA', odds: { home: 2.00, draw: 3.40, away: 3.80 } },
  { id: 'F6', homeTeam: 'Nigeria', awayTeam: 'Portugal', homeFlag: '🇳🇬', awayFlag: '🇵🇹', group: 'F', date: '2026-06-22', venue: 'Estadio Azteca, Mexico City', odds: { home: 6.00, draw: 4.20, away: 1.60 } },

  // Group G
  { id: 'G1', homeTeam: 'Italy', awayTeam: 'Algeria', homeFlag: '🇮🇹', awayFlag: '🇩🇿', group: 'G', date: '2026-06-14', venue: 'Levi\'s Stadium, SF', odds: { home: 1.55, draw: 4.00, away: 6.50 } },
  { id: 'G2', homeTeam: 'Uruguay', awayTeam: 'Saudi Arabia', homeFlag: '🇺🇾', awayFlag: '🇸🇦', group: 'G', date: '2026-06-14', venue: 'NRG Stadium, Houston', odds: { home: 1.65, draw: 3.80, away: 5.50 } },
  { id: 'G3', homeTeam: 'Italy', awayTeam: 'Uruguay', homeFlag: '🇮🇹', awayFlag: '🇺🇾', group: 'G', date: '2026-06-18', venue: 'AT&T Stadium, Dallas', odds: { home: 2.20, draw: 3.20, away: 3.40 } },
  { id: 'G4', homeTeam: 'Algeria', awayTeam: 'Saudi Arabia', homeFlag: '🇩🇿', awayFlag: '🇸🇦', group: 'G', date: '2026-06-18', venue: 'SoFi Stadium, LA', odds: { home: 2.50, draw: 3.10, away: 2.90 } },
  { id: 'G5', homeTeam: 'Uruguay', awayTeam: 'Algeria', homeFlag: '🇺🇾', awayFlag: '🇩🇿', group: 'G', date: '2026-06-22', venue: 'MetLife Stadium, New York', odds: { home: 2.00, draw: 3.30, away: 3.80 } },
  { id: 'G6', homeTeam: 'Saudi Arabia', awayTeam: 'Italy', homeFlag: '🇸🇦', awayFlag: '🇮🇹', group: 'G', date: '2026-06-22', venue: 'Rose Bowl, LA', odds: { home: 7.50, draw: 4.50, away: 1.45 } },

  // Group H
  { id: 'H1', homeTeam: 'Belgium', awayTeam: 'Australia', homeFlag: '🇧🇪', awayFlag: '🇦🇺', group: 'H', date: '2026-06-15', venue: 'Hard Rock Stadium, Miami', odds: { home: 1.60, draw: 3.90, away: 6.00 } },
  { id: 'H2', homeTeam: 'Turkey', awayTeam: 'Iran', homeFlag: '🇹🇷', awayFlag: '🇮🇷', group: 'H', date: '2026-06-15', venue: 'Estadio Azteca, Mexico City', odds: { home: 2.00, draw: 3.30, away: 3.80 } },
  { id: 'H3', homeTeam: 'Belgium', awayTeam: 'Turkey', homeFlag: '🇧🇪', awayFlag: '🇹🇷', group: 'H', date: '2026-06-19', venue: 'Levi\'s Stadium, SF', odds: { home: 1.80, draw: 3.60, away: 4.80 } },
  { id: 'H4', homeTeam: 'Australia', awayTeam: 'Iran', homeFlag: '🇦🇺', awayFlag: '🇮🇷', group: 'H', date: '2026-06-19', venue: 'NRG Stadium, Houston', odds: { home: 2.10, draw: 3.30, away: 3.60 } },
  { id: 'H5', homeTeam: 'Turkey', awayTeam: 'Australia', homeFlag: '🇹🇷', awayFlag: '🇦🇺', group: 'H', date: '2026-06-23', venue: 'AT&T Stadium, Dallas', odds: { home: 2.10, draw: 3.30, away: 3.60 } },
  { id: 'H6', homeTeam: 'Iran', awayTeam: 'Belgium', homeFlag: '🇮🇷', awayFlag: '🇧🇪', group: 'H', date: '2026-06-23', venue: 'SoFi Stadium, LA', odds: { home: 6.00, draw: 4.00, away: 1.60 } },
];

export const TOURNAMENT_WINNER_BETS: TournamentBet[] = [
  { id: 'tw1', type: 'tournament_winner', team: 'Brazil', flag: '🇧🇷', odds: 5.50 },
  { id: 'tw2', type: 'tournament_winner', team: 'France', flag: '🇫🇷', odds: 6.00 },
  { id: 'tw3', type: 'tournament_winner', team: 'Argentina', flag: '🇦🇷', odds: 6.50 },
  { id: 'tw4', type: 'tournament_winner', team: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', odds: 7.00 },
  { id: 'tw5', type: 'tournament_winner', team: 'Spain', flag: '🇪🇸', odds: 7.50 },
  { id: 'tw6', type: 'tournament_winner', team: 'Germany', flag: '🇩🇪', odds: 8.00 },
  { id: 'tw7', type: 'tournament_winner', team: 'Portugal', flag: '🇵🇹', odds: 10.00 },
  { id: 'tw8', type: 'tournament_winner', team: 'Netherlands', flag: '🇳🇱', odds: 12.00 },
  { id: 'tw9', type: 'tournament_winner', team: 'Belgium', flag: '🇧🇪', odds: 14.00 },
  { id: 'tw10', type: 'tournament_winner', team: 'USA', flag: '🇺🇸', odds: 20.00 },
  { id: 'tw11', type: 'tournament_winner', team: 'Morocco', flag: '🇲🇦', odds: 25.00 },
  { id: 'tw12', type: 'tournament_winner', team: 'Colombia', flag: '🇨🇴', odds: 30.00 },
  { id: 'tw13', type: 'tournament_winner', team: 'Japan', flag: '🇯🇵', odds: 35.00 },
  { id: 'tw14', type: 'tournament_winner', team: 'Uruguay', flag: '🇺🇾', odds: 40.00 },
];

export const TOP_SCORER_BETS: TopScorerBet[] = [
  { id: 'ts1', type: 'top_scorer', player: 'Kylian Mbappé', team: 'France', flag: '🇫🇷', odds: 6.50 },
  { id: 'ts2', type: 'top_scorer', player: 'Erling Haaland', team: 'Norway', flag: '🇳🇴', odds: 8.00 },
  { id: 'ts3', type: 'top_scorer', player: 'Vinicius Jr', team: 'Brazil', flag: '🇧🇷', odds: 9.00 },
  { id: 'ts4', type: 'top_scorer', player: 'Harry Kane', team: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', odds: 10.00 },
  { id: 'ts5', type: 'top_scorer', player: 'Lamine Yamal', team: 'Spain', flag: '🇪🇸', odds: 12.00 },
  { id: 'ts6', type: 'top_scorer', player: 'Florian Wirtz', team: 'Germany', flag: '🇩🇪', odds: 13.00 },
  { id: 'ts7', type: 'top_scorer', player: 'Jude Bellingham', team: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', odds: 14.00 },
  { id: 'ts8', type: 'top_scorer', player: 'Julián Álvarez', team: 'Argentina', flag: '🇦🇷', odds: 15.00 },
  { id: 'ts9', type: 'top_scorer', player: 'Rafael Leão', team: 'Portugal', flag: '🇵🇹', odds: 16.00 },
  { id: 'ts10', type: 'top_scorer', player: 'Son Heung-min', team: 'South Korea', flag: '🇰🇷', odds: 20.00 },
  { id: 'ts11', type: 'top_scorer', player: 'Bukayo Saka', team: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', odds: 22.00 },
  { id: 'ts12', type: 'top_scorer', player: 'Achraf Hakimi', team: 'Morocco', flag: '🇲🇦', odds: 30.00 },
];
