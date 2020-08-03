// import React from 'react'

import apiUrl from '../apiConfig'
import axios from 'axios'

// import { Redirect } from 'react-router-dom'

export const getSubjects = (setSubjects, props) => {
  axios({
    url: `${apiUrl}/subjects`,
    method: 'GET'
  })
    .then(response => {
      setSubjects(response.data.subjects)
    })
    .catch(console.error)
}

export const patchSubject = (subject, props, setUpdated, dataChoice, setChoice, arr) => {
  console.log(dataChoice)
  axios({
    url: `${apiUrl}/${dataChoice}s/${props.match.params.id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${props.user.token}`
    },
    data: { subject }
  })
    .then(response => {
      props.alert({ heading: 'Success', message: `You updated a ${dataChoice}`, variant: 'success' })
      setUpdated(true)
      if (setChoice) {
        setChoice(subject)
      } else {
        props.history.push('/subjects')
      }
    })
    .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
}
