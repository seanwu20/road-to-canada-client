import {
    MOVE_PLAYER,
    GET_PLAYER,
    GET_PLAYER_SUCCESS,
    GET_PLAYER_FAILURE,
    PICKUP_SUPPLIES,
    NEXT_DESTINATION,
    NEXT_DESTINATION_SUCCESS,
    NEXT_DESTINATION_FAIL,
    GET_TOKEN,
    GET_TOKEN_FAILURE,
    GET_TOKEN_SUCCESS
} from "../actions/types.js";
import {CREATE_PLAYER, CREATE_PLAYER_FAILURE, CREATE_PLAYER_SUCCESS} from "../actions/types";

const initialState = {
    position: [600, 540],
    spriteLocation: "move_north",
    direction: "NORTH",
    topOfMap: false,
    isFetching: false,
    error: null,
    user_food: '--',
    user_water: '--',
    location: '--',
    food_available: null,
    water_available: null,
    location_2: '--',
    food_available_2: null,
    water_available_2: null,
    city: "--",
    state: "--",
    left: "--",
    right: "--"
};

const player = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOKEN:
            console.log("GETTING TOKEN")
            return state

        case GET_TOKEN_SUCCESS:
            console.log("TOKENS IN LOCAL STORAGE");
            return state
        case GET_TOKEN_FAILURE:
            console.log(action.payload)
            return state

        case CREATE_PLAYER:
            console.log("CREATING PLAYER")
            return state
        case CREATE_PLAYER_SUCCESS:
            let stateCopy = {...state}
            for (let key in action.payload) {
                stateCopy[key] = action.payload[key]
            }
            console.log(stateCopy)
            return stateCopy

        case CREATE_PLAYER_FAILURE:
            console.log()
            return stateCopy


        case MOVE_PLAYER:
            return {
                ...state,
                ...action.payload
            };

        case GET_PLAYER_SUCCESS:
            return {...state, ...action.payload};
        case GET_PLAYER_FAILURE:
            return {...state, error: action.payload};
        case PICKUP_SUPPLIES:
            const {food, water} = action.payload;
            return {...state, food: state.food + food, water: state.water + water};
        case NEXT_DESTINATION:
            return {...state, isFetching: true, topOfMap: false};
        case NEXT_DESTINATION_SUCCESS:
            console.log("NEXT_DESTINATION_SUCCESS");
            return {...state, ...action.payload, position: [600, 540]};
        case NEXT_DESTINATION_FAIL:
            return {...state, error: action.payload};
        default:
            return state;
    }
};

export default player;
