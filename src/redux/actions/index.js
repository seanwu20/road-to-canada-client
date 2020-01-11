import axios from "axios";
import {
  GET_PLAYER,
  GET_PLAYER_SUCCESS,
  GET_PLAYER_FAILURE,
  SET_NEWGAME,
  PICKUP_SUPPLIES,
  NEXT_DESTINATION,
  NEXT_DESTINATION_SUCCESS,
  NEXT_DESTINATION_FAIL
} from "./types";

/* Player actions */
export const getPlayer = () => {
  const player = axios.post(
    "https://we-cant-name-things.herokuapp.com/api/player/",
    {email: localStorage.getItem("game_email")}
  );
  return function(dispatch) {
    dispatch({type: GET_PLAYER});
    player
      .then(res => dispatch({type: GET_PLAYER_SUCCESS, payload: res.data}))
      .catch(err => dispatch({type: GET_PLAYER_FAILURE, payload: err}));
  };
  //   return {type: GET_PLAYER, payload: "CHARACTER_NAME"};
};


export const pickUpSupplies = (food, water) => dispatch => {
  console.log(`PICKED UP ${food} food, ${water} water`);
  //   return function(dispatch) {
  //     dispatch({
  //       type: PICKUP_SUPPLIES,
  //       payload: {food, water}
  //     });
  //   };
  dispatch({type: PICKUP_SUPPLIES, payload: {food, water}});
};

export const moveToNextDestination = (e, currentPlayerState) => {
  //   e.preventDefault();
  console.log("NEXT_DESTINATION:", currentPlayerState);
  const nextCity = axios.put(
    "https://we-cant-name-things.herokuapp.com/api/move/",
    {...currentPlayerState}
  );
  return function(dispatch) {
    dispatch({type: NEXT_DESTINATION});
    nextCity
      .then(res => {
        console.log(res);
        return dispatch({type: NEXT_DESTINATION_SUCCESS, payload: res.data});
      })
      .catch(err => dispatch({type: NEXT_DESTINATION_FAIL, payload: err}));
  };
};
