import React from "react";
import "./App.css";
import {Route} from "react-router-dom";
import Login from "./views/auth_view/Login";
import Game from "./views/Game/Game";
import TheMap from './views/Map/TheMap'

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={props => <Login {...props} />} />
      <Route exact path="/game" component={Game} />
      <Route exact path='/game/map' render={props => <TheMap {...props} />} />
    </div>
  );
}

export default App;
