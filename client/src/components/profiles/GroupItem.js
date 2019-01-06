import React, { Component } from 'react'

class GroupItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
           
        
        }
        
        
        
    }

    render() {
        const {displayFriends} = this.state;

        let groupItems; 
        let friends; 
        let button = (
            <div className = "btn personButton btn-info" onClick ={() => {
                this.setState(prevState => ({
                    displayFriends: !prevState.displayFriends
                    
                }))
                
                
                }}> 
                
                {this.props.item.name}
                
            </div>
        )
        groupItems = this.props.item.friends.map(groupItem => (
            <div>           
                <div className = "btn  ml-4 personButton btn-info" onClick ={() => {
                    
                    
                    
                    }}> 
                    
                    {groupItem.name}
                    
                </div>

                
            </div>   
            /* <ProfileItem key = {profile._id} profile = {profile} /> */
        ))
        console.log(displayFriends);
        if(displayFriends){
            friends = groupItems;
        }else{
            friends = (<div></div>);
        }
            
        
        
        return (
            <div>
                {button}
                {friends}
            </div>
        )
    }
}

export default GroupItem;