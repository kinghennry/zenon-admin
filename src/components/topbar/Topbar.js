import React, { useState } from "react";
import "./topbar.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import {
  MdOutlinePermIdentity,
  MdOutlineStore,
  MdWorkOutline,
} from "react-icons/md";
import { Logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Topbar() {
  const [toggle, setToggle] = useState(false);
  const username = useSelector((state) => state.user.currentUser.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Logout(dispatch);
  };
  return (
    <header className="topbar">
      <nav className="topbarWrapper">
        <FaBars
          className="bars"
          style={{ fontSize: "18px", color: "darkblue" }}
          onClick={() => {
            setToggle(!toggle);
          }}
        />
        <div className="topLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Zenon Admin</span>
          </Link>
        </div>
        <div className="topRight">
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
          <h3 style={{ marginLeft: "10px" }}>{username}</h3>
        </div>
      </nav>
      <div className={`sidebarr ${toggle ? "sidebar-active" : ""}`}>
        <div className="sidebarWrapper rela">
          <AiOutlineClose
            className="close"
            style={{ fontSize: "20px", color: "darkblue", marginLeft: "auto" }}
            onClick={() => {
              setToggle(!toggle);
            }}
          />
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className="sidebarListItem active">
                  <HiOutlineHome className="sidebarIcon" />
                  Home
                </li>
              </Link>

              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <MdOutlinePermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <MdOutlinePermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <Link to="/products" className="link">
                <li className="sidebarListItem">
                  <MdOutlineStore className="sidebarIcon" />
                  Products
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem" onClick={handleLogout}>
                <MdWorkOutline className="sidebarIcon" />
                Log-Out ( {username})
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
