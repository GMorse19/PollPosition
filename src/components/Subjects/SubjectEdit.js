import React, { useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import SubjectForm from './SubjectForm'

const SubjectEdit = (props) => {
  const [subject, setSubject] = useState({ title: '', description: '' })
  const [updated, setUpdated] = useState(false)

  const handleChange = event => {
    event.persist()
    setSubject(subject => ({ ...subject, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/subjects/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { subject }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You updated a subject', variant: 'success' })
        setUpdated(true)
        props.history.push('/subjects')
      })
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  if (updated) {
    return <Redirect to={`/subjects/${props.match.params.id}`} />
  }

  return (
    <SubjectForm
      subject={subject}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`#home/${props.match.params.id}`}
    />
  )
}

export default withRouter(SubjectEdit)
