import React from "react";
import {connect} from "react-redux";

const Stats = ({player}) => {
    return (
        <div className="stats">
            <h3>Stats</h3>
            <div className="stat">
                <span className="stat__title" role='img'>🧑</span> Name:{" "}
                {player.email.substring(0, player.email.lastIndexOf("@"))}
            </div>
            <div className="stat">
                <span className="stat__title" role='img'>📍</span> Location:{" "}
                {`${player.city}, ${player.state}`}
            </div>
            <div className="stat">
                <span className="stat__title" role='img'>🍞</span> Food: {" "}
                {player.food}
            </div>
            <div className="stat">
                <span className="stat__title" role='img'>🥛 Water:</span> {player.water}: {" "}
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
