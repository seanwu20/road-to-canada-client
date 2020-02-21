import axios from "axios";



import {
    CREATE_PLAYER,
    CREATE_PLAYER_SUCCESS,
    CREATE_PLAYER_FAILURE,


    GET_PLAYER,
    GET_PLAYER_SUCCESS,
    GET_PLAYER_FAILURE,
    PICKUP_SUPPLIES,
    NEXT_DESTINATION,
    NEXT_DESTINATION_SUCCESS,
    NEXT_DESTINATION_FAIL
} from "./types";


//register, get token, put token in local storage, initialize new player

export const createPlayer = (user_auth, user_id) => {
    let newUser = axios.post()

    let data = {
        user_id,
        user_food: 10,
        user_water:10,
        state:"Florida",
        city:"Miami",
        location:"fast_food",
        food_available: 2,
        water_available: 2,
        location2:"hotel",
        food_available2: 2,
        water_available2: 2,
    }
    const newPlayer = axios.post(process.env.REACT_APP_SERVER+'/api/userinfo/', )
}





/* Player actions */
export const getPlayer = () => {
    const player = axios.post(
        `${process.env.REACT_APP_SERVER}/api/player/`,
        {email: localStorage.getItem("game_email")}
    );
    return function (dispatch) {
        dispatch({type: GET_PLAYER});
        player
            .then(res => {
                console.log("test", res.data)
                console.log("test",res.data)
                dispatch({type: GET_PLAYER_SUCCESS, payload: res.data})
            })
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
