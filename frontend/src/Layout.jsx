import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";


function Layout() {
  const { authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <div className="text-center mt-10">Loading...</div>;  // or spinner
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        closeOnClick
    />
    </>
  );
}
export default Layout;
