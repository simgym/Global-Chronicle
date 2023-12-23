import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RootLayout from "./pages/Root";
import Errorpage from "./pages/Errorpage";
import Login from "./Authorization/Login";
import Signup from "./Authorization/Signup";
import Signout from "./Authorization/Signout";
import NewsDetails from "./pages/NewsDetails";
import FavNews from "./pages/Favpage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Errorpage />,
      children: [
        { index: true, element: <Homepage /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/signout", element: <Signout /> },
        { path: "/:source", element: <NewsDetails /> },
        { path: "/:user/favNews", element: <FavNews /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
