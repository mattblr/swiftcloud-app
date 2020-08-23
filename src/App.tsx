import React from "react";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import {
  BrowserRouter,
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";

import store from "./redux/store";
import Login from "./pages/Login";
import Home from "./pages/Home";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: process.env.REACT_APP_APIURL,
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

export const PrivateRoute = ({ component, ...rest }: RouteProps) => {
  if (!component) {
    throw Error("component is undefined");
  }

  const Component = component;
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (store.getState().authSlice.token) {
      return <Component {...props} />;
    }
    return <Redirect to={{ pathname: "/login" }} />;
  };

  return <Route {...rest} render={render} />;
};

export const PublicRoute = ({ component, ...rest }: RouteProps) => {
  if (!component) {
    throw Error("component is undefined");
  }

  const Component = component;
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (!store.getState().authSlice.token) {
      return <Component {...props} />;
    }
    return <Redirect to={{ pathname: "/" }} />;
  };

  return <Route {...rest} render={render} />;
};
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <PrivateRoute exact path="/" component={Home} />
          <PublicRoute exact path="/login" component={Login} />
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
