import React, {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {getPlayer, getToken} from "../../redux/actions";
import {withRouter} from 'react-router-dom'


const Login = (props) => {

    const [errs, setErr] = useState([])


    const [userCreds, setUserCreds] = useState({
        username: "",
        email: "",
        password: "",
    })


    const onChangeHandler = (e, type) => {
        let userCopy = {...userCreds}
        userCopy[e.target.name] = e.target.value
        setUserCreds(userCopy)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        //register here, pass user data for token
        axios.post(process.env.REACT_APP_SERVER + '/api/login/', userCreds)
            .then(res => {
                props.getToken(userCreds)
                props.getPlayer(res.data.user.pk)
                props.history.push('/game')
            })
            .catch(error => {
                console.log(error.reponse)
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
            Login Here
            <form onSubmit={onSubmitHandler}>
                Username: <input type='text' name='username' onChange={onChangeHandler} required/>
                <br/>
                Email: <input type='email' name='email' onChange={onChangeHandler} required/>
                <br/>
                Password: <input type='password' name='password' onChange={onChangeHandler} required/>
                <br/>
                <br/>
                <br/>
                <input type='submit' value='Login'/>
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


export default withRouter(connect(null, {getToken, getPlayer})(Login));
