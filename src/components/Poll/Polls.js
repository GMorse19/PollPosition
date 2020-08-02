import React, { useEffect, useState } from 'react'

import { getSubjects } from '../../api/subjects'
import { jsx } from '../../helpers/jsx'

import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import './Poll.scss'

const Polls = props => {
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    getSubjects(setSubjects, props)
  }, [])

  const subjectsJsx = jsx(subjects)

  return (
    <div className="page-content">
      <div style={{ textAlign: 'center' }}>
        <h1>Please Sign In/Up</h1>
        <p>If you would like to create a Poll or cast a vote!</p>
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

export default Polls
