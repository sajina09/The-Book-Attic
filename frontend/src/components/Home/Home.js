import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Heading from "../Heading";
import "./Home.css";
import ProductCard from "./productCard";
import logo from "../../images/logo.png";
import Metadata from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import ProductBlock from "./ProductBlock";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const history= useNavigate();
  const getCart =() => {history("/cart")};

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    
    dispatch(getProduct());
  }, [dispatch]);

  const productList = products?.data?.books || [];

  const slicedList = productList.splice(5, 4);

  //Filtering books
  const nepaliBookList = productList?.filter((item) => {
    return item.language === "Nepali";
  });

  const translatedBookList = productList?.filter((item) => {
    return item.isTranslatedBook === true;
  });

  const secondHandBookList = productList?.filter((item) => {
    return item.isSecondHand === true;
  });

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
          <button onClick={getCart} >
            Cart
          </button>

          {/* <BookButton name="Add to cart" /> */}
          <Heading heading="Featured " />
          {/* <div className="container" id="container">
            {productList &&
              productList.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div> */}

          {/* <Heading heading="Borrow and Read " /> */}
          <ProductBlock productList={slicedList} />

          <Heading heading="Nepali Books" />
            <ProductBlock productList={nepaliBookList} />
            

          <Heading heading="Nepali Books" />
          <ProductBlock productList={nepaliBookList} />

          <Heading heading="Translated books " />
          <ProductBlock productList={translatedBookList} />

          <Heading heading="Second Hand books " />
          <ProductBlock productList={secondHandBookList} />
        </>
      )}
    </Fragment>
  );
};

export default Home;
