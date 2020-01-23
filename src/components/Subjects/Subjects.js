import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const Subjects = props => {
  const [subjects, setSubjects] = useState([])
  // const userId = props.user.id
  // const [choices, setChoices] = useState([])

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
        // setChoices(response.data.subjects.choices)
        console.log(response.data.subjects[1].choices)
      })
      // .then(() => props.alert({ heading: 'Success', message: 'You got Subjects', variant: 'success' }))
      .catch(console.error)
  }, [])

  const subjectsJsx = subjects.map(subject => (
    <div key={subject.id}>
      {<Button className="subject-container" as={'a'} href={`#/subjects/${subject.id}`}><p className="text-shadow">Subject ID : {subject.id}<br/>Title: {subject.title} <br /> Description: {subject.description}<br/>by - {subject.user.email}</p></Button>}
    </div>
  ))

  // const choicesJsx = choices.map(choice => (
  //   <div key={choice.id}>
  //     <p>{choice.name}</p>
  //   </div>
  // ))

  return (
    <div style={{ textAlign: 'center' }} className="subject-board">
      <h1>Choose a subject to UPDATE or DELETE.</h1>
      <Container>
        <Row>
          <Col>{subjectsJsx}</Col>
        </Row>
      </Container>
    </div>
  )
}

export default Subjects
