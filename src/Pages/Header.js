import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import '../css/Header.css';
import logo from '../logo.jpeg';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import '../css/userdetails.css';
import userimg from '../images/userimage.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Header=({loginDetails,loginEmail,number,onNumberChange})=>{
    console.log(loginDetails+" "+loginEmail);
    const handleInputChange = (e) => {
        onNumberChange(e.target.value);
    }
    const [clickStatus,setClickStatus]=useState(false);
    const handleButtonClick=()=>{

        setClickStatus(!clickStatus);
    }
    const displayFunction=(e)=>{
        e.preventDefault();
        handleButtonClick();
        handleShow();
        console.log("inside display");
    }
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  {/*var { isLoaded, fullName, email } = this.state;
  const LoginEmail = this.props.loginEmail

  var fullname = '';
        if (loginDetails && loginDetails.fullname) {
            if (loginDetails.fullname.length > 6) {
                fullname = loginDetails.fullname.substring(0, 8) + '...';
                email = LoginEmail.email
            }
            else {
                fullname = loginDetails.fullname;
                email = LoginEmail.email
            }
        }*/}
    return(
        <div>
            <div className="header1">
                <div className="header__first">
                    <img src={logo} alt="logo" />
                </div>
                <div className="headericondiv">
                    <div className="header__second" id="result">
                        <button className="headerdrop" type="button" onClick={handleButtonClick}>
                            <AccountCircleIcon className="ICONhead" fontSize="large" color="white" />
                        </button>
                        {(()=>{
                            if(clickStatus){
                                console.log("inside dropdown");
                                return(
                                    <div className="dropdownMenu">
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                            
                                            <li><Link onClick={displayFunction} data-toggle="modal" data-target="#exampleModal">User Details</Link></li>
                                            
                                            <li><a href="/">Logout</a></li>
                                        </ul>
                                    </div>
                                )
                            }
                            if(show){
                                return(
                                    <Modal show={show} onHide={handleClose} className="details">
                <Modal.Header className="headerUser">
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="usercontainer1">
                        <img src={userimg} className="userimage" alt="user" />
                        <div className="namediv">{loginDetails}</div>
                        <div className="emaildiv">{loginEmail}</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="buttonClose">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
                                )
                            }
                        })()}
                    </div>
                    <div className="header__second1">
                        {loginDetails &&
                            <span className="header__secondOne">{loginDetails}
                            </span>
                        }
                            
                    </div>
                    
                </div>  
                <div className="header__third">
                    <Badge onChange={handleInputChange} badgeContent={number} color="secondary" showZero>
                        
                        <ShoppingCartIcon fontSize="large" htmlColor="white" />
                    </Badge>
                </div>          
            </div>
            
            
        </div>
    )
}
export default Header