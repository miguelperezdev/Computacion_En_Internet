import { useGame } from '../context/GameContext'
import './Results.css'

function decodeHtml(html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export default function Results() {
  const { state, goToSetup, setConfig, startGame, setScreen } = useGame()
  const { score, questions, answers, categoryName, difficulty, totalQuestions } = state

  const correct = answers.filter(a => a.correct).length
  const wrong = answers.filter(a => !a.correct).length
  const pct = Math.round((correct / questions.length) * 100)

  const grade = pct >= 90 ? 'S' : pct >= 75 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'F'
  const gradeColor = pct >= 75 ? 'var(--correct)' : pct >= 40 ? 'var(--gold)' : 'var(--wrong)'

  const handlePlayAgain = async () => {
    // Replay same settings — re-fetch questions
    setScreen('loading')
    const { default: axios } = await import('axios')
    try {
      const params = { amount: totalQuestions, difficulty, type: 'multiple' }
      if (state.categoryId) params.category = state.categoryId
      const res = await axios.get('https://opentdb.com/api.php', { params })
      const qs = res.data.results.map(q => {
        const shuffled = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
        return { ...q, shuffled_answers: shuffled }
      })
      startGame(qs)
    } catch {
      setScreen('results')
    }
  }

  return (
    <div className="results">
      <div className="results__inner">
        <div className="results__header">
          <div className="results__grade" style={{ color: gradeColor }}>{grade}</div>
          <div className="results__title">Round Complete</div>
          <div className="results__sub">{categoryName} · {difficulty}</div>
        </div>

        <div className="results__stats">
          <div className="results__stat">
            <span className="results__stat-val" style={{ color: 'var(--accent)' }}>
              {score > 0 ? '+' : ''}{score}
            </span>
            <span className="results__stat-label">Final Score</span>
          </div>
          <div className="results__stat">
            <span className="results__stat-val" style={{ color: 'var(--correct)' }}>{correct}</span>
            <span className="results__stat-label">Correct</span>
          </div>
          <div className="results__stat">
            <span className="results__stat-val" style={{ color: 'var(--wrong)' }}>{wrong}</span>
            <span className="results__stat-label">Wrong</span>
          </div>
          <div className="results__stat">
            <span className="results__stat-val">{pct}%</span>
            <span className="results__stat-label">Accuracy</span>
          </div>
        </div>

        <div className="results__review">
          <div className="results__review-title">
            <span className="tag">Review</span>
          </div>
          <div className="results__review-list">
            {questions.map((q, i) => {
              const ans = answers[i]
              return (
                <div key={i} className={`results__item ${ans?.correct ? 'results__item--ok' : 'results__item--bad'}`}>
                  <div className="results__item-q">
                    <span className="results__item-num">{i + 1}.</span>
                    {decodeHtml(q.question)}
                  </div>
                  <div className="results__item-ans">
                    {ans?.correct
                      ? <span className="results__badge results__badge--ok">✓ {decodeHtml(q.correct_answer)}</span>
                      : <>
                          <span className="results__badge results__badge--bad">✗ {decodeHtml(ans?.chosen || '')}</span>
                          <span className="results__badge results__badge--ok">✓ {decodeHtml(q.correct_answer)}</span>
                        </>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="results__actions">
          <button className="results__btn results__btn--primary" onClick={handlePlayAgain}>
            Play Again
          </button>
          <button className="results__btn results__btn--secondary" onClick={goToSetup}>
            Change Settings
          </button>
        </div>
      </div>
    </div>
  )
}
