import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);
const initialState = {
  tasks: [],
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TaskContext.Provider value={[state, dispatch]}>
      {children}
    </TaskContext.Provider>
  );
};
