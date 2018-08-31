import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FrontPage from './components/page_index';
import UserInfoPage from './components/page_showuserinfo';
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
        <Route path="/:id" component={UserInfoPage} />
        <Route path="/" component={FrontPage} />
      </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
