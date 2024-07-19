import axios from 'axios'

const createRehearsal = (showId, type, date, startTime, endTime, location, sceneIds) => {
  return axios.post('http://localhost:8080/rehearsal', {
    showId,
    type,
    start: `${date}T${startTime}`,
    end: `${date}T${endTime}`,
    location,
    sceneIds
  })
}

const findRehearsal = (rehearsalId) => {
  return axios.get(`http://localhost:8080/rehearsal/${rehearsalId}`)
}

const findAll = () => {
  return axios.get('http://localhost:8080/rehearsal')
}

export default {
  createRehearsal,
  findRehearsal,
  findAll
}
