import React, {useState} from 'react'
import axios from 'axios'
import character from '../../assets/Characters/character_single.png'
import '../../App.css'
import styled from "styled-components";


import {connect} from "react-redux";
import {getToken, createPlayer} from "../../redux/actions";



const Register = (props) => {

    const [userCreds, setUserCreds] = useState({
        "username": "",
        "email": "",
        "password1": "",
        "password2": ""
    })

    const [errs, setErr]  = useState([])

    const onChangeHandler = (e) => {
        let userCopy = {...userCreds}
        userCopy[e.target.name] = e.target.value
        setUserCreds(userCopy)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        //register here, pass user data for token
        axios.post(process.env.REACT_APP_SERVER + '/api/register/', userCreds)
            .then(res => {
                props.getToken(userCreds)
                props.createPlayer(res.data.user.pk)
            })
            .catch(error => {
                let errs = []
                for(let obj in error.response.data) {
                    for(let err of error.response.data[obj]) {
                        errs.push(err)
                    }
                }
                setErr(errs)
            })
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                Username: <input type='text' name='username' onChange={onChangeHandler} required/>
                <br/>
                Email: <input type='email' name='email' onChange={onChangeHandler} required/>
                <br/>
                Password: <input type='password' name='password1' onChange={onChangeHandler} required/>
                <br/>
                Enter Password Again:<input type='password' name='password2' onChange={onChangeHandler} required/>
                <br/>
                <input type='submit'/>

                {errs.map(err => {
                    return <div>{err}</div>
                })}
            </form>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        ...state
    };
};

export default connect(mapStateToProps, {getToken, createPlayer})(Register);
