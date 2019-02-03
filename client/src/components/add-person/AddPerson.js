import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter, Link} from "react-router-dom";
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {createProfile, getInterests} from "../../actions/profileActions";
import Interests from "./Interests";
import{getTree,test} from "../../actions/treeactions";
import {addNode} from "../../actions/nodeActions";
import "./AddPersonStyles.css";



class AddPerson extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            name: "",
            sex: "male",
            age: "",
            
            city: "",
            state: "",
            interests: [],
            bio: "",
            errors: {},
            derr: ""
        }
        
        //this.props.addNode("Books", "Conceptual");
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }
    
    componentDidMount(){
        this.props.test();
    }

    componentWillReceiveProps(nextProps){
        this.setState({ derr: this.derr });
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    onSubmit(e){
        e.preventDefault();

        
        //console.log(this.props.interests, "interests here");
        const profileData = {
            name: this.state.name,
            sex: this.state.sex,
            age: this.state.age,
            city: this.state.city,
            state: this.state.state, 
           
            interests: this.state.interests,
            bio: this.state.bio
        }
        console.log(profileData.interests);
        this.props.createProfile(profileData, this.props.history);
        //this.props.history.push("/profile/" + this.props.profile.profile.people.length);
    }
    
    getDataFromChild = (dataFromChild) => {
        //this method culminates all the interest hiearchy
        //and then it puts it in to one hiearchy to be saved

        //it checks the current state hierachy, compares it with the new addition
        //then combines them 

        //test prints
        // console.log(dataFromChild);
        // console.log(this.state.interests[0]);
        /*
        //check if state hiearchy is empty, if so, take the request and set as the interest state
        if(this.state.interests[0] === undefined){
            this.state.interests.push(dataFromChild);
        }else{
            //if the interest state is not empty, 
            //we can assume that the root node is "interests"
            //@this.state.interests[0] = "Interests"
            //we can also assume that there is at least one second level

            
            //we then need to check if same second level node(if already exists), so no duplicates
            //so have to iterate through second level nodes in state hierarchy
            const found1 = false; 
            const searchedAllChildren1 = false; 
            const i1 = 1; 
            while(!found1 && searchedAllChildren1){
                if(dataFromChild[1][0] === this.state.interests[0][i1][0]){
                    found1 = true; 
                }
                if((i1 != (this.state.interests[0].length-1))&&(!found1)){
                    i1 = i1 + 1; 
                }else{
                    searchedAllChildren1 = true; 
                }

            }
            //same second level
            if(found1){
                //if they are the same, we need to check 3rd level node and so on
                //this method may need to be recursive eventually based on how big the tree gets
                //but for I may just hard code several layers in

                //check 3rd layer same
                const found2 = false; 
                const searchedAllChildren2 = false; 
                const i2 = 1; 
                while(!found2 && searchedAllChildren2){
                    if(dataFromChild[1][1][0] === this.state.interests[0][i1][i2]){
                        found2 = true; 
                    }
                    if((i2 != (this.state.interests[0][i1].length-1))&&(!found2)){
                        i2 = i2 + 1; 
                    }else{
                        searchedAllChildren2 = true; 
                    }
    
                }
                if(found2){

                }else{
                    this.state.interests[0][i1].push(dataFromChild[1][1]);
                }
            

                
            }else{//not same second level
                this.state.interests[0].push(dataFromChild[1]);
            }
        }
        */
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
            console.log(this.state.interests, "after mergeTree");
        }
        
    }

    getUpdateFromChild = () => {
        this.props.test();
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
        const {errors} = this.state; 
        
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

       

        return (
            <div className = "add-person">
                <div className = "container">
                    <Link to = {"/profile/" + this.props.auth.id} className = 'btn btn-info'>Back</Link>
                    <div className = "row">
                        
                        <div className = "col-md-8 m-auto">
                            <h1 className = "display-4 text-center text-light">Add Person</h1>
                            <p className = "lead text-center text-light">
                                enter info
                            </p>
                            <small className = "d-block pb-3 text-light">* = required fields</small>

                            <form  onSubmit = {this.onSubmit}>
                               
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
                                    className = "selector"
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
                                
                                
                                
                                
                                {/* <TextAreaFieldGroup 
                                    placeholder = "bio"
                                    name = "bio"
                                    value = {this.state.bio}
                                    onChange = {this.onChange}
                                    error = {errors.bio}
                                    info = "bio"
                                /> */}

                               
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
                            
                            <h1 className = "display-4 text-center text-light">Interests</h1>
                            
                            <Interests updateParent = {this.getUpdateFromChild} sendDataToParent = {this.getDataFromChild} tree2 = {tree.tree} />
                             
                            <div className = "container">
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

AddPerson.propTypes = {
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

export default connect(mapStateToProps, {createProfile, addNode, test, getInterests})(withRouter(AddPerson));