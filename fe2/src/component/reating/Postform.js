import React, { useState, useEffect } from 'react'
import './postform.css'
import { useNavigate} from 'react-router-dom';

function Postform({ id }) {
  const [name, setName] = useState('');
  const [reating, setReating] = useState(0);
  const [users, setUsers] = useState(null)


  const handleSubmit = async (e) => {

    const data = {
      name: name,
      reating: reating
    };

    const url = `http://localhost:8000/post/${id}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": localStorage.getItem("token")

        },
        body: JSON.stringify(data)
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };


  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className='input-comm' type='text' placeholder='write our comment....' onChange={(e) => setName(e.target.value)} name='name' />
        <div>
        <div class="rate">
            <input type="radio" id="star5" name="rate" value='5' onChange={(e) => setReating(e.target.value)} />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value='4' onChange={(e) => setReating(e.target.value)}/>
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value='3' onChange={(e) => setReating(e.target.value)} />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value='2' onChange={(e) => setReating(e.target.value)} />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value='1' onChange={(e) => setReating(e.target.value)} />
            <label for="star1" title="text">1 star</label>
        </div>
        </div>
        <button className='btn-com' type='submit'>post</button>
      </form>
    </div>
  );
}

export default Postform;
