import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import SubjectForm from './SubjectForm.js'

const SubjectCreate = props => {
  const [subject, setSubject] = useState({ title: '', description: '' })

  const handleChange = event => {
    event.persist()
    setSubject({ ...subject, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/subjects`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { subject }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You created a subject', variant: 'success' })
        props.history.push(`subjects/${response.data.subject.id}`)
      })
      .catch(console.error)
  }

  return (
    <div className="subject-board body">
      <SubjectForm
        subject={subject}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </div>
  )
}

export default withRouter(SubjectCreate)
