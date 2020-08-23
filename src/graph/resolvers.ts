import { gql } from "apollo-boost";

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      email
      token
      name
      tokenExpiration
    }
  }
`;

export const CREATEAPIKEY = gql`
  mutation {
    createAPIKey {
      key
      active
      user
    }
  }
`;

export const GETAPIKEY = gql`
  query {
    retrieveAPIKey
  }
`;

export const GENERATENEWKEY = gql`
  mutation generateNewAPIKey($password: String!) {
    generateNewAPIKey(password: $password)
  }
`;

export const CHANGEPASSWORD = gql`
  mutation changePassword($password: String!, $newPassword: String!) {
    changePassword(password: $password, newPassword: $newPassword)
  }
`;
