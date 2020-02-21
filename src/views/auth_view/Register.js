import React, {useState} from 'react'
import axios from 'axios'
import character from '../../assets/Characters/character_single.png'
import '../../App.css'
import styled from "styled-components";


const Register = (props) => {

    const [user, setUser] = useState({
        "username": "",
        "email": "",
        "password1": "",
        "password2": ""
    })

    const [errs, setErr]  = useState([])

    const onChangeHandler = (e) => {
        let userCopy = {...user}
        userCopy[e.target.name] = e.target.value
        setUser(userCopy)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_SERVER + '/api/register/', user)
            .then(res => {
                props.history.push('/game')
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

export default Register
