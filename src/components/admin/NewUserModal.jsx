import { useState } from "react";
import PropTypes from "prop-types";
import { useAddNewUserMutation } from "../../services/adminSlice"; // Adjust import path

const NewUserModal = ({ closeModal }) => {
  const [addNewUser, { isLoading, error }] = useAddNewUserMutation();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    fullName: "",
    role: "painter",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewUser(userData).unwrap();
      closeModal();
    } catch (submissionError) {
      console.error("Failed to add new user:", submissionError);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="font-semibold text-lg mb-4">Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="manager">Manager</option>
              <option value="painter">Painter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
          {error && (
            <p className="text-red-500">
              Error: {error.data ? error.data : "An error occurred"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

NewUserModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NewUserModal;
