import React, {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {createPlayer, getToken} from "../../redux/actions";
import {withRouter} from 'react-router-dom'

const Register = (props) => {


    const [newUserCreds, setNewUserCreds] = useState({
        "username": "",
        "email": "",
        "password1": "",
        "password2": ""
    })


    const [errs, setErr] = useState([])

    const onChangeHandler = (e, type) => {
        let userCopy = {...newUserCreds}
        userCopy[e.target.name] = e.target.value
        setNewUserCreds(userCopy)


    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        //register here, pass user data for token
        axios.post(process.env.REACT_APP_SERVER + '/api/register/', newUserCreds)
            .then(res => {
                props.getToken(newUserCreds)
                props.createPlayer(res.data.user.pk, res.data.user.username)
                props.history.push('/game')
            })
            .catch(error => {
                console.log('ERR', typeof error)
                let errs = []
                for (let obj in error.response.data) {
                    for (let err of error.response.data[obj]) {
                        errs.push(err)
                    }
                }
                setErr(errs)
            })
    }

    return (
        <>
            Register Here
            <form onSubmit={onSubmitHandler}>
                Username: <input type='text' name='username' onChange={onChangeHandler} required/>
                <br/>
                Email: <input type='email' name='email' onChange={onChangeHandler} required/>
                <br/>
                Password: <input type='password' name='password1' onChange={onChangeHandler} required/>
                <br/>
                Enter Password Again: <input type='password' name='password2' onChange={onChangeHandler} required/>
                <br/>
                <br/>
                <input type='submit' value='Register'/>
            </form>

            <div>
                {errs.length !== 0 ? 'PLEASE FIX YOUR INPUT' : null}
                {errs.map(err => {
                    return <div>{err}</div>
                })}
            </div>
        </>
    )
}


export default withRouter(connect(null, {getToken, createPlayer})(Register));

