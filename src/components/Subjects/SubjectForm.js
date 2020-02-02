import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SubjectForm = ({ subject, handleSubmit, handleChange, cancelPath }) => (
  <div className="subject-board row body">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="content">Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Title..."
            value={subject.title}
            name="title"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            placeholder="Category..."
            value={subject.description}
            name="description"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
        <Link to="/subjects">
          <Button>Cancel</Button>
        </Link>
      </Form>
    </div>
  </div>
)

export default withRouter(SubjectForm)
