import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { Link as RouterLink } from 'react-router-dom';
import Main from 'layout/Main';
import {
  Link,
  CircularProgress,
  Button,
  Typography,
  Card,
  CardContent
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import useStyles from 'app/Theme';
import Question from '../components/Question';
import Choice from '../components/Choice';
import sessionByIDGql from '../gql/sessionByID.gql';

const Details = ({ match }) => {
  const classes = useStyles();

  const { data } = useQuery(sessionByIDGql, {
    variables: { publicId: match.params.sessionId }
  });
  const { sessionByID: session, error, loading } = data;
  if (error) return <div>Error</div>;
  if (loading)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  if (!session)
    return <div>Session Could not be loaded, please try again!</div>;

  return (
    <Main>
      <Typography component="h1" variant="h6">
        {session.name}
      </Typography>

      <Button variant="text">
        <Link to={`/sessions/${session.publicId}/edit`} component={RouterLink}>
          Edit
        </Link>
      </Button>
      <Button variant="text">
        <Link
          to={`/sessions/${session.publicId}/preview`}
          component={RouterLink}
        >
          Preview
        </Link>
      </Button>
      <Button variant="contained">
        <Link
          to={`/sessions/${session.publicId}/start`}
          component={RouterLink}
          className={classes.rowCenter}
        >
          Start &nbsp; <SendIcon />
        </Link>
      </Button>
      {session.questions.map((question, questionIndex) => (
        <Card className={classes.card} key={question.id}>
          <CardContent>
            <Question
              label={`Question ${questionIndex + 1} : `}
              question={question}
            >
              {question.choices.map((choice, choiceIndex) => (
                <Choice
                  label={`${choiceIndex + 1} - `}
                  key={choice.id}
                  choice={choice}
                />
              ))}
            </Question>
          </CardContent>
        </Card>
      ))}
      <Button variant="text">
        <Link to="/sessions/" component={RouterLink}>
          Back To My Sessions
        </Link>
      </Button>
    </Main>
  );
};

Details.propTypes = {
  match: PropTypes.object.isRequired
};

export default Details;
