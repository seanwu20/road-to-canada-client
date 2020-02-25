import React from "react";
import "./App.css";
import {Route, Redirect} from "react-router-dom";
import Entry from "./views/Entry/Entry";
import Game from "./views/Game/Game";
import WorldMap from './views/WorldMap/WorldMap'
import {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {getPlayer} from "./redux/actions";
import {withRouter} from 'react-router-dom'


function App(props) {
    let [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const access_token = localStorage.getItem("access")
        const pk = localStorage.getItem("pk")
        if (access_token !== null && pk !== null) {
            props.getPlayer(pk)
            setLoggedIn(true)
            props.history.push("/game")
        }
    }, [])

    return (
        <div className="App">

            <Route exact path="/" component={Entry}/>
            {loggedIn ? <Route exact path="/game" component={Game}/> : <Redirect to={'/'}/>}
            {loggedIn ? <Route exact path="/game/map" component={Map}/> : <Redirect to={'/'}/>}

            < Route exact path='/game/map' component={WorldMap}/>
        </div>
    );
}

export default withRouter(connect(null, {getPlayer})(App));
