import ScoreBar from './ScoreBar'
import QuestionCard from './QuestionCard'
import './Game.css'

export default function Game() {
  return (
    <div className="game">
      <ScoreBar />
      <div className="game__content">
        <QuestionCard />
      </div>
    </div>
  )
}
