import gql from 'graphql-tag';

export default gql`
  mutation CHANGE_STATUS($publicId: String!, $status: Status!) {
    changeSessionStatus(publicId: $publicId, status: $status) {
      id
      publicId
      status
      activeQuestion
    }
  }
`;
