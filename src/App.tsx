import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./utils/firebase/firebase";
import Layout from "./layout/Layout";
import HomePage from "./layout/home-page/HomePage";
import Login from "./layout/authentication/Login";
import SignUp from "./layout/authentication/SignUp";
import EmployeesDisplay from "./layout/employees-display/EmployeesDisplay";
import CreateEmployee from "./layout/employees-display/employee/CreateEmployee";
import EditEmployee from "./layout/employees-display/employee/EditEmployee";
import ProjectsDisplay from "./layout/projects-display/ProjectsDisplay";
import CreateProject from "./layout/projects-display/project/CreateProject";
import EditProject from "./layout/projects-display/project/EditProject";
import Error404 from "./utils/errors/Error404";
import Ranks from "./layout/ranks/Ranks";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { fetchRanksThunk } from "./redux/slices/ranksSlice";
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
        path: "/signup",
        element: <SignUp/>,
      },
      {
        path: "/ranks",
        element: <Ranks/>
      },
      {
        path: "/employees",
        element: <EmployeesDisplay/>,
      },
      {
        path: "/employees/create",
        element: <CreateEmployee/>,
      },
      {
        path: "/employees/edit/:paramId",
        element: <EditEmployee/>,
      },
      {
        path: "/projects",
        element: <ProjectsDisplay/>,
      },
      {
        path: "/projects/create",
        element: <CreateProject/>,
      },
      {
        path: "/projects/edit/:paramId",
        element: <EditProject/>
      },
      {
        path: "*",
        element: <Error404/>,
      }
    ],
  },
]);

const App: React.FC = () => {
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(ranks.length === 0) dispatch(fetchRanksThunk());
  },[])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;