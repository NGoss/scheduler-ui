import axios from 'axios'

const createCharacter = (showId, name) => {
  return axios.post(`http://localhost:8080/show/${showId}/character`, {
    name
  })
}

const castActorAsCharacter = (showId, characterId, actorId) => {
  return axios.put(`http://localhost:8080/show/${showId}/character/${characterId}/actor/${actorId}`)
}

const uncastCharacter = (showId, characterId) => {
  return axios.delete(`http://localhost:8080/show/${showId}/character/${characterId}/actor`)
}

const deleteCharacter = (showId, characterId) => {
  return axios.delete(`http://localhost:8080/show/${showId}/character/${characterId}`)
}

export default {
  createCharacter,
  castActorAsCharacter,
  uncastCharacter,
  deleteCharacter
}
