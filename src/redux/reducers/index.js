import {combineReducers} from "redux";
import player from "./player";
import map from "./map";
import game from "./game";

export const rootReducer = combineReducers({
  player,
  map,
  game
});
