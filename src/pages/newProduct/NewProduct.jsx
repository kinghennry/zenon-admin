import "./newProduct.css";
import { addProduct } from "../../redux/apiCalls";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { CircularProgress } from "@mui/material";

export default function NewProduct() {
  const { isCompleted, isFetching, error } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    img: "",
    title: "",
    desc: "",
    cat: [],
    stock: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addProduct(product, dispatch);

    setProduct({
      img: "",
      title: "",
      desc: "",
      cat: [],
      inStock: "",
    });
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form onSubmit={handleClick} className="addProductForm">
        <div className="addProductItem">
          <FileBase
            type="file"
            id="file"
            required
            multiple={false}
            onDone={({ base64 }) => setProduct({ ...product, img: base64 })}
          />
        </div>
        {/* //comment */}
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="Apple Airpods"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            required
            type="text"
            placeholder="description..."
            value={product.desc}
            onChange={(e) => setProduct({ ...product, desc: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            required
            placeholder="100"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            value={product.cat}
            onChange={(e) =>
              setProduct({
                ...product,
                cat: e.target.value.split(","),
              })
            }
            type="text"
            placeholder="jeans,skirts"
            required
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select
            name="inStock"
            onChange={(e) =>
              setProduct({
                ...product,
                inStock: e.target.value,
              })
            }
            required
          >
            {" "}
            In Stock ?<option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit" className="addProductButton">
          Create
        </button>
        {/* {isFetching && <CircularProgress size="1rem" />} */}
        {error && (
          <span style={{ color: "red", marginLeft: "10px" }}>
            An error occured.
          </span>
        )}
        {isCompleted && (
          <span style={{ color: "green" }}>Product Created.</span>
        )}
      </form>
    </div>
  );
}
