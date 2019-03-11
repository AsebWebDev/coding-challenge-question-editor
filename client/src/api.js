import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  getQuestions() {
    return service
      .get('/questions')
      .then(res => res.data)
      .catch(errHandler)
  },

  getQuestion(id) {
    return service
      .get('/questions/'+id)
      .then(res => res.data)
      .catch(errHandler)
  },

  editQuestion(id, question) {
    return service
      .post('/questions/'+id, question)
      .then(res => res.data)
      .catch(errHandler)
  },

  addQuestion(body) {
    return service
      .post('/questions', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  addPicture(file, index, direction, questionId) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("index", index)
    formData.append("direction", direction)
    formData.append("questionId", questionId)
    return service
      .post('/questions/add-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}
