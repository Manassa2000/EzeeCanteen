import React from 'react'
import Header from './Header';
import userimg from '../images/userimage.png'
import '../css/userdetails.css';
import Axios from 'axios';



const userDetails = (props) => {
    console.log("dcvev")
    console.log(props.history.location.state)
    const full = props.history.location.state.fullName
    const email = props.history.location.state.email
    return (
        <div> <Header />

            <div className="usercontainer1">

                <img src={userimg} className="userimage" alt="user" />
                <div className="namediv">{full}</div>
                <div className="emaildiv">{email}</div>
            </div>


        </div>
    )

}
export default userDetails;