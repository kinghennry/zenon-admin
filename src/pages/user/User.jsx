import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePermIdentity, MdPublish } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../redux/apiCalls";
export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const singleUser = useSelector((state) =>
    state.users.userList.find((user) => user._id === userId)
  );
  const { isUpdated, error } = useSelector((state) => state.users);
  const [updateUser, setUpdateUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleClick = (e, id) => {
    e.preventDefault();
    editUser(updateUser, id, dispatch);
    setUpdateUser({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <MdOutlinePermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{singleUser.username}</span>
            </div>

            <span className="userShowTitle">Contact Details</span>

            <div className="userShowInfo">
              <AiOutlineMail className="userShowIcon" />
              <span className="userShowInfoTitle">{singleUser.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={singleUser.username}
                  className="userUpdateInput"
                  value={updateUser.username}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, username: e.target.value })
                  }
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  placeholder={singleUser.email}
                  className="userUpdateInput"
                  value={updateUser.email}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, email: e.target.value })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  className="userUpdateInput"
                  value={updateUser.password}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <MdPublish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button onClick={handleClick} className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
        {error && (
          <span style={{ color: "red", marginLeft: "10px" }}>
            An Unknown Error Occured
          .</span>
        )}
        {isUpdated && (
          <span style={{ marginTop: "20px", color: "green" }}>
            User Updated.
          </span>
        )}
      </div>
    </div>
  );
}
