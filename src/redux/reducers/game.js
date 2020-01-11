import {SET_NEWGAME} from "../actions/types.js";

const intialState = {
  isNewGame: true
};

const game = (state = intialState, action) => {
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
