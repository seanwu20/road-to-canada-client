import React, {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {updateUserState} from "../../redux/actions";
import {withRouter} from 'react-router-dom'


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
        try {
            const loginData = await axios.post(process.env.REACT_APP_SERVER + '/api/login/', userCreds)
            const pk = loginData.data.user.pk
            localStorage.setItem("pk", pk)
            try {
                let tokenData = await axios.post(process.env.REACT_APP_SERVER + '/api/token/', userCreds)
                localStorage.setItem("access", tokenData.data.access)
                try {
                    let userData = await axios.get(`${process.env.REACT_APP_SERVER}/api/userinfo/${pk}/`, {
                        headers: {
                            Authorization: `Bearer ${tokenData.data.access}`
                        }
                    })
                    props.updateUserState(userData.data)
                    props.history.push('/game')


                } catch (e) {
                    console.log(e)
                    setLoginErr(["We had problems getting your user"])

                }
            } catch (e) {
                console.log("TOKEN ERROR")
            }
        } catch (e) {
            let errs = []
            for (let key in e.response.data) {
                for (let err of e.response.data[key]) {
                    errs.push(err)
                }
            }
            setLoginErr(errs)
        }
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
                {loginErr.map(err => {
                    return <div>{err}</div>
                })}
            </div>
        </>
    )
}


export default withRouter(connect(null, {updateUserState})(Login));
