import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './log.css';

const Log = ({ logs, users, admin }) => {
  const { user: currentUser } = useContext(UserContext);

  const findUsername = (userId) => {
    const user = users.find(user => user._id === userId);
    if (user) {
      return user.username;
    } else if (!user && currentUser._id === userId) {
      return currentUser.username;
    } else if (!user && admin._id === userId) {
      return admin.username;
    } else {
      return "Unknown";
    }
  }

  return (
    <div className="logs">
      {logs.map(log => (
        <div className="log-entry" key={log._id}>
          <p>
            <span className="username">{findUsername(log.user)}</span>{" "}
            <span className={`action ${log.action}`}>{log.action}d</span>{" "}
            {log.entityType} "{log.title}" on <span className="timestamp">{new Date(log.timestamp).toLocaleString()}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Log;
