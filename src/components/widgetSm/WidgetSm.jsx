import "./widgetSm.css";
import { MdOutlineVisibility } from "react-icons/md";
import { useState, useEffect } from "react";
import { userRequest } from "../../redux/requestMethods";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

export default function WidgetSm() {
  const { isFetching } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //get all users
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  if (loading)
    return (
      <div
        className="productList"
        style={{ display: "grid", placeItems: "center" }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Latest Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <MdOutlineVisibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
