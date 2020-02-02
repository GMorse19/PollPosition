import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import './Subject.scss'

import apiUrl from '../../apiConfig'

const Subject = props => {
  const [subject, setSubject] = useState(null)
  const userId = props.user ? props.user.id : null
  const [voted, setVoted] = useState(null)
  const [showChoice, setShowChoice] = useState(true)

  useEffect(() => {
    axios({
      url: `${apiUrl}/subjects/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setSubject(res.data.subject))
      .then(() => setVoted(false))
      .catch(console.error)
  }, [voted])

  const handleDelete = event => {
    console.log(props.match.params.id)
    axios({
      url: `${apiUrl}/subjects/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'You deleted a subject', variant: 'success' })
        props.history.push('/subjects')
      })
      .catch(() => {
        props.alert({ heading: 'Uh Oh!', message: 'You did not delete a subject', variant: 'warning' })
      }, [])
  }

  const handleClick = function () {
    setVoted()
    console.log(voted)
  }

  const handleShow = function () {
    setShowChoice()
  }

  if (!subject) {
    return <p>Loading...</p>
  }

  const choicesJsx = subject.choices.map(choice => (
    <div className='homepage page-content' key={choice.id}>
      <Col lg={3} xs={3} md={3}>
        <div className='menu-item'>
          <div>
            {<Card className='menu-item' style={{ backgroundColor: '#A3FFB0' }}>
              <Card.Body>
                <Card.Title className='title'>{choice.name}</Card.Title>
                <Card.Text style={{ color: 'blue' }}>
                  Description:
                  <br />
                  {choice.description}
                  <br />
                  Vote Count - {choice.vote}
                </Card.Text>
                <Button
                  href={`#subjects/${props.match.params.id}/choices/${choice.id}/edit-choice`}
                  subject={subject}
                  choice={choice}
                  onClick={handleClick}
                  variant="danger"
                  className="mr-2">
                  Vote
                </Button>
              </Card.Body>
            </Card>}
          </div>
        </div>
      </Col>
    </div>
  ))

  return (
    <div className="subject-board page-content">
      {showChoice && <div>
        <div className="">
          {userId === subject.user.id && <Button href={`#subjects/${props.match.params.id}/edit`} variant="primary" className="mr-2">Update Your Subject</Button>}
          {userId === subject.user.id && <Button onClick={handleDelete} className="btn btn-danger">Remove Your Subject</Button>}
        </div>
        <h1 className="subject-header" style={{ color: '#fad1ad', fontSize: '100px', fontFamily: 'Bangers' }}>{subject.title}</h1>
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Row style={{ width: '18rem' }}>
            <Card className='menu-item' style={{ backgroundColor: '#fae4ad' }}>
              <Card.Text>
                <div className=''>
                  <h5 className='title' style={{ color: 'blue' }}>Description:</h5><p style={{ color: 'blue' }} className='subtitle'>{subject.description}</p>
                  <h5 className='title' style={{ color: 'blue' }}>Created by:</h5><p style={{ color: 'blue' }} className='subtitle'>{subject.user.email}</p>
                </div>
              </Card.Text>
            </Card>
          </Row>
        </Container>
        <h2 style={{ color: '#fad1ad', fontSize: '100px', fontFamily: 'Bangers', textDecorationLine: 'Underline' }}>Choices</h2>
        <div>
          <Button href={`#subjects/${props.match.params.id}/create-choice`} onClick={handleShow} handleShow={handleShow} subject={subject} variant="primary" className="mr-2">Add a Choice</Button>
        </div>
        <div className='directory-menu'>
          <Container>
            <Row>
              {choicesJsx}
            </Row>
          </Container>
        </div>
      </div>}
    </div>
  )
}

export default withRouter(Subject)
