import apiUrl from '../apiConfig'
import axios from 'axios'

export const getSubjects = (setSubjects, props) => {
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
}
