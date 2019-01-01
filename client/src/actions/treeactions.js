import { GET_TREE, GET_TEST} from './types';
import axios from 'axios';



export const getTree = () => dispatch => {

    axios
        .get("/api/tree/")
        .then(res =>
            dispatch({
                type: GET_TREE,
                payload: res.data
            }),
            
        )
        .catch(err =>
            dispatch({
                type: GET_TREE,
                payload: null
            })

        );
}

export const test = () => dispatch => {

    axios
        .get("/api/tree/test")
        .then(res =>
            dispatch({
                type: GET_TREE,
                payload: res.data
            }),
            
        )
        .catch(err =>
            dispatch({
                type: GET_TREE,
                payload: null
            })

        );
            
            

            
                 
                 
            
}

