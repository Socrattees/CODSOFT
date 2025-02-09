import axios from 'axios';
import { LoginStart, LoginSuccess } from './context/UserActions';

//AUTH

// Login
export const loginCall = async (userDetails, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post("/api/auth/login", userDetails);
    dispatch(LoginSuccess(res.data));
    return res.data;
  } catch (err) {
    return err;
  }
};

// Register
export const registerCall = async (userDetails) => {
  try {
    const res = await axios.post("/api/auth/register", userDetails);
    return res.data;
  } catch (err) {
    return err;
  }
};

// Find admin
export const findAdminCall = async () => {
  try {
    const res = await axios.get("/api/auth/findAdmin");
    return res.data;
  } catch (err) {
    return err;
  }
};

//USERS

// Get all users
export const getUsersCall = async () => {
  try {
    const res = await axios.get("/api/users");
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get user by id
export const getUserCall = async (id) => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Check if username is unique
export const checkUsernameCall = async (username) => {
  try {
    const res = await axios.post("/api/users/check-username", { username });
    return res.data;
  } catch (err) {
    return err;
  }
}

// Check if email is unique
export const checkEmailCall = async (email) => {
  try {
    const res = await axios.post("/api/users/check-email", { email });
    return res.data;
  } catch (err) {
    return err;
  }
}

// Update user
export const updateUserCall = async (id, user) => {
  try {
    const res = await axios.put(`/api/users/update/${id}`, user);
    return res.data;
  } catch (err) {
    return err;
  }
}

//PROJECTS

// Get all projects
export const getProjectsCall = async () => {
  try {
    const res = await axios.get("/api/projects");
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get project by id
export const getProjectCall = async (id) => {
  try {
    const res = await axios.get(`/api/projects/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Create new project
export const createProjectCall = async (project) => {
  try {
    const res = await axios.post("/api/projects", project);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Update project
export const updateProjectCall = async (id, project, senderId) => {
  try {
    const res = await axios.put(`/api/projects/update/${id}`, { project, senderId });
    return res.data;
  } catch (err) {
    return err;
  }
}

// Update project members
export const updateProjectMembersCall = async (id, projects) => {
  try {
    const res = await axios.put(`/api/projects/update-members/${id}`, projects);
    return res.data;
  } catch (err) {
    return err;
  }
}

//TASKS

// Create new task
export const createTaskCall = async (task, senderId) => {
  try {
    const res = await axios.post("/api/tasks", { task, senderId });
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get all tasks
export const getTasksCall = async () => {
  try {
    const res = await axios.get("/api/tasks");
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get task by id
export const getTaskCall = async (id) => {
  try {
    const res = await axios.get(`/api/tasks/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Update task
export const updateTaskCall = async (id, updatedTask, senderId) => {
  try {
    const res = await axios.put(`/api/tasks/update/${id}`, { updatedTask, senderId });
    return res.data;
  } catch (err) {
    return err;
  }
}

// Delete task
export const deleteTaskCall = async (id, senderId) => {
  try {
    console.log("deleteTaskCall", id, senderId);
    const res = await axios.delete(`/api/tasks/delete/${id}`, { data: { senderId }} );
    return res.data;
  } catch (err) {
    return err;
  }
}