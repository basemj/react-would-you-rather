import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA';
import { saveQuestionAnswers, saveQuestion } from "./questions";
import { saveUserAnswers, saveUserQuestion } from "./users";

const handleSaveQuestionAnswer = (authedUser, qid, answer) => {
  return dispatch => {
    return _saveQuestionAnswer({authedUser, qid, answer})
      .then(() => {
        dispatch(saveUserAnswers(authedUser, qid, answer));
        dispatch(saveQuestionAnswers(authedUser, qid, answer));
      });
  };
};

const handleSaveQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const {authedUser} = getState();
    return _saveQuestion({optionOneText, optionTwoText, author: authedUser})
      .then((question) => {
        dispatch(saveQuestion(question));
        dispatch(saveUserQuestion(authedUser, question.id));
      });
  };
};

export { handleSaveQuestionAnswer, handleSaveQuestion };
