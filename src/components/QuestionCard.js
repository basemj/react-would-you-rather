import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import styles from "./questionCard.module.css";

const QuestionCard = props => {
  const { question, user } = props;

  return (
    <Card>
      <Card.Header>
        <img className={styles.avatar} src={`/assets/${user.avatarURL}`} alt="" />
        {`${user.name} asks`}
      </Card.Header>
      <Card.Body>
        <Card.Title>{`asks would you rather ${question.optionOne.text} or...`}</Card.Title>
        <Button as={Link} to={`questions/${question.id}`} variant="secondary">See question</Button>
      </Card.Body>
    </Card>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    optionOne: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }),
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    avatarURL: PropTypes.string,
    id: PropTypes.string,
  }),
};

QuestionCard.defaultProps = {
  question: {},
  user: {},
};

const mapStateToProps = ({ users }, ownProps) => {
  const { question } = ownProps;
  const user = question && users && users[question.author];
  return {
    user,
  };
};

export default connect(mapStateToProps)(QuestionCard);
