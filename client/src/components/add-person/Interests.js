import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import "./AddPersonStyles.css";
import TextFieldGroup from "../common/TextFieldGroup";
import {addNode,getNodes} from "../../actions/nodeActions";
import {getTree,test} from "../../actions/treeactions";
import {addInterest, getInterests} from "../../actions/profileActions";


class Interests extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
           
           name: "",
           parentName: "",
           interests: []
           
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //this.props.test();
        
        
    }
        
    componentDidMount(){
        
    }
       
    onSubmit(e){
        e.preventDefault();

        const data = {
            name: this.state.name   
        }
        
            
        //console.log(data.name, this.state.parentName );
        
        this.props.addNode(data.name, this.state.parentName);
        
        let node2 = {name: data.name, children: []}
        this.props.tree2.children.push(node2);
    }

    

    onChange(e) {
        
            this.setState({[e.target.name]: e.target.value});
        
    }

    
    getDataFromChild = (dataFromChild) => {
        //console.log(dataFromChild);
        let passUp = [this.props.tree2.name, dataFromChild]
        this.props.sendDataToParent(passUp);
        this.refs.foob.style = 'background-color: red';
        
        
        
    }
   
    getUpdateFromChild = () => {
        //let node = {name: data, children: []}
        //this.props.tree2.children.push(node);
    }

    render() {
        const { displayChildren} = this.state; 
        
        let children; 
        let listItems;
        
        if(!(this.props.tree2 === "" || undefined)){
            //console.log(this.props.tree2.children);
            listItems = this.props.tree2.children.map((node) =>
                <div key = {node.name}>
                    <InterestPort updateParent = {this.getUpdateFromChild} sendDataToParent = {this.getDataFromChild} key = {node.name} tree2 = {node} />
                </div>
            );
            //console.log(listItems);
        }
        if(displayChildren){
            children = (
                <div className = "nodeContainer">
                {listItems}
                
                    <form  className ="newChild" onSubmit = {this.onSubmit}>
                        <div className = "row derp"> 
                            <input
                    
                                className = "form-control squish form-control-lg" 
                                placeholder="name"
                                name="name"
                                value = {this.state.name}
                                onChange = {this.onChange}
                                autoComplete = "off"
                            />             
                                      
                                
                               
                            <input type = "submit" value= "+" className = "btn btn-info butt"/>
                        </div>
                    </form> 
                </div>
            )
        }else{
            children = (
                
                    <div></div>     
                    
                 
            )
        }
        let buttonName = "test";
         if(!(this.props.tree2 === "")){
            //console.log(this.props.tree2.name);
            buttonName = this.props.tree2.name;
            this.state.parentName = buttonName; 
        }   
        //console.log("hello")
        return (
            <div>
                <div className = "d-flex nodeContainer flex-row ml-2 bd-highlight mb-2">
                                    
                    <button type = "button" id = "foo" ref = "foob" className = "btn btn-info ml-2" onClick ={() => {
                            this.setState(prevState => ({
                                displayChildren: !prevState.displayChildren
                            }))
                        }}>
                        {buttonName}
                        
                    </button> 
                    <button className = "btn .text-secondary btn-info butt2" onClick ={() => {
                            this.refs.foob.style = 'background-color: red';
                            this.props.addInterest(buttonName);
                            this.props.sendDataToParent([buttonName]);
                        }}>
                        >
                    </button>
                </div>
                <div className = "col nodeStack">
                    {children}
                    
                </div>

                
            </div>
        )
    }
}

Interests.propTypes = {
    //getNodes: PropTypes.func.isRequired,
    //node: PropTypes.object.isRequired
    //getTree: PropTypes.func.isRequired,
    //tree: PropTypes.object.isRequired,
    //test: PropTypes.func.isRequired 
    //addNode: PropTypes.func
    //errors: PropTypes.object.isRequired
    addNode: PropTypes.func,
    interests: PropTypes.object,
    node: PropTypes.node,
    tree: PropTypes.object
}

const mapStateToProps = state => ({
    //node: state.node
    //tree: state.tree
    //errors: state.errors
    interests: state.interests,
    node: state.node,
    tree: state.tree
})

const InterestPort = connect(mapStateToProps, {addNode, getNodes, getTree, test, addInterest, getInterests})(withRouter(Interests));
export default InterestPort;