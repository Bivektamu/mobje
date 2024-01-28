const reducer = (state, action) => {
  let task = {},
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
    case "ADD":
      newState = {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
      upDateLocalStore(newState);
      return newState;

      case "ADD_LIST":
        newState = {
          ...state,
          shoppingList: [...state.shoppingList, action.payload],
        };
        upDateLocalStore(newState);
        return newState;

    case "TASK_DONE":
      task = state.tasks.filter((t) => t.id === action.payload)[0];
      task.status = "done";

      newState = {
        ...state,
        tasks: [...state.tasks.filter((t) => t.id !== action.payload), task],
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
      return newState

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
