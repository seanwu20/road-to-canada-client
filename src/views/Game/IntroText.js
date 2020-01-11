import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {isNewGame} from "../../redux/actions";

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
  if (props.dead){
    return (
      <IntroTextStyles>
        <h3>GAME OVER</h3>
        <p>
          You Died
        </p>
        <button onClick={() => props.isNewGame(false)}>OK</button>
      </IntroTextStyles>
    );
  }
  return (
    <IntroTextStyles>
      <h3>Intro</h3>
      <p>
        Welcome to Miami
      </p>
      <button onClick={() => props.isNewGame(false)}>OK</button>
    </IntroTextStyles>
  );
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, {isNewGame})(IntroText);
