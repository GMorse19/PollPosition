import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
// import Choice from '../Choices/Choice.js'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

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
    <div className='homepage' key={choice.id}>
      {<Col lg={2} xs={2} md={2}>
        <div className='menu-item'>
          <div className='content'>
            <h4 className='title'>{choice.name}</h4>
            <h2 className='title' style={{ color: 'white' }}>Description: </h2>
            <h2 className='subtitle'>{choice.description}</h2>
            <h4 className='subtitle'>Vote Count - {choice.vote} -
              <Button href={`#subjects/${props.match.params.id}/choices/${choice.id}/edit-choice`} subject={subject} choice={choice} variant="danger" className="mr-2">Vote</Button>
            </h4>
          </div>
        </div>
      </Col>}
    </div>
  ))

  return (
    <div className="padding subject-board">
      <div className="">
        {userId === subject.user.id && <Button href={`#subjects/${props.match.params.id}/edit`} variant="primary" className="mr-2">Update Your Subject</Button>}
        {userId === subject.user.id && <Button onClick={handleDelete} className="btn btn-danger">Remove Your Subject</Button>}
      </div>
      <h1 className="subject-header" style={{ color: 'blue', fontSize: '100px', fontFamily: 'Bangers' }}>{subject.title}</h1>
      <div className=''>
        <h5 className='content' style={{ color: 'blue' }}>Description:</h5><h3 className='subtitle'>{subject.description}</h3>
        <h5 className='content' style={{ color: 'blue' }}>Created by:</h5><h3 className='subtitle'>{subject.user.email}</h3>
      </div>
      <h2 style={{ textAlign: 'center', color: 'blue' }}>Choices:</h2>
      <div className='directory-menu'>
        <Container>
          <Row>
            {choicesJsx}
          </Row>
        </Container>
      </div>
      <div>
        <Button href={`#subjects/${props.match.params.id}/create-choice`} subject={subject} variant="primary" className="mr-2">Add a Choice</Button>
      </div>
    </div>
  )
}

export default withRouter(Subject)
