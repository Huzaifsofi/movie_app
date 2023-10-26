const Movie = require('../model/movieModel');
const Post = require('../model/postModel');


const createMovie = async (req, res) => {
    const { name, runtime, description, trailer } = req.body;
    const photo = req.file.filename;

    let url = new URL(trailer);

    // Extract the video ID including query parameters
    let videoIdWithParams = url.pathname.substr(1) + url.search;
 
    

    let movies;
    try {
        movies = new Movie({
            name,
            photo,
            runtime,
            description,
            trailer: videoIdWithParams
        })
        await movies.save()
    } catch (err) {
        console.log(err)
    }
    if (!movies) {
        return res.status(400).json({ message: 'uunable to add' })
    }
    return res.status(201).json({ movies })
}

const getmovies = async (req, res) => {
    let movies;
    try {
        movies = await Movie.find()
    } catch (err) {
        console.log(err)
    }
    if (!movies) {
        return res.status(400).json({ message: 'uunable to add' })
    }
    return res.status(200).json({ movies })
}

const getmoviesById = async (req, res) => {
    const id = req.params.id

    let movies;
    try {
        movies = await Movie.findById(id)
        movies.posts = await Post.find({ movieid: id })
        return res.status(200).json({ movies })
    } catch (err) {
        console.log(err)
    }
    if (!movies) {
        return res.status(400).json({ message: 'uunable to add' })
    }
  
}

exports.createMovie = createMovie
exports.getmovies = getmovies
exports.getmoviesById = getmoviesById