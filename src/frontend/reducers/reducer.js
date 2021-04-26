import types from '../types/types';

const reducer = (state, action) => {
  switch (action.type) {
    case types.setFavorites:
      return {
        ...state,
        myList: [...state.myList, action.payload],
      };
    case types.deleteFavorites:
      return {
        ...state,
        myList: state.myList.filter((item) => item.id !== action.payload),
      };
    case types.loginRequest:
      return {
        ...state,
        user: action.payload,
      };
    case types.logoutRequest:
      return {
        ...state,
        user: {},
      };
    case types.getVideoSource:
      return {
        ...state,
        playing: state.trends.find((item) => item.id === Number(action.payload)) || state.original.find((item) => item.id === Number(action)) || [],
      };
    default:
      state;
      return state;
  }
};
export default reducer;
