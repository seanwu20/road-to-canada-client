import React, {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {updateUserState} from "../../redux/actions";
import {withRouter} from 'react-router-dom'

const Register = (props) => {


    const [newUserCreds, setNewUserCreds] = useState({
        "username": "",
        "password1": "",
        "password2": ""
    })


    const [registerErrors, setRegisterErrors] = useState([])

    const onChangeHandler = (e, type) => {
        let userCopy = {...newUserCreds}
        userCopy[e.target.name] = e.target.value
        setNewUserCreds(userCopy)


    }
    const onSubmitHandler = async e => {
        e.preventDefault()
        try {
            const registerKey = await axios.post(process.env.REACT_APP_SERVER + '/api/register/', newUserCreds)
            localStorage.setItem("key", registerKey.data.key)
            try {
                let user = await axios.get(process.env.REACT_APP_SERVER + '/api/user/', {
                    headers: {
                        Authorization: `Token ${registerKey.data.key}`
                    }
                })
                localStorage.setItem("pk", user.data.pk)
                try {
                    let userData = await axios.post(`${process.env.REACT_APP_SERVER}/api/userdata/`, {id: user.data.pk}, {
                        headers: {
                            Authorization: `Token ${registerKey.data.key}`
                        }
                    })
                    userData.data['username'] = user.data.username
                    props.updateUserState(userData.data)
                    console.log("User successfully created")
                    props.history.push('/game')


                } catch (e) {
                    console.log(e.response)
                    setRegisterErrors(["We had problems getting your user set up"])

                }
            } catch (e) {
                console.log(e.response)
                setRegisterErrors(["We had problems getting your user"])
            }
        } catch (e) {
            let errCollection = []
            for(let key in e.response.data){
                for(let err of e.response.data[key]) {
                    errCollection.push(err)
                }
            }
            setRegisterErrors(errCollection)
        }
    }

    return (
        <>
            Register Here
            <br/>
            <br/>
            <form onSubmit={onSubmitHandler} style={{width: '35%'}}>
                Username: <br/><input type='text' name='username' onChange={onChangeHandler} required/>
                <br/>
                <br/>
                Password: <br/><input type='password' name='password1' onChange={onChangeHandler} required/>
                <br/>
                <br/>
                Enter Password Again: <br/><input type='password' name='password2' onChange={onChangeHandler} required/>
                <br/>
                <br/>
                <input type='submit' value='Register'/>
            </form>

            <div>
                {registerErrors.map(err => {
                    return <div>{err}</div>
                })}
            </div>
        </>
    )
}


export default withRouter(connect(null, {updateUserState})(Register));

