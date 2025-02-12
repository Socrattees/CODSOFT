import React, { useEffect, useState } from 'react';
import { getLogsCall } from '../../apiCalls';

const Log = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getLogsCall();
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="logs-container">
      {logs.map(log => (
        <div className="log-entry" key={log._id}>
          <h3>{log.title}</h3>
          <p>Type: {log.entityType}</p>
          <p>Entity ID: {log.entityId}</p>
          <p>Action: {log.action}</p>
          <p>User: {log.user}</p>
          <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Log;