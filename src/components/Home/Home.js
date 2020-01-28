import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import './Home.scss'

const Home = () => {
  return (
    <Container fluid="md">
      <Row className="box">
        <Col>
          <img
            className="center-height"
            src="PollPositionHome.png"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
