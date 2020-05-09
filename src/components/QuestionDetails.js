import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { handleSaveQuestionAnswer } from '../actions/sharedHandlers';
import styles from './questionDetails.module.css';

const QuestionDetails = props => {
  const {
    authedUser,
    question,
    author,
    isAnswered,
    answeredOption,
    optionOneCount,
    optionOnePercentage,
    optionTwoCount,
    optionTwoPercentage,
    dispatch,
  } = props;

  if (!question.id) {
    return (
      <div>
        <p>
          Cannot find question!
        </p>
        <Button as={Link} to="/" variant="primary">Return Home</Button>
      </div>
    );
  }

  const submitAnswer = (answer) => {
    dispatch(handleSaveQuestionAnswer(authedUser, question.id, answer));
  };

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <Card>
          <Card.Header>
            <div className="media">
              <img className={styles.avatar} src={`/assets/${author.avatarURL}`} alt="" />
              <div className="media-body">
                <h1 className="display-4">{`${author.name} asks`}</h1>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <p>would you rather...</p>

            <Card body>
              <Row>
                <Col sm={2}>
                  <Button
                    variant={isAnswered ? 'secondary' : 'primary'}
                    type="button"
                    disabled={isAnswered} 
                    onClick={() => submitAnswer('optionOne')}
                  >
                    <b>A</b>
                  </Button>
                </Col>

                <Col>
                  <p>
                    <b>
                      {question.optionOne.text}
                    </b>
                  </p>
                  { isAnswered && (
                    <p>
                      {`This answer was selected by ${optionOneCount} (${optionOnePercentage}%) `}
                      {optionOneCount === 1 ? 'person' : 'people'}
                    </p>
                  )}
                </Col>
              </Row>
            </Card>

            <Card body className="mt-3">
              <Row>
                <Col sm={2}>
                  <Button
                    variant={isAnswered ? 'secondary' : 'primary'}
                    type="button"
                    disabled={isAnswered} 
                    onClick={() => submitAnswer('optionTwo')}
                  >
                    <b>B</b>
                  </Button>
                </Col>

                <Col>
                  <p>
                    <b>
                      {question.optionTwo.text}
                    </b>
                  </p>
                  { isAnswered && (
                    <p>
                      {`This answer was selected by ${optionTwoCount} (${optionTwoPercentage}%) `}
                      {optionTwoCount === 1 ? 'person' : 'people'}
                    </p>
                  )}
                </Col>
              </Row>
            </Card>
          </Card.Body>

          { isAnswered && (
            <Card.Footer>
                {'You answered you would rather '}
                {question[answeredOption].text}
            </Card.Footer>
          )}
        </Card>
      </Col>
    </Row>
  );
};

QuestionDetails.propTypes = {
  authedUser: PropTypes.string.isRequired,
  answeredOption: PropTypes.string,
  author: PropTypes.shape({
    id: PropTypes.string,
    avatarURL: PropTypes.string,
    name: PropTypes.string,
  }),
  isAnswered: PropTypes.bool,
  optionOneCount: PropTypes.number,
  optionOnePercentage: PropTypes.number,
  optionTwoCount: PropTypes.number,
  optionTwoPercentage: PropTypes.number,
  question: PropTypes.shape({
    id: PropTypes.string,
    optionOne: PropTypes.object,
    optionTwo: PropTypes.object,
  }),
  dispatch: PropTypes.func.isRequired,
};

QuestionDetails.defaultProps = {
  answeredOption: '',
  optionOneCount: 0,
  optionOnePercentage: 0,
  optionTwoCount: 0,
  optionTwoPercentage: 0,
  author: {},
  isAnswered: false,
  question: {},
};

const mapStateToProps = ({ authedUser, users, questions }, ownProps) => {
  const { questionId } = ownProps;
  const question = questions[questionId];
  const author = question && users[question.author];
  const isAnswered = question &&
  [
    ...question.optionOne.votes,
    ...question.optionTwo.votes
  ].includes(authedUser);

  const optionOneCount = question && question.optionOne.votes.length;
  const optionTwoCount = question && question.optionTwo.votes.length;

  const optionOnePercentage = optionOneCount ?
    Math.round(100 / (optionOneCount + optionTwoCount) * optionOneCount) : 0;

  const optionTwoPercentage = optionTwoCount ?
    Math.round(100 / (optionOneCount + optionTwoCount) * optionTwoCount) : 0;

  const answeredOption = isAnswered &&
    question.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo';

  return {
    authedUser,
    question,
    author,
    isAnswered,
    answeredOption,
    optionOneCount,
    optionOnePercentage,
    optionTwoCount,
    optionTwoPercentage,
  };
};

export default connect(mapStateToProps)(QuestionDetails);
