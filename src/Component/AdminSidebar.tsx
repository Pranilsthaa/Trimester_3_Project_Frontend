import { Link, Outlet, useNavigate } from "react-router";

const adminitems = [
  { name: "Users", path: "/admin" },
  { name: "Settings", path: "/admin/settings" },
];

function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <div className="antialiased">
      <nav className="fixed w-64 h-full bg-gray-800 text-white p-6 ">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4 flex flex-col ">
          {adminitems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="block py-2 rounded hover:bg-gray-700 transition-colors font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <button
            className="absolute bottom-10 bg-orange-600 px-4 py-2 cursor-pointer left-[50%] translate-x-[-50%] rounded-md hover:bg-orange-700 transition-colors font-medium"
            type="button"
            onClick={() => {
              localStorage.clear();
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </button>
        </ul>
      </nav>
      <div className="relative ml-64 p-4 ">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminSidebar;
