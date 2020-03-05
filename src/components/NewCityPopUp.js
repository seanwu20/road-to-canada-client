import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {moveToNextDestination} from "../redux/actions";

const PopupStyles = styled.div`
  font-size: 14px;
  padding: 16px 12px;
  position: absolute;
  bottom: 160px;
  left: 400px;
  height: 240px;
  background: rgba(3, 3, 3, 0.85);
  border: 3px solid #888;

  p {
    margin-bottom: 24px;
  }
`;

const DestinationButton = styled.button`
  margin: 12px 0 24px;
   height: 40px;
   background-color: #6f1eff;
   color: white;
   padding: 8px 16px;
   border-radius: 4px;
`;


const NewCityPopUp = ({player, moveToNextDestination}) => {

    const onClickMoveDes = (city) => {
        moveToNextDestination({
            user_food: player.user_food - 5,
            user_water: player.user_water - 5,
            city
        })
    }

    return (
        <PopupStyles>
            <p>Choose your next destination:</p>
            {player.left ?
                <DestinationButton onClick={() => {onClickMoveDes(player.left)}}>{player.left}</DestinationButton>
                : null}


            <br/>

            {player.right ?
                <DestinationButton onClick={() => onClickMoveDes(player.right)}>{player.right}</DestinationButton>
                : null}
            <p style={{color: "red"}}>Walk down to stay here.</p>
        </PopupStyles>
    );
};

const mapStateToProps = state => {
    return {
        player: state.player
    };
};

export default connect(mapStateToProps, {moveToNextDestination})(NewCityPopUp);
