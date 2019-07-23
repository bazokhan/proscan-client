import { gql } from 'apollo-boost';

const login = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default login;
