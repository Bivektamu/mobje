import { useEffect, useState, createElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Kanban from './components/kanban/Kanban';
import { useTaskContext } from './context';
import './App.css'
import Modal from './components/ui/Modal'
import ShoppingList from './components/shopping-list/ShoppingList';
import ShoppingListDetails from './components/shopping-list/ShoppingListDetails';

function App() {

  const { state, dispatch } = useTaskContext()
  const { modal } = state

  useEffect(() => {
    dispatch({ type: 'GET' })
  }, [])

  return (
    <>
      {modal && Object.keys(modal).length > 0 &&
        <Modal>
          {modal}
        </Modal>
      }
      <div className="App bg-slate-200">
        <Router>
          <Routes>
            <Route path='/task' element={<Kanban />} exact />
            <Route path='/shopping' element={<ShoppingList />} exact />
            <Route path='/shopping/:slug' element={<ShoppingListDetails />} exact />
          </Routes>
        </Router>
      </div>
    </>

  )
}

export default App
