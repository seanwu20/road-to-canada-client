import {
    MOVE_PLAYER,

    GET_PLAYER,
    GET_PLAYER_SUCCESS,
    GET_PLAYER_FAILURE,

    PICKUP_SUPPLIES,

    NEXT_DESTINATION,
    NEXT_DESTINATION_SUCCESS,
    NEXT_DESTINATION_FAIL,
    UPDATE_USER
} from "../actions/types.js";

const initialState = {
    username: "--",
    user_id: "--",

    position: [600, 540],
    spriteLocation: "move_north",
    direction: "NORTH",
    topOfMap: false,
    isFetching: false,
    error: null,

    user_food: '--',
    user_water: '--',
    location: '--',
    food_available_1: null,
    water_available_1: null,
    location_2: '--',
    food_available_2: null,
    water_available_2: null,

    city: "--",
    state: "--",
    left: "--",
    right: "--",
    prev: '--',

};

const player = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {...state, ...action.payload}


        case GET_PLAYER:
            console.log("GETTING PLAYER")
            return state
        case GET_PLAYER_SUCCESS:
            console.log(action.payload)
            return {...state, ...action.payload}
        case GET_PLAYER_FAILURE:
            console.log("GET PLAYER FAILURE")
            console.log(action.payload)
            return state;


        case PICKUP_SUPPLIES:
            const {food, water} = action.payload;
            return {...state, user_food: state.user_food + food, user_water: state.user_water + water};

        case NEXT_DESTINATION:
            return {...state, isFetching: true, topOfMap: false};
        case NEXT_DESTINATION_SUCCESS:
            console.log("NEXT_DESTINATION_SUCCESS");
            return {...state, ...action.payload, position: [600, 540]};
        case NEXT_DESTINATION_FAIL:
            return {...state, error: action.payload};

        case MOVE_PLAYER:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default player;
