import gql from 'graphql-tag';

export default gql`
  mutation SINGLE_UPLOAD($file: Upload!) {
    singleUpload(file: $file) {
      url
    }
  }
`;
