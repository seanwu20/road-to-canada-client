import React from "react";
import styled from "styled-components";
import axiosWithAuth from "../../components/axiosWithAuth";

const IntroTextStyles = styled.div`
  position: absolute;
  padding: 16px 24px;
  background: rgba(3, 3, 3, 0.9);
  border: 3px solid #888;
  p {
    line-height: 1.8;
    margin-bottom: 60px;
  }
  button {
    float: right;
  }
`;

const IntroText = props => {
    const resetGame = () => {
        let data = {
            user_id: props.player.user_id,
            user_food: 10,
            user_water: 10,
            new_city: "Miami",
        }
        axiosWithAuth.put(`${process.env.REACT_APP_SERVER}/api/userinfo/${props.player.user_id}/`, data)
            .then(res => {
                props.updatePlayer(res.data)

            })
            .catch(err => console.log(err.response))
    }


    if (props.dead) {
        return (
            <IntroTextStyles>
                <h3>GAME OVER</h3>
                <p>
                    You Died
                </p>
                <button onClick={() => resetGame()}>RESET GAME</button>
            </IntroTextStyles>
        );
    }
    return (
        <IntroTextStyles>
            <h3>Intro</h3>
            <p>
                Welcome to Miami
            </p>
            <button onClick={() => props.setNewGame(false)}>OK</button>
        </IntroTextStyles>
    );
};


export default IntroText
