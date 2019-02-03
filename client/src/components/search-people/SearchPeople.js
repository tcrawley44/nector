import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {createProfile, getInterests, searchPeople} from "../../actions/profileActions";
import Interests from "../add-person/Interests";
import{getTree,test} from "../../actions/treeactions";
import {addNode} from "../../actions/nodeActions";
import "./SearchStyles.css";
import {Link} from 'react-router-dom';


class SearchPeople extends Component {

    constructor(props) {
        super(props);
        this.state = {
            queryName: "",
            name: "",
            sex: "",
            age: "",
            
            city: "",
            state: "",
            interests: [],
            bio: "",
            errors: {}
            
        }
        this.props.test();
        //this.props.addNode("Books", "Conceptual");
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }
    
    componentDidMount(){
        
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    onSubmit(e){
        e.preventDefault();

        
        this.setState(prevState => ({
            displayResults: !prevState.displayResults
        }))
        //console.log(this.props.interests, "interests here");
        const profileData = {
            queryName: this.state.queryName,
            name: this.state.name,
            sex: this.state.sex,
            age: this.state.age,
            city: this.state.city,
            state: this.state.state, 
            currentUserId: localStorage.user,
            interests: this.state.interests,
            bio: this.state.bio
        }
        //console.log("what about here");
        this.props.searchPeople(profileData);
    }

    getDataFromChild = (dataFromChild) => {
        const mergeTrees = (parentTree, childTree) => {
            let found = false; 
            let searchedAllChildren = false; 
            let i = 1; 
            let atTheEnd = false; 
            console.log(childTree, parentTree);
            if(childTree[1] === undefined || parentTree[i] === undefined){
                atTheEnd = true; 
                console.log("true");
            }
            while(!found && !searchedAllChildren && !atTheEnd){
                console.log("childtree", childTree[1][0], "parenttree", parentTree[i][0])
                console.log("makes it here?")
                if(childTree[1][0] === parentTree[i][0]){
                    found = true; 
                }
                if((parentTree.length != 1)&&(i != (parentTree.length-1))&&(!found)){
                    i = i + 1; 
                }else{
                    searchedAllChildren = true; 
                }

            }
            console.log("makes it here2?")
            if(found){
                console.log("i",i);
                mergeTrees(parentTree[i],childTree[1]);
            }else{
                
                    parentTree.push(childTree[1]);
                
                
            }
        }
        console.log("child being sent: ", dataFromChild)
        if(this.state.interests[0] === undefined){
            this.state.interests.push(dataFromChild);
        }else{
            mergeTrees(this.state.interests[0],dataFromChild)
            //console.log(this.state.interests, "after mergeTree");
        }
        
    }

    onChange(e) {
        
            this.setState({[e.target.name]: e.target.value});
        
    }

    onSelectChange(e) {
        this.setState({status: e.target.value});
        //console.log(this.status);
        //console.log("derp");
    }

    render() {
        const {errors, displayResults} = this.state; 
        
        const {tree} = this.props; 
        //console.log(tree);
        //console.log("here2");
        //select options for status
        const options = [
            
            {
                label: 'male',
                value: "male"
            },
            
            {label: 'female', value: "female"}
        ];
        let display;
        if(displayResults){
            let results1 = this.props.profile.matches.map(match => (
                             
                <div className = "btn personButton btn-info" >
                    
                    {match}
                    
                </div>
                /* <ProfileItem key = {profile._id} profile = {profile} /> */
            ))
            display = (
                <div className = "add-person">
                    <Link to = {"profile/" + this.props.auth.id} className = "btn btn-info">Back</Link>
                            
                    
                    <div className = "container">
                        <div className = "row">

                            <div className = "col-6">
                                {results1}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            display = (
                <div className = "edit-person">
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-md-8 m-auto">
                                <h1 className = "display-5 text-center text-white">Search People</h1>
                                <p className = "lead text-center text-white">
                                    enter info
                                </p>
                                <small className = "d-block pb-3 text-white">leave blank if irrelevant</small>

                                <form  onSubmit = {this.onSubmit}>
                                
                                    <TextFieldGroup 
                                        placeholder = "query name"
                                        name = "queryName"
                                        value = {this.state.queryName}
                                        onChange = {this.onChange}
                                        error = {errors.name}
                                        info = "queryName"
                                        autoComplete = "off"
                                        
                                    />
                                    <div className = "mt-5"></div>
                                    <TextFieldGroup 
                                        placeholder = "name"
                                        name = "name"
                                        value = {this.state.name}
                                        onChange = {this.onChange}
                                        error = {errors.name}
                                        info = "name"
                                        autoComplete = "off"
                                        
                                    />
                                    <SelectListGroup 
                                        placeholder = "sex"
                                        name = "sex"
                                        value = {this.state.sex}
                                        onChange = {this.onChange}
                                        options = {options}
                                        error = {errors.sex}
                                        info = "sex"
                                    />
                                    <TextFieldGroup 
                                        placeholder = "age"
                                        name = "age"
                                        value = {this.state.age}
                                        onChange = {this.onChange}
                                        error = {errors.age}
                                        info = "age"
                                    />
                                    <TextFieldGroup 
                                        placeholder = "city"
                                        name = "city"
                                        value = {this.state.city}
                                        onChange = {this.onChange}
                                        error = {errors.city}
                                        info = "city"
                                    />
                                    <TextFieldGroup 
                                        placeholder = "state"
                                        name = "state"
                                        value = {this.state.state}
                                        onChange = {this.onChange}
                                        error = {errors.state}
                                        info = "state"
                                    />
                                    
                                    
                                    
                                    
                                    

                                
                                    <input type = "submit" value= "Submit" className = "btn btn-info btn-block mt-4"/>
                                </form>   
                            
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className = "interests">
                        <div className = "row">
                            <div className = "col">
                                <br />
                                
                                <h1 className = "display-5 text-center text-white">Interests</h1>
                                
                                <Interests sendDataToParent = {this.getDataFromChild} tree2 = {tree.tree} />
                                
                                <div className = "container">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )
        }
        
       

        return (
            <div>
                
                {display}
            </div>
            
        )
    }
}

SearchPeople.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    test: PropTypes.func.isRequired,
    tree: PropTypes.object.isRequired,
    interests: PropTypes.object,
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    tree: state.tree,
    interests: state.interests,
    auth: state.auth
});

export default connect(mapStateToProps, {createProfile, addNode, test, getInterests, searchPeople})(withRouter(SearchPeople));