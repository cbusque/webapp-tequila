import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Home} />
    </React.Fragment>
  );
}

export default App;
