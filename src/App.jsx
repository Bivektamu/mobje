import { useEffect } from 'react'
import Kanban from './components/kanban/Kanban';
import { useTaskContext } from './context';
import './App.css'

function App() {

  const [state, dispatch] = useTaskContext()
  useEffect(() => {
    dispatch({ type: 'GET' })
  }, [])

  return (
    <div className="App bg-slate-200">
      <Kanban />
    </div>
  )
}

export default App
