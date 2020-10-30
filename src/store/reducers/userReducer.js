const initialState = {
  user: "",
  pass: "",
  authenticated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user
      };
    case "AUTHENTICATE_APPROVE": {
      return {
        ...state,
        user: action.user,
        pass: action.pass,
        authenticated: true
      };
    }
    case "LOGOUT":
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;
