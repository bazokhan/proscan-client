import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'class-names';
import { useMutation } from 'react-apollo';
import uuid from 'uuid/v4';
import { FaTrashAlt, FaCheck, FaPlus, FaCameraRetro } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DropZone from '../DropZone';
import Choice from '../Choice';
import multipleUploadGql from './gql/multipleUpload.gql';
import styles from './Question.module.scss';

const Question = ({ question, handleDeleteQuestion, handleUpdateQuestion }) => {
  const [body, setBody] = useState(question.body);
  const [choices, setChoices] = useState(question.choices);
  const [hasImages, setHasImages] = useState(false);

  const [mutipleUploadMutation] = useMutation(multipleUploadGql);
  const handleDropZoneSubmit = async files => {
    mutipleUploadMutation({
      variables: { files },
      update: (_, { data: { multipleUpload } }) => {
        toast.success('Images uploaded successfully');
        handleUpdateQuestion(question.id, {
          body,
          imageUrls: [
            ...question.imageUrls,
            ...multipleUpload.map(upload => upload.url)
          ],
          choices: choices.map(({ id, body: choiceBody, correct }) => ({
            id,
            body: choiceBody,
            correct
          }))
        });
      }
    });
  };

  const handleCreateChoice = () => {
    setChoices([
      ...choices,
      { id: uuid().slice(0, 10), body: '', correct: false }
    ]);
  };

  const handleDeleteChoice = choiceId => {
    setChoices(choices.filter(choice => choice.id !== choiceId));
  };

  const updateChoice = (id, choiceBody, correct) => {
    setChoices(
      choices.map(choice => {
        if (choice.id === id) {
          return { id: choice.id, body: choiceBody, correct };
        }
        return choice;
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <button
          type="button"
          className={cx(styles.buttonFab, styles.delete)}
          onClick={() => handleDeleteQuestion(question.id)}
        >
          <FaTrashAlt />
        </button>

        <label
          htmlFor={`${question.id}-hasImages`}
          className={cx(styles.buttonFab, {
            [styles.inactive]: !hasImages
          })}
        >
          <input
            type="checkbox"
            id={`${question.id}-hasImages`}
            checked={hasImages}
            onChange={() => setHasImages(!hasImages)}
          />
          <FaCameraRetro />
        </label>

        <button
          type="button"
          className={styles.buttonFab}
          onClick={handleCreateChoice}
        >
          <FaPlus />
        </button>

        <button
          type="button"
          className={styles.buttonFab}
          onClick={() =>
            handleUpdateQuestion(question.id, {
              body,
              imageUrls: question.imageUrls,
              choices: choices.map(({ id, body: choiceBody, correct }) => ({
                id,
                body: choiceBody,
                correct
              }))
            })
          }
          disabled={choices === question.choices && body === question.body}
        >
          <FaCheck />
        </button>
      </div>

      {hasImages && (
        <DropZone
          handleSubmit={handleDropZoneSubmit}
          images={question.imageUrls}
        />
      )}

      {!hasImages && (
        <>
          <textarea
            type="text"
            className={styles.questionBody}
            placeholder="Enter question text"
            name={`bodyof${question.id}`}
            onChange={e => setBody(e.target.value)}
            value={body}
          />

          <div className={styles.thumbsContainer}>
            {question.imageUrls.map(image => (
              <div
                key={image}
                className={styles.thumbnail}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
          {choices.map(choice => (
            <Choice
              key={choice.id}
              choice={choice}
              handleDeleteChoice={handleDeleteChoice}
              handleUpdateChoice={(choiceBody, correct) =>
                updateChoice(choice.id, choiceBody, correct)
              }
            />
          ))}
        </>
      )}
    </div>
  );
};

Question.propTypes = {
  handleDeleteQuestion: PropTypes.func.isRequired,
  handleUpdateQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

export default Question;
