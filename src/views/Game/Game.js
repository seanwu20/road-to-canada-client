import React, {useEffect, useState} from "react";
import {tiles} from "../../data/maps/1";
import {store} from "../../store";
import {connect} from "react-redux";

import Player from "./../../player/Player";
import Map from "./Map";
import Stats from "./Stats";
import Controls from "./Controls";
import Popup from "../../components/NewCityPopUp";
import IntroText from "./IntroText";
import Menu from './Menu'

import {updateUserState} from './../../redux/actions/index'


import styled from "styled-components";

const Screen = styled.div`
    position: relative;
    width: 1260px;
    height: 600px;
    margin: 20px auto;
`;
const Game = (props) => {

    useEffect(() => {

        store.dispatch({
            type: "ADD_TILES",
            payload: {
                tiles
            }
        });

    }, []);

    const [newGame, setNewGame] = useState(true)

    return (
        <>
            <Screen>
                {newGame && props.player.city === "Miami" ? (
                    <IntroText newGame={newGame} setNewGame={setNewGame}/>
                ) : null}
                {props.player.user_water <= 0 || props.player.user_food <= 0 ?
                    <IntroText dead={true} player={props.player} updateUser={updateUserState}/> : null}

                <Map/>
                <Player/>
                {props.player.topOfMap ? <Popup/> : null}
            </Screen>
            <div className="game_container">
                <Stats/>
                <Controls/>
                <Menu history={props.history}/>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        ...state
    };
};

export default connect(mapStateToProps, {updateUserState})(Game);
