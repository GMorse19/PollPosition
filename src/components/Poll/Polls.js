import React, { useEffect, useState } from 'react'

import { getSubjects } from '../../api/subjects'
import { jsx } from '../../helpers/jsx'

import SubjectsReturn from '../../helpers/subjectsReturn'

import './Poll.scss'

const Polls = props => {
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    getSubjects(setSubjects, props)
  }, [])

  const subjectsJsx = jsx(subjects)

  return (
    <SubjectsReturn
      subjectsJsx={subjectsJsx}
    />
  )
}

export default Polls
