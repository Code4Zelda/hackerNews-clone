import React from "react";
import "../styles/App.css";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import PostList from "../views/PostList";
import CreateLink from "../views/CreateLink";
import Login from "../views/Login";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
