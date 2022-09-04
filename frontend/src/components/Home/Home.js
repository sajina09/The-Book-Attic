import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Heading from "../Heading";
import "./Home.css";
import ProductCard from "./product";
import logo from "../../images/logo.png";
import Metadata from "../layout/MetaData";
import { getProduct } from "../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";

const Home = () => {
  const productsss = [
    {
      name: "Rich dad poor dad",
      images: [
        {
          url: "https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg",
        },
      ],
      price: "Rs.300",
      _id: "Munu",
    },
    {
      name: "Fault in our stars",
      images: [
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqU2EEa1auBGxFpOtDrGQizZJ2Sg-ZUaJdYPcBOMhCqovZg-TM_sGMZUpjyHTarJxzvk&usqp=CAU",
        },
      ],
      price: "Rs.500",
      _id: "Munu",
    },
    {
      name: "Karnali Blues ",
      images: [
        {
          url: "https://cloudfront.penguin.co.in/wp-content/uploads/2021/12/9780670096602.jpg",
        },
      ],
      price: "Rs.600",
      _id: "Munu",
    },
    {
      name: "The book thief",
      images: [
        {
          url: "https://play-lh.googleusercontent.com/r-ZtHr0NkeGRLkFWcDVsLLpabGsO52PJfRM7cVIjfCP8tudJawUZ60iPXp_lhUCaeyid",
        },
      ],
      price: "Rs.700",
      _id: "Munu",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const { loading, error, productCount, products } = useSelector(
    (state) => state.products
  );
  const productList = products?.data?.books || [];
  let productListArray = [];
  productList?.map((list) => {
    return {
      name: list.bookName,
      // images: list.image,
      images: [
        {
          url: "https://play-lh.googleusercontent.com/r-ZtHr0NkeGRLkFWcDVsLLpabGsO52PJfRM7cVIjfCP8tudJawUZ60iPXp_lhUCaeyid",
        },
      ],
      price: "Rs." + list.price,
      _id: list._id,
    };
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="The-Book-Attic" />
          <div className="banner">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <p>Welcome to The Book Attic</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          {/* <BookButton name="Add to cart" /> */}
          <Heading heading="Featured " />
          <div className="container" id="container">
            {productList &&
              productList.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <Heading heading="Borrow and Read " />
        </>
      )}
    </Fragment>
  );
};

export default Home;
