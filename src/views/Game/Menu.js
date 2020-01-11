import React from "react";
import '../../App.css'
import Axios from "axios";

export default function Menu({ history }) {

  const logout = e => {
    e.preventDefault()
    localStorage.removeItem('game_token')
    localStorage.removeItem('game_email')
    history.push('/login')
    window.location.reload()
  }

  const map = e => {
      e.preventDefault()
      history.push('/map')
      window.location.reload()
  }

  const resetGame = e => {
      e.preventDefault()
      Axios
        .put('https://we-cant-name-things.herokuapp.com/api/move', {
            "email": localStorage.getItem('game_email'),
            "food":12,
            "water":32,
            "new_city":"Miami"
        })
        .then(res => console.log('resetRES', res))
        .catch(err => console.log(err))
  }

  return (
    <div className="menu">
      <h3>Menu</h3>
      <div className="stat column">
        <button onClick={logout} className='logout_btn'>Log Out</button>
        <button onClick={map} className='logout_btn' style={{marginTop: '15px'}}>View Map</button>
        {/* <button onClick={resetGame} className='logout_btn' style={{marginTop: '15px'}}>Reset</button> */}
      </div>
    </div>
  );
}
