import { ADD_TASK, TASK_COMPLETE } from "./types";

const reducer = (state, action) => {
  let task = {},
    list = {},
    newState = {},
    tasksStorage = {},
    storeInString = "";

  const upDateLocalStore = (newState) => {
    let store = newState;
    delete store.modal;
    store = JSON.stringify(store);
    localStorage.setItem("store", store);
  };
  switch (action.type) {
    case ADD_TASK:
      list = state.taskList.filter((t) => t.slug === action.payload.stage)[0];
      list = {...list, tasks: list.tasks.map(task=>({...task}))}
      list.tasks = [...list.tasks, action.payload];

      newState = {
        ...state,
        taskList: [list, ...state.taskList.filter((t) => t.slug !== list.slug)],
      };

      upDateLocalStore(newState);
      return newState;

    case TASK_COMPLETE:

      const {id, stage} = action.payload
       newState = {
        ...state,
        taskList: state.taskList.map(list=>({
          ...list,
          tasks: list.tasks.map(task=>({
            ...task,
          }))
        }))
      }
       list = newState.taskList.filter(l=>l.slug === stage)[0]
       task = list.tasks.filter(t=>t.id === id)[0]
       task.stage = 'complete'
       list.tasks = [...list.tasks.filter(t=>t.id !== id)]
       list = newState.taskList.filter(l=>l.slug === 'complete')[0]
       list.tasks = [...list.tasks, task]

      upDateLocalStore(newState);
      return newState;

    case "ADD_LIST":
      newState = {
        ...state,
        shoppingList: [...state.shoppingList, action.payload],
      };
      upDateLocalStore(newState);
      return newState;

    case "EDIT":
      newState = {
        ...state,
        tasks: [
          ...state.tasks.filter((t) => t.id !== action.payload.id),
          action.payload,
        ],
      };
      upDateLocalStore(newState);
      return newState;

    case "GET":
      if (localStorage.getItem("store")) {
        const store = JSON.parse(localStorage.getItem("store"));
        return store;
      } else {
        return state;
      }

    case "DELETE":
      newState = {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.payload)],
      };
      upDateLocalStore(newState);
      return newState;

    case "DND":
      return {
        ...state,
        tasks: [
          ...state.tasks.filter((t) => t.id !== action.payload.id),
          action.payload,
        ],
      };
    case "MODAL": {
      return {
        ...state,
        modal: action.payload,
      };
    }

    default:
      console.log("Nothing done");
      return state;
  }
};

export default reducer;
