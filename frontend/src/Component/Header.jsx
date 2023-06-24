import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap'
import '../Assets/css/Header.css';

const Header = () => {
  return (
    <div>
        <Navbar className='Nav' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">AlgoFeel</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#About">About</Nav.Link>
            <Nav.Link href="#Contact">Contact</Nav.Link>
            <Nav.Link className='nav_end' href="#Study">Study</Nav.Link>
            <Nav.Link href="#Visualize">Visualize</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
