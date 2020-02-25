import React, {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {getPlayer, getToken} from "../../redux/actions";
import {withRouter} from 'react-router-dom'
import axiosWithAuth from "../../components/axiosWithAuth";


const Login = (props) => {

    const [loginErr, setLoginErr] = useState([])


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

    const onSubmitHandler = async e => {
        e.preventDefault()
        const loginData = await axios.post(process.env.REACT_APP_SERVER + '/api/login/', userCreds)
        const pk = loginData.data.user.pk
        localStorage.setItem("pk", pk)
        let tokenData = await axios.post(process.env.REACT_APP_SERVER + '/api/token/', userCreds)
        console.log(tokenData.data.access)
        localStorage.setItem("access", tokenData.data.access)
        let userData = await axiosWithAuth.get(`${process.env.REACT_APP_SERVER}/api/userinfo/${pk}/`)
        console.log(userData.response)
        props.history.push('/')


        // axios.post(process.env.REACT_APP_SERVER + '/api/login/', userCreds)
        //     .then(async res => {
        //
        //         let token  = await props.getToken(userCreds)
        //
        //         let player = await props.getPlayer(res.data.user.pk)
        //         props.history.push('/game')
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         if (error.response.config.url === process.env.REACT_APP_SERVER + '/api/login/' && error.response.status === 400) {
        //             let errs = []
        //             for (let key in error.response.data) {
        //                 for (let err of error.response.data[key]) {
        //                     errs.push(err)
        //                 }
        //             }
        //             setLoginErr(errs)
        //         }
        //     })
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
                {loginErr.length !== 0 ? 'PLEASE FIX YOUR INPUT' : null}
                {loginErr.map(err => {
                    return <div>{err}</div>
                })}
            </div>
        </>
    )
}


export default withRouter(connect(null, {getToken, getPlayer})(Login));
