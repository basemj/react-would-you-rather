import PropTypes from "prop-types";
import React from 'react';
import { connect } from 'react-redux';

const LeadersList = ({orderedUsers}) => {
  return (
    <ul>
      {
        orderedUsers.map((user) => {
          return (
            <li key={user.id}>
              <img src={`/assets/${user.avatarURL}`} alt="" />
              {user.name}
              {user.asked.length}
              {user.answered.length}
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
