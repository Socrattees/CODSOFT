import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import Navbar from '../../components/navbar/NavBar';
import { UserContext } from '../../context/UserContext';
import { getProjectsCall, getTasksCall, getLogsCall, getUsersCall, getAdminCall } from '../../apiCalls';
import Category from '../../components/category/Category';
import Log from '../../components/log/Log';

const Home = () => {
  const { user: currentUser } = useContext(UserContext);
  const [admin, setAdmin] = useState({});
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch projects, tasks, users, and logs
  useEffect(() => {
    if (!currentUser) return;

    const fetchProjects = async () => {
      const res = await getProjectsCall();
      setProjects(res);
    };

    const fetchUsers = async () => {
      const res = await getUsersCall();
      setUsers(res);
    };
    const fetchAdmin = async () => {
      const res = await getAdminCall();
      setAdmin(res);
    };
    const fetchTasks = async () => {
      const res = await getTasksCall();
      setTasks(res);
    };
    const fetchLogs = async () => {
      const res = await getLogsCall();
      const filteredLogs = res.filter(log => 
        (log.entityType === "Project" && currentUser.projects?.includes(log.entityId)) ||
        (log.entityType === "Task" && currentUser.tasks?.includes(log.entityId))
      );
      setLogs(filteredLogs);
    };
    fetchProjects();
    fetchUsers();
    fetchAdmin();
    fetchTasks();
    fetchLogs();
    setLoading(false);
  }, [currentUser]);

  if (!currentUser || loading) {
    return <div>Loading...</div>;
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
        <section className="dashboard-logs">
          <h2>Recent Activity</h2>
          <div className="logs-container">
            <Log logs={logs} users={users} admin={admin} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
