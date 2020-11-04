import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const link = new HttpLink({uri: "http://localhost:5000/api/auth"})
const client = new ApolloClient({
    // uri: "http://localhost:5000/api/auth",
    link,
    cache: new InMemoryCache()
});


export default client;