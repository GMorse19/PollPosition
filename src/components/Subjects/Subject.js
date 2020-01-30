import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
// import Choice from '../Choices/Choice.js'
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
  // const [choice, setChoice] = useState({ subject_id: '', name: '', description: '', vote: '' })
  // const [updated, setUpdated] = useState(false)
  console.log(props.user.id)
  // console.log(choice)
  useEffect(() => {
    axios({
      url: `${apiUrl}/subjects/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setSubject(res.data.subject))
      .catch(console.error)
  }, [])

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
      })
  }

  // const handleVote = function () {
  //   choice.vote += 1
  // }

  if (!subject) {
    return <p>Loading...</p>
  }

  const choicesJsx = subject.choices.map(choice => (
<<<<<<< HEAD
    <div key={choice.id}>
      <h4>{choice.name} : {choice.description} :: {props.match.params.id}/{choice.id} - {choice.vote} -
        <Button href={`#subjects/${props.match.params.id}/choices/${choice.id}/edit-choice`} subject={subject} choices={choice} variant="danger" className="mr-2">Vote</Button>
      </h4>
=======
    <div className='homepage' key={choice.id}>
      <Col lg={3} xs={3} md={3}>
        <div className='menu-item'>
          <div>
            {<Card className='menu-item' style={{ backgroundColor: 'gray' }}>
              <Card.Body>
                <Card.Title className='title'>{choice.name}</Card.Title>
                <Card.Text>
                  Description:
                  <br />
                  {choice.description}
                  <br />
                  Vote Count - {choice.vote}
                </Card.Text>
                <Button href={`#subjects/${props.match.params.id}/choices/${choice.id}/edit-choice`} subject={subject} choice={choice} variant="danger" className="mr-2">Vote</Button>
              </Card.Body>
            </Card>}
          </div>
        </div>
      </Col>
>>>>>>> developmentTwo
    </div>
  ))

  return (
    <div className="padding subject-board">
      <div className="">
        {userId === subject.user.id && <Button href={`#subjects/${props.match.params.id}/edit`} variant="primary" className="mr-2">Update Your Subject</Button>}
        {userId === subject.user.id && <Button onClick={handleDelete} className="btn btn-danger">Remove Your Subject</Button>}
      </div>
      <h1 className="subject-header" style={{ color: 'blue', fontSize: '100px', fontFamily: 'Bangers' }}>{subject.title}</h1>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row style={{ width: '18rem' }}>
          <Card className='menu-item' style={{ backgroundColor: 'gray' }}>
            <Card.Text>
              <div className=''>
                <h5 className='title' style={{ color: 'blue' }}>Description:</h5><p className='subtitle'>{subject.description}</p>
                <h5 className='title' style={{ color: 'blue' }}>Created by:</h5><p className='subtitle'>{subject.user.email}</p>
              </div>
            </Card.Text>
          </Card>
        </Row>
      </Container>
      <h2 style={{ color: 'blue', fontSize: '100px', fontFamily: 'Bangers', textDecorationLine: 'Underline' }}>Choices</h2>
      <div>
        <Button href={`#subjects/${props.match.params.id}/create-choice`} subject={subject} variant="primary" className="mr-2">Add a Choice</Button>
      </div>
      <div className='directory-menu'>
        <Container>
          <Row>
            {choicesJsx}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default withRouter(Subject)
