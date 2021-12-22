import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch();
  const { isFetching, userList } = useSelector((state) => state.users);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.username}</div>;
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">{format(params.row.createdAt)}</div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  if (isFetching)
    return (
      <div
        className="productList"
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <CircularProgress />
      </div>
    );
  return (
    <div className="userList">
      <DataGrid
        rows={userList}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
