import React from "react";
import "./App.css";
import {Route} from "react-router-dom";
import Register from "./views/Entry/Entry";
import Game from "./views/Game/Game";
import WorldMap from './views/WorldMap/WorldMap'

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Register} />
      <Route exact path="/game" component={Game} />
      <Route exact path='/game/map' component={WorldMap} />
    </div>
  );
}

export default App;
