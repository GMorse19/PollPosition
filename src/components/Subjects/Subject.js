import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Subject = props => {
  const [subject, setSubject] = useState(null)
  const userId = props.user ? props.user_id : null
  // const [choice, setChoice] = useState({ subject_id: '', name: '', description: '', vote: '' })
  // const [updated, setUpdated] = useState(false)
  console.log(props.user_id)
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
    <div key={choice.id}>
      <h4>{choice.name} : {choice.description} :: {props.match.params.id}/{choice.id} - {choice.vote} -</h4>
      <Button href={`#subjects/${props.match.params.id}/choices/${choice.id}/edit-choice`} subject={subject} choice={choice} variant="danger" className="mr-2">Vote</Button>
    </div>
  ))

  // const addVote = subject.choices.map(choice => (
  //   choice.vote += 1
  // ))

  return (
    <div className="subject-board">
      <h1>UserId: {userId}</h1>
      <h1>Title: {subject.title}</h1>
      <h3>Description: {subject.description}</h3>
      <h3>ID: {subject.id}</h3>
      <h3>User: {subject.user.email}</h3>
      <h2 style={{ textAlign: 'center' }}>Choices: {choicesJsx}</h2>
      <div>
        <Button href={`#subjects/${props.match.params.id}/edit`} variant="primary" className="mr-2">Update</Button>
        {userId === subject.user_id && <Button onClick={handleDelete} className="btn btn-danger">delete</Button>}
        <Button href={`#subjects/${props.match.params.id}/create-choice`} subject={subject} variant="primary" className="mr-2">Add a Choice</Button>
      </div>
    </div>
  )
}

export default withRouter(Subject)
