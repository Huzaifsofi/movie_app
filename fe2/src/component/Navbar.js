import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LOGO from '../assets/LOGO.png'
import './navbar.css'

function Navbar() {
  const [users, setUsers] = useState(null)

    const handlelogout = () => {
      localStorage.removeItem("token")
      setUsers(null)
      window.location.reload(false);
    }

    useEffect(() => {
        fetch('http://localhost:8000/user/user', {
        headers: {
            "x-access-token": localStorage.getItem("token") ,
        }
        })
        .then((response) => response.json())
        .then((data) => data.isLoggedIn ? setUsers(data.user): null)
    }, [])

  return (
    <div className='nav-main'>
        <Link to='/' className='linkon'>
          <div className='nav-one'>
              <img src={LOGO} alt='nav-logo' />
              <h2>POLS</h2>
          </div>
        </Link>
        {
          users ?  <div className='nav-two'>
                    <button className='Logbuttonnav' onClick={handlelogout}>LOGOUT</button>
                  </div> 
          :
                <Link to='/login'>
                  <div className='nav-two'>
                      <button className='Logbuttonnav'>LOGIN</button>
                  </div>
                </Link>
        }
    </div>
  )
}

export default Navbar