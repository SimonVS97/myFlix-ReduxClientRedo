import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

export class GenreView extends React.Component {
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
    const genre = this.props.genre;
    const genremovies = this.props.genremovies;
    const showMovies = this.state.showMovies;

    return (
      <>
        <CardGroup>
          <Card className="bg-dark text-white vh-500">
            <Card.Body>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>{genre.Description}</Card.Text>
              <Button variant='outline-secondary' onClick={() => { history.back() }}>Back</Button>
              <Button variant='outline-secondary' onClick={() => this.showMovies()}>Some movies of this genre</Button>
            </Card.Body>
          </Card>
        </CardGroup>
        <br></br>
        {showMovies ?
          <Row>
            {genremovies.map(movie => (
              <Col md={4}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          : <div></div>}
      </>
    )
  }
}