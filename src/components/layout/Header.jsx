import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-blue-500 text-white p-4">
      <h1 className="text-xl font-bold">Welcome</h1>
      <div>
        <button
          onClick={handleLogout}
          className=" text-white font-bold py-2 px-4 rounded"
          aria-label="Logout"
        >
          Logout
        </button>
        {userRole === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            aria-label="Go to admin page"
          >
            Admin Portal
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
