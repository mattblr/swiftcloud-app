import React from "react";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import store from "./redux/store";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache,
  resolvers: {},
  request: (operation) => {
    const token: any = store.getState().authSlice.token;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

const data = {};

cache.writeData({ data });

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App"></div>
    </ApolloProvider>
  );
}

export default App;
