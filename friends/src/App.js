import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// components
import Login from './components/Login';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <div>
      <h1>Auth Friends</h1>
      <p><Link to='friendslist'>See Friends List</Link></p>
      <p><Link to='/login'>Click here to login</Link></p>
      <Route exact path="/">
        <h2>Please Login!</h2>
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <PrivateRoute exact path='/friendslist' component={FriendsList} />
    </div>
  );
}

export default App;
