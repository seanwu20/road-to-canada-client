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
            const loginKey = await axios.post(process.env.REACT_APP_SERVER + '/api/login/', userCreds)
            localStorage.setItem("key", loginKey.data.key)
            try {
                let user = await axios.get(process.env.REACT_APP_SERVER + '/api/user/', {
                    headers: {
                        Authorization: `Token ${loginKey.data.key}`
                    }
                })
                localStorage.setItem("pk", user.data.pk)
                try {
                    let userData = await axios.get(`${process.env.REACT_APP_SERVER}/api/userdata/${user.data.pk}/`, {
                        headers: {
                            Authorization: `Token ${loginKey.data.key}`
                        }
                    })
                    props.updateUserState(userData.data)
                    console.log("User successfully retrieved")
                    props.history.push('/game')


                } catch (e) {
                    console.log(e.response)
                    setLoginErr(["We had problems getting your user data"])

                }
            } catch (e) {
                console.log(e.response)
                setLoginErr(["We had problems getting your user info"])
            }
        } catch (e) {
            let errCollection = []
            for (let key in e.response.data) {
                for (let err of e.response.data[key]) {
                    errCollection.push(err)
                }
            }
            setLoginErr(errCollection)
        }
    }

    return (
        <>

            Login Here
            <br/>
            <br/>
            <form onSubmit={onSubmitHandler} style={{width: '35%'}}>
                Username: <br/> <input type='text' name='username' onChange={onChangeHandler} required/>
                <br/>
                <br/>
                Password: <br/><input type='password' name='password' onChange={onChangeHandler} required/>
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
