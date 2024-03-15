import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminAccessRoute from './utils/admin-access-route/AdminAccessRoute';
import AuthRoute from './utils/firebase/AuthRoute';
import AdminPanel from './layout/admin-panel/AdminPanel';
import CreateProject from './layout/projects/project-component/CreateProject';
import EditEmployee from './layout/employees/employee-component/EditEmployee';
import EditProject from './layout/projects/project-component/EditProject';
import EmployeesDisplay from './layout/employees/EmployeesDisplay';
import Error404 from './utils/errors/error404/Error404';
import firebaseConfig from './utils/firebase/firebase';
import HomePage from './layout/home-page/HomePage';
import Layout from './layout/Layout';
import Info from './layout/info/Info';
import AwardsDisplay from './layout/awards/AwardsDisplay';
import NotificationsDisplay from './layout/notifications/NotificationsDisplay';
import ProjectsDisplay from './layout/projects/ProjectsDisplay';
import RanksDisplay from './layout/ranks/RanksDisplay';
import SignUpForm from './layout/authentication/components/SignUp';
import Loading from './layout/components/loading/Loading';
import { initializeApp } from 'firebase/app';
import RouteError from './utils/errors/route-error/RouteError';
import { useState, useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { initialLoadThunk, setUiError } from './redux/slices/controlsSlice';
import SignIn from './layout/authentication/components/SignIn';
import CreateAward from './layout/awards/award-component/CreateAward';
import EditAward from './layout/awards/award-component/EditAward';

initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
        errorElement: <RouteError/>,
      },
      {
        path: '/signup',
        element: <SignUpForm/>,
        errorElement: <RouteError/>,
      },
      {
        path: '/admin',
        element: 
          <AdminAccessRoute>
            <AdminPanel/>
          </AdminAccessRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: '/info',
        element: <Info/>,
        errorElement: <RouteError/>,
      },
      {
        path: '/signin',
        element: <SignIn/>,
        errorElement: <RouteError/>,
      },
      {
        path: '/signup',
        element: <SignUpForm/>,
        errorElement: <RouteError/>,
      },
      {
        path: '/ranks',
        element:  
          <AdminAccessRoute>
            <RanksDisplay/>
          </AdminAccessRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: '/employees',
        element: <EmployeesDisplay/>,
        errorElement: <RouteError/>,
      },
      {
        path: '/employees/edit/:paramId',
        element:
          <AuthRoute>
            <EditEmployee/>
          </AuthRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: '/projects',
        element: <ProjectsDisplay/>,
        errorElement: <RouteError/>,
      },
      {
        path: '/projects/create',
        element: 
          <AuthRoute>
            <CreateProject/>
          </AuthRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: '/projects/edit/:paramId',
        element: 
          <AuthRoute>
            <EditProject/>
          </AuthRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: '/notifications',
        element:
          <AuthRoute>
            <NotificationsDisplay/>
          </AuthRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: '/awards',
        element: <AwardsDisplay/>,
        errorElement: <RouteError/>,
      },
      {
        path: '/awards/create',
        element: 
          <AuthRoute>
            <CreateAward/>
          </AuthRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: '/awards/edit/:paramId',
        element: 
          <AuthRoute>
            <EditAward/>
          </AuthRoute>,
        errorElement: <RouteError/>,
      },
      {
        path: '*',
        element: <Error404/>,
        errorElement: <RouteError/>,
      }
    ],
  },
]);

const App: React.FC = () => { 
  const [ loading, setLoading ] = useState(true);
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    dispatch(initialLoadThunk())
      .then(()=> setLoading(false))
      .catch((error) => {
        dispatch(setUiError(error.message));
        console.error(error.code);
        console.error(error.message);
      });;
  },[])

  if (loading) return ( <Loading/> );

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;