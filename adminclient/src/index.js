import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FrontPage from './components/page_index';
import UserInfoPage from './components/page_showuserinfo';
import AddInsurance from './components/page_addinsurance';
import reducers from './reducers';
import Navigation from './components/page_navigation';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
     <BrowserRouter>
    <div>
      <Navigation />
      <Switch>
        <Route exact path="customer/:id" component={UserInfoPage} />
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/apina" component= {AddInsurance}/>
      </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
