import {combineReducers} from "redux";
import player from "./player";
import map from "./map";

export const rootReducer = combineReducers({player, map});
