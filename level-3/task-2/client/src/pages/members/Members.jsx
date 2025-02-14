import React, { useState, useEffect, useContext } from "react";
import "./members.css";
import { getProjectsCall, getUsersCall } from "../../apiCalls";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/NavBar";
import { UserContext } from "../../context/UserContext";

const Members = () => {
  const { user: currentUser } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  // Function to handle update button click
  const handleUpdate = (id) => {
    console.log("Update user with id: ", id);
    navigate(`/home/users/${id}`, { state: { id } });
  };

  // Function to find project name by id
  const findProjectName = (id) => {
    const project = projects.find((project) => project._id === id);
    return project ? project.name : "Project not found";
  };

  // Function to check if user is in managed project
  const isUserInManagedProject = (userProjects) => {
    return userProjects.some((projectId) => {
      const project = projects.find((project) => project._id === projectId);
      return project && project.manager === currentUser._id;
    });
  };

  // useEffect to fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjectsCall();
        setProjects(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
  }, []);

  // useEffect to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersCall();
        const filteredUsers = res.filter(user => 
          user._id !== currentUser._id && 
          user.projects.some(projectId => 
            currentUser.projects.includes(projectId)
          )
        );
        setUsers(filteredUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [currentUser]);

  return (
    <>
      <Navbar />
      <div className="members">
        <h2>Project Members</h2>
        <table className="members-table">
          <thead>
            <tr>
              <th className="th-profile"></th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Projects</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={
                      process.env.REACT_APP_PROFILE_FOLDER +
                      (user.profilePicture || "blankProfilePicture.png")
                    }
                    alt="profile"
                    className="profile-picture"
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.projects && user.projects.length > 0 ? (
                    <ul>
                      {user.projects.map((projectId) => (
                        <li key={projectId}>{findProjectName(projectId)}</li>
                      ))}
                    </ul>
                  ) : (
                    "None"
                  )}
                </td>
                <td className="td-actions">
                  {isUserInManagedProject(user.projects) && (
                    <button id="update-user" onClick={() => handleUpdate(user._id)}>Update</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Members;
