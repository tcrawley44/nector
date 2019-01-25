import {GET_MATCHES, GET_ID, GET_PROFILE, GET_NETWORK, GET_RESULTS, GET_PROFILES, PROFILE_LOADING, ADD_INTEREST, GET_INTERESTS, GET_GROUPS} from '../actions/types';


const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    interests: [],
    groups: "",
    network: [],
    id: "",
    matches: []
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
        case GET_GROUPS:
            return{
                ...state,
                groups: action.payload
            }
        case GET_NETWORK:
            return{
                ...state,
                network: action.payload
            }
        case GET_ID:
            return{
                ...state,
                id: action.payload
            }
        case GET_MATCHES: 
            return{
                ...state,
                matches: action.payload
            }
        default: 
            return state; 
    }
}