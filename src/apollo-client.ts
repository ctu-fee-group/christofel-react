import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.apiUrl,
  cache: new InMemoryCache(),
});

export default client;
