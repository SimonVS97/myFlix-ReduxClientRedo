import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

import './profile-view.scss';


class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      profile: null,
      favMovies: null,
      username: null,
      password: null,
      email: null,
      birthday: null,
      showDeleteToast: false,
      showFavMovies: false,
    }
  }

  // set Username of info to be updated
  setUsername(newUsername) {
    this.setState({
      username: newUsername
    });
  }
  // set Password of info to be updated
  setPassword(newPassword) {
    this.setState({
      password: newPassword
    });
  }

  // set Email of info to be updated
  setEmail(newEmail) {
    this.setState({
      email: newEmail
    });
  }

  // set birthday of info to be updated
  setBirthday(newBirthday) {
    this.setState({
      birthday: newBirthday
    });
  }

  // set favMovies
  setFavMovies(newFavMovies) {
    this.setState({
      favMovies: newFavMovies
    })
  }

  //set showDeleteToast to true
  showDeleteToast() {
    this.setState({
      showDeleteToast: true
    })
    setTimeout(() => {
      this.setState({
        showDeleteToast: false
      })
    }, 5000);
  }

  // function to validate user input
  validate = () => {
    let isRegis = true;
    if (!this.state.username) {
      alert('Username Required');
      isRegis = false;
    } else if (this.state.username.length < 2) {
      alert('Username must be 2 characters long');
      isRegis = false;
    }
    if (!this.state.password) {
      alert('Password Required');
      isRegis = false;
    } else if (this.state.password.length < 6) {
      alert('Password must be 6 characters long');
      isRegis = false;
    }
    if (!this.state.email) {
      alert('Email required');
      isRegis = false;
    } else if (this.state.email.indexOf('@') === -1) {
      alert('The input is not an email address');
      isRegis = false;
    }
    return isRegis;
  }

  // put request to server to update user information
  changeUserInfo(user, token) {
    console.log('hello');
    const isRegis = this.validate();
    if (isRegis) {
      axios.put(`https://movie-app-svs.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } },
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday
        }
      ).then(response => {
        window.open('/', '_self');
      }).catch(error => {
        console.error(error);
      })
    } else {
      alert('wrong input');
    }
  }

  // Get profile info from user after mounting component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    this.getUserInfo(user, accessToken);
  }

  // Get info on the user, user is passed as an parameter into method
  getUserInfo(user, token) {
    console.log(user);
    axios.get(`https://movie-app-svs.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        profile: response.data
      })
    })
  }

  // Filter the favorite movies of the user 
  getUserFavMovies() {
    if (this.state.showFavMovies == false) {
      const favMovies = this.state.profile.FavoriteMovies;
      const movies = this.props.movies;
      let favMoviesArr = this.state.favMovies;
      favMoviesArr = favMovies.map(movieId => {
        return movies.find(m => m._id == movieId)
      })
      this.setFavMovies(favMoviesArr);
      this.setState({
        showFavMovies: true
      })
    }
    else {
      this.setState({
        showFavMovies: false
      })
    }
  }


  // method that sends delete request to delete movie from favorites
  deleteFavMovie(user, movieID, token) {
    axios.delete(`https://movie-app-svs.herokuapp.com/users/${user}/movies/${movieID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      this.setState({
        profile: response.data
      })
      this.showDeleteToast();
      this.getUserFavMovies();
    })
  }

  // method that sends delete request
  deleteUser(user, token) {
    axios.delete(`https://movie-app-svs.herokuapp.com/users/${user}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      window.open('/', '_self');
    }).catch(error => {
      console.error(error);
    })
  }

  render() {
    const user = this.props.user;
    const token = localStorage.getItem('token');
    const profile = this.state.profile;
    const favMovies = this.state.favMovies;
    let showDeleteToast = this.state.showDeleteToast;
    let showFavMovies = this.state.showFavMovies;

    return (
      <>
        <Row>
          <Col md={6}>
            {profile ? (
              <CardGroup>
                <Card className="bg-dark text-white vh-500">
                  <Card.Body>
                    <Card.Title>Profile information</Card.Title>
                    <Card.Text>Username: {profile.Username}</Card.Text>
                    <Card.Text>Email: {profile.Email}</Card.Text>
                    <Card.Text>Date of Birth: {profile.Birthday.split("T")[0]}</Card.Text>
                    <Button variant='outline-secondary' onClick={() => this.getUserFavMovies()}>FavMovies</Button>
                    <Link to={`/`}>
                      <Button variant='outline-secondary'>Back</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </CardGroup>
            ) : (
              <div></div>
            )
            }
          </Col>
          <Col md={6}>
            <CardGroup>
              <Card className="bg-dark text-white vh-500">
                <Card.Body>
                  <Form>
                    <Card.Title>Update your profile information</Card.Title>
                    <Form.Group controlId='fUsername'>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control type="text" onChange={e => this.setUsername(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control type="password" onChange={e => this.setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control type="email" onChange={e => this.setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control type="date" onChange={e => this.setBirthday(e.target.value)}></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Button variant='outline-secondary' type="submit" onClick={() => this.changeUserInfo(user, token)}>Submit</Button>
                    <Button type="submit" variant='outline-secondary' onClick={() => this.deleteUser(user, token)}>Deregister</Button>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row className="cContainer">
          {(showFavMovies && favMovies !== null) ?
            favMovies.map(m => (
              <Col md={4} className="cardContainer">
                <MovieCard
                  favMovies={favMovies}
                  movie={m}
                  token={token}
                  user={user}
                  key={m._id}
                  deleteFavMovie={(user, movieID, token) => this.deleteFavMovie(user, movieID, token)}>
                </MovieCard>
              </Col>
            ))
            : <div></div>
          }
          <ToastContainer className="fixed-top top-0 start-50">
            <Toast show={showDeleteToast} bg={'success'}>
              <Toast.Body>You deleted this movie from your list of favorites</Toast.Body>
            </Toast>
          </ToastContainer>
        </Row>



      </>

    )
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}


export default connect(mapStateToProps)(ProfileView);