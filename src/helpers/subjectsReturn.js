import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const demoMessage = <div><h1>Please Sign In/Up</h1>
  <p>If you would like to create a Poll or cast a vote!</p></div>
const authMessage = <div><h1>Choose A Poll</h1>
  <p>Add a choice to a Poll or cast a vote!</p></div>

const SubjectsReturn = ({ user, subjectsJsx }) => {
  console.log(user)
  return (
    <div className="page-content">
      <div style={{ textAlign: 'center' }}>
        {user ? authMessage : demoMessage}
      </div>
      <div className='directory-menu'>
        <Container>
          <Row className="box">
            {subjectsJsx}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default SubjectsReturn
