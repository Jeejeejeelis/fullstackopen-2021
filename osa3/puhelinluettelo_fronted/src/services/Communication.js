import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const communicationService = {
  getAll: getAll,
  removePerson: removePerson,
  create: create,
  update: update
};

export default communicationService;