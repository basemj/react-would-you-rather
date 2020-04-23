import { _saveQuestionAnswer } from '../utils/_DATA';
import { saveQuestionAnswers } from "./questions";
import { saveUserAnswers } from "./users";

const handleSaveQuestionAnswer = (authedUser, qid, answer) => {
  return dispatch => {
    return _saveQuestionAnswer({authedUser, qid, answer})
      .then(() => {
        dispatch(saveUserAnswers(authedUser, qid, answer));
        dispatch(saveQuestionAnswers(authedUser, qid, answer));
      });
  };
};

export { handleSaveQuestionAnswer };
