import React from 'react'
import character from '../../assets/Characters/character_single.png'
import '../../App.css'
import styled from "styled-components";

import Register from "./Register";
import Login from "./Login";


const EntryDiv = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;    
    height:90vh;

  
`;


const Entry = () => {


    return (
        <EntryDiv>
            <Register/>
            <br/>
            <br/>
            <Login/>
            <img src={character} alt='character'/>
        </EntryDiv>
    )

}


export default Entry;
