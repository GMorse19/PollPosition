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
  const [choice, setChoice] = useState({ subject_id: '', name: '', description: '', vote: '' })
  const userId = props.user ? props.user.id : null

  // Show the create choice form
  const [showChoice, setShowChoice] = useState(true)
  const [like, setLike] = useState({ subject_id: '' })

  // Show or hide Vote Button
  let likeId = true
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
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setSubject(res.data.subject))
      .catch(console.error)
  }, [like])

  // Delete a subject if owned by user
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

  // Handle the vote button when clicked
  // Creates a 'like' resource
  const handleClick = event => {
    axios({
      url: `${apiUrl}/likes`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        like:
        {
          subject_id: subject.id
        }
      }
    })
      .then(res => {
        setLike(res.data.like)
      })
      .catch(console.error)
  }

  // Update the vote count when a vote is registered
  const updateVote = event => {
    choice.id = event.id
    const addVote = event.vote + 1
    handleClick()
    axios({
      url: `${apiUrl}/choices/${event.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        choice: {
          vote: addVote
        }
      }
    })
      .then(res => {
        setChoice(res.data.choice)
        props.history.push(`choices/${res.data.choice.id}`)
      })
      .catch(console.error)
  }

  // Hide/Show Subject info while creating a choice
  const handleShow = function () {
    setShowChoice()
  }

  // Check to see if a subject has been set
  if (!subject) {
    return <p>Loading...</p>
  }

  // CHECK TO SEE IF A USER HAS VOTED
  if (subject.likes.some(e => e.user_id === userId)) {
    likeId = false
  }

  // Map over the top three choices by vote count
  const answer = leaders.map(i => (
    <div key={i.id}>
      {i.name} Votes= {i.vote}
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
                {likeId && <Button
                  subject={subject}
                  choice={choice}
                  props={choice}
                  onClick={() => updateVote(choice)}
                  variant="danger"
                  className="mr-2">
                  Vote
                </Button>}
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
      <h1 className="subject-header"
        style={{ color: '#fad1ad', fontSize: '100px', fontFamily: 'Bangers' }}>
        {subject.title}
      </h1>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row className="box" style={{ width: '50%' }}>
          <Card className='menu-item' style={{ backgroundColor: '#fae4ad' }}>
            <Card.Body>
              <Card.Header style={{ color: 'blue' }}>Description</Card.Header>
              <Card.Text style={{ color: 'blue' }}>
                {subject.description}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ color: 'blue' }}>Created by: {subject.user.email}</Card.Footer>
          </Card>
        </Row>
      </Container>
      {showChoice && <div>
        <div className="">
          {userId === subject.user.id &&
              <Button href={`#subjects/${props.match.params.id}/edit`}
                variant="primary"
                className="mr-2">Update Your Subject</Button>}
          {userId === subject.user.id &&
              <Button onClick={handleDelete}
                className="btn btn-danger">Remove Your Subject</Button>}
        </div>
        <h2 style={{ color: '#fad1ad',
          fontSize: '100px',
          fontFamily: 'Bangers',
          textDecorationLine: 'Underline' }}>
        Choices
        </h2>
        <div>
          <Button href={`#subjects/${props.match.params.id}/create-choice`}
            onClick={handleShow}
            subject={subject}
            variant="primary"
            className="mr-2">Add a Choice</Button>
        </div>
        <div className='directory-menu'>
          <Container>
            <h4 style={{ textAlign: 'center' }}>
            LEADERS
              {answer}
            </h4>
            <Row className="box">
              {choicesJsx}
            </Row>
          </Container>
        </div>
      </div>}
    </div>
  )
}

export default withRouter(Subject)
