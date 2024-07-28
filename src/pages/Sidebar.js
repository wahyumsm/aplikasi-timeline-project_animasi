import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaList, FaStream, FaBars } from "react-icons/fa";
import "./Sidebar.css"; // Import a separate CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <ul>
        <li>
          <Link to="/">
            <FaHome /> {isOpen && "Home"}
          </Link>
        </li>
        <li>
          <Link to="/tambah-produk">
            <FaPlus /> {isOpen && "Tambah Produk"}
          </Link>
        </li>
        <li>
          <Link to="/timeline">
            <FaStream /> {isOpen && "Timeline"}
          </Link>
        </li>
        <li>
          <Link to="/story-script">
            <FaList /> {isOpen && "Story Script"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
