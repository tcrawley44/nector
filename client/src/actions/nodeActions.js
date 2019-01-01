import { GET_ERRORS, GET_NODE} from './types';
import axios from 'axios';

export const addNode = (name, parent) => dispatch => {
    axios
        .post('/api/nodes/', {name, parent} )
        .then(res => console.log(res))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getNodes = () => dispatch => {

    axios
        .get("/api/nodes/")
        .then(res =>
            dispatch({
                type: GET_NODE,
                payload: res.data
            }),
            
        )
        .catch(err =>
            dispatch({
                type: GET_NODE,
                payload: null
            })

        );
}