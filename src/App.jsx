import { useEffect, useState } from 'react'
import Kanban from './components/kanban/Kanban';
import { useTaskContext } from './context';
import './App.css'
import Modal from './components/ui/Modal'

function App() {

  const [state, dispatch] = useTaskContext()

  const {show, content} = state.modal 
  useEffect(() => {
    dispatch({ type: 'GET' })
  }, [])

  return (
    <>
      {show &&
        <Modal>
          {content}
        </Modal>
      }
      <div className="App bg-slate-200">
        <Kanban />
      </div>
    </>

  )
}

export default App
