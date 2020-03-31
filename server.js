const express = require('express');
const morgan = require('morgan');
const MOVIES = require('./movies.json');

const app = express();
app.use(morgan('dev'));

function handleGetMovie(req, res) {
    // Init response with all movies
    let response = MOVIES;

    // Filter by Genre
    if (req.query.genre) {
        response = response.filter(movie => 
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        );
    }

    // Filter by Country
    if (req.query.country) {
        response = response.filter(movie => 
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
    }

    // Filter by Avg Vote
    if (req.query.avg_vote) {
        const voteIn = Number(req.query.avg_vote);

        if (Number.isNaN(voteIn)) {
            res.status(400).send('avg_vote must be a number');
        }
        
        response = response.filter(movie => 
            movie.avg_vote >= voteIn
        )
    }

    // Return the (filtered) movie list
    res.json(response);
}

app.get('/movie', handleGetMovie);

app.listen(8000, () => {
    console.log('Server listening on Port 8000');
})