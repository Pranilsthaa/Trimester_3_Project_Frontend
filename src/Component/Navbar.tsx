import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";

const navitems = [
  { name: "Users", path: "/", permission: "view:users" },
  { name: "Project", path: "/project", permission: "view:projects" },
  { name: "Report", path: "/report", permission: "view:reports" },
  { name: "Settings", path: "/settings", permission: "view:settings" },
];

function Navbar() {
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const permissions = JSON.parse(
      localStorage.getItem("permissions") || "[]"
    ) as string[];
    setPermissions(permissions);

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  console.log(permissions);
  return (
    <div className="bg-[#171717] h-screen">
      <nav className="bg-gray-800 p-4 flex justify-center ">
        <ul className="flex space-x-6 justify-center">
          {navitems.map(
            (item) =>
              permissions.includes(item.permission) && (
                <li>
                  <Link
                    to={item.path}
                    className="text-white hover:text-gray-300 font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              )
          )}
        </ul>
        <button
          onClick={logout}
          className="absolute right-10 bg-red-400 rounded-lg px-4 py-1 text-white font-medium"
        >
          Logout
        </button>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
