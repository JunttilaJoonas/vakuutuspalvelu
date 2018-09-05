import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';
import FrontPage from './components/page_index';
import UserInfoPage from './components/page_showuserinfo';
import AddInsurance from './components/page_addinsurance';
import AddMessage from './components/page_addmessage';
import AddProfile from './components/page.addprofile';
import AddInvoice from './components/page_addinvoice';
import Chat from './components/chat.js'
import UpdateProfile from './components/page_updateprofile';
import Register from './components/auth/page_register';
import Login from './components/auth/page_login';
import Navigation from './components/page_navigation';
import store from './store';


// Check for auth token
if (localStorage.jwtToken) {

    // Set auth token header
    setAuthToken(localStorage.jwtToken);

    // Decode auth token and get user info
    const decoded = jwt_decode(localStorage.jwtToken);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    var chatBot = <Chat/>

}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {chatBot}
                <Navigation/>
                <Switch>
                    <Route exact path="/customer/:id" component={UserInfoPage}/>
                    <Route exact path="/" component={FrontPage}/>
                    <Route exact path="/addinsurance" component={AddInsurance}/>
                    <Route exact path="/createmessage" component={AddMessage}/>
                    <Route exact path="/createprofile" component={AddProfile}/>
                    <Route exact path="/addinvoice" component={AddInvoice}/>
                    <Route exact path="/chat" component={Chat}/>
                    <Route exact path="/customer/:id/update" component={UpdateProfile}/>
                    <Route path="/rekisteröidy" component={Register}/>
                    <Route path="/kirjaudu" component={Login}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container-fluid'));
