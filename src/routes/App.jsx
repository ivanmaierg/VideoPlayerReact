import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import RegisterForm from '../components/Credentials/RegisterForm';
import Error from '../components/Error';
import Home from '../containers/Home';
import Layout from '../containers/Layout';
import Login from '../containers/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/register' component={RegisterForm} />
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
          <Route component={Error} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
