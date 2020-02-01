import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const ChoiceEdit = (props) => {
  const [choice, setChoice] = useState({ subject_id: '', name: '', description: '', vote: '' })
  const [updated, setUpdated] = useState(false)
  const [voted, setVoted] = useState(false)

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

  const sub = choice.subject
  const arr = []
  for (const key in sub) {
    arr.push(sub[key])
  }

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
        setChoice(choice)
        return <Redirect to={`/subjects/${arr[0]}`} />
      })
      .catch(console.error)
  }

  const addVote = function () {
    choice.vote += 1
    updateVote()
  }

  if (updated) {
    return <Redirect to={`/subjects/${arr[0]}`} />
  }

  if (voted) {
    addVote()
  }

  return (
    <div>
      {choice.vote}
    </div>
  )
}

export default withRouter(ChoiceEdit)
