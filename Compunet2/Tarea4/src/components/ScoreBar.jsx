import { useGame } from '../context/GameContext'
import './ScoreBar.css'

export default function ScoreBar() {
  const { state } = useGame()
  const { score, currentIndex, questions, categoryName, difficulty } = state
  const progress = ((currentIndex) / questions.length) * 100

  const diffColor = difficulty === 'easy' ? '#00e676' : difficulty === 'hard' ? '#ff3d6b' : '#ffd60a'

  return (
    <div className="scorebar">
      <div className="scorebar__meta">
        <span className="scorebar__cat">{categoryName}</span>
        <span className="scorebar__diff" style={{ color: diffColor }}>
          {difficulty.toUpperCase()}
        </span>
      </div>

      <div className="scorebar__center">
        <div className="scorebar__qcount">
          <span className="scorebar__current">{currentIndex + 1}</span>
          <span className="scorebar__sep"> / </span>
          <span className="scorebar__total">{questions.length}</span>
        </div>
      </div>

      <div className="scorebar__score" key={score}>
        <span className="scorebar__score-label">Score</span>
        <span className={`scorebar__score-val ${score > 0 ? 'pos' : score < 0 ? 'neg' : ''}`}>
          {score > 0 ? '+' : ''}{score}
        </span>
      </div>

      <div className="scorebar__track">
        <div className="scorebar__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
