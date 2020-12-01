import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';

// const link = new HttpLink({ uri: "http://localhost:5000/api/auth" })
const httpLink = new HttpLink({ uri: "http://localhost:5000/api/auth" })
const delay = setContext(_ => { // request object
    new Promise((success, _) => {
        setTimeout(() => {
            success();
        }, 800);
    })
});

const link = ApolloLink.from([delay, httpLink]);

const client = new ApolloClient({
    // uri: "http://localhost:5000/api/auth",
    link,
    cache: new InMemoryCache()
});


export default client;