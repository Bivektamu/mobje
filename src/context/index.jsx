import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import PropTypes from 'prop-types'

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);
const initialState = {
  tasks: [],
  modal: {}
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TaskContext.Provider value={[state, dispatch]}>
      {children}
    </TaskContext.Provider>
  );
};
// 
// 
TaskProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export  {TaskProvider}