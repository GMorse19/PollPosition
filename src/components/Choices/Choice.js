import React from 'react'
import Button from 'react-bootstrap/Button'
// import axios from 'axios'
import { withRouter } from 'react-router-dom'
// import apiUrl from '../../apiConfig'

const Choice = ({ name, description, vote }) => (
  <div>
    <p>{ name }: { description } - { vote }</p>
    <Button>Vote</Button>
  </div>
)

export default withRouter(Choice)
