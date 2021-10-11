import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from '../Pages/Login';
import BrowseFood from '../Pages/BrowseFood';
import SignUp from '../Pages/Signup';
import Payment from '../Pages/Payment';
import VendorHomePage from '../Pages/VendorHomePage';
import OrderDash from '../Pages/OrderDash';
import CompletePayment from "../Pages/completePayment";
import userDetails from "../Pages/Userdetails";
import ForgotPassword from '../Pages/ForgotPassword';
const WebNavigator = (props) => {
    return (
        <div>
            <Router>

                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/BrowseFood" exact component={BrowseFood} />
                    <Route path="/SignUp" exact component={SignUp} />
                    <Route path="/Payment" exact component={Payment} />
                    <Route path="/HomePage" exact component={VendorHomePage} />
                    <Route path="/OrderDash" exact component={OrderDash} />
                    <Route path="/completePayment" exact component={CompletePayment} />
                    <Route path="/UserDetails" exact component={userDetails} />
                    <Route path="/ForgotPassword" exact component={ForgotPassword} />
                </Switch>
            </Router>
        </div>
    );
};
export default WebNavigator;