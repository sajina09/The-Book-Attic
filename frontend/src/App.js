import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import DetailsPage from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/Heading/UserOptions";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
// import Contact from "./"
// import About from "./component/layout/About/About";
// import NotFound from "./component/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser);
  }, []);

  console.log("isAuthenticatedUser", isAuthenticated);
  return (
    <>
      <Router>
        {isAuthenticated && <UserOptions user={user} />}

        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/product/:id" element={<DetailsPage />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={<Shipping />} />
          {/* <Route exact path="/khalti/payment" element={<Khalti/>} /> */}
          <Route exact path="/success" element={<OrderSuccess />} />
          <Route exact path="/orders" element={<MyOrders />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          <Route exact path="/orders/:id" element={<OrderDetails />} />
          <Route
            isAdmin={true}
            exact
            path="/admin/dashboard"
            element={<Dashboard />}
          />
          <Route
            exact
            path="/admin/products"
            isAdmin={true}
            element={<ProductList />}
          />
          <Route
            exact
            path="/admin/product"
            isAdmin={true}
            element={<NewProduct />}
          />
          <Route
            exact
            path="/admin/product/:id"
            isAdmin={true}
            element={<UpdateProduct />}
          />
          <Route
            exact
            path="/admin/orders"
            isAdmin={true}
            element={<OrderList />}
          />
          <Route
            exact
            path="/admin/order/:id"
            isAdmin={true}
            element={<ProcessOrder />}
          />
          <Route
            exact
            path="/admin/users"
            isAdmin={true}
            element={<UsersList />}
          />
          <Route
            exact
            path="/admin/user/:id"
            isAdmin={true}
            element={<UpdateUser />}
          />
          <Route
            exact
            path="/admin/reviews"
            isAdmin={true}
            element={<ProductReviews />}
          />
          {/* <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
