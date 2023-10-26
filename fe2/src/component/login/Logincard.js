import React, { useEffect, useState } from 'react'
import './logincard.css'
import { useNavigate } from 'react-router-dom'

function Logincard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate();
  
  const url = 'http://localhost:8000/user/login';

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        })
      }).then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token)
          navigate('/')
        }
        else{
          setMessage(data.message)
        }
      })

      /*if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message)
        setMessage(errorData.message)
        console.log(message)
        return;
      }*/

    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  useEffect(() => {
    
  }, [])

  return (
    <div className='loginmain'>
     <div class="container">
      <div class="wrapper">
        <div class="title"><span>Login Form</span></div>
        <form onSubmit={handleSubmit}>
        <div class="row">
            <i class="fa fa-envelope"></i>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div class="row">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div class="row button">
            <input type="submit" value="Login"/>
          </div>
          <div class="signup-link">Not a member? <a>Signup now</a></div>
        </form>
      </div>
      {message}
    </div>
    <h2>{message && <p>Error: {message}</p>}</h2>
</div>

  )
}

export default Logincard