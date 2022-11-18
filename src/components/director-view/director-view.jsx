import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card';
import MoviesList from '../movies-list/movies-list';

import { Link } from 'react-router-dom';

import './director-view';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {
      showMovies: false
    }
  }

  //set showMovies to true
  showMovies() {
    if (!this.state.showMovies) {
      this.setState({
        showMovies: true
      })
    } else {
      this.setState({
        showMovies: false
      })
    }
  }

  render() {
    const director = this.props.director;
    const directormovies = this.props.directormovies;
    const showMovies = this.state.showMovies;

    return (
      <>
        <CardGroup>
          <Card className="bg-dark text-white vh-500">
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>Born in {director.Birth}</Card.Text>
              <Card.Text>{director.Bio}</Card.Text>
              <Button variant='outline-secondary' onClick={() => { history.back() }}>Back</Button>
              <Button variant='outline-secondary' onClick={() => this.showMovies()}>Directed Movies</Button>
            </Card.Body>
          </Card>
        </CardGroup>
        <br></br>
        {showMovies ?
          <Row >
            {directormovies.map(movie => (
              <Col md={4} className="cardContainer">
                <MovieCard key={movie._id} movie={movie} />
              </Col>
            ))}
          </Row>

          : <div></div>}
      </>
    )
  }
}

/*
          <Row>
            {
              directormovies.map(movie => (
                <Col md={4} className="cardContainer">
                  <MovieCard movie={movie} />
                </Col>
              ))

            }
          </Row>
*/