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
import {CREATE_PLAYER, CREATE_PLAYER_FAILURE, CREATE_PLAYER_SUCCESS, UPDATE_USER} from "../actions/types";

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
    food_available: null,
    water_available: null,
    location_2: '--',
    food_available_2: null,
    water_available_2: null,

    city: "--",
    state: "--",
    left: "--",
    right: "--",
    prev: '--'
};

const player = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {...state, ...action.payload}


        case GET_TOKEN:
            console.log("GETTING TOKEN")
            return state
        case GET_TOKEN_SUCCESS:
            console.log("TOKENS IN LOCAL STORAGE");
            return state
        case GET_TOKEN_FAILURE:
            console.log("TOKEN FAILURE")
            console.log(action.payload)
            return state


        case CREATE_PLAYER:
            console.log("CREATING PLAYER")
            return state
        case CREATE_PLAYER_SUCCESS:
            console.log('CREATE PLAYER SUCCESSFUL')
            let stateCopy = {...state}
            for (let key in action.payload) {
                stateCopy[key] = action.payload[key]
            }
            return stateCopy
        case CREATE_PLAYER_FAILURE:
            console.log("CREATE PLAYER FAILURE")
            console.log(action.payload)
            return state


        case GET_PLAYER:
            console.log("GETTING PLAYER")
            return state
        case GET_PLAYER_SUCCESS:
            console.log(action.payload)
            let stateCop = {...state}
            for (let key in action.payload) {
                stateCop[key] = action.payload[key]
            }
            // console.log(stateCop)
            return stateCop
        case GET_PLAYER_FAILURE:
            console.log("GET PLAYER FAILURE")
            console.log(action.payload)
            return state;


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
