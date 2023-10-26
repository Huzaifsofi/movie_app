import React, { useEffect, useState } from 'react'
import './moviecard.css'
import { Link } from 'react-router-dom'


function MoviesCard() {
  const [movies, setMovies] = useState('')

  const fetchdata = async () => {
    const url = 'http://localhost:8000/admin/getmovie'  
    const response = await fetch(url)
    .then((response) => response.json())
    .then((data) => setMovies(data.movies))
  }

  useEffect(() => {
    fetchdata()
  }, [])

  return ( 
    <div className='grid-movie'>
      {Array.isArray(movies)
        ? movies.map(element => {
            return (
              <div>
                <Link to={`/${element._id}`} className="link">
                <div className='box'>
                  <img src={`http://localhost:8000/${element.photo}`} alt='movie' />
                  <h3>Name: {element.name}</h3>
                </div>
                </Link>
              </div>
            )
          })
        : null
        }
    </div>

  )
}

export default MoviesCard