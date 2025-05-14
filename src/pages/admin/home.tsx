import { useEffect, useState } from "react";
import GETDATA from "../../../Api/GetData";
import type { Axios, AxiosResponse } from "axios";
import { replace, useNavigate } from "react-router";

interface User {
  id: number;
  message: string;
}

const ROLES = ["admin", "edit", "user", "editor", "viewer", "guest"];

function AdminHome() {
  const [users, setUsers] = useState([{ id: 0, username: "", role: "" }]);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const response = (await GETDATA("users", {})) as AxiosResponse<User[]>;
      if (response?.status === 200) {
        setUsers(response?.data);
      } else if (response?.status === 401) {
        alert("Unauthorized");
      } else if (response?.status === 403) {
        alert("Forbidden");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error fetching users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log(users);
  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-lg font-semibold text-gray-900">Users</h2>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {user.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.username}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <select
                            value={user.role}
                            // onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            {!user.role && (
                              <option value="" hidden>
                                Select role
                              </option>
                            )}

                            {ROLES.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login", { replace: true });
        }}
      >
        Logout
      </button>
    </>
  );
}

export default AdminHome;
