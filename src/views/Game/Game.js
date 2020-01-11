import React, {useEffect} from "react";
import {tiles} from "../../data/maps/1";
import {store} from "../../store";
import {connect} from "react-redux";
import {getPlayer} from "../../redux/actions";

import Player from "./../../player/Player";
import Map from "./Map";
import Stats from "./Stats";
import Controls from "./Controls";
import Popup from "../../components/Popup";
import IntroText from "./IntroText";
import Menu from './Menu'


const Game = props => {
  useEffect(() => {
    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles
      }
    });
  }, []);

  useEffect(() => {
    props.getPlayer();
    // props.getPlayer(props.player.email);
  }, []);

  console.log(props.player.topOfMap);
  // console.log(props.game.isNewGame);
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "1260px",
          height: "600px",
          margin: "20px auto"
        }}
      >
        {props.game.isNewGame && props.player.city === "Miami" ? (
          <IntroText />
        ) : null}
        {props.player.water <= 0 || props.player.food <= 0 ? <IntroText dead /> : null}
        
        <Map />
        <Player />
        {props.player.topOfMap ? <Popup /> : null}
      </div>
      <div className="game_container">
        <Stats />
        <Controls />
        <Menu history={props.history} />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, {getPlayer})(Game);
