import React from "react";
import "../styles/App.css";
import Header from "./Header";
import { Switch, Route, Redirect } from "react-router-dom";
import PostList from "../views/PostList";
import CreateLink from "../views/CreateLink";
import Login from "../views/Login";
import Search from "../views/Search";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/new/1" />} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/top" component={PostList} />
          <Route exact path="/new/:page" component={PostList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
