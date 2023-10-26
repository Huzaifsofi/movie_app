import React, { useState } from 'react'
import './adminpage.css'

function AdminPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [runtime, setRuntime] = useState('')
    const [message, setMessage] = useState('')
    const [trailer, setTrialer] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

      // Create a new FormData object
      const formData = new FormData();
      formData.append('name', name);
      formData.append('photo', photo);
      formData.append('runtime', runtime)
      formData.append('description', description);
      formData.append('trailer', trailer)

      try {
        const response = await fetch('http://localhost:8000/admin/create', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Handle successful response
          setMessage('Form data submitted successfully')
          formData('')
        } else {
          // Handle error response
          console.log('Error submitting form data');
        }
      } catch (error) {
        // Handle network error
        console.log('Network error occurred');
      }
  };



  return (
    <div className='grid'>
      <div className='card'>
        <h2>Admin Movie Adder</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='input-box'>
              <input type="text" placeholder='  movie name' onChange={(e) => setName(e.target.value)} />
            </div>
            <br />
            <div className='input-box'>
              <input type="file"  id='fileadd' placeholder='movie image here..' onChange={(e) => setPhoto(e.target.files[0])} />
            </div>
            <br />
            <div className='input-box'>
              <input type="number" placeholder='  duration of movie' onChange={(e) => setRuntime(e.target.value)} />
            </div>
            <div className='input-box'>
              <input type="text" placeholder='  enter trialer link' onChange={(e) => setTrialer(e.target.value)} />
            </div>
            <br />
            <div className='input-box'>
              <textarea placeholder='  movie description' onChange={(e) => setDescription(e.target.value)} ></textarea>
            </div>
            <br />
            <div className='input-box'>
              <button className='adminsubmitbutton'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminPage