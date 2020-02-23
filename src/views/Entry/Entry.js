import React, {useState} from 'react'
import character from '../../assets/Characters/character_single.png'
import '../../App.css'
import styled from "styled-components";


import {connect} from "react-redux";
import {getToken, createPlayer} from "../../redux/actions";
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


            <Login/>


        </EntryDiv>
    )

}


export default Entry;
