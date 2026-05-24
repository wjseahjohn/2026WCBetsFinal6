'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trophy, Target, Star, TrendingUp, CheckCircle, X, ChevronDown, ChevronUp, RotateCcw, Zap } from 'lucide-react';
import type { Match, TournamentBet, TopScorerBet } from '@/lib/matches';
import type { Bet, PlayerStats } from '@/lib/db';

type Tab = 'matches' | 'winner' | 'scorer' | 'mybets' | 'leaderboard';
type MatchSelection = 'home' | 'draw' | 'away';

interface BetSlipItem {
  targetId: string;
  label: string;
  selection: string;
  selectionLabel: string;
  odds: number;
  betType: 'match_result' | 'tournament_winner' | 'top_scorer';
}

interface AppData {
  matches: Match[];
  tournamentWinners: TournamentBet[];
  topScorers: TopScorerBet[];
  results: Record<string, string>;
}

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function formatOdds(o: number) { return o.toFixed(2); }
function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-SG', { month: 'short', day: 'numeric' });
}

export default function Home() {
  const [tab, setTab] = useState<Tab>('matches');
  const [playerName, setPlayerName] = useState('');
  const [nameConfirmed, setNameConfirmed] = useState(false);
  const [data, setData] = useState<AppData | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [leaderboard, setLeaderboard] = useState<PlayerStats[]>([]);
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([]);
  const [stakes, setStakes] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeGroup, setActiveGroup] = useState('A');
  const [betSlipOpen, setBetSlipOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const [matchRes, betRes, lbRes] = await Promise.all([
      fetch('/api/matches'),
      fetch('/api/bets'),
      fetch('/api/leaderboard'),
    ]);
    const matchData = await matchRes.json();
    const betData = await betRes.json();
    const lbData = await lbRes.json();
    setData(matchData);
    setBets(betData);
    setLeaderboard(lbData);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const myBets = bets.filter(b => b.playerName.toLowerCase() === playerName.toLowerCase());

  function addToBetSlip(item: Omit<BetSlipItem, never>) {
    setBetSlip(prev => {
      const existing = prev.findIndex(b => b.targetId === item.targetId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = item;
        return updated;
      }
      return [...prev, item];
    });
    setBetSlipOpen(true);
  }

  function removeFromSlip(targetId: string) {
    setBetSlip(prev => prev.filter(b => b.targetId !== targetId));
    setStakes(prev => { const s = { ...prev }; delete s[targetId]; return s; });
  }

  function clearSlip() {
    setBetSlip([]);
    setStakes({});
  }

  async function submitBets() {
    if (!nameConfirmed || betSlip.length === 0) return;
    setSubmitting(true);
    let allOk = true;
    for (const item of betSlip) {
      const stake = stakes[item.targetId] || 50;
      const res = await fetch('/api/bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName,
          betType: item.betType,
          targetId: item.targetId,
          selection: item.selection,
          odds: item.odds,
          stake,
        }),
      });
      if (!res.ok) allOk = false;
    }
    setSubmitting(false);
    if (allOk) {
      setSuccessMsg(`🎉 ${betSlip.length} bet${betSlip.length > 1 ? 's' : ''} placed! Good luck ${playerName}!`);
      clearSlip();
      setBetSlipOpen(false);
      fetchData();
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  }

  const groupMatches = (group: string) =>
    data?.matches.filter(m => m.group === group) || [];

  const isInSlip = (id: string) => betSlip.some(b => b.targetId === id);
  const getSlipSelection = (id: string) => betSlip.find(b => b.targetId === id)?.selection;

  if (loading) {
    return (
      <div className="min-h-screen pitch-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-8xl mb-4" style={{ animation: 'spin 2s linear infinite', display: 'inline-block' }}>⚽</div>
          <p className="font-display text-3xl text-gold tracking-widest">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pitch-bg pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40" style={{ background: 'rgba(7,31,16,0.95)', borderBottom: '1px solid rgba(245,200,66,0.2)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl tracking-widest gold-shimmer">⚽ WC2026 BETS</h1>
            <p className="text-xs text-chalk-dim">Family Edition · SGPools Odds</p>
          </div>
          {nameConfirmed && (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs text-chalk-dim">Playing as</p>
                <p className="font-semibold text-gold text-sm">{playerName}</p>
              </div>
              <button onClick={() => { setNameConfirmed(false); setPlayerName(''); }} className="text-chalk-dim hover:text-chalk transition-colors">
                <RotateCcw size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 pb-3">
          <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {([
              { id: 'matches', label: '🗓 Matches', icon: null },
              { id: 'winner', label: '🏆 Winner', icon: null },
              { id: 'scorer', label: '👟 Top Scorer', icon: null },
              { id: 'mybets', label: '📋 My Bets', icon: null },
              { id: 'leaderboard', label: '🥇 Board', icon: null },
            ] as { id: Tab; label: string; icon: null }[]).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  tab === t.id
                    ? 'bg-gold text-pitch'
                    : 'text-chalk-dim hover:text-chalk'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        {/* Name Gate */}
        {!nameConfirmed && (
          <div className="animate-slide-up mb-8">
            <div className="card p-8 text-center max-w-md mx-auto" style={{ border: '1px solid rgba(245,200,66,0.3)' }}>
              <div className="text-6xl mb-4">⚽</div>
              <h2 className="font-display text-4xl text-gold tracking-wider mb-2">WELCOME</h2>
              <p className="text-chalk-dim mb-6 text-sm">Who's placing bets today?</p>
              <input
                type="text"
                placeholder="Your name..."
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && playerName.trim()) setNameConfirmed(true); }}
                className="w-full px-4 py-3 rounded-lg text-center text-lg font-semibold text-pitch mb-4"
                style={{ background: 'var(--chalk)', outline: 'none' }}
                autoFocus
              />
              <button
                onClick={() => { if (playerName.trim()) setNameConfirmed(true); }}
                disabled={!playerName.trim()}
                className="w-full py-3 rounded-lg font-display text-xl tracking-wider transition-all"
                style={{ background: playerName.trim() ? 'var(--gold)' : 'rgba(255,255,255,0.1)', color: playerName.trim() ? 'var(--pitch)' : 'var(--chalk-dim)', cursor: playerName.trim() ? 'pointer' : 'not-allowed' }}
              >
                LET'S GO
              </button>
            </div>
          </div>
        )}

        {/* Success message */}
        {successMsg && (
          <div className="animate-slide-up mb-4 p-4 rounded-xl text-center font-semibold" style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)', color: '#4ade80' }}>
            {successMsg}
          </div>
        )}

        {/* MATCHES TAB */}
        {tab === 'matches' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-display text-3xl text-gold tracking-wider mb-1">GROUP STAGE</h2>
              <p className="text-chalk-dim text-sm">Bet on match results — Win / Draw / Win</p>
            </div>

            {/* Group selector */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {GROUPS.map(g => (
                <button
                  key={g}
                  onClick={() => setActiveGroup(g)}
                  className={`px-4 py-2 rounded-lg font-display text-lg tracking-wider transition-all flex-shrink-0 ${
                    activeGroup === g
                      ? 'bg-gold text-pitch shadow-lg'
                      : 'card text-chalk-dim hover:text-chalk'
                  }`}
                >
                  GROUP {g}
                </button>
              ))}
            </div>

            {/* Matches */}
            <div className="space-y-3">
              {groupMatches(activeGroup).map((match, i) => {
                const result = data?.results[match.id];
                const mySelection = getSlipSelection(match.id) as MatchSelection | undefined;
                const settled = !!result;
                return (
                  <div key={match.id} className="card p-4 animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-chalk-dim">{formatDate(match.date)} · {match.venue.split(',')[0]}</span>
                      {result && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>
                          SETTLED: {result === 'home' ? match.homeTeam : result === 'away' ? match.awayTeam : 'DRAW'}
                        </span>
                      )}
                    </div>

                    {/* Teams */}
                    <div className="grid grid-cols-3 items-center gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-3xl mb-1">{match.homeFlag}</div>
                        <div className="font-display text-lg tracking-wide text-chalk">{match.homeTeam}</div>
                      </div>
                      <div className="text-center font-display text-2xl text-chalk-dim tracking-widest">VS</div>
                      <div className="text-center">
                        <div className="text-3xl mb-1">{match.awayFlag}</div>
                        <div className="font-display text-lg tracking-wide text-chalk">{match.awayTeam}</div>
                      </div>
                    </div>

                    {/* Bet buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {(['home', 'draw', 'away'] as MatchSelection[]).map(sel => {
                        const label = sel === 'home' ? match.homeTeam : sel === 'away' ? match.awayTeam : 'Draw';
                        const odd = sel === 'home' ? match.odds.home : sel === 'draw' ? match.odds.draw : match.odds.away;
                        const isSelected = mySelection === sel;
                        const isWinner = result === sel;
                        return (
                          <button
                            key={sel}
                            disabled={settled || !nameConfirmed}
                            onClick={() => {
                              addToBetSlip({
                                targetId: match.id,
                                label: `${match.homeFlag} ${match.homeTeam} vs ${match.awayFlag} ${match.awayTeam}`,
                                selection: sel,
                                selectionLabel: label,
                                odds: odd,
                                betType: 'match_result',
                              });
                            }}
                            className={`rounded-lg p-3 transition-all border ${
                              isWinner ? 'border-green-500 bg-green-500/20' :
                              isSelected ? `selected-${sel}` :
                              'border-transparent hover:border-white/20'
                            } ${settled || !nameConfirmed ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer card-hover'}`}
                            style={{ background: isSelected || isWinner ? undefined : 'rgba(255,255,255,0.04)' }}
                          >
                            <div className="text-xs text-chalk-dim mb-1 truncate">{label}</div>
                            <div className="font-display text-xl tracking-wide" style={{ color: isWinner ? '#4ade80' : isSelected ? 'var(--gold)' : 'var(--chalk)' }}>
                              {formatOdds(odd)}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TOURNAMENT WINNER TAB */}
        {tab === 'winner' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-display text-3xl text-gold tracking-wider mb-1">🏆 TOURNAMENT WINNER</h2>
              <p className="text-chalk-dim text-sm">Who lifts the trophy in New York?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {data?.tournamentWinners.map((tw, i) => {
                const isSelected = getSlipSelection(tw.id) === tw.team;
                const result = data.results[tw.id];
                const isWinner = result === tw.team;
                return (
                  <button
                    key={tw.id}
                    disabled={!!result || !nameConfirmed}
                    onClick={() => addToBetSlip({
                      targetId: tw.id,
                      label: 'Tournament Winner',
                      selection: tw.team,
                      selectionLabel: tw.team,
                      odds: tw.odds,
                      betType: 'tournament_winner',
                    })}
                    className={`card card-hover p-4 text-left rounded-xl border transition-all animate-slide-up ${
                      isWinner ? 'border-green-500 bg-green-500/10' :
                      isSelected ? 'selected-pick' : 'border-transparent'
                    } ${!!result || !nameConfirmed ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{tw.flag}</span>
                      <span className="font-display text-2xl" style={{ color: isSelected || isWinner ? 'var(--gold)' : 'var(--chalk)' }}>
                        {formatOdds(tw.odds)}
                      </span>
                    </div>
                    <div className="font-semibold text-chalk">{tw.team}</div>
                    <div className="text-xs text-chalk-dim mt-1">Win ${tw.odds.toFixed(0)} per $1</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TOP SCORER TAB */}
        {tab === 'scorer' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-display text-3xl text-gold tracking-wider mb-1">👟 TOP SCORER</h2>
              <p className="text-chalk-dim text-sm">Who finishes as the Golden Boot winner?</p>
            </div>
            <div className="space-y-3">
              {data?.topScorers.map((ts, i) => {
                const isSelected = getSlipSelection(ts.id) === ts.player;
                const result = data.results[ts.id];
                return (
                  <button
                    key={ts.id}
                    disabled={!!result || !nameConfirmed}
                    onClick={() => addToBetSlip({
                      targetId: ts.id,
                      label: 'Top Scorer',
                      selection: ts.player,
                      selectionLabel: ts.player,
                      odds: ts.odds,
                      betType: 'top_scorer',
                    })}
                    className={`w-full card card-hover p-4 rounded-xl border flex items-center justify-between animate-slide-up transition-all ${
                      isSelected ? 'selected-pick' : 'border-transparent'
                    } ${!!result || !nameConfirmed ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ts.flag}</span>
                      <div className="text-left">
                        <div className="font-semibold text-chalk">{ts.player}</div>
                        <div className="text-xs text-chalk-dim">{ts.team}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl" style={{ color: isSelected ? 'var(--gold)' : 'var(--chalk)' }}>
                        {formatOdds(ts.odds)}
                      </div>
                      <div className="text-xs text-chalk-dim">odds</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MY BETS TAB */}
        {tab === 'mybets' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-display text-3xl text-gold tracking-wider mb-1">📋 MY BETS</h2>
              {nameConfirmed ? (
                <p className="text-chalk-dim text-sm">All bets for <span className="text-gold font-semibold">{playerName}</span></p>
              ) : (
                <p className="text-amber text-sm">Enter your name to see your bets</p>
              )}
            </div>

            {!nameConfirmed ? (
              <div className="card p-8 text-center">
                <p className="text-chalk-dim">Please enter your name to view your bets</p>
              </div>
            ) : myBets.length === 0 ? (
              <div className="card p-8 text-center">
                <div className="text-4xl mb-3">🎰</div>
                <p className="text-chalk-dim">No bets yet! Head to the matches tab to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myBets.map((bet, i) => {
                  const settled = bet.settled;
                  const won = settled && (bet.actualWin || 0) > 0;
                  return (
                    <div key={bet.id} className={`card p-4 animate-slide-up border ${
                      !settled ? 'border-transparent' :
                      won ? 'border-green-500/30' : 'border-red-500/20'
                    }`} style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium mr-2" style={{
                            background: bet.betType === 'match_result' ? 'rgba(59,130,246,0.2)' : bet.betType === 'tournament_winner' ? 'rgba(245,200,66,0.2)' : 'rgba(168,85,247,0.2)',
                            color: bet.betType === 'match_result' ? '#60a5fa' : bet.betType === 'tournament_winner' ? 'var(--gold)' : '#c084fc',
                          }}>
                            {bet.betType === 'match_result' ? '⚽ Match' : bet.betType === 'tournament_winner' ? '🏆 Winner' : '👟 Scorer'}
                          </span>
                          {settled && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${won ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {won ? '✓ WON' : '✗ LOST'}
                            </span>
                          )}
                          {!settled && <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber/20 text-amber">⏳ PENDING</span>}
                        </div>
                        <span className="text-xs text-chalk-dim">{new Date(bet.createdAt).toLocaleDateString('en-SG')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-chalk">{bet.selection}</p>
                          <p className="text-xs text-chalk-dim">Odds: {formatOdds(bet.odds)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-chalk-dim">Stake / Win</p>
                          <p className="font-display text-lg">
                            <span className="text-chalk-dim">{bet.stake}</span>
                            <span className="text-chalk-dim mx-1">/</span>
                            <span style={{ color: won ? '#4ade80' : 'var(--gold)' }}>
                              {settled ? (bet.actualWin || 0) : bet.potentialWin}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Summary */}
                <div className="card p-4 mt-4" style={{ border: '1px solid rgba(245,200,66,0.2)' }}>
                  <h3 className="font-display text-xl text-gold mb-3 tracking-wider">SUMMARY</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-display text-2xl text-chalk">{myBets.length}</div>
                      <div className="text-xs text-chalk-dim">Total Bets</div>
                    </div>
                    <div>
                      <div className="font-display text-2xl text-chalk">{myBets.filter(b => b.settled && (b.actualWin || 0) > 0).length}</div>
                      <div className="text-xs text-chalk-dim">Won</div>
                    </div>
                    <div>
                      <div className="font-display text-2xl" style={{ color: myBets.reduce((acc, b) => acc + (b.actualWin || 0) - b.stake, 0) >= 0 ? '#4ade80' : '#f87171' }}>
                        {myBets.reduce((acc, b) => acc + (b.actualWin || 0) - b.stake, 0) >= 0 ? '+' : ''}
                        {myBets.reduce((acc, b) => acc + (b.actualWin || 0) - b.stake, 0)}
                      </div>
                      <div className="text-xs text-chalk-dim">Net Pts</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {tab === 'leaderboard' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-display text-3xl text-gold tracking-wider mb-1">🥇 LEADERBOARD</h2>
              <p className="text-chalk-dim text-sm">Family rankings — who's the biggest winner?</p>
            </div>

            {leaderboard.length === 0 ? (
              <div className="card p-8 text-center">
                <div className="text-4xl mb-3">📊</div>
                <p className="text-chalk-dim">No bets settled yet. Check back after matches are played!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((player, i) => (
                  <div key={player.name} className="card p-4 animate-slide-up flex items-center gap-4" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className={`font-display text-4xl w-12 text-center ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'text-chalk-dim'}`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-chalk text-lg">{player.name}</div>
                      <div className="text-xs text-chalk-dim">{player.wonCount}/{player.betsCount} bets won</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl" style={{ color: player.netProfit >= 0 ? '#4ade80' : '#f87171' }}>
                        {player.netProfit >= 0 ? '+' : ''}{player.netProfit}
                      </div>
                      <div className="text-xs text-chalk-dim">net points</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Bet Slip */}
      {betSlip.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-50 max-w-lg mx-auto px-4">
          <div className="bet-slip rounded-2xl shadow-2xl overflow-hidden">
            {/* Slip header */}
            <button
              onClick={() => setBetSlipOpen(!betSlipOpen)}
              className="w-full px-4 py-3 flex items-center justify-between"
              style={{ background: 'rgba(245,200,66,0.1)' }}
            >
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-gold" />
                <span className="font-display text-lg tracking-wider text-gold">BET SLIP</span>
                <span className="font-display text-lg text-chalk">({betSlip.length})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-chalk-dim">
                  Total potential: <span className="text-gold font-semibold">
                    {betSlip.reduce((acc, item) => acc + Math.round((stakes[item.targetId] || 50) * item.odds), 0)} pts
                  </span>
                </span>
                {betSlipOpen ? <ChevronDown size={16} className="text-chalk-dim" /> : <ChevronUp size={16} className="text-chalk-dim" />}
              </div>
            </button>

            {betSlipOpen && (
              <div className="px-4 pb-4">
                {/* Items */}
                <div className="space-y-3 mt-3 max-h-64 overflow-y-auto">
                  {betSlip.map(item => (
                    <div key={item.targetId} className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-chalk-dim truncate">{item.label}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-semibold text-sm text-gold">{item.selectionLabel}</span>
                          <span className="text-xs text-chalk-dim">@ {formatOdds(item.odds)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <input
                            type="number"
                            min={10}
                            max={500}
                            step={10}
                            value={stakes[item.targetId] || 50}
                            onChange={e => setStakes(prev => ({ ...prev, [item.targetId]: Math.max(10, Math.min(500, Number(e.target.value))) }))}
                            className="w-16 text-center text-sm font-semibold rounded-lg py-1 text-pitch"
                            style={{ background: 'var(--chalk)' }}
                          />
                          <div className="text-xs text-gold text-right mt-0.5">
                            → {Math.round((stakes[item.targetId] || 50) * item.odds)}
                          </div>
                        </div>
                        <button onClick={() => removeFromSlip(item.targetId)} className="text-chalk-dim hover:text-red-400 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                {!nameConfirmed ? (
                  <p className="text-amber text-xs text-center mt-3">Please enter your name first</p>
                ) : (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={clearSlip}
                      className="px-4 py-2 rounded-xl text-sm text-chalk-dim hover:text-chalk transition-colors border border-white/10"
                    >
                      Clear
                    </button>
                    <button
                      onClick={submitBets}
                      disabled={submitting}
                      className="flex-1 py-2 rounded-xl font-display text-lg tracking-wider transition-all"
                      style={{ background: submitting ? 'rgba(245,200,66,0.5)' : 'var(--gold)', color: 'var(--pitch)' }}
                    >
                      {submitting ? 'PLACING...' : `PLACE ${betSlip.length} BET${betSlip.length > 1 ? 'S' : ''}`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
