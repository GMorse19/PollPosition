import React, { useEffect, useState } from 'react'

import SubjectsReturn from '../../helpers/subjectsReturn'

import { getSubjects } from '../../api/subjects'
import { jsx } from '../../helpers/jsx'

import './Subject.scss'

const Subjects = props => {
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    getSubjects(setSubjects, props)
  }, [])

  const subjectsJsx = jsx(subjects)

  return (
    <SubjectsReturn
      user={props.user}
      subjectsJsx={subjectsJsx}
    />
  )
}

export default Subjects
