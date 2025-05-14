import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      Component: Login,
      // children: [
      //   {
      //     path: "shows/:showId",
      //     Component: Show,
      //     loader: ({ request, params }) =>
      //       fetch(`/api/show/${params.id}.json`, {
      //         signal: request.signal,
      //       }),
      //   },
      // ],
    },
    {
      path: "/signup",
      Component: Signup,
    },
    {
      path: "/",
      Component: () => <h1>Welcome to the App</h1>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
