import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import ChoiceForm from './ChoiceForm.js'

const ChoiceCreate = props => {
  const [choice, setChoice] = useState({ subject_id: '', name: '', description: '', vote: '0' })
  choice.subject_id = props.match.params.id

  const handleChange = event => {
    event.persist()
    setChoice({ ...choice, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/choices`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { choice }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You created a choice', variant: 'success' })
        props.history.push(`choices/${response.data.choice.id}`)
      })
      .catch(console.error)
  }

  return (
    <div className="choice-board">
      <ChoiceForm
        props={props}
        choice={choice}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </div>
  )
}

export default withRouter(ChoiceCreate)
