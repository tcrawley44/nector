import {GET_PROFILE, GET_PROFILES, PROFILE_LOADING, ADD_INTEREST, GET_INTERESTS} from '../actions/types';


const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    interests: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PROFILE_LOADING: 
            return{
                ...state,
                loading: true
            }
        case GET_PROFILES:
            return{
                ...state,
                profile: action.payload,
                loading:false
            };
        case GET_PROFILE:
            return{
                ...state,
                profile: action.payload,
                loading: false 
            };
        case ADD_INTEREST: 
            return{
                ...state,
                interests: state.interests.concat(action.payload)
               
            }
        case GET_INTERESTS:
            return{
                ...state, 
                
            }
        default: 
            return state; 
    }
}