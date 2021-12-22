import "./sidebar.css";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Logout } from "../../redux/apiCalls";
import {
  MdOutlinePermIdentity,
  MdOutlineStore,
  MdProductionQuantityLimits,
  MdWorkOutline,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
export default function Sidebar() {
  const { error } = useSelector((state) => state.user);
  const username = useSelector((state) => state.user.currentUser.username);
  const dispatch = useDispatch();
  const handleLogout = () => {
    Logout(dispatch);
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
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
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <MdOutlineStore className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/newProduct" className="link">
              <li className="sidebarListItem">
                <MdProductionQuantityLimits className="sidebarIcon" />
                New Products
              </li>
            </Link>
            <Link to="/transaction" className="link">
              <li className="sidebarListItem">
                <FaRegMoneyBillAlt className="sidebarIcon" />
                Transactions
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li
              className="sidebarListItem"
              style={{ marginBottom: "10px" }}
              onClick={handleLogout}
            >
              <MdWorkOutline className="sidebarIcon" />
              Log-Out ( {username})
            </li>
            {error && (
              <span style={{ color: "red", marginTop: "10px" }}>
                An error occured.
              </span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
