import React from 'react';

class User extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
               <h4>User Details:</h4>
               <div>
                <h3>{this.props.name}</h3>
                <p>Location: {this.props.location}</p>
               </div>
                </div>
        )
    }
}

export default User