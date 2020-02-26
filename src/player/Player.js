import React, {useLayoutEffect, useRef} from "react";
import character from "../assets/Characters/character.png";
import {connect} from "react-redux";
import handleMovement from "../player/movement";
import "../index.css";

const Player = props => {
    // Handles player walking animation
    const playerRef = useRef();

    useLayoutEffect(() => {
        playerRef.current.classList.add("walk");

        return () => {
            setTimeout(() => {
                playerRef.current.classList.remove("walk");
            }, 400);
        };
    }, [props.position]);

    useLayoutEffect(() => {
        // prevents player from marching in place at game start
        playerRef.current.classList.remove("walk");
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                top: props.position[1],
                left: props.position[0],
                width: "40px",
                height: "60px",
                overflow: "hidden",
                marginLeft: "10px"
            }}
        >
            <img
                ref={playerRef}
                className={`character_sprite pixelate ${props.spriteLocation}`}
                src={character}
                alt="character"
            />
        </div>
    );
};

const mapStateToProps = state => ({
    ...state.player
});

export default connect(mapStateToProps)(handleMovement(Player));
