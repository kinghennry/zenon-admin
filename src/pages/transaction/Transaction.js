import React from "react";
import { CircularProgress } from "@mui/material";
import { format } from "timeago.js";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/apiCalls";
function Transaction() {
  const dispatch = useDispatch();
  const { isFetching, orders } = useSelector((state) => state.order);

  useEffect(() => {
    getOrder(dispatch);
  }, [dispatch]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const columns = [
    { field: "_id", headerName: "Customer", width: 220 },
    {
      field: "product",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">{format(params.row.createdAt)}</div>
        );
      },
    },
    { field: "amount", headerName: "Amount", width: 200 },

    {
      field: "Status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <Button type={params.row.status} />
          </div>
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
    <div className="productList">
      <h1>Transaction</h1>
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

export default Transaction;
