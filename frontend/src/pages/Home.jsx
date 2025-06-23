import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed, but continuing", e);
    } finally {
      handleSuccess("User Logged Out");
      navigate("/login");
    }
  };
  

  return (
    <div className="p-4 text-xl font-semibold">
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">
            Welcome, {user.username || user.name || "User"}!
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;
