import gql from 'graphql-tag';

const signup = gql`
  mutation SIGNUP($data: InputSignUp) {
    signup(data: $data) {
      token
    }
  }
`;

export default signup;
