
import React from 'react';
import './App.css';
import MainLayout from './component/menu/menu';
import Login from './screen/Login'
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import {store} from '../src/store/index';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <MainLayout></MainLayout>
      
      </Switch>

    </Router>
    </Provider>
  );
}

export default App;
