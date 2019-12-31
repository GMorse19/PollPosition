import React, { useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ChoiceForm from './ChoiceForm'

const ChoiceEdit = (props) => {
  const [choice, setChoice] = useState({ subject_id: '', name: '', description: '', vote: '' })
  const [updated, setUpdated] = useState(false)
  // choice.subject_id = props.match.params.id
  console.log(props.match.url)

  const handleChange = event => {
    event.persist()
    setChoice(choice => ({ ...choice, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/choices/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { choice }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You updated a choice', variant: 'success' })
        setUpdated(true)
      })
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  console.log(choice)

  if (updated) {
    return <Redirect to={'/subjects'} />
  }

  return (
    <ChoiceForm
      props={props}
      choice={choice}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`#home/${props.match.params.id}`}
    />
  )
}

export default withRouter(ChoiceEdit)
