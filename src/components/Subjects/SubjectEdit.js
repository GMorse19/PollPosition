import React, { useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import SubjectForm from './SubjectForm'
import { patchSubject } from '../../api/subjects'

const SubjectEdit = (props) => {
  const [subject, setSubject] = useState({ title: '', description: '' })
  const [updated, setUpdated] = useState(false)

  const handleChange = event => {
    event.persist()
    setSubject(subject => ({ ...subject, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    patchSubject(subject, props, setUpdated, 'subject')
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
