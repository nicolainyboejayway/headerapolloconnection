import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import RenderGitHubInfo from "./Components/RenderGitHubInfo";
import MutateGitHubDiscussion from "./Components/MutateGitHubDiscussion";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const tokenID = "YourTokenGoesHere";

const authLink = setContext((_, { headers }) => {
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

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RenderGitHubInfo />
        <MutateGitHubDiscussion />
      </div>
    </ApolloProvider>
  );
}

export default App;
