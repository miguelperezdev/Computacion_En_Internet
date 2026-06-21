import { GameProvider, useGame } from './context/GameContext'
import Setup from './components/Setup'
import Game from './components/Game'
import Results from './components/Results'
import Loading from './components/Loading'

function Router() {
  const { state } = useGame()

  switch (state.screen) {
    case 'setup':   return <Setup />
    case 'loading': return <Loading />
    case 'game':    return <Game />
    case 'results': return <Results />
    default:        return <Setup />
  }
}

export default function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  )
}
