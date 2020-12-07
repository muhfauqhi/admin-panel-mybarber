import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import 'antd/dist/antd.css';
import ResetPassword from './components/ResetPassword';
import Barber from './components/Barber';
import User from './components/User';
import Service from './components/Service';
import BarberDetails from './components/menu/Barbers/Barber.Details';
import BarberAdd from './components/menu/Barbers/Barber.Add';
import UserAdd from './components/menu/Users/User.Add';
import ServiceAdd from './components/menu/Services/Service.Add';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/dashboard' component={Dashboard}></Route>
        <Route exact path='/barber' component={Barber}></Route>
        <Route exact path='/barber/:id' component={BarberDetails}></Route>
        <Route exact path='/user' component={User}></Route>
        <Route exact path='/service' component={Service}></Route>
        <Route exact path='/forgotpassword' component={ForgotPassword}></Route>
        <Route exact path='/addbarber' component={BarberAdd}></Route>
        <Route exact path='/adduser' component={UserAdd}></Route>
        <Route exact path='/addservice' component={ServiceAdd}></Route>
        <Route
          exact
          path='/resetpassword/:token'
          component={ResetPassword}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
