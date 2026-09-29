import { useEffect, useState } from 'react'
import { ArrowLeft, Moon, RotateCcw, Sun, Trophy } from 'lucide-react'

type Cell = 'X' | 'O' | null
type Mode = 'pvp' | 'cpu'

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
] as const

function getWinner(board: Cell[]): { player: 'X' | 'O'; line: readonly number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line }
    }
  }
  return null
}

function minimax(board: Cell[], player: 'X' | 'O', ai: 'X' | 'O', depth: number): number {
  const win = getWinner(board)
  if (win) return win.player === ai ? 10 - depth : depth - 10
  if (board.every(Boolean)) return 0
  const scores = board
    .map((cell, i) => (cell ? null : i))
    .filter((i): i is number => i !== null)
    .map((i) => {
      const next = board.slice()
      next[i] = player
      return minimax(next, player === 'X' ? 'O' : 'X', ai, depth + 1)
    })
  return player === ai ? Math.max(...scores) : Math.min(...scores)
}

function bestMove(board: Cell[], ai: 'X' | 'O'): number {
  let best = -Infinity
  let move = -1
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue
    const next = board.slice()
    next[i] = ai
    const score = minimax(next, ai === 'X' ? 'O' : 'X', ai, 0)
    if (score > best) {
      best = score
      move = i
    }
  }
  return move
}

const emptyBoard: Cell[] = Array(9).fill(null)

function XoGame() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (document.documentElement.dataset.theme as 'light' | 'dark') || 'light',
  )
  const [mode, setMode] = useState<Mode>('cpu')
  const [board, setBoard] = useState<Cell[]>(emptyBoard)
  const [xIsNext, setXIsNext] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })

  const winner = getWinner(board)
  const isDraw = !winner && board.every(Boolean)
  const gameOver = Boolean(winner) || isDraw
  const current: 'X' | 'O' = xIsNext ? 'X' : 'O'
  const cpuTurn = mode === 'cpu' && current === 'O' && !gameOver

  useEffect(() => {
    if (!cpuTurn) return
    const timer = setTimeout(() => {
      const move = bestMove(board, 'O')
      if (move >= 0) applyMove(board, move, 'O')
      setXIsNext(true)
    }, 350)
    return () => clearTimeout(timer)
  })

  const applyMove = (prev: Cell[], i: number, player: 'X' | 'O') => {
    const next = prev.slice()
    next[i] = player
    setBoard(next)
    const win = getWinner(next)
    if (win) {
      setScores((s) => ({ ...s, [win.player]: s[win.player] + 1 }))
    } else if (next.every(Boolean)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }))
    }
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    localStorage.setItem('theme', nextTheme)
  }

  const play = (i: number) => {
    if (board[i] || gameOver || cpuTurn) return
    applyMove(board, i, current)
    setXIsNext(!xIsNext)
  }

  const newRound = () => {
    setBoard(emptyBoard)
    setXIsNext(true)
  }

  const switchMode = (next: Mode) => {
    if (next === mode) return
    setMode(next)
    setScores({ X: 0, O: 0, draws: 0 })
    newRound()
  }

  const status = winner
    ? `${winner.player} wins!`
    : isDraw
      ? "It's a draw."
      : mode === 'cpu'
        ? current === 'X'
          ? 'Your turn'
          : 'Computer is thinking…'
        : `${current} to move`

  return (
    <div className="xo-shell">
      <header className="xo-header">
        <a className="xo-back" href="./">
          <ArrowLeft size={16} /> Portfolio
        </a>
        <h1 className="xo-title">XO<span>.</span></h1>
        <button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main className="xo-main">
        <div className="xo-mode" role="group" aria-label="Game mode">
          <button type="button" className={mode === 'cpu' ? 'active' : ''} onClick={() => switchMode('cpu')}>vs Computer</button>
          <button type="button" className={mode === 'pvp' ? 'active' : ''} onClick={() => switchMode('pvp')}>2 Players</button>
        </div>

        <p className="xo-status" role="status" aria-live="polite">
          {winner && <Trophy size={16} />}
          {status}
        </p>

        <div className="xo-board" role="grid" aria-label="Tic-tac-toe board">
          {board.map((cell, i) => (
            <button
              key={i}
              type="button"
              role="gridcell"
              className={`xo-cell ${cell ? `is-${cell.toLowerCase()}` : ''} ${winner?.line.includes(i) ? 'is-winning' : ''}`}
              onClick={() => play(i)}
              disabled={Boolean(cell) || gameOver || cpuTurn}
              aria-label={cell ? `Cell ${i + 1}: ${cell}` : `Cell ${i + 1}: empty`}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="xo-scoreboard">
          <div className="xo-score is-x"><span>X{mode === 'cpu' ? ' · You' : ''}</span><strong>{scores.X}</strong></div>
          <div className="xo-score"><span>Draws</span><strong>{scores.draws}</strong></div>
          <div className="xo-score is-o"><span>O{mode === 'cpu' ? ' · CPU' : ''}</span><strong>{scores.O}</strong></div>
        </div>

        <button className="button button-secondary xo-reset" type="button" onClick={newRound}>
          <RotateCcw size={15} /> New round
        </button>
      </main>

      <footer className="xo-footer">Built by Mohammed Kord</footer>
    </div>
  )
}

export default XoGame
