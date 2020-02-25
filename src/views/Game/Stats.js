import React from "react";
import {connect} from "react-redux";

const Stats = ({player}) => {
    console.log(player)
    return (
        <div className="stats">
            <h3>Stats</h3>
            <div className="stat">
                <span className="stat__title" role='img'>🧑</span> Username:{" "}
                {player.username}
            </div>
            <div className="stat">
                <span className="stat__title" role='img'>📍</span> Location:{" "}
                {`${player.city}, ${player.state}`}
            </div>
            <div className="stat">
                <span className="stat__title" role='img'>🍞</span> Food: {" "}
                {player.user_food}
            </div>
            <div className="stat">
                <span className="stat__title" role='img'>🥛 Water:</span> {player.user_water}: {" "}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        player: state.player
    };
};

export default connect(mapStateToProps)(Stats);
