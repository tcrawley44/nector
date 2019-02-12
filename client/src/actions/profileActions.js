
import axios from "axios";
import {SET_CURRENT_USER_ID, GET_ID, GET_MATCHES, GET_PROFILE, GET_NETWORK, GET_GROUPS, PROFILE_LOADING, GET_ERRORS, GET_PROFILES, ADD_INTEREST, GET_INTERESTS, GET_RESULTS, SET_CURRENT_USER, IS_UPDATED} from './types';
import { NativeError } from "mongoose";

// get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profiles')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
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

// get network
export const getNetwork = () => dispatch => {
    
    axios.get('/api/profiles/network')
        .then(res => 
            dispatch({
                type: GET_NETWORK,
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


// get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profiles/handle/${handle}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: null
            })  
        )
}

//create profile
export const createProfile = (profileData, history) => dispatch => {
    console.log("is this working");
    axios
        .post("/api/profiles/txt",profileData)
        .then(res =>  history.push("/profile/"+ res.data))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
}

export const addFriendGroup = (current) => dispatch => {
    
    axios
        .post("/api/profiles/addFriendGroup", current)
        .then(res =>  console.log("derr"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
}

export const getFriendGroups = (current) => dispatch => {
    
    axios
        .post("/api/profiles/getFriendGroups", current)
        .then(res =>  
            dispatch({
                type: GET_GROUPS,
                payload: res.data
            })    )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
}

export const updateProfile = (data,history) => dispatch => {
    
    axios
        .post("/api/profiles/update",data)
        .then(res => 
            
            history.push("/profile/" + res.data)
            
        )
        
            
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
}

export const searchPeople = (data) => dispatch => {
    axios
        .post("/api/profiles/search", data)
        .then(res =>
            dispatch({
                type: GET_MATCHES,
                payload: res.data

            })  
        )
        .catch(err => 
            dispatch({
                type: GET_RESULTS,
                payload: null
            })  
        )
}

//return id
export const searchByName = (data) => dispatch => {
    axios
        .post("/api/profiles/searchByName", data)
        .then(res =>
            dispatch({
                type: GET_ID,
                payload: res.data
            })      
        )
        .catch(err => 
            dispatch({
                type: GET_RESULTS,
                payload: null
            })  
        )
}

export const addInterest = (interests) => dispatch => {
    
    dispatch({
        type: ADD_INTEREST,
        payload: {interests}
    })
}

export const getInterests = () => dispatch => {
    dispatch({
        type: GET_INTERESTS
        
    })
}

//profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//add experience
export const addExperience = (expData,history) => dispatch => {
    axios   
        .post('/api/profiles/experience',expData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })

        );
        
};

//get all profiles
export const getProfiles = () => dispatch => {
    axios   
    .get('/api/profiles/all')
    .then(res => 
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })    
    )
    
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: 1
        })

    );
        
        
};

export const deleteQuery = (profileData) => dispatch => {
    axios 
    .post("/api/profiles/deleteQuery", profileData)
    .then(res => 
        dispatch({
            type: IS_UPDATED,
            payload: 1
        })    
    )
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

//old getprofiles from mongo
/* dispatch(setProfileLoading());
axios   
    .get('/api/profiles/all')
    .then(res => 
        dispatch({
            type: GET_PROFILES,
            payload: res.data
            
        }),
        
    )
    
    .catch(err =>
        dispatch({
            type: GET_PROFILES,
            payload: null
        })

    ); */