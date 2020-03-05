import React from "react";
import "./App.css";
import {Route, Redirect} from "react-router-dom";
import Entry from "./views/Entry/Entry";
import Game from "./views/Game/Game";
import WorldMap from './views/WorldMap/WorldMap'
import {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {getPlayer, setLoggedIn} from "./redux/actions";
import {withRouter} from 'react-router-dom'


function App(props) {
    useEffect(() => {
        const keyToken = localStorage.getItem("key")
        const pk = localStorage.getItem("pk")
        if (keyToken !== null && pk !== null) {
            props.getPlayer(pk)

        }
    }, [])

    return (
        <div className="App">

            <Route exact path="/" render={props => {
                const keyToken = localStorage.getItem("key")
                const pk = localStorage.getItem("pk")
                if (keyToken !== null && pk !== null) return <Redirect to='/game'/>
                else return <Entry {...props}/>
            }}/>
            <Route exact path="/game" render={props => {
                const keyToken = localStorage.getItem("key")
                const pk = localStorage.getItem("pk")
                if (keyToken !== null && pk !== null) return <Game {...props}/>
                else return <Redirect to='/'/>
            }}/>
            <Route exact path="/game/map" render={props => {
                const keyToken = localStorage.getItem("key")
                const pk = localStorage.getItem("pk")
                if (keyToken !== null && pk !== null) return <WorldMap {...props}/>
                else return <Redirect to='/'/>
            }}/>
        </div>
    );
}


export default withRouter(connect(null, {getPlayer})(App));
