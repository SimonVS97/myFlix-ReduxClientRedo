import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

import { Link } from 'react-router-dom';


import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      showAddToast: false
    }
  }

  //set showAddToast to true
  showAddToast() {
    this.setState({
      showAddToast: true
    })
    setTimeout(() => {
      this.setState({
        showAddToast: false
      })
    }, 5000);
  }

  render() {
    const movie = this.props.movie;
    const token = this.props.token;
    const user = this.props.user;
    const addToFavorites = this.props.addToFavorites;
    const showAddToast = this.state.showAddToast;

    return (
      <>
        <CardGroup>
          <Card className="bg-dark text-white vh-500">
            <Card.Body className="cardBody">
              <div className="imgWrapper">
                <Card.Img className="movie-img" variant="top" src={movie.ImagePath}></Card.Img>
              </div>
              <Card.Title className="cardTitle">{movie.Title}</Card.Title>
              <Card.Text className="cardDes">{movie.Description}</Card.Text>
              <Card.Text className="mx-auto directorDes">
                <span>Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <span>{movie.Director.Name}</span>
                </Link>
              </Card.Text>
              <Card.Text className="mx-auto genreDes">
                <span>Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <span>{movie.Genre.Name}</span>
                </Link>
              </Card.Text>
              <Button
                className='buttonAddToFav'
                variant='outline-secondary'
                onClick={() => {
                  addToFavorites(user, movie._id, token);
                  this.showAddToast()
                }}>
                Add to Favorites
              </Button>
              <Link to={`/`}>
                <Button className="buttonBack" variant='outline-secondary' type="submit" >
                  Back
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </CardGroup>
        <ToastContainer className="fixed-top top-0 start-50">
          <Toast show={showAddToast} bg={'success'}>
            <Toast.Body>You added this movie to your list of favorites</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }
}

MovieView.PropTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};