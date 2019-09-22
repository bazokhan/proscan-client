import React from 'react';
import PropTypes from 'prop-types';
import Choice from '../Choice';
import styles from './Question.module.scss';

const Question = ({ question }) => (
  <div className={styles.container}>
    {question.imageUrls.map(url => (
      <a
        key={url}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.preview}
      >
        <img src={url} alt={question.body} />
      </a>
    ))}
    <h3 className="h3">{question.body}</h3>

    {question.choices.map(choice => (
      <Choice key={choice.id} choice={choice} />
    ))}
  </div>
);

Question.propTypes = {
  question: PropTypes.object.isRequired
};

export default Question;
