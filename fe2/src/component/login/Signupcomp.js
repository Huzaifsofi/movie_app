import React, { useState } from 'react'
import './logincard.css'
import { useNavigate } from 'react-router-dom'

const Signupcomp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate() ;
  const url = 'http://localhost:8000/user/signup'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message)
        setMessage(errorData.message)
        return;
      }

      // Handle successful response
      const data = await response.json()
      .then(() => navigate('/login'))
      console.log(data);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  return (
    <div className='loginmain'>
     <div class="container">
      <div class="wrapper">
        <div class="title"><span>Sign up</span></div>
        <form onSubmit={handleSubmit} >
        <div class="row">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
          </div>
          <div class="row">
            <i class="fa fa-envelope"></i>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div class="row">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div class="row button">
            <input type="submit" value="Sign Up"/>
          </div>
        </form>
        <p>{message}</p>
      </div>
    </div>
    {message && <p>Error: {message}</p>}
</div>
  )
}

export default Signupcomp