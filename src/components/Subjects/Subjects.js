import React, { useEffect, useState } from 'react'

import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

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
    <div className="page-content">
      <div style={{ textAlign: 'center' }}>
        <h1>Choose A Poll</h1>
        <p>Add a choice to a Poll or cast a vote!</p>
      </div>
      <div className='directory-menu'>
        <Container>
          <Row className="box">
            {subjectsJsx}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Subjects
