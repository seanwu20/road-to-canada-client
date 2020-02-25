import React, {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {updateUserState} from "../../redux/actions";
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
    const onSubmitHandler = async e => {
        e.preventDefault()
        try {
            const registerData = await axios.post(process.env.REACT_APP_SERVER + '/api/register/', newUserCreds)
            const pk = registerData.data.user.pk
            localStorage.setItem("pk", pk)
            try {
                let cleaned = {...newUserCreds}
                cleaned.password = newUserCreds.password1
                let tokenData = await axios.post(process.env.REACT_APP_SERVER + '/api/token/', cleaned)
                localStorage.setItem("access", tokenData.data.access)
                try {
                    let data = {
                        user_id: parseInt(pk),
                        username: registerData.data.user.username,
                        user_food: 10,
                        user_water: 10,
                        state: "Florida",
                        city: "Miami",
                        location: "fast_food",
                        food_available: 2,
                        water_available: 2,
                        location_2: "hotel",
                        water_available_2: 2,
                        food_available_2: 2,
                        left: "Jacksonville",
                        right: "Tallahassee"
                    }
                    let userData = await axios.post(`${process.env.REACT_APP_SERVER}/api/userinfo/`, data, {
                        headers: {
                            Authorization: `Bearer ${tokenData.data.access}`
                        }
                    })
                    props.updateUserState(data)
                    props.history.push('/game')


                } catch (e) {
                    console.log(e.response)
                    setRegisterErrors(["We had problems getting your user set up"])

                }
            } catch (e) {
                console.log(e.response)
                console.log("TOKEN ERROR")
            }
        } catch (e) {
            console.log(e.response.data)
            let errs = []
            for (let key in e.response.data) {
                for (let err of e.response.data[key]) {
                    errs.push(err)
                }
            }
            setRegisterErrors(errs)
        }
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
                {registerErrors.map(err => {
                    return <div>{err}</div>
                })}
            </div>
        </>
    )
}


export default withRouter(connect(null, {updateUserState})(Register));

