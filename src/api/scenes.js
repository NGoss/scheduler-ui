import axios from 'axios'

const createScene = (name, showId) => {
  return axios.post(`http://localhost:8080/show/${showId}/scene`, {
    name
  })
}

const addCharacterToScene = (showId, sceneId, characterId) => {
  return axios.put(`http://localhost:8080/show/${showId}/scene/${sceneId}/character/${characterId}`)
}

const addCharactersToScene = (showId, sceneId, characterIds) => {
  return axios.put(`http://localhost:8080/show/${showId}/scene/${sceneId}/characters`,
    [...characterIds]
  )
}

const removeCharacterFromScene = (showId, sceneId, characterId) => {
  return axios.delete(`http://localhost:8080/show/${showId}/scene/${sceneId}/character/${characterId}`)
}

const deleteScene = (showId, sceneId) => {
  return axios.delete(`http://localhost:8080/show/${showId}/scene/${sceneId}`)
}

export default {
  createScene,
  deleteScene,
  addCharacterToScene,
  addCharactersToScene,
  removeCharacterFromScene
}
