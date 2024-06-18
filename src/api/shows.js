import axios from 'axios'

const createShow = (name) => {
  return axios.post('http://localhost:8080/show', {
    name
  })
}

const findShow = (showId) => {
  return axios.get(`http://localhost:8080/show/${showId}`)
}

const findAll = () => {
  return axios.get('http://localhost:8080/show')
}

const addStaff = (showId, name, type) => {
  return axios.put(`http://localhost:8080/show/${showId}/staff`, {
    name,
    type
  })
}

const addActor = (showId, name) => {
  return axios.post(`http://localhost:8080/show/${showId}/actor`, {
    name
  })
}

const updateActor = (showId, actor) => {
  return axios.put(`http://localhost:8080/show/${showId}/actor/${actor.id}`, {
    ...actor
  })
}

const deleteActor = (showId, actorId) => {
  return axios.delete(`http://localhost:8080/show/${showId}/actor/${actorId}`)
}

export default {
  createShow,
  findShow,
  findAll,
  addStaff,
  addActor,
  updateActor,
  deleteActor
}
