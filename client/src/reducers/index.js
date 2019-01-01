import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer'
import nodeReducer from "./nodeReducer";
import treeReducer from "./treeReducer";
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    node: nodeReducer,
    tree: treeReducer
});