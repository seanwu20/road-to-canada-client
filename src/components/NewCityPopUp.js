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


const NewCityPopUp = props => {
    const onClickMoveDes = () => {
        props.moveToNextDestination({
            email: props.player.email,
            food: props.player.food - 5,
            water: props.player.water - 5,
            new_city: props.player.left
        })
    }

    return (
        <PopupStyles>
            <p>Choose your next destination:</p>
            {props.player.left ?
                <DestinationButton onClick={onClickMoveDes}>{props.player.left}</DestinationButton> : null}


            <br/>

            {props.player.right ?
                <DestinationButton onClick={onClickMoveDes}>{props.player.right}</DestinationButton> : null}
            <p style={{color: "red"}}>Walk down to stay here.</p>
        </PopupStyles>
    );
};

const mapStateToProps = state => {
    return {
        ...state
    };
};

export default connect(mapStateToProps, {moveToNextDestination})(NewCityPopUp);
