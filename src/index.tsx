import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store/store";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserDetail from './UserDetail';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
      <Switch>
          <Route path="/user/:id">
            <UserDetail />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);
