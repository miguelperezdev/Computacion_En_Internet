import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGame } from '../context/GameContext'
import './Setup.css'

const DIFFICULTIES = [
  { value: 'easy', label: 'Easy', color: '#00e676' },
  { value: 'medium', label: 'Medium', color: '#ffd60a' },
  { value: 'hard', label: 'Hard', color: '#ff3d6b' },
]

const AMOUNTS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

export default function Setup() {
  const { state, setConfig, startGame, setScreen } = useGame()
  const [categories, setCategories] = useState([])
  const [loadingCats, setLoadingCats] = useState(true)
  const [loadingGame, setLoadingGame] = useState(false)
  const [error, setError] = useState('')

  const [localAmount, setLocalAmount] = useState(state.totalQuestions)
  const [localCategory, setLocalCategory] = useState(state.categoryId)
  const [localCategoryName, setLocalCategoryName] = useState(state.categoryName)
  const [localDifficulty, setLocalDifficulty] = useState(state.difficulty)

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => setCategories(res.data.trivia_categories))
      .catch(() => setError('Could not load categories. Check your connection.'))
      .finally(() => setLoadingCats(false))
  }, [])

  const handleStart = async () => {
    setError('')
    setLoadingGame(true)
    setScreen('loading')
    try {
      const params = {
        amount: localAmount,
        difficulty: localDifficulty,
        type: 'multiple',
      }
      if (localCategory) params.category = localCategory

      const res = await axios.get('https://opentdb.com/api.php', { params })

      if (res.data.response_code !== 0) {
        setError('Not enough questions for this configuration. Try different settings.')
        setScreen('setup')
        setLoadingGame(false)
        return
      }

      const questions = res.data.results.map(q => {
        const answers = [...q.incorrect_answers, q.correct_answer]
          .sort(() => Math.random() - 0.5)
        return { ...q, shuffled_answers: answers }
      })

      setConfig({
        totalQuestions: localAmount,
        categoryId: localCategory,
        categoryName: localCategoryName,
        difficulty: localDifficulty,
      })
      startGame(questions)
    } catch {
      setError('Failed to load questions. Please try again.')
      setScreen('setup')
    } finally {
      setLoadingGame(false)
    }
  }

  return (
    <div className="setup">
      <div className="setup__header">
        <div className="setup__logo">TRIVIA</div>
      </div>

      <div className="setup__card">
        <section className="setup__section">
          <label className="setup__label">
            <span className="tag">01</span>
            Questions
          </label>
          <div className="setup__pills">
            {AMOUNTS.map(n => (
              <button
                key={n}
                className={`setup__pill ${localAmount === n ? 'setup__pill--active' : ''}`}
                onClick={() => setLocalAmount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        <section className="setup__section">
          <label className="setup__label">
            <span className="tag">02</span>
            Difficulty
          </label>
          <div  className="setup__pills">
            {DIFFICULTIES.map(d => (
              <button
                key={d.value}
                className={`setup__pill setup__pill--diff ${localDifficulty === d.value ? 'setup__pill--active' : ''}`}
                style={localDifficulty === d.value ? { '--pill-color': d.color } : {}}
                onClick={() => setLocalDifficulty(d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </section>

        <section className="setup__section">
          <label className="setup__label">
            <span className="tag">03</span>
            Category
          </label>
          {loadingCats ? (
            <div className="setup__loading-cats">
              <span className="dot-pulse"></span>
              Loading categories…
            </div>
          ) : (
            <select
              className="setup__select"
              value={localCategory}
              onChange={e => {
                setLocalCategory(e.target.value)
                const opt = e.target.options[e.target.selectedIndex]
                setLocalCategoryName(opt.text)
              }}
            >
              <option value="">Any Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
        </section>

        {error && <div className="setup__error">{error}</div>}

        <button
          className="setup__start"
          onClick={handleStart}
          disabled={loadingGame || loadingCats}
        >
          {loadingGame ? 'Loading…' : 'Start Game'}
          <span className="setup__start-arrow">→</span>
        </button>
      </div>

    </div>
  )
}
