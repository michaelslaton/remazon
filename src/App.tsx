import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminAccessRoute from "./utils/admin-access-route/AdminAccessRoute";
import AuthRoute from "./utils/firebase/AuthRoute";
import CreateProject from "./layout/projects/project-component/CreateProject";
import EditEmployee from "./layout/employees/employee-component/EditEmployee";
import EditProject from "./layout/projects/project-component/EditProject";
import EmployeesDisplay from "./layout/employees/EmployeesDisplay";
import Error404 from "./utils/errors/Error404";
import firebaseConfig from "./utils/firebase/firebase";
import HomePage from "./layout/home-page/HomePage";
import Layout from "./layout/Layout";
import NotificationsDisplay from "./layout/notifications/NotificationsDisplay";
import ProjectsDisplay from "./layout/projects/ProjectsDisplay";
import RanksDisplay from "./layout/ranks/RanksDisplay";
import SignUp from "./layout/authentication/SignUp";
import { initializeApp } from "firebase/app";
import RouteError from "./utils/errors/RouteError";
import { useState, useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { initialLoadThunk } from "./redux/slices/controlsSlice";

initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
        errorElement: <RouteError/>,
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
          </AdminAccessRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: "/employees",
        element: <EmployeesDisplay/>,
        errorElement: <RouteError/>,
      },
      {
        path: "/employees/edit/:paramId",
        element:
          <AuthRoute>
            <EditEmployee/>
          </AuthRoute>,
        errorElement: <RouteError/>,
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
        errorElement: <RouteError/>,
      },
      {
        path: "/projects/edit/:paramId",
        element: 
          <AuthRoute>
            <EditProject/>
          </AuthRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: "/notifications",
        element: <NotificationsDisplay/>,
        errorElement: <RouteError/>,
      },
      {
        path: "*",
        element: <Error404/>,
      }
    ],
  },
]);

const App: React.FC = () => { 
  const [ loading, setLoading ] = useState(true);
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    dispatch(initialLoadThunk())
      .then(()=> setLoading(false));
  },[])

  if(loading) return (
    <>
    </>
  );

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;