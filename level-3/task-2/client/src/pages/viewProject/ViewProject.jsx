import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectCall, getUsersCall } from '../../apiCalls';
import "./view-project.css";
import Navbar from '../../components/navbar/NavBar';

const ViewProject = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(null);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to determine if the end date is within a week
  const isLessThanAWeekLeft = (endDate) => {
    const currentDate = new Date();
    const end = new Date(endDate);
    const diffTime = end - currentDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays < 7;
  };

  // Function to get user name by id
  const getUserNameById = (userId) => {
    const user = users.find(user => user._id === userId);
    return user ? user.username : 'Unknown User';
  };

  // Function to assign priority class
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'view-project-priority-high';
      case 'medium':
        return 'view-project-priority-medium';
      case 'low':
        return 'view-project-priority-low';
      default:
        return '';
    }
  };


  // useEffect to fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjectCall(id);
        setProject(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, [id]);

  // useEffect to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersCall();
        setUsers(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="view-project">
        <h2>Project Details</h2>
        <div className="project-details">
          <div id="project-name" className="detail-item">
            <strong>Project Name:</strong> {project.name}
          </div>
          <div className="detail-item">
            <strong>Description:</strong>
            <p>{project.description}</p>
          </div>
          <div className="detail-item">
            <strong>Start Date:</strong> {formatDate(project.startDate)}
          </div>
          <div className="detail-item">
            <strong>End Date:</strong>
            <span className={isLessThanAWeekLeft(project.endDate) ? "project-deadline-soon" : ""}>{formatDate(project.endDate)}</span>
          </div>
          <div className="detail-item">
            <strong>Manager:</strong>
            {project.manager ?
              getUserNameById(project.manager)
              : <span style={{ color: 'red' }}>No manager assigned</span>}
          </div>
          <div className="detail-item">
            <strong>Members:</strong>
            {project.members && project.members.length > 0 ? (
              <ul>
                {project.members.map((memberId) => (
                  <li key={memberId}>{getUserNameById(memberId)}</li>
                ))}
              </ul>
            ) : (
              <p>No members assigned</p>
            )}
          </div>
          <div className="detail-item">
            <strong>Status:</strong> {project.status}
          </div>
          <div className={"detail-item"}>
            <strong>Priority:</strong> <span className={getPriorityClass(project.priority)}>{project.priority}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
