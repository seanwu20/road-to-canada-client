import React, {useState} from 'react'
// import axios from 'axios'
import background from '../../assets/background/login_background.png'
import flag from '../../assets/background/canadian_flag.png'
import zombieHand from '../../assets/background/zombie_hand.png'
import character from '../../assets/Characters/character_single.png'
import '../../App.css'
import styled from "styled-components";

const PopupStyles = styled.form`
  font-size: 14px;
  padding: 16px 12px;
  background: rgba(3, 3, 3, 0.85);
  border: 3px solid #888;

  p {
    margin-bottom: 24px;
  }
`;

const OptionStyles = styled.div`
  margin-top: 5px;

  button {
    height: 40px;
    margin-bottom: 10px;
    background-color: #6f1eff;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
  }
`;

export default function Login({history}) {
    const [creds, setCreds] = useState({email: '', password: ''})
    const [newUser, setNewUser] = useState(false)

    const changeHandler = e => {
        setCreds({...creds, [e.target.name]: e.target.value})
        console.log(creds)
    }

    const login = e => {
        e.preventDefault();
        // axios
        //     .post('https://we-cant-name-things.herokuapp.com/api/players/', {
        //         "email": "seanwu20@gmail.com",
        //         "food": 20,
        //         "water": 88,
        //         "state": "Canada",
        //         "city": "Canada_1",
        //         "location": "gas_station",
        //         "food_available": 5,
        //         "water_available": 6,
        //         "location_2": "fast_food",
        //         "food_available_2": 5,
        //         "water_available_2": 10
        //     })
        //     .then(res => {
        //         console.log('response =>',res)
        //         localStorage.setItem('token', "token_here")
        //         history.push('/')
        //     })
        //     .catch(err => console.log(err))
        localStorage.setItem('game_token', "token_here")
        localStorage.setItem('game_email', creds.email)
        history.push('/')
        window.location.reload()
    }

    return (
        <>
            <div style={{
                border: '4px solid black',
                height: '98vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundImage: `url("${background}")`,
                backgroundSize: 'cover'
            }}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <PopupStyles onSubmit={login} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '250px',
                        alignItems: 'center'
                    }}>
                        <p style={{color: 'red'}}>GAME_TITLE_HERE</p>
                        <input placeholder='E-mail' onChange={changeHandler} name='email' value={creds.email}
                               style={{marginBottom: '10px'}} required/>
                        <input placeholder='Password' type='password' onChange={changeHandler} name='password'
                               value={creds.password} style={{marginBottom: '10px'}} required/>
                        {newUser ? <OptionStyles>
                            <button>Create</button>
                        </OptionStyles> : <button className='btn'>Login</button>}
                        <OptionStyles>
                            <p style={{marginBottom: '5px'}}>------or------</p>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <h5 onClick={() => setNewUser(!newUser)} className='create_account'>{newUser ?
                                    <div className='login'>Login</div> : "Create Account"}</h5>
                            </div>
                        </OptionStyles>
                    </PopupStyles>
                </div>

                <img src={character} style={{height: '75px', position: 'absolute', top: '88%', left: '37%'}}/>
                <img src={zombieHand}
                     style={{height: '100px', position: 'absolute', top: '86%', left: '15%', maxWidth: '100%'}}/>
                <img src={flag} style={{position: 'absolute', top: '71%', left: '83%', maxWidth: '100%'}}/>
            </div>
        </>
    )
}
