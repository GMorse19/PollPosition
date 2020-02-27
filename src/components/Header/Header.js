import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const authenticatedOptions = (
  <Fragment>
    <ButtonToolbar>
      <DropdownButton
        drop={'left'}
        variant={'secondary'}
        title={'Options'}
        id={'dropdown-button-drop-left'}
        key={'left'}
      >
        <Dropdown.Item href="#/">Home</Dropdown.Item>
        <Dropdown.Item href="#create-subject">Create Poll</Dropdown.Item>
        <Dropdown.Item href="#subjects">List Polls</Dropdown.Item>
        <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
        <Dropdown.Item href="#sign-out">Sign Out</Dropdown.Item>
      </DropdownButton>
    </ButtonToolbar>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <ButtonToolbar>
      <DropdownButton
        drop={'left'}
        variant={'secondary'}
        title={'Sign In/Up'}
        id={'dropdown-button-drop-left'}
        key={'left'}
      >
        <Dropdown.Item href="#/">Home</Dropdown.Item>
        <Dropdown.Item href="#sign-in">Sign In</Dropdown.Item>
        <Dropdown.Item href="#sign-up">Sign Up</Dropdown.Item>
        <Dropdown.Item href="#polls">DEMO</Dropdown.Item>
      </DropdownButton>
    </ButtonToolbar>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar collapseOnSelect fixed="top" style={{ backgroundColor: 'black' }} variant="dark" expand="md">
    <Navbar.Brand href="#">
      <img
        src='./PollPositionHome.png'
        style= {{ margin: '0 auto', width: '20vw', height: '10vw' }}
      />
    </Navbar.Brand>
    <Nav>{ user && <span className="navbar-text mr-2">You are signed in as <span style={{ color: 'white' }}>{user.email}</span></span>}</Nav>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
