import { sortLists } from "../utils";
import {
  ADD_TASK,
  TASK_COMPLETE,
  DELETE_TASK,
  DRAG_AND_DROP,
  EDIT_TASK,
  ADD_SHOPPING_LIST,
  EDIT_SHOPPING_LIST,
} from "./types";

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
      list = { ...list, tasks: list.tasks.map((task) => ({ ...task })) };
      list.tasks = [...list.tasks, action.payload.formData];
      list = [list, ...state.taskList.filter((t) => t.slug !== list.slug)];
      list = sortLists(list);

      newState = {
        ...state,
        taskList: list,
      };

      upDateLocalStore(newState);
      return newState;

    case TASK_COMPLETE:
      const { id, stage } = action.payload;
      newState = {
        ...state,
        taskList: state.taskList.map((list) => ({
          ...list,
          tasks: list.tasks.map((task) => ({
            ...task,
          })),
        })),
      };
      list = newState.taskList.filter((l) => l.slug === stage)[0];
      task = list.tasks.filter((t) => t.id === id)[0];
      task.stage = "complete";
      list.tasks = [...list.tasks.filter((t) => t.id !== id)];
      list = newState.taskList.filter((l) => l.slug === "complete")[0];
      list.tasks = [...list.tasks, task];

      upDateLocalStore(newState);
      return newState;

    case ADD_SHOPPING_LIST:
      newState = {
        ...state,
        shoppingList: [...state.shoppingList, action.payload],
      };
      upDateLocalStore(newState);
      return newState;

    case EDIT_SHOPPING_LIST:

      newState = {
        ...state,
        shoppingList: [...state.shoppingList.filter(l=>l.slug!==action.payload.slug), action.payload],
      };
      upDateLocalStore(newState);
      return newState;

    case EDIT_TASK:
      console.log(action.payload);

      list = [
        ...state.taskList.map((l) => ({
          ...l,
          tasks: l.tasks.map((t) =>
            t.id === action.payload.id ? action.payload : t
          ),
        })),
      ];
      newState = {
        ...state,
        taskList: [...list],
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

    case DELETE_TASK:
      console.log(action.payload);
      list = state.taskList.map((l) => ({
        ...l,
        tasks: l.tasks.map((t) => ({ ...t })),
      }));
      list = list.map((l) => ({
        ...l,
        tasks: l.tasks.filter((t) => t.id !== action.payload),
      }));
      newState = {
        ...state,
        taskList: [...list],
      };
      upDateLocalStore(newState);
      return newState;

    case DRAG_AND_DROP:
      const { newTask, newList } = action.payload;
      console.log(newTask, newList);
      newState = {
        ...state,
        taskList: [
          ...state.taskList.map((l) => ({
            ...l,
            tasks:
              l.slug === newList
                ? [...l.tasks, newTask]
                : [...l.tasks.filter((t) => t.id !== newTask.id)],
          })),
        ],
      };
      console.log(newState);
      upDateLocalStore(newState);
      return newState;
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
