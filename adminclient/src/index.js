import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FrontPage from './components/page_index';
import reducers from './reducers';
import Navigation from './components/page_navigation';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
     <BrowserRouter>
    <div>
      <Navigation />
      <Switch>
        <Route path="/" component={FrontPage} />
      </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
