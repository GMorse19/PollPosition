import React from 'react'

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export function jsx (subjects) {
  return subjects.map(subject => (
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
}
