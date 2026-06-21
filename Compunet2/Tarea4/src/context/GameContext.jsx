import { createContext, useContext, useState, useEffect } from 'react'

const GameContext = createContext(null)

const STORAGE_KEY = 'trivia_session'

const defaultState = {
  // Config
  totalQuestions: 10,
  categoryId: '',
  categoryName: 'Any Category',
  difficulty: 'medium',
  // Session
  questions: [],
  currentIndex: 0,
  score: 0,
  answers: [],   // { questionIndex, correct, chosen }
  screen: 'setup', // 'setup' | 'loading' | 'game' | 'results'
}

export function GameProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Only restore if there's an active game
        if (parsed.screen === 'game' && parsed.questions.length > 0) {
          return { ...defaultState, ...parsed }
        }
      }
    } catch (_) {}
    return defaultState
  })

  // Persist session to localStorage whenever game state changes
  useEffect(() => {
    if (state.screen === 'game' || state.screen === 'results') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [state])

  const setConfig = ({ totalQuestions, categoryId, categoryName, difficulty }) => {
    setState(prev => ({ ...prev, totalQuestions, categoryId, categoryName, difficulty }))
  }

  const startGame = (questions) => {
    setState(prev => ({
      ...prev,
      questions,
      currentIndex: 0,
      score: 0,
      answers: [],
      screen: 'game',
    }))
  }

  const answerQuestion = (chosenAnswer) => {
    setState(prev => {
      const question = prev.questions[prev.currentIndex]
      const correct = chosenAnswer === question.correct_answer
      const delta = correct ? 1 : -1
      const newScore = prev.score + delta
      const newAnswers = [...prev.answers, {
        questionIndex: prev.currentIndex,
        correct,
        chosen: chosenAnswer,
      }]
      const nextIndex = prev.currentIndex + 1
      const finished = nextIndex >= prev.questions.length

      return {
        ...prev,
        score: newScore,
        answers: newAnswers,
        currentIndex: finished ? prev.currentIndex : nextIndex,
        screen: finished ? 'results' : 'game',
      }
    })
  }

  const goToSetup = () => {
    localStorage.removeItem(STORAGE_KEY)
    setState(defaultState)
  }

  const setScreen = (screen) => setState(prev => ({ ...prev, screen }))

  return (
    <GameContext.Provider value={{ state, setConfig, startGame, answerQuestion, goToSetup, setScreen }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}
