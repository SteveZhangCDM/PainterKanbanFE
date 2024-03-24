import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserActiveMutation,
} from "../../services/adminSlice";
import NewUserModal from "../../components/admin/NewUserModal";

const Admin = () => {
  const navigate = useNavigate();
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [toggleUserActive] = useToggleUserActiveMutation();

  const handleOpenNewUserModal = () => setIsNewUserModalOpen(true);
  const handleCloseNewUserModal = () => setIsNewUserModalOpen(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users</div>;

  const handleRoleChange = async (userId, role) => {
    await updateUserRole({ userId, role }).unwrap();
  };

  const handleToggleActive = async (user) => {
    await toggleUserActive({
      userId: user._id,
      isActive: !user.isActive,
    }).unwrap();
  };

  return (
    <>
      <div className="flex justify-between items-center p-2 bg-gray-100">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ⬅ Back to Dashboard
        </button>
        <button
          onClick={handleOpenNewUserModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New User
        </button>
      </div>

      {/* User table */}
      <div className="flex flex-col items-center">
        <div className="w-full md:w-3/4 lg:w-1/2">
          <table className="min-w-full table-auto border-collapse border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2 text-left">
                  FullName
                </th>
                <th className="border border-gray-200 p-2 text-left">Role</th>
                <th className="border border-gray-200 p-2 text-left">
                  isActive
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-2">
                    {user.fullName}
                  </td>
                  <td className="border border-gray-200 p-2">
                    <select
                      className="form-select block w-full mt-1"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="manager">Manager</option>
                      <option value="painter">Painter</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={user.isActive}
                      onChange={() => handleToggleActive(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isNewUserModalOpen && (
        <NewUserModal closeModal={handleCloseNewUserModal} />
      )}
    </>
  );
};

export default Admin;
