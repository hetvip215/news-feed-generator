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
      ? "text-[#b91c1c] font-semibold"
      : "text-gray-300 hover:text-[#ff3c3c] transition-colors";

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-[#2d2d2d]">
      <header className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3 rounded-b-2xl">
        {/* Logo */}
        <NavLink
            to="/"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
            >
            <span className="text-white">NewsBite</span>
            <span className="text-[#b91c1c] text-5xl leading-none">.</span>
        </NavLink>



        {/* Navigation */}
        <nav className="flex gap-6 sm:gap-8 items-center text-base sm:text-lg">
          {user ? (
            <>
              <NavLink to="/home" className={linkStyle}>
                Browse
              </NavLink>
              <NavLink to="/profile" className={linkStyle}>
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-[#b91c1c] transition-colors"
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
