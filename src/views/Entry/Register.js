import React, {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {createPlayer} from "../../redux/actions";
import {withRouter} from 'react-router-dom'

const Register = (props) => {


    const [newUserCreds, setNewUserCreds] = useState({
        "username": "",
        "email": "",
        "password1": "",
        "password2": ""
    })


    const [registerErrors, setRegisterErrors] = useState([])

    const onChangeHandler = (e, type) => {
        let userCopy = {...newUserCreds}
        userCopy[e.target.name] = e.target.value
        setNewUserCreds(userCopy)


    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        //register a user
        //set pk in local storage
        //Create a player instance for them and update global state
        //push to game

        axios.post(process.env.REACT_APP_SERVER + '/api/register/', newUserCreds)
            .then(res => {
                localStorage.setItem("pk", res.data.user.pk)

                // props.getToken(newUserCreds)
                props.createPlayer(res.data.user.pk, res.data.user.username)
                props.history.push('/game')
            })
            .catch(error => {
                console.log(error.response)
                if (error.response.config.url === process.env.REACT_APP_SERVER + '/api/register/' && error.response.status === 400) {
                    let errs = []
                    for (let key in error.response.data) {
                        for (let err of error.response.data[key]) {
                            errs.push(err)
                        }
                    }
                    setRegisterErrors(errs)
                }
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
                {registerErrors.length !== 0 ? 'PLEASE FIX YOUR INPUT' : null}
                {registerErrors.map(err => {
                    return <div>{err}</div>
                })}
            </div>
        </>
    )
}


export default withRouter(connect(null, {createPlayer})(Register));

