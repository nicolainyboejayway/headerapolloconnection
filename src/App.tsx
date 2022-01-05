import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const tokenID = "YourTokenHere";

const authLink = setContext((_, { headers }) => {
  //Here i get the authorization
  const token = tokenID;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        viewer {
          login
          repositories(last: 3) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    `,
  })
  .then((resp) => console.log(resp.data.viewer.repositories.edges))
  .catch((error) => console.error(error));

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">Hello World</div>;
    </ApolloProvider>
  );
}

export default App;
