import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChoiceForm = ({ props, subjectId, choice, handleSubmit, handleChange, cancelPath }) => (
  <div className="subject-board row body">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <h1>Create A Choice</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="content"></Form.Label>
          <Form.Control
            type="hidden"
            value={choice.subject_id}
            name="subject_id"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="content">TITLE</Form.Label>
          <Form.Control
            required
            type="text"
            value={choice.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            required
            placeholder="Category..."
            value={choice.description}
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control
            type="hidden"
            placeholder="Vote..."
            value={choice.vote}
            name="vote"
            onChange={handleChange}
          />
        </Form.Group>

        <Button style={{ margin: '10px' }} variant="primary" type="submit">Submit</Button>
        <Link to="/">
          <Button style={{ margin: '10px' }}>Cancel</Button>
        </Link>
      </Form>
    </div>
  </div>
)

export default withRouter(ChoiceForm)
