import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
import Transaction from "./pages/transaction/Transaction";
import NewUser from "./pages/newUser/NewUser";
function App() {
  const admin = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Router>
        {!admin ? (
          <Login />
        ) : (
          <>
            <Topbar />
            <Switch>
              <div className="container">
                <Sidebar />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/products">
                  <ProductList />
                </Route>
                <Route exact path="/product/:productId">
                  <Product />
                </Route>
                <Route exact path="/newproduct">
                  <NewProduct />
                </Route>
                <Route exact path="/transaction">
                  <Transaction />
                </Route>
                <Route exact path="/users">
                  <UserList />
                </Route>
                <Route exact path="/user/:userId">
                  <User />
                </Route>
                <Route exact path="/newUser">
                  <NewUser />
                </Route>
              </div>
            </Switch>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
