import gql from 'graphql-tag';

export default gql`
  mutation MULTIPLE_UPLOAD($files: [Upload!]!) {
    multipleUpload(files: $files) {
      url
    }
  }
`;
