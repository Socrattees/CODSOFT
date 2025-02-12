import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import EditProfile from './pages/editProfile/EditProfile';
import AdminDashboard from './pages/admin/adminDashboard/AdminDashboard';
import AdminUserManagement from './pages/admin/adminUserManagement/AdminUserManagement';
import AdminCreateUser from './pages/admin/adminCreateUser/AdminCreateUser';
import AdminUpdateUser from './pages/admin/adminUpdateUser/AdminUpdateUser';
import AdminProjectManagement from './pages/admin/adminProjectManagement/AdminProjectManagement';
import AdminCreateProject from './pages/admin/adminCreateProject/AdminCreateProject';
import AdminProjectView from './pages/admin/adminProjectView/AdminProjectView';
import AdminUpdateProject from './pages/admin/adminUpdateProject/AdminUpdateProject';
import AdminTaskManagement from './pages/admin/adminTaskManagement/AdminTaskManagement';
import AdminCreateTask from './pages/admin/adminCreateTask/AdminCreateTask';
import AdminUpdateTask from './pages/admin/adminUpdateTask/AdminUpdateTask';
import Home from './pages/home/Home';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={user? <EditProfile /> : <Navigate to="/" />} />
        <Route path="/home" element={user?.role !== 'admin' ? <Home /> : <Navigate to="/" />} />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to={"/"} />} />
        <Route path="/admin/users" element={user?.role === 'admin' ? <AdminUserManagement /> : <Navigate to={"/"} />} />
        <Route path="/admin/users/create" element={user?.role === 'admin' ? <AdminCreateUser /> : <Navigate to={"/"} />} />
        <Route path="/admin/users/:id" element={user?.role === 'admin' ? <AdminUpdateUser /> : <Navigate to={"/"} />} />
        <Route path="/admin/projects" element={user?.role === 'admin' ? <AdminProjectManagement /> : <Navigate to={"/"} />} />
        <Route path="/admin/projects/create" element={user?.role === 'admin' ? <AdminCreateProject /> : <Navigate to={"/"} />} />
        <Route path="/admin/projects/details/:id" element={user?.role === 'admin' ? <AdminProjectView /> : <Navigate to={"/"} />} />
        <Route path="/admin/projects/:id" element={user?.role === 'admin' ? <AdminUpdateProject /> : <Navigate to={"/"} />} />
        <Route path="/admin/tasks" element={user?.role === 'admin' ? <AdminTaskManagement /> : <Navigate to={"/"} />} />
        <Route path="/admin/tasks/create" element={user?.role === 'admin' ? <AdminCreateTask /> : <Navigate to={"/"} />} />
        <Route path="/admin/tasks/:id" element={user?.role === 'admin' ? <AdminUpdateTask /> : <Navigate to={"/"} />} />
      </>
  ));

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
