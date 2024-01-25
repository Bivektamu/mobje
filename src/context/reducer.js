const reducer = (state, action) => {
  let task = {}, tasksStorage = {}, tasksInString= ''
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "TASK_DONE":
      task = state.tasks.filter(t=>t.id === action.payload)[0]
      task.status = 'done'
      return {
        ...state,
        tasks: [...state.tasks.filter(t=>t.id!==action.payload), task],
      };

    case "EDIT":
        return {
          ...state,
          tasks: [...state.tasks.filter(t=>t.id!==action.payload.id), action.payload],
        };

    case "GET":
      if (localStorage.getItem("tasks")) {
        tasksStorage = JSON.parse(localStorage.getItem("tasks"));
        return {
          ...state,
          tasks: [...tasksStorage],
        };
      }
      return {
        ...state,
        tasks: [],
      };
      case 'SET':
        tasksInString= (state.tasks).length > 0 ? JSON.stringify(state.tasks) : ''
        localStorage.setItem('tasks', tasksInString)
         return state

    case "DELETE":
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.payload)],
      };

      case 'DND':
        return {
          ...state, 
          tasks: [...state.tasks.filter(t=>t.id !== action.payload.id), action.payload]
        }

    default:
      console.log("Nothing done");
      return state;
  }
};

export default reducer;
