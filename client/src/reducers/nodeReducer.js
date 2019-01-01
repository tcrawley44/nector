import {GET_NODE} from '../actions/types';


const initialState = {
    node: null
}

export default function( state = initialState, action) {
    switch(action.type) {
        case GET_NODE: 
            return{
                ...state,
                node: action.payload
            }
        
        default: 
            return state;
       
    }
}