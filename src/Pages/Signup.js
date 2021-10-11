import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../css/Signup.css';
import Axios from "axios";
import '../css/Login.css';
import Logo from '../logo.jpeg';



class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            password: '',
            usertype: '',
            visibleval: false
        };
    }

    state = {
        isPasswordShown: false
    };

    togglePasswordVisiblity = () => {
        const { isPasswordShown } = this.state;
        this.setState({ isPasswordShown: !isPasswordShown });
    };

    signup = (props) => {

        Axios.post('http://localhost:3001/api/insert',

            {
                fullname: this.state.fullname,
                email: this.state.email,
                password: this.state.password,
                usertype: this.state.usertype
            }).then((response) => {
                console.log(response)
                if (response.data.message) {
                    console.log(this.state.visibleval);
                    alert(response.data.message);
                }
                else {
                    

                    if (this.state.usertype === 'Personal') {
                        this.props.history.push({
                            pathname: '/BrowseFood',
                            state: {
                                email: this.state.email,
                                fullName: this.state.fullname
                            }
                        });
                        this.setState({ visibleval: 1 })
                        console.log(this.state.visibleval);
                    }
                    else if (this.state.usertype === 'Business') {
                        const fullName = response.data.data[0].fullname;
                        this.props.history.push({
                            pathname:'/HomePage',
                            state:{
                                email: this.state.email,
                                fullName: fullName
                            }

                        });
                    }
                }

            }).catch((err) => {
                console.log('Sign up error -' + err)
            });



    }
    render = () => {
        const { isPasswordShown } = this.state;

        return (
            <div className="SignUpContainer" >
                <div>
                    <img src={Logo} className="Logo" alt="logo" />
                </div>
                <div className="VerticalLine"></div>
                <div className="Container">
                    <form>

                        <h3>Sign Up</h3>
                        <div className="radioBox">
                            <div>
                                <input type="radio" id="Personal" name="Business" value="Personal" className="radioselect" onChange={(e) => this.setState({ usertype: e.target.value })} />
                                <label htmlFor="Personal">Personal</label></div>
                            <div>
                                <input type="radio" id="Business" name="Business" value="Business" className="radioselect" onChange={(e) => this.setState({ usertype: e.target.value })} />
                                <label htmlFor="Business">Business(Food Partner)</label></div>
                        </div>
                        <div className="form-group">
                            <label>Full name</label>
                            <input type="text" className="form-control" placeholder="Full name" required id='fullname'
                                onInput={(e) => this.setState({ fullname: e.target.value })}
                            />
                        </div>
                        <br></br>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" pattern="[a-z@.]{10-100}" required
                                onInput={(e) => this.setState({ email: e.target.value })} />
                        </div>
                        <br></br>

                        <div className="form-group">
                            <label>Set Password</label>
                            <input type={isPasswordShown ? "text" : "password"} className="form-control" placeholder="Enter password" required
                                onInput={(e) => this.setState({ password: e.target.value })} />
                            <input type="checkbox" onClick={this.togglePasswordVisiblity} /> Show Password
                        </div>
                        <br></br>
                        <Link to={{pathname:this.state.visibleval ? '/BrowseFood' : '/Signup',
                        state:this.state}} className="LoginLink" onClick={this.signup} >
                            <button type="submit" className="btn btn-primary btn-block" id="SignUpButton" >

                                SIGN UP
                            </button>
                        </Link>
                        <p className="forgot-password text-right">
                            Already registered
                            <Link to='./' className="forgot-password text-right"> sign in?</Link>

                        </p>
                    </form>
                </div>
            </div>
        );
    }
}




export default Signup;