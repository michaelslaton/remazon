import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Error404 from "./utils/errors/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      // {
      //   index: true,
      //   element: <HomePage/>,
      // },
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
