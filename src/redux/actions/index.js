import axios from "axios";
import axiosWithAuth from './../../components/axiosWithAuth'


import {
    CREATE_PLAYER,
    CREATE_PLAYER_SUCCESS,
    CREATE_PLAYER_FAILURE,

    UPDATE_USER,


    GET_PLAYER,
    GET_PLAYER_SUCCESS,
    GET_PLAYER_FAILURE,
    PICKUP_SUPPLIES,
    NEXT_DESTINATION,
    NEXT_DESTINATION_SUCCESS,
    NEXT_DESTINATION_FAIL, GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_FAILURE
} from "./types";
import player from "../reducers/player";


//register, get token,
// put token in local storage, initialize new player

export const updateUserState = (userObj) => {
    return dispatch => {
        dispatch({type: UPDATE_USER, payload: userObj})
    }
}


export const createPlayer = (user_id, username) => {
    let data = {
        user_id,
        username,
        user_food: 10,
        user_water: 10,
        state: "Florida",
        city: "Miami",
        location: "fast_food",
        food_available: 2,
        water_available: 2,
        location_2: "hotel",
        water_available_2: 2,
        food_available_2: 2,
        left: "Jacksonville",
        right: "Tallahassee"
    }
    const newPlayer = axiosWithAuth.post(`${process.env.REACT_APP_SERVER}/api/userinfo/`, data);

    return function (dispatch) {
        dispatch({type: CREATE_PLAYER});
        newPlayer.then(res => {
            dispatch({type: CREATE_PLAYER_SUCCESS, payload: data});

        })
            .catch(err => dispatch({type: CREATE_PLAYER_FAILURE, payload: err}));
    };
}


/* Player actions */
export const getPlayer = (pk) => dispatch => {
    dispatch({type: GET_PLAYER});
    axiosWithAuth.get(
        `${process.env.REACT_APP_SERVER}/api/userinfo/${pk}/`,
    )
        .then(res => dispatch({type: GET_PLAYER_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: GET_PLAYER_FAILURE, payload: err}));
}


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

export const moveToNextDestination = (currentPlayerState) => {
    //   e.preventDefault();
    console.log("NEXT_DESTINATION:", currentPlayerState);
    const nextCity = axios.put(
        `${process.env.REACT_APP_SERVER}/api/move/`,
        {...currentPlayerState}
    );
    return function (dispatch) {
        dispatch({type: NEXT_DESTINATION});
        nextCity
            .then(res => {
                console.log(res);
                return dispatch({type: NEXT_DESTINATION_SUCCESS, payload: res.data});
            })
            .catch(err => dispatch({type: NEXT_DESTINATION_FAIL, payload: err}));
    };
};
