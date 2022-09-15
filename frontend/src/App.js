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

function App() {
  const { isAuthenticatedUser, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser);
  }, []);
  return (
    <>
      {isAuthenticatedUser && <UserOptions user={user} />}
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/product/:id" element={<DetailsPage />} />
          <Route exact path="/products/:keyword" element={<Products />} />

          <Route exact path="/search" element={<Search />} />
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />

          <Route exact path="/login" element={<LoginSignUp />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
