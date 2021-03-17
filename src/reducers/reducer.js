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

    default:
      state;
      return state;
  }
};
export default reducer;
