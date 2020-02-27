import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import './Poll.scss'

import apiUrl from '../../apiConfig'

const Poll = props => {
  const [subject, setSubject] = useState(null)

  // Create an array for the top three choices by vote count
  let leaders = []
  // Make sure there's a subject first
  if (subject) {
    leaders = subject.choices.sort((a, b) => (a.vote > b.vote) ? 1 : -1).slice(-3).reverse()
  }

  // GET subject by id
  useEffect(() => {
    axios({
      url: `${apiUrl}/subjects/${props.match.params.id}`,
      method: 'GET'
    })
      .then(res => setSubject(res.data.subject))
      .catch(console.error)
  }, [])

  // Check to see if a subject has been set
  if (!subject) {
    return <p>Loading...</p>
  }

  // Map over the top three choices by vote count
  const answer = leaders.map(i => (
    <div key={i.id}>
      <h5> {i.name} :: <span style={{ color: 'red' }}>{i.vote}</span> votes</h5>
    </div>
  ))

  // Map over choices that belong_to Subject
  const choicesJsx = subject.choices.map(choice => (
    <div className='homepage page-content' key={choice.id}>
      <Col lg={3} xs={3} md={3}>
        <div className='menu-item'>
          <div>
            {<Card className='menu-item' style={{ backgroundColor: '#fae4ad' }}>
              <Card.Body>
                <Card.Header style={{ color: 'blue' }} className='title'>{choice.name}</Card.Header>
                <Card.Text style={{ color: 'blue' }}>
                  Description: {choice.description}
                </Card.Text>
                <Button
                  variant="danger"
                  className="mr-2">
                  Vote
                </Button>
                <Card.Footer style={{ color: 'blue' }}>Vote Count - {choice.vote}</Card.Footer>
              </Card.Body>
            </Card>}
          </div>
        </div>
      </Col>
    </div>
  ))

  return (
    <div className="subject-board page-content">
      <div style={{ marginBottom: '20px' }}>
        <h2>Please Sign In/Up to create a Poll or vote</h2>
        <p style={{ color: 'white', textAlign: 'center' }}>Sign In with EMAIL= v@v PASSWORD= v</p>
        <h1 className="subject-header"
          style={{ color: '#fad1ad', fontSize: '100px', fontFamily: 'Bangers' }}>
          {subject.title}
        </h1>
        <h3>{subject.description}</h3>
      Created by: {subject.user.email}
      </div>
      <div>
        <div className="">
          <Button
            variant="primary"
            className="mr-2">Update Your Subject</Button>
          <Button
            className="btn btn-danger">Remove Your Subject</Button>
        </div>
        <h2 style={{ color: '#fad1ad',
          fontSize: '100px',
          fontFamily: 'Bangers',
          textDecorationLine: 'Underline' }}>
        Choices
        </h2>
        <div className='directory-menu'>
          <Container>
            <h4 style={{ textAlign: 'center' }}>
            VOTE LEADERS
            </h4>
            {answer}
            <Row className="box">
              {choicesJsx}
            </Row>
            <div>
              <Button style={{ marginBottom: '50px' }}
                variant="primary"
                className="mr-2">Add a Choice</Button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Poll)
