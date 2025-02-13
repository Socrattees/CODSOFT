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

  const handleUpdate = (id) => {
    console.log("Update user with id: ", id);
    navigate(`/admin/users/${id}`, { state: { id } });
  };

  const findProjectName = (id) => {
    const project = projects.find((project) => project._id === id);
    return project ? project.name : "Project not found";
  };

  const isUserInManagedProject = (userProjects) => {
    return userProjects.some((projectId) => {
      const project = projects.find((project) => project._id === projectId);
      return project && project.manager === currentUser._id;
    });
  };

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
                    <button id="admin-update-user" onClick={() => handleUpdate(user._id)}>Update</button>
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
