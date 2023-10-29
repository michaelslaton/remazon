import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./layout/home-page/HomePage";
import Login from "./layout/authentication/Login";
import SignUp from "./layout/authentication/SignUp";
import EmployeesDisplay from "./layout/employees/EmployeesDisplay";
import CreateEmployee from "./layout/employees/employee-component/CreateEmployee";
import EditEmployee from "./layout/employees/employee-component/EditEmployee";
import ProjectsDisplay from "./layout/projects/ProjectsDisplay";
import CreateProject from "./layout/projects/project-component/CreateProject";
import EditProject from "./layout/projects/project-component/EditProject";
import Error404 from "./utils/errors/Error404";
import RanksDisplay from "./layout/ranks/RanksDisplay";
import { initializeApp } from "firebase/app";
import AdminAccessRoute from "./utils/admin-access-route/AdminAccessRoute";
import firebaseConfig from "./utils/firebase/firebase";
import AuthRoute from "./utils/firebase/AuthRoute";

initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <SignUp/>,
      },
      {
        path: "/ranks",
        element:  
          <AdminAccessRoute>
            <RanksDisplay/>
          </AdminAccessRoute>
      },
      {
        path: "/employees",
        element: <EmployeesDisplay/>,
      },
      {
        path: "/employees/create",
        element: 
          <AdminAccessRoute>
            <CreateEmployee/>
          </AdminAccessRoute>,
      },
      {
        path: "/employees/edit/:paramId",
        element: 
          <AdminAccessRoute>
            <EditEmployee/>
          </AdminAccessRoute>,
      },
      {
        path: "/projects",
        element: <ProjectsDisplay/>,
      },
      {
        path: "/projects/create",
        element: 
          <AuthRoute>
            <CreateProject/>
          </AuthRoute>,
      },
      {
        path: "/projects/edit/:paramId",
        element: 
          <AuthRoute>
            <EditProject/>
          </AuthRoute>,
      },
      {
        path: "*",
        element: <Error404/>,
      }
    ],
  },
]);

const App: React.FC = () => {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;