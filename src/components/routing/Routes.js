import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import AddWorkDay from '../form/AddWorkDay';
import EditWorkDay from '../form/EditWorkDay';

const Routes = () => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/add-workday" component={AddWorkDay} />
        <PrivateRoute exact path="/edit-workday" component={EditWorkDay} />
      </Switch>
    </section>
  );
};
export default Routes;
