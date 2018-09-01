import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';
import FrontPage from './components/page_index';
import UserInfoPage from './components/page_showuserinfo';
import AddInsurance from './components/page_addinsurance';
import AddMessage from './components/page_addmessage';
import AddProfile from './components/page.addprofile';
import UpdateProfile from './components/page_updateprofile';
import Register from './components/auth/page_register';
import Login from './components/auth/page_login';
import reducers from './reducers';
import Navigation from './components/page_navigation';
import promise from 'redux-promise';
import store from './store';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
     <BrowserRouter>
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/customer/:id" component={UserInfoPage} />
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/addinsurance" component= {AddInsurance}/>
        <Route exact path="/createmessage" component= {AddMessage}/>
        <Route exact path="/createprofile" component ={AddProfile} />
        <Route exact path="/customer/:id/update" component={UpdateProfile} />
        <Route path="/rekisteröidy" component={Register} />
        <Route path="/kirjaudu" component={Login} />
      </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
