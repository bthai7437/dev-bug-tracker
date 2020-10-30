const initialState = {
  name: "",
  type: "",
  leader: "",
  team: [],
  front: "",
  back: "",
  data: "",
  issues: []
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROJECT":
      return {
        ...state,
        name: action.payload.name,
        type: action.payload.type,
        leader: action.payload.leader,
        team: action.payload.team,
        front: action.payload.front,
        back: action.payload.back,
        data: action.payload.data,
        issues: action.payload.issues
      };
    case "ADD_ISSUE":
      return {
        ...state,
        issues: action.issues
      };
    case "UPDATE_ISSUE":
      return {
        ...state,
        issues: action.issues
      };
    case "DELETE_ISSUE":
      return { ...state, issues: action.issues };
    case "CLEAR_PROJECT":
      return initialState;
    default:
      return state;
  }
};

export default formReducer;
