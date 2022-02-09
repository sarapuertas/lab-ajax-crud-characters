class APIHandler {
  constructor(url) {
    this.axiosApp = axios.create({
      baseURL: url
    })
  }

  getFullList() {
    return this.axiosApp.get('/')
  }

  getOneRegister(chId) {
    return this.axiosApp.get(`/${chId}`)
  }

  createOneRegister(chInf) {
    return this.axiosApp.post('/', chInf)
  }

  updateOneRegister(chInf) {
    return this.axiosApp.put(`/${chInf.id}`, chInf)
  }

  deleteOneRegister(chId) {
    return this.axiosApp.delete(`/${chId}`)
  }
}
