import React, { useContext, useEffect, useState } from 'react';
import "./update-member.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { checkEmailCall, checkUsernameCall, getProjectsCall, getUserCall, updateProjectMembersCall, updateUserCall } from '../../apiCalls';
import { UserContext } from '../../context/UserContext';
import Navbar from '../../components/navbar/NavBar';

const UpdateMember = () => {
  const { user: currentUser } = useContext(UserContext);

  const [user, setUser] = useState({});
  const [allProjects, setAllProjects] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // First check if the user has changed any details
    if (
      username === user.username &&
      firstName === user.firstName &&
      surname === user.surname &&
      email === user.email &&
      role === user.role &&
      JSON.stringify(userProjects) === JSON.stringify(user.projects) &&
      selectedProject === ""
    ) {
      return;
    }
    // Check if the username is unique
    if (username !== user.username) {
      const isUsernameUnique = await checkUsernameCall(username);
      if (!isUsernameUnique) {
        setError("Username is already taken");
        return;
      }
    }
    // Check if the email is unique
    if (email !== user.email) {
      const isEmailUnique = await checkEmailCall(email);
      if (!isEmailUnique) {
        setError("Email is already taken");
        return;
      }
    }
    // If the user has changed details, confirm the update
    const confirmUpdate = window.confirm("Are you sure you want to update this user?");
    if (!confirmUpdate) {
      return;
    }
    try {
      const updatedUser = {
        username,
        firstName,
        surname,
        email,
        role,
        projects: userProjects,
      };
      await updateProjectMembersCall(user._id, { projects: userProjects });
      await updateUserCall(user._id, updatedUser);
      setError("");
      navigate("/home/members");
    } catch (err) {
      setError("An error occurred during update");
    }
  };

  // Function to handle cancel button
  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.");
    if (!confirmCancel) {
      return;
    }
    navigate("/home/members");
  };

  // Function to add project to user
  const handleAddProject = () => {
    if (selectedProject && !userProjects.includes(selectedProject)) {
      setUserProjects((prevProjects) => [...prevProjects, selectedProject]);
    }
  };

  // Function to remove project from user
  const handleRemoveProject = (projectId) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this project from the user?");
    if (!confirmRemove) {
      return;
    }
    setUserProjects((prevProjects) => prevProjects.filter((project) => project !== projectId));
  };

  // Function to handle role change
  const onChangeRole = (e) => {
    const isProjectManager = allProjects.some((project) => project.manager === user._id);
    if (isProjectManager && e.target.value === "user") {
      return window.confirm("This user is a manager of a project. Are you sure you want to change the role?") ? setRole(e.target.value) : setRole(user.role);
    }
    setRole(e.target.value);
  };

  // useEffect to fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserCall(location.state.id);
        setUser(user);
        setUsername(user.username);
        setFirstName(user.firstName);
        setSurname(user.surname);
        setEmail(user.email);
        setRole(user.role);
        setUserProjects(user.projects);
        //console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [location.state.id]);

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
    <>
      <Navbar />
      <div className="update-member">
        <div className="update-member-container">
          <div className="update-member-form-wrapper">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit} className="update-member-form">
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                  readOnly
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder={user.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  readOnly
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname:</label>
                <input
                  type="text"
                  id="surname"
                  value={surname}
                  placeholder={user.surname}
                  onChange={(e) => setSurname(e.target.value)}
                  readOnly
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select
                  id="role"
                  value={role}
                  onChange={onChangeRole}
                  disabled={true}
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
                          {currentUser.projects.includes(project._id) &&
                          <button
                            type="button"
                            onClick={() => handleRemoveProject(project._id)}
                          >
                            Remove
                          </button>}
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
                    {allProjects
                      .filter((project) => project.manager === currentUser._id)
                      .map((project) => (
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
                <button className="submit-button" type="submit">Update</button>
              </div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateMember;
