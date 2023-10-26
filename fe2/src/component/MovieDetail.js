import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './moviedetail.css'
import Postform from './reating/Postform'
import Youtube from 'react-youtube'

 

const Moviepage = () => {
    const [movie, setMovie] = useState('')

    const [reatings, setReating] = useState(5)

    const { id } = useParams()

    const url = `http://localhost:8000/admin/getmovie/${id}`
    
    const fetchdata = async () => {
        const response = await fetch(url)
        .then((response) => response.json())
        .then((data) => setMovie(data))
    }

    useEffect(() => {
        fetchdata()
    }, [])

    const datakey = Object.values(movie)
    console.log(movie)
  return (
    <div className='detail-main'>
       {
        datakey.map(key => {
            return (
                <div className='grid-detail'>
                    <div className='box-detail first'>
                        <div class='img-box'>
                            <img src={`http://localhost:8000/${key.photo}`} alt='movie img' />
                        </div>
                    </div>
                    <div className='box-detail one'>
                        <iframe width="530" height="285" src={`https://www.youtube.com/embed/5PSNL1qE6VY?si=PzVo3pN6M579iNWY`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        <h2>Name: {key.name}</h2>
                        <h3>Runtime: {key.runtime}</h3>
                        <p><b>Description:</b> {key.description}</p>
                    </div>
                    <div className='box-detail two'>
                        <div className='form-post'>
                            <Postform id={key._id} />
                        </div>

                        {Array.isArray(key.posts)
                            ? key.posts.map(element => {
                                return (
                                <div className='com-movie'>
                                    <h3>@{element.username}</h3>
                                    <h3>Reating:  {element.reating} stars</h3>
                                    <h4>comment:  {element.name}</h4>
                                </div>
                                )
                            })
                            : null
                        }
                    </div>
                </div>
            )
        })
       }
    </div>
  )
}

export default Moviepage