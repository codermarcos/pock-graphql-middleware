const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class Datasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/';
  }


  getUnidades() {
    return this.get(`unidades`)
  }

  getUnidadeById(unidadeId) {
    return this.get(`unidades/${unidadeId}`)
  }

  postUnidade(unidade) {
    return this.post(`unidades`, { ...unidade })
  }

  putUnidade(unidade) {
    return this.put(`unidades/${unidade.id}`, { ...unidade })
  }

  deleteUnidade(unidadeId) {
    return this.delete(`unidades/${unidadeId}`)
  }
}