import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';


export class MovieCard extends React.Component {


  render() {
    const movie = this.props.movie;
    const user = this.props.user;
    const token = this.props.token;
    const deleteFavMovie = this.props.deleteFavMovie;

    return (
      <CardGroup id="movie-card" className='cardGroup mx-auto '>
        <Card className="bg-dark text-white vh-500 ">
          <Card.Body >
            <Card.Img variant="top" src={movie.ImagePath} style={{ height: '70%' }} />
            <Card.Title>{movie.Title}</Card.Title>
            <Link to={`/movies/${movie._id}`}>
              <Button className="button" variant='outline-secondary'>Open</Button>
            </Link>
            {typeof deleteFavMovie === "function" &&
              <Button className="button" variant='outline-secondary' onClick={() => deleteFavMovie(user, movie._id, token)}>Remove</Button>
            }
          </Card.Body>
        </Card>
      </CardGroup>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

