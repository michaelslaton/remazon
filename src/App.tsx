import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./utils/firebase/firebase";
import Layout from "./layout/Layout";
import HomePage from "./layout/home-page/HomePage";
import Login from "./layout/login/Login";
import EmployeesDisplay from "./layout/employees-display/EmployeesDisplay";
import ProjectsDisplay from "./layout/projects-display/ProjectsDisplay";
import Error404 from "./utils/errors/Error404";
import CreateEmployee from "./layout/employees-display/employee/CreateEmployee";
import CreateProject from "./layout/projects-display/project/CreateProject";
// import AuthRoute from "./utils/firebase/AuthRoute";

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
        path: "/employees",
        element: <EmployeesDisplay/>,
      },
      {
        path: "/employees/create",
        // element: <AuthRoute><CreateEmployee/></AuthRoute>,
        element: <CreateEmployee/>,
      },
      {
        path: "/projects",
        element: <ProjectsDisplay/>,
      },
      {
        path: "/projects/create",
        // element: <AuthRoute><CreateProject/></AuthRoute>,
        element: <CreateProject/>,
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