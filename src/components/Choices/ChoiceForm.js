import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChoiceForm = ({ props, subjectId, choice, handleSubmit, handleChange, cancelPath }) => (
  <div className="subject-board row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="content">Subject_id</Form.Label>
          <Form.Control
            required
            type="text"
            value={choice.subject_id}
            name="subject_id"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="content">Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={choice.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            placeholder="Category..."
            value={choice.description}
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Vote</Form.Label>
          <Form.Control
            required
            placeholder="Vote..."
            value={choice.vote}
            name="vote"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
        <Link to="/choices">
          <Button>Cancel</Button>
        </Link>
      </Form>
    </div>
  </div>
)

export default withRouter(ChoiceForm)
