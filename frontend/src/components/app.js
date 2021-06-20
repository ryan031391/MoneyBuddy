import React from "react";
import { Route, Switch } from "react-router";
import LoginFormContainer from "./session/login_form_container"
import SignupFormContainer from "./session/signup_form_container";
import {Home} from './home/home'
import NavContainer from './nav_bar/nav_bar_container'
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import ReportContainer from "./report/report_container";
import IconsContainer from './icon/icon_container';
import TransactionFormContainer from "./transaction/transaction_form_container";
import TransactionContainer from "./transaction/transactions_container";
import CategoryContainer from "./category/category_form_container"
const App = () => (
  <div>
      <Route
        render={({ location }) =>
          ["/signup", "/login", "/"].includes(location.pathname) ? null : (
              <NavContainer />

          )
        }
      />


      <Switch>
        <Route exact path="/" component={Home}></Route>
        <ProtectedRoute
          exact
          path="/report"
          component={ReportContainer}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/transactions"
          component={TransactionContainer}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/create_transaction"
          component={TransactionFormContainer}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/icon"
          component={IconsContainer}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/categories"
          component={CategoryContainer}
        ></ProtectedRoute>

        <AuthRoute
          exact
          path="/login"
          component={LoginFormContainer}
        ></AuthRoute>
        <AuthRoute
          exact
          path="/signup"
          component={SignupFormContainer}
        ></AuthRoute>
      </Switch>
  </div>
);


export default App;