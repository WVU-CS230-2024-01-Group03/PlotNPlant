import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { Link } from "react-router-dom";

const Navbar = () => {
  //navigate lets you use switch between pages
  const navigate = useNavigate();

  //Function to signOut auth
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="nav-container">
      <Link to="/homepage" style={{ textDecoration: "none" }}>
        <h1 className="navbar-title">Plot N' Plant</h1>
      </Link>
      <ul className="navbar-items">
        <li>
          {/** Logout button */}
          <button onClick={logout}>Log Out</button>
        </li>
        <li>
          <Link to="/usersettings">
            <button>Settings</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
