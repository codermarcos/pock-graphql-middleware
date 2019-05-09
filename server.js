
const { ApolloServer, gql } = require('apollo-server');
const { Datasource } = require('./datasource');

const typeDefs = gql`
  type Unidade {
    id: ID!
    nome: String
    marca: String
    codigo: String
    unidade: String
  }

  input UnidadeInsert {
    nome: String
    marca: String
    codigo: String
    unidade: String
  }

  input UnidadeUpdate {
    id: ID!
    nome: String
    marca: String
    codigo: String
    unidade: String
  }

  type Query {
    unidades: [Unidade],
    unidade(id: ID!): Unidade
  }

  type Mutation {
    delUnidade(id: ID!): Unidade
    addUnidade(unidade: UnidadeInsert): Unidade
    updateUnidade(unidade: UnidadeUpdate): Unidade
  }
`;
const resolvers = {
  Query: {
    unidades: (_, args, { dataSources }) => dataSources.unidades.getUnidades(),
    unidade: (_, { id }, { dataSources }) => dataSources.unidades.getUnidadeById(id),
  },
  Mutation: {
    delUnidade: (_, { id }, { dataSources }) => dataSources.unidades.deleteUnidade(id),
    addUnidade: (_, { unidade }, { dataSources }) => dataSources.unidades.postUnidade(unidade),
    updateUnidade: (_, { unidade }, { dataSources }) => dataSources.unidades.putUnidade(unidade),
  },
}


const server = new ApolloServer({
  dataSources: () => ({ unidades: new Datasource() }),
  resolvers,
  typeDefs,
})

server
  .listen()
  .then(
    ({ url }) => console.log(`🚀  Server ready at ${url}`)
  )