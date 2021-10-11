import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import '../css/VendorHeader.css';
import logo from '../logo.jpeg';


const VendorHeader=({name})=>{
    console.log(name);
    return(
        <div>
            <div className="header2">
                <div className="header2__first">
                    <img src={logo} alt="logo" />
                </div>
                <div className="header2__second">
                    <AccountCircleIcon fontSize="large"/>
                    <span className="header2__secondOne">{name}</span>
                </div>
            </div>
        </div>
    );
}
    
    

export default VendorHeader