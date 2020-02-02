import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import './Subject.scss'

const Subjects = props => {
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/subjects`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(response => {
        setSubjects(response.data.subjects)
      })
      .catch(console.error)
  }, [])

  const subjectsJsx = subjects.map(subject => (
    <div className='homepage' key={subject.id}>
      {<Col lg={3} xs={3} md={3}>
        <Button style={{ backgroundColor: '#fae4ad' }} as={'a'} href={`#/subjects/${subject.id}`}><div className="menu-item">
          <div className='content'>
            <h1 className="title">{subject.title}</h1>
            <p className='subtitle'>Creator: {subject.user.email}</p>
          </div>
        </div></Button>
      </Col>}
    </div>
  ))

  return (
    <div className="page-content">
      <div style={{ textAlign: 'center' }}>
        <h1>Choose an Event</h1>
        <p>Add a choice or cast a vote!</p>
      </div>
      <div className='directory-menu'>
        <Container>
          <Row>
            {subjectsJsx}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Subjects
