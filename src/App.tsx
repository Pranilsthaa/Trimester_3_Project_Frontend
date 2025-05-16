import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./Component/Navbar";
import AdminHome from "./pages/admin/home";
import Project from "./pages/Contact";
import AdminSidebar from "./Component/AdminSidebar";
import Settings from "./pages/admin/settings";
import CheckPermissions from "../service/checkPermissions";

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
      Component: () => (
        <CheckPermissions>
          <Navbar />
        </CheckPermissions>
      ),
      children: [
        {
          path: "/",
          Component: Home,
        },
        {
          path: "/project",
          Component: Project,
        },
      ],
    },
    {
      path: "/admin",
      Component: AdminSidebar,
      children: [
        { path: "/admin", Component: AdminHome },
        { path: "settings", Component: Settings },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
