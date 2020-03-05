import axios from "axios";
import axiosWithAuth from './../../components/axiosWithAuth'


import {
    UPDATE_USER,

    GET_PLAYER,
    GET_PLAYER_SUCCESS,
    GET_PLAYER_FAILURE,

    PICKUP_SUPPLIES,

    NEXT_DESTINATION,
    NEXT_DESTINATION_SUCCESS,
    NEXT_DESTINATION_FAIL
} from "./types";


//register, get token,
// put token in local storage, initialize new player

export const updateUserState = (userObj) => {
    return {type: UPDATE_USER, payload: userObj}
}


/* Player actions */
export const getPlayer = (pk) => dispatch => {
    dispatch({type: GET_PLAYER});
    axiosWithAuth.get(
        `${process.env.REACT_APP_SERVER}/api/userdata/${pk}/`,
    )
        .then(res => dispatch({type: GET_PLAYER_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: GET_PLAYER_FAILURE, payload: err.response}));
}


export const pickUpSupplies = (food, water) => dispatch => {
    console.log(`PICKED UP ${food} food, ${water} water`);
    dispatch({type: PICKUP_SUPPLIES, payload: {food, water}});
};

export const moveToNextDestination = (currentPlayerState) => {
    //   e.preventDefault();
    console.log("NEXT_DESTINATION:", currentPlayerState);
    const nextCity = axios.put(
        `${process.env.REACT_APP_SERVER}/api/userdata/${localStorage.getItem('pk')}/`,
        {...currentPlayerState},
        {
            headers: {
                Authorization: `Token ${localStorage.getItem('key')}`
            }
        }
    )
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
