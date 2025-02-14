import React, { useState, useEffect, useContext } from "react";
import "./tasks.css";
import { UserContext } from "../../context/UserContext";
import { getProjectsCall, getUsersCall, getTasksCall, deleteTaskCall } from "../../apiCalls";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/NavBar";

const Tasks = () => {
  const { user: currentUser } = useContext(UserContext);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  // Function to handle update
  const handleUpdate = (id) => {
    navigate(`/home/tasks/${id}`, { state: { id } });
  };

  // Function to handle deletion of a task
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) {
      return;
    }
    console.log("Delete task with id: ", id);
    try {
      const res = await deleteTaskCall(id, currentUser._id);
      console.log(res);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    } catch (err) {
      console.log(err);
    }
  };

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

  // Function to find the assignee of a task
  const findAssignee = (id) => {
    const user = users.find((user) => user._id === id);
    return user ? user.username : "none";
  };

  // Function to find the project of a task
  const findProject = (id) => {
    const project = projects.find((project) => project._id === id);
    return project ? project.name : "none";
  };

  // Function to check if the current user is the manager of a project
  const isProjectManager = (projectId) => {
    const project = projects.find((project) => project._id === projectId);
    return project && project.manager === currentUser._id;
  };

  // useEffect to fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasksCall();
        console.log("res", res);
        const filteredTasks = res.filter(task => currentUser.projects.includes(task.project));
        console.log("filteredTasks", filteredTasks);
        setTasks(filteredTasks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [currentUser.projects]);

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
      <div className="admin-t-m-task">
        <h2>Task Management</h2>
        <table className="admin-t-m-task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Assignee</th>
              <th>Project</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{findAssignee(task.assignee)}</td>
                <td>{findProject(task.project)}</td>
                <td>{formatDate(task.startDate)}</td>
                <td className={isLessThanAWeekLeft(task.endDate) ? "task-deadline-soon" : ""}>
                  {formatDate(task.endDate)}
                </td>
                <td>{task.status}</td>
                <td className={`priority-${task.priority}`}>{task.priority}</td>
                <td className="td-actions">
                  {(isProjectManager(task.project) || task.assignee === currentUser._id) && (
                    <button id="admin-update-task" onClick={() => handleUpdate(task._id)}>Update</button>
                  )}
                  {isProjectManager(task.project) && (
                    <button id="admin-delete-task" onClick={() => handleDelete(task._id)}>Delete</button>
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

export default Tasks;
