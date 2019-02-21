import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getPosts, addPosts} from "../../actions/postActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import "./chatStyles.css";

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: "",
            update: 0
            
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.props.getPosts(); 
    }

    onSubmit(e){
        e.preventDefault();
        
        let data = {
            post: this.state.post
        }
        this.props.addPosts(data); 
        
        this.state.post = "";
        
        
    }

    onChange(e) {
        
        this.setState({[e.target.name]: e.target.value});
    
    }

    scrollToBottom = () => {
        this.el.scrollIntoView();
    }
      
    componentDidMount() {
        this.props.getPosts(); 
        this.scrollToBottom();
        
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }


    render() {
        let listPosts; 
        let postArray; 

        if(this.props.posts.posts.posts){
            postArray = this.props.posts.posts.posts.map(post => (
                <p className = "text-light">{post.body}</p>
            )

            )
            listPosts = (
                <div>{postArray}</div>
            )
        }

        return (
        <div>
            
            <form  onSubmit = {this.onSubmit}>
                                    
                <TextAreaFieldGroup
                    placeholder = "post"
                    name = "post"
                    value = {this.state.post}
                    onChange = {this.onChange}
                    
                    info = "post"
                    autoComplete = "off"
                    
                />

                <input type = "submit" value= "Submit" className = "btn btn-info btn-block mt-2"/>
            </form>   

            <div className = "container postBlock mt-2" >
                <div className = "col" >
                    {listPosts}
                    <div className = "text-light" ref={(el) => { this.el = el; }}></div>
                </div>

                   
            </div>
                             
        </div>
        )
    }
}


Chat.propTypes = {
    posts: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    addPosts: PropTypes.func
}

const mapStateToProps = state => ({
    posts: state.posts
    
});

export default connect(mapStateToProps, {getPosts, addPosts})(withRouter(Chat))