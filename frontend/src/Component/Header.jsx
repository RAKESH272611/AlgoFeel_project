import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap'
import '../Assets/css/Header.css';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <Navbar className='Nav' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">AlgoFeel</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
