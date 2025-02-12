import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import Navbar from '../../components/navbar/NavBar';
import { UserContext } from '../../context/UserContext';
import { getProjectsCall, getTasksCall, getLogsCall } from '../../apiCalls';
import Category from '../../components/category/Category';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user: currentUser } = useContext(UserContext);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // useEffect to fetch projects, tasks, and logs
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjectsCall();
        setProjects(projects);
      } catch (err) {
        setError("Error while fetching projects.");
        console.error("Error while fetching projects:", err);
      }
    };
    const fetchTasks = async () => {
      try {
        const tasks = await getTasksCall();
        setTasks(tasks);
      } catch (err) {
        setError("Error while fetching tasks.");
        console.error("Error while fetching tasks:", err);
      }
    };
    const fetchLogs = async () => {
      try {
        const logs = await getLogsCall();
        setLogs(logs);
      } catch (err) {
        setError("Error while fetching logs.");
        console.error("Error while fetching logs:", err);
      }
    };
    const fetchData = async () => {
      await fetchProjects();
      await fetchTasks();
      await fetchLogs();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleViewTasks = () => {
    navigate('/tasks'); // Navigate to the tasks page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <header className="home-header">
          <h1>Manage Mate</h1>
        </header>
        <main className="home-main">
          {currentUser?.role === "manager" && (
            <section className="home-section">
              <h2>Welcome, Manager</h2>
            </section>
          )}
          {currentUser?.role === "user" && (
            <section className="home-section">
              <h3>Welcome, Developer</h3>
              <p>View and manage your assigned tasks.</p>
              <button className="home-button" onClick={handleViewTasks}>
                View Tasks
              </button>
            </section>
          )}
        </main>
        {currentUser?.role === "manager" && (
          <section className="home-section">
            <h3>Projects Managing</h3>
            {projects.filter(project => project.manager === currentUser._id).length > 0 ? (
              <Category list={projects.filter(project => project.manager === currentUser._id)} type="project" />
            ) : (
              "No projects that are managed by you"
            )}
          </section>
        )}
        <section className="home-section">
          <h3>Projects</h3>
          {projects.filter(project => project.members.includes(currentUser._id)).length > 0 ? (
            <Category list={projects.filter(project => project.members.includes(currentUser._id))} type="project" />
          ) : (
            "Not a user member of any projects"
          )}
        </section>
        <section className="home-section">
          <h3>Tasks</h3>
          {tasks.filter(task => task.assignee === currentUser._id).length > 0 ? (
            <Category list={tasks.filter(task => task.assignee === currentUser._id)} type="task" />
          ) : (
            "No tasks assigned"
          )}
        </section>
      </div>
    </>
  );
};

export default Home;