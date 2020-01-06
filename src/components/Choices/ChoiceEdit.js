import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import ChoiceForm from './ChoiceForm'

const ChoiceEdit = (props) => {
  const [choice, setChoice] = useState({ subject_id: '', name: '', description: '', vote: '' })
  const [updated, setUpdated] = useState(false)
  const [voted, setVoted] = useState(false)
  // const [vote, setVote] = useState(0)
  // choice.subject_id = props.match.params.id
  // console.log(props.match.params)
  // console.log(vote)
  // const addVote = function () {
  //   choice.vote += 1
  //   updateVote()
  // }

  useEffect(() => {
    axios({
      url: `${apiUrl}/choices/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setChoice(res.data.choice))
      .then(res => {
        setVoted(true)
      })
      .catch(console.error)
  }, [])

  // const handleChange = event => {
  //   event.persist()
  //   setChoice(choice => ({ ...choice, [event.target.name]: event.target.value }))
  // }

  // const addVote = function () {
  //   choice.vote += 1
  // }

  // choice.vote += 1
  console.log(choice.vote)
  // console.log(vote)

  const updateVote = () => {
    axios({
      url: `${apiUrl}/choices/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { choice }
    })
      .then(res => {
        setUpdated(true)
      })
      .catch(console.error)
  }

  // const handleSubmit = event => {
  //   event.preventDefault()
  //
  //   axios({
  //     url: `${apiUrl}/choices/${props.match.params.id}`,
  //     method: 'PATCH',
  //     headers: {
  //       'Authorization': `Token token=${props.user.token}`
  //     },
  //     data: { choice }
  //   })
  //     .then(response => {
  //       props.alert({ heading: 'Success', message: 'You updated a choice', variant: 'success' })
  //       // setUpdated(true)
  //     })
  //     .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  // }

  console.log(choice)

  const addVote = function () {
    choice.vote += 1
    updateVote()
  }

  // if (voted) {
  //   addVote()
  // }

  if (updated) {
    return <Redirect to={'/subjects'} />
  }

  if (voted) {
    addVote()
  }

  return (
    <div>
      {choice.vote}
    </div>
  )

  // return (
  //   <ChoiceForm
  //     props={props}
  //     choice={choice}
  //     handleChange={handleChange}
  //     cancelPath={`#home/${props.match.params.id}`}
  //   />
  // )
}

export default withRouter(ChoiceEdit)
