import React from "react";
import '../../App.css'

export default function Menu({history}) {

    const logout = e => {
        e.preventDefault()
        localStorage.removeItem('key')
        localStorage.removeItem('pk')
        history.push('/')
    }

    const map = e => {
        e.preventDefault()
        history.push('/game/map')
    }


    return (
        <div className="menu">
            <h3>Menu</h3>
            <div className="stat column">
                <button onClick={logout} className='logout_btn'>Log Out</button>
                <button onClick={map} className='logout_btn' style={{marginTop: '15px'}}>View Map</button>
            </div>
        </div>
    );
}
