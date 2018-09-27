import React, { Component } from "react";
import { Route, HashRouter, Redirect, Switch } from "react-router-dom";
import Login from "./components/Session/Login/Login";
import Logout from "./components/Session/Logout/Logout";
import Register from "./components/Session/Register/Register";
import Forgot from "./components/Session/Forgot/Forgot";
import Dashboard from "./components/Dashboard/Dashboard";
import InvestmentPlans from "./components/Plans/InvestmentPlans/InvestmentPlans";
import AccountSettings from "./components/Profile/AccountSettings/AccountSettings";
import MyInvoices from "./components/Profile/MyInvoices/MyInvoices";
import MySubscriptions from "./components/Profile/MySubscriptions/MySubscriptions";
import Withdrawal from "./components/Transactions/Withdrawal/Withdrawal";
import Binary from "./components/Tree/Tree";
import History from "./components/Transactions/History/History";
import UserWithoutBot from "./components/UI/ErrorViews/UserWithoutBot";
import UserInactive from "./components/UI/ErrorViews/UserInactive";
import Referrers from './components/Referrers/Referrers'
import Aux from "./hoc/Aux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile/settings" component={AccountSettings} />
          <Route exact path="/profile/invoices" component={MyInvoices} />
          <Route
            exact
            path="/profile/subscriptions"
            component={MySubscriptions}
          />
          <Route exact path="/market/investment" component={InvestmentPlans} />
          <Route exact path="/transactions/withdrawal" component={Withdrawal} />
          <Route exact path="/transactions/history" component={History} />
          <Route exact path="/binary" component={Binary} />
          <Route exact path="/referrers" component={Referrers} />
          <Route exact path="/withoutBot" component={UserWithoutBot} />
          <Route exact path="/inactive" component={UserInactive} />
          <Route component={Login} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
