import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import './QuestionCard.css'

function decodeHtml(html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export default function QuestionCard() {
  const { state, answerQuestion } = useGame()
  const { questions, currentIndex, answers } = state

  const question = questions[currentIndex]
  const lastAnswer = answers[answers.length - 1]
  const alreadyAnswered = lastAnswer && lastAnswer.questionIndex === currentIndex

  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  // Reset when question changes
  useEffect(() => {
    setSelected(null)
    setRevealed(false)
  }, [currentIndex])

  if (!question) return null

  const handleSelect = (answer) => {
    if (revealed) return
    setSelected(answer)
    setRevealed(true)
    // Short delay so user sees their choice highlighted before state updates
    setTimeout(() => {
      answerQuestion(answer)
    }, 900)
  }

  const isCorrect = (answer) => decodeHtml(question.correct_answer) === decodeHtml(answer)

  const getAnswerClass = (answer) => {
    if (!revealed) return ''
    if (decodeHtml(answer) === decodeHtml(selected)) {
      return isCorrect(answer) ? 'answer--correct' : 'answer--wrong'
    }
    if (isCorrect(answer)) return 'answer--correct answer--correct-hint'
    return 'answer--dimmed'
  }

  const categoryLabel = decodeHtml(question.category)
  const questionText = decodeHtml(question.question)

  return (
    <div className={`qcard ${revealed ? (isCorrect(selected) ? 'qcard--correct' : 'qcard--wrong') : ''}`}>
      <div className="qcard__category">{categoryLabel}</div>

      <div className="qcard__question">
        {questionText}
      </div>

      <div className="qcard__answers">
        {question.shuffled_answers.map((ans, i) => (
          <button
            key={i}
            className={`qcard__answer ${getAnswerClass(ans)}`}
            onClick={() => handleSelect(ans)}
            disabled={revealed}
          >
            <span className="qcard__ans-letter">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="qcard__ans-text">{decodeHtml(ans)}</span>
            {revealed && isCorrect(ans) && (
              <span className="qcard__check">✓</span>
            )}
            {revealed && decodeHtml(ans) === decodeHtml(selected) && !isCorrect(ans) && (
              <span className="qcard__x">✗</span>
            )}
          </button>
        ))}
      </div>

      {revealed && (
        <div className={`qcard__feedback ${isCorrect(selected) ? 'qcard__feedback--correct' : 'qcard__feedback--wrong'}`}>
          {isCorrect(selected)
            ? '✓ Correct! +1 point'
            : `✗ Wrong! The answer was: ${decodeHtml(question.correct_answer)}`}
        </div>
      )}
    </div>
  )
}
