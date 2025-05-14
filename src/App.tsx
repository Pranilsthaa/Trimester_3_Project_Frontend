import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./Component/Navbar";
import Contact from "./pages/Contact";
import AdminHome from "./pages/admin/home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/signup",
      Component: Signup,
    },
    {
      path: "/",
      Component: Navbar,
      children: [
        {
          path: "/",
          Component: Home,
        },
        {
          path: "/contact",
          Component: Contact,
        },
      ],
    },
    {
      path: "/admin",
      Component: AdminHome,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
