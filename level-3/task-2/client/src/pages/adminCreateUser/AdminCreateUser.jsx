import React, { useState, useEffect } from 'react';
import "./admin-create-user.css";
import { useNavigate } from 'react-router-dom';
import { checkEmailCall, checkUsernameCall, registerCall, getProjectsCall } from '../../apiCalls';

const AdminCreateUser = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [allProjects, setAllProjects] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== retypePassword) {
      setError("Passwords do not match");
      return;
    }

    // Check if the username is unique
    const isUsernameUnique = await checkUsernameCall(username);
    if (!isUsernameUnique) {
      setError("Username is already taken");
      return;
    }

    // Check if the email is unique
    const isEmailUnique = await checkEmailCall(email);
    if (!isEmailUnique) {
      setError("Email is already taken");
      return;
    }

    try {
      const newUser = {
        username,
        firstName,
        surname,
        email,
        password,
        role,
        projects: userProjects,
      };
      await registerCall(newUser);
      setError("");
      navigate("/admin/users");
      console.log("User created successfully");
    } catch (err) {
      setError("An error occurred during creation");
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.");
    if (!confirmCancel) {
      return;
    }
    navigate("/admin/users");
  };

  const handleAddProject = () => {
    if (selectedProject && !userProjects.includes(selectedProject)) {
      setUserProjects((prevProjects) => [...prevProjects, selectedProject]);
    }
  };

  const handleRemoveProject = (projectId) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this project from the user?");
    if (!confirmRemove) {
      return;
    }
    setUserProjects((prevProjects) => prevProjects.filter((project) => project !== projectId));
  };

  // useEffect to fetch all projects
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const results = await getProjectsCall();
        setAllProjects(results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProjects();
  }, []);

  return (
    <div className="admin-create-user">
      <div className="admin-create-user-container">
        <div className="admin-create-user-form-wrapper">
          <h2>Create User</h2>
          <form onSubmit={handleSubmit} className="admin-create-user-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="retypePassword">Retype Password:</label>
              <input
                type="password"
                id="retypePassword"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div className="user-projects">
              <h3>Assigned Projects</h3>
              {userProjects && userProjects.length > 0 ? (
                <ul>
                  {userProjects.map((projectId) => {
                    const project = allProjects.find((p) => p._id === projectId);
                    return project ? (
                      <li key={project._id}>
                        {project.name}
                        <button type="button" onClick={() => handleRemoveProject(project._id)}>Remove</button>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <p>No projects assigned</p>
              )}
              <div className="add-project">
                <h4>Add Project</h4>
                <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                  <option value="">Select a project</option>
                  {allProjects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={handleAddProject}>Add</button>
              </div>
            </div>
            <div className="form-buttons">
              <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
              <button className="submit-button" type="submit">Create</button>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminCreateUser;
