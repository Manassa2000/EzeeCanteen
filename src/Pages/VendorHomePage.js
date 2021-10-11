import React from 'react';
import '../css/VendorHomePage.css';
import VendorHeader from './VendorHeader';
import { Link } from 'react-router-dom';
function VendorHomePage(props){
    console.log(props.location.state);
    var fullname=props.location.state.fullName;
    return(
        <div>
            <VendorHeader name={fullname}/>
            <div className="home">
                <div><button className="menu">Update Menu</button></div>
                <div>
                    <Link to={{
                        pathname:"/OrderDash",
                        state:{fullname}
                    }}>
                        <button className="order">Order Dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default VendorHomePage