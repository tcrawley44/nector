import {GET_NODE, IS_UPDATED} from '../actions/types';


const initialState = {
    node: null,
    isUpdated: false
}

export default function( state = initialState, action) {
    switch(action.type) {
        case GET_NODE: 
            return{
                ...state,
                node: action.payload
            }
        case IS_UPDATED:
            return{
                ...state,
                isUpdated: true
            }
        
        default: 
            return state;
       
    }
}