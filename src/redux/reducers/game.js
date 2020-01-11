import {SET_NEWGAME} from "../actions/types.js";

const initialState = {
  isNewGame: true
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWGAME:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default game;
