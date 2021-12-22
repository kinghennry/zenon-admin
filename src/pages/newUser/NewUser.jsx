import { useState } from "react";
import "./newUser.css";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "../../redux/apiCalls";
import { CircularProgress } from "@mui/material";

export default function NewUser() {
  const [userData, setUserData] = useState({
    username: "",
    img: "",
    isAdmin: "",
    email: "",
    password: "",
  });
  const { isFetching, isCompleted, error } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    addNewUser(userData, dispatch);
    console.log(userData);
    setUserData({
      username: "",
      img: "",
      isAdmin: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleClick}>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            required
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>

        <div className="newUserItem">
          <label>Admin</label>
          <select
            className="newUserSelect"
            name="active"
            id="active"
            required
            onChange={(e) =>
              setUserData({
                ...userData,
                isAdmin: e.target.value,
              })
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Select Image</label>
          <FileBase
            type="file"
            id="file"
            required
            multiple={false}
            onDone={({ base64 }) => setUserData({ ...userData, img: base64 })}
          />
        </div>
        <button type="submit" className="newUserButton">
          Create
        </button>
        {isFetching && <CircularProgress size="1rem" />}
      </form>
      {error && (
        <span style={{ color: "red", marginLeft: "10px" }}>
          An error occured.
        </span>
      )}
      {isCompleted && (
        <span style={{ marginTop: "20px", color: "green" }}>
          New User Created.
        </span>
      )}
    </div>
  );
}
