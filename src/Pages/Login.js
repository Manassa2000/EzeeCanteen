import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../css/Login.css';
import Axios from "axios";
import EzeeCanteenLogo from '../logo.jpeg';

class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            visible: 0

        };


    }

    loginfunction = (props) => {

        Axios.post('http://localhost:3001/login',
            {
                email: this.state.email,
                password: this.state.password
            }).then((response) => {

                
                if (response.data.message) {

                    alert(response.data.message);
                    console.log(this.state.visible);
                }
                else {
                    if (response.data.data[0].usertype === 'Personal') {
                        const fullName = response.data.data[0].fullname;
                        this.props.history.push({
                            pathname: '/BrowseFood',
                            state: {
                                email: this.state.email,
                                fullName: fullName
                            }
                        });

                        this.setState({ visible: 1 })
                        console.log(this.state.visible);
                    }
                    else if (response.data.data[0].usertype === 'Business') {
                        const fullName = response.data.data[0].fullname;
                        this.props.history.push({
                            pathname:'/HomePage',
                            state:{
                                email: this.state.email,
                                fullName: fullName
                            }

                        });
                        this.setState({ visible: -2 })
                        console.log(this.state.visible);
                    }
                }

            })

    }





    render = () => {
        return (
            <div className="LoginContainer">

                <div>
                    <img src={EzeeCanteenLogo} className="Logo" alt="logo" />
                </div>
                <div className="VerticalLine"></div>
                <div className="InputContainer">
                    <form id="login-form" >
                        <div className="LoginInput">

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>


                            <input className="LoginInputBox" id="username" type="text" name="email" placeholder="Email" required="true"
                                onChange={(e) => this.setState({ email: e.target.value })} /><br />

                        </div>
                        <div className="LoginInput">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                            </svg>
                            <input className="LoginInputBox" id="password" type="password" name="password" placeholder="Password" required="true"
                                onChange={(e) => this.setState({ password: e.target.value })} /><br />
                        </div>
                        <Link to={{
                            pathname:this.state.visible > 0 ? '/BrowseFood' : '/',
                            state:this.state
                            }} className="LoginLink" onClick={this.loginfunction}>
                            <button type="submit" className="btn btn-primary btn-lg btn-block" id="Submit" >
                                SIGN IN
                            </button>
                        </Link>
                        <div className="SignUpTag">Not a member?
                            <Link to='./Signup' className="LoginLink" > Sign up now</Link>
                            <Link to='./ForgotPassword' className="PasswordLink">Forgot Password?</Link>
                        </div>

                    </form>

                </div>
            </div>
        );

    }
}
export default Login;