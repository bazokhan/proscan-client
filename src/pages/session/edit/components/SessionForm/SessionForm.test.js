/* eslint-disable no-undef */
import {
  isEqual,
  // questionWithNewChoices,
  updateQuestion
  // findQuestionByChoice
} from './SessionForm';

const question1 = {
  id: 'q1',
  body: 'hiiii'
};

const question2 = {
  id: 'q1',
  body: 'looool',
  choices: []
};

const question3 = {
  id: 'q3',
  body: 'hiiii'
};

const session = {
  id: 's1',
  questions: []
};

const newSession = updateQuestion(session, question1, question2, question3);

test('finds two identical objects', () => {
  expect(isEqual(question1, question2)).toBe(true);
  expect(isEqual(question1, question3)).toBe(false);
});

test('adds questions to session', () => {
  expect(newSession.questions.length).toBe(3);
});
