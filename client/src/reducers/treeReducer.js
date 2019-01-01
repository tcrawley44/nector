import {GET_TREE,GET_TEST} from '../actions/types';


const initialState = {
    tree: ""
}

export default function( state = initialState, action) {
    switch(action.type) {
        case GET_TREE: 
            return{
                ...state,
                tree: action.payload
            }
        
        case GET_TEST:
            return{
                ...state,
                tree: action.payload 
            }
        default: 
            return state;
       
    }
}