import { createContext, useState, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import PropTypes from 'prop-types'

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

const initialState = {
  taskList: [
    {
      title: 'To Do',
      slug: 'toDo',
      priority:0,
      tasks:[]
    },
    {
      title: 'In Progress',
      slug: 'inProgress',
      priority:1,
      tasks:[]
    },
    {
      title: 'Complete',
      slug: 'complete',
      priority:2,
      tasks:[]
    }

  ],
  shoppingList: [],
  modal: {}
};


const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
};
// 
// 
StoreProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export { StoreProvider }