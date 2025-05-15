import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

const navitems = [
  { name: "Users", path: "/", permission: "view:users" },
  { name: "Project", path: "/project", permissions: "view:projects" },
  { name: "Report", path: "/report", permissions: "view:reports" },
  { name: "Settings", path: "/settings", permissions: "view:settings" },
];

function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate]);
  return (
    <div className="bg-[#171717] h-screen">
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-6 justify-center">
          {navitems.map((item) => (
            <li>
              <Link
                to={item.path}
                className="text-white hover:text-gray-300 font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
