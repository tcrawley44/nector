
import axios from "axios";
import {GET_POSTS, GET_ERRORS} from './types';
// get current profile
export const addPosts = (post) => dispatch => {
    
    axios.post('/api/posts' , post)
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })  
        )
}


export const getPosts = () => dispatch => {
    
    axios.get('/api/posts')
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })  
        )
}