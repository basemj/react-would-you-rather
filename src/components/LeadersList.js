import PropTypes from "prop-types";
import React from 'react';
import { connect } from 'react-redux';
import { Card } from "react-bootstrap";
import styles from "./leadersList.module.css";

const LeadersList = ({orderedUsers}) => {
  return (
    <ul className={styles.leadersList}>
      {
        orderedUsers.map((user) => {
          return (
            <li key={user.id}>
              <Card>
                <Card.Header>
                  <img 
                    className={styles.avatar}
                    src={`/assets/${user.avatarURL}`}
                    alt={`${user.name}'s avatar`}
                  />
                  {user.name}
                </Card.Header>
                <Card.Body>
                  <p>
                    <span>Questions asked: </span>
                    <b> 
                      {' '}
                      {user.asked.length}
                    </b>
                  </p>
                  <p>
                    <span>Questions answered: </span>
                    <b> 
                      {user.answered.length}
                    </b>
                  </p>
                </Card.Body>
              </Card>
            </li>
          );
        })
      }
    </ul>
  );
};

LeadersList.propTypes = {
  orderedUsers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatarURL: PropTypes.string,
    asked: PropTypes.array,
    answered: PropTypes.array,
  })).isRequired
};

const mapStateToProps = ({ users }) => {
  const usersArray = Object.keys(users).map(userId => {
    const user = users[userId];
    const answered = Object.keys(user.answers);
    const asked = Object.keys(user.questions);
    const score = answered.length + asked.length;
    return {
      ...user,
      answered,
      asked,
      score,
    };
  });

  const orderedUsers = usersArray.sort((a, b) => b.score - a.score);

  return {
    orderedUsers,
  };
};

export default connect(mapStateToProps)(LeadersList);
