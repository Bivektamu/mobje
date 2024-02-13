import { useEffect, useState, createElement } from 'react'
import Kanban from './components/kanban/Kanban';
import { useTaskContext } from './context';
import './App.css'
import Modal from './components/ui/Modal'
import ShoppingList from './components/shopping-list/ShoppingList';

function App() {

  const {state, dispatch} = useTaskContext()
  const {modal} = state

  useEffect(()=> {
    dispatch({type:'GET'})
  }, [])

  return (
    <>
      {modal && Object.keys(modal).length > 0  &&
        <Modal>
          {modal}
        </Modal>
      }
      <div className="App bg-slate-200">
        <Kanban />
        {/* <ShoppingList /> */}
      </div>
    </>

  )
}

export default App
