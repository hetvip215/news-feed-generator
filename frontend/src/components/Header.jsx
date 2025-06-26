import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-[#ff3c3c] font-semibold transition"
      : "text-white hover:text-[#ff3c3c] transition";

  return (
    <div className="bg-[#121212] px-4 pt-4 sticky top-0 z-50">
      <header className="bg-[#2a2a2a] border border-[#333] text-white px-8 py-3 flex justify-between items-center rounded-2xl shadow-lg max-w-6xl mx-auto">
        <NavLink to="/" className="text-3xl font-bold text-[#b91c1c]">
          NewsBite
        </NavLink>

        <nav className="flex gap-8 items-center text-lg">
          {user ? (
            <>
              <NavLink to="/home" className={linkStyle}>
                Browse News
              </NavLink>
              <NavLink to="/profile" className={linkStyle}>
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white hover:text-[#ff3c3c] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>
              <NavLink to="/signup" className={linkStyle}>
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
