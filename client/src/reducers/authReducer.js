
import {SET_CURRENT_USER, GET_USER_ID} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    id: "",
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER: 
            //console.log(action.payload);
            return {
                ...state,
                
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case GET_USER_ID:
            return{
                ...state,
                id: action.payload
            }
        default: 
            return state; 
    }

}