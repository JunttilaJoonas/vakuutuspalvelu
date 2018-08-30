import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import store from './store';
import FrontPage from './components/page_index';
import InsurancePage from './components/page_insurances';
import MyInsurances from './components/page_myinsurances';
import CountInsurances from './components/page_countinsurances';
import Navigation from './components/page_navigation';
import Register from './components/auth/register';
import Login from './components/auth/login';
import reducers from './reducers';


// Check for auth token
if(localStorage.jwtToken) {

  // Set auth token header
  setAuthToken(localStorage.jwtToken);

  // Decode auth token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
    <div>
      <Navigation />
      <Switch>
        <Route path="/kirjaudu" component={Login} />
        <Route path="/rekisteroidy" component={Register} />
        <Route path="/laskevakuutus" component={CountInsurances} />
        <Route path="/omavakuutus" component={MyInsurances} />
        <Route path="/vakuutukset" component={InsurancePage} />
        <Route path="/" component={FrontPage} />
      </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
