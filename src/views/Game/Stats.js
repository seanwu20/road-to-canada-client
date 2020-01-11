import React from "react";
import {connect} from "react-redux";

const Stats = ({player}) => {
    // console.log(player.email);
    return (
        <div className="stats">
            <h3>Stats</h3>
            <div className="stat">
                <span className="stat__title">🧑 Name:</span>{" "}
                {player.email.substring(0, player.email.lastIndexOf("@"))}
            </div>
            <div className="stat">
                <span className="stat__title">📍 Location:</span>{" "}
                {`${player.city}, ${player.state}`}
            </div>
            <div className="stat">
                <span className="stat__title">🍞 Food: </span>
                {player.food}
            </div>
            <div className="stat">
                <span className="stat__title">🥛 Water:</span> {player.water}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(Stats);
