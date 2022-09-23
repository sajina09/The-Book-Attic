import React, { Fragment, useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const history = useNavigate();

  const [mostPopularBooks, setMostPopularBooks] = useState();

  // if (error) {
  //   alert.error(error);
  //   dispatch(clearErrors());
  // }

  const getMostPopularBooks = async () => {
    const data = await axios
      .post("http://localhost:8001/upload/")
      .then((res) => {
        setMostPopularBooks(res?.data?.bookName);
        console.log(" Popular Books From PYTHON ----- ", res?.data?.bookName);
      })
      .catch((error) => {
        console.log("Error in RS", error);
      });
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    getMostPopularBooks();
    dispatch(getProduct());
  }, [dispatch]);

  const productList = products?.data?.test || [];
  // console.log("productList", products?.data?.test);

  let popularBookList;
  mostPopularBooks?.bookName?.forEach((i) => {
    popularBookList = productList?.filter((r) => {
      return r.bookName === i;
    });
  });

  const slicedList = productList.splice(5, 4);

  //Filtering books
  const nepaliBookList = productList?.filter((item) => {
    return item.language === "Nepali";
  });
  const slicedListNepali = nepaliBookList.splice(1, 4);

  const translatedBookList = productList?.filter((item) => {
    return item.isTranslatedBook === true;
  });
  const slicedListTranslated = nepaliBookList.splice(1, 4);

  const secondHandBookList = productList?.filter((item) => {
    return item.isSecondHand === true;
  });
  const slicedListSecondHand = secondHandBookList.splice(1, 4);

  // productList?.map((list) => {
  //   return {
  //     name: list.bookName,
  //     // images: list.image,
  //     images: [
  //       {
  //         url: "https://play-lh.googleusercontent.com/r-ZtHr0NkeGRLkFWcDVsLLpabGsO52PJfRM7cVIjfCP8tudJawUZ60iPXp_lhUCaeyid",
  //       },
  //     ],
  //     price: "Rs." + list.price,
  //     _id: list._id,
  //   };
  // });

  const toCart = () => {
    history("/cart");
  };

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
          <button onClick={toCart}>Cart</button>
          {/* <BookButton name="Add to cart" /> */}
          <Heading heading="Books" />
          {productList.length > 1 ? (
            <>
              <ProductBlock productList={productList} />
              <Heading heading="Top Rated Books " />{" "}
            </>
          ) : (
            ""
          )}

          {/* <ProductBlock productList={slicedList} /> */}

          {slicedListNepali.length > 0 && (
            <>
              <Heading heading="Second Hand books " />
              <ProductBlock productList={slicedListNepali} />
            </>
          )}

          {slicedListTranslated.length > 0 && (
            <>
              {" "}
              <Heading heading="Translated books " />
              <ProductBlock productList={slicedListTranslated} />
            </>
          )}
          {/* <Heading heading="Nepali Books" />
          <ProductBlock productList={slicedListNepali} /> */}
        </>
      )}
    </Fragment>
  );
};

export default Home;
