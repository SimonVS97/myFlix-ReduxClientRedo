import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './LoginView.scss';


import { setUser } from '../../actions/actions';


import axios from 'axios';

function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const onRegisterClick = props.onRegisterClick;

  // function to validate user input
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsername('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate input
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://movie-app-svs.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          // response object, data is the parsed response body
          /* then call props.onLoggedIn(data) */
          console.log(response.data);
          props.setUser(response.data.user.Username);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.user.Username);
          window.open("/", "_self");
          //const data = response.data;
          //props.onLoggedIn(data);
        })
        .catch(e => {
          alert('No such user. Please check you credentials.')
        });
    }
  };

  return (
    <Col xs={5}>
      <CardGroup>
        <Card className='text-center bg-dark text-white'>
          <Card.Body>
            <Form>
              <Card.Title>Log-In</Card.Title>
              <Card.Text>Please enter your username and password</Card.Text>
              <Form.Group controlId="formUsername">
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Username"></Form.Control>
                {usernameErr && <p className="input--error">{usernameErr}</p>}
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"></Form.Control>
                {passwordErr && <p className="input--error">{passwordErr}</p>}
              </Form.Group>
              <br></br>
              <Button className="mb-3 btn-lg px-5" variant="outline-secondary" type="submit" onClick={handleSubmit}>Submit</Button>
              <br></br>
              <Card.Text>Don't have an account?</Card.Text>
              <Link to={`/register`}>
                <Button className="mb-3 btn-lg px-5" variant='outline-secondary'>Register</Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </CardGroup>
    </Col>


  );

}

export default connect(null, { setUser })(LoginView);


LoginView.PropTypes = {
  onRegisterClick: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired
}; 
