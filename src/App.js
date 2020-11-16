import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </div>
  );
}

export default App;
