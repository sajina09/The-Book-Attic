import React from "react";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Loader from "../Loader/Loader";
import ProductCard from "../Home/productCard";
import { useEffect } from "react";
import Metadata from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useState } from "react";
import { Typography } from "@mui/material";
// import Slider from "@material-ui/core/Slider";
import Slider from "@mui/material/Slider";

import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

// import { createTheme } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";

// const muiTheme = createTheme({
//   overrides: {
//     MuiSlider: {
//       thumb: {
//         color: "#FFE162",
//       },
//       track: {
//         color: "#FFE162",
//       },
//       rail: {
//         color: "black",
//       },
//     },
//   },
// });

const categories = [
  "Horror",
  "Adventure",
  "Romantic",
  "Comedy",
  "Novel",
  "Fiction",
  "Biography",
];
const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);
  const { products, loading, error } = useSelector((state) => state.products);

  const books = products?.data?.books;
  const resultPerPage = products?.data?.resultPerPage;
  const productsCount = products?.data?.bookCounts;
  const filteredProductsCount = products?.data?.filteredProductsCount;

  const keyword = match?.params?.keyword;
  console.log("keyword", keyword);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  console.log("resultPerPage", resultPerPage);
  console.log(" count", productsCount);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="BOOKS" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {books &&
              books.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            {/* <Typography>Price</Typography> */}
            {/* <ThemeProvider theme={muiTheme}> */}
            {/* <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            /> */}
            {/* </ThemeProvider>  */}

            {/* <Typography>Categories</Typography>  */}
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              {/* <Typography component="legend">Ratings Above</Typography> */}
              {/* <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              /> */}
            </fieldset>
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
