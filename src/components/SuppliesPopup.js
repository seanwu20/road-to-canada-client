import React from "react";
import styled from "styled-components";

const Popup = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(3, 3, 3, 0.85);
  border: 3px solid #888;
  padding: 16px;

`;

function SuppliesPopup({location, food, water}) {
    return (
        <Popup>
            <h3 className='stat'>{location} - You found:</h3>
            <p><span style={{color: "#39ff14 "}}>{food}</span> food</p>
            <p><span style={{color: "#39ff14 "}}>{water}</span> water</p>
        </Popup>
    );
}

export default SuppliesPopup;
