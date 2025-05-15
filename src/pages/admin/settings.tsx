import type { AxiosResponse } from "axios";
import GETDATA from "../../../Api/GetData";
import { useEffect, useState, type FormEvent } from "react";
import POSTDATA from "../../../Api/PostData";

interface Role {
  id: number;
  role: string;
}

interface Permission {
  id: number;
  permission: string;
  assigned: number;
}

function Settings() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const getPermissions = async () => {
    try {
      const response = (await GETDATA("roles", {})) as AxiosResponse;
      if (response?.status === 200) {
        setRoles(response?.data);
      } else if (response?.status === 401) {
        alert("Unauthorized");
      } else if (response?.status === 403) {
        alert("Forbidden");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getPermissionsByRole = async (roleId: string) => {
    try {
      const response = (await GETDATA(`roles`, {
        id: roleId,
      })) as AxiosResponse;
      if (response?.status === 200) {
        setPermissions(response?.data);
      } else if (response?.status === 401) {
        alert("Unauthorized");
      } else if (response?.status === 403) {
        alert("Forbidden");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const savePermissions = async (e: FormEvent) => {
    e.preventDefault();
    const assigned_permission = permissions
      .filter((item) => item.assigned === 1)
      .map((item) => item.id);
    try {
      const response = (await POSTDATA("update-permissions", {
        role_id: selectedRole,
        permission_id: assigned_permission,
      })) as AxiosResponse;

      if (response.status == 200) {
        alert("Permissions updated successfully");
        getPermissionsByRole(selectedRole!);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <div>
      <form>
        <select
          onChange={(e) => {
            getPermissionsByRole(e.target.value);
            setSelectedRole(e.target.value);
          }}
          value={selectedRole || ""}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option value="" hidden>
            Select Role
          </option>
          {roles &&
            roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.role}
              </option>
            ))}
        </select>
        <div className="flex flex-col mt-4">
          {permissions &&
            permissions.map((permission) => (
              <div key={permission.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`permission-${permission.id}`}
                  className="mr-2"
                  checked={permission.assigned === 1}
                  onChange={() => {
                    const updatedPermissions = permissions.map((perm) =>
                      perm.id === permission.id
                        ? { ...perm, assigned: perm.assigned === 1 ? 0 : 1 }
                        : perm
                    );
                    setPermissions(updatedPermissions);
                  }}
                />
                <label htmlFor={`permission-${permission.id}`}>
                  {permission.permission}
                </label>
              </div>
            ))}
        </div>
        <button
          className="bg-orange-500 px-3 py-1 text-white rounded-sm cursor-pointer"
          onClick={savePermissions}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Settings;
