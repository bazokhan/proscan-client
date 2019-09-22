import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import uuid from 'uuid/v4';
import { FaTrashAlt, FaCheck, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DropZone from '../DropZone';
import Choice from '../Choice';
import multipleUploadGql from './gql/multipleUpload.gql';

// import singleUploadGql from './gql/singleUpload.gql';

const Question = ({ question, handleDeleteQuestion, handleUpdateQuestion }) => {
  const [body, setBody] = useState(question.body);
  const [choices, setChoices] = useState(question.choices);
  const [hasImages, setHasImages] = useState(question.imageUrls.length > 0);

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
    <div>
      <button
        type="button"
        className="button-fab"
        onClick={() => handleDeleteQuestion(question.id)}
      >
        <FaTrashAlt />
      </button>

      <label htmlFor="hasImages">
        <input
          type="checkbox"
          name="hasImages"
          checked={hasImages}
          onChange={() => setHasImages(!hasImages)}
        />
        <span>This Question Has {hasImages ? '' : 'No'} Images.</span>
      </label>
      {hasImages && (
        <DropZone
          handleSubmit={handleDropZoneSubmit}
          images={question.imageUrls}
        />
      )}

      <textarea
        type="text"
        className="textarea"
        placeholder="Enter question text"
        name={`bodyof${question.id}`}
        onChange={e => setBody(e.target.value)}
        value={body}
      />

      <button type="button" className="button-fab" onClick={handleCreateChoice}>
        <FaPlus />
      </button>
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
      <button
        type="button"
        className="button-fab"
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
      >
        <FaCheck />
      </button>
    </div>
  );
};

Question.propTypes = {
  handleDeleteQuestion: PropTypes.func.isRequired,
  handleUpdateQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

export default Question;
