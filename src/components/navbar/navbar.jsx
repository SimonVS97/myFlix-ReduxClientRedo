import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';

import './navbar.scss';

function Menubar(props) {

  const user = props.user;

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    // test if the script is being run in a web-browser or not
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Col xs={12}>
      <Navbar className="navbar" bg="dark" variant="dark" sticky='top'>
        <Navbar.Brand className="brand">myFlix-Cinema</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant='dark' onClick={() => {
                onLoggedOut()
              }}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Sign-up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Col >
  );
}

let mapStateToProps = state => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(Menubar);