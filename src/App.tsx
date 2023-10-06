import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./utils/firebase/firebase";
import Layout from "./layout/Layout";
import HomePage from "./layout/home-page/HomePage";
import Login from "./layout/login/Login";
import Error404 from "./utils/errors/Error404";
import AuthRoute from "./utils/firebase/AuthRoute";

initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <AuthRoute><HomePage/></AuthRoute>,
      },
      {
        path: "/login",
        element: <Login/>,
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