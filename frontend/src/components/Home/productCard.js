import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import ReactStars from "react-rating-stars-component";
import logo from "../../images/logo.png";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor: "#FFB562 ",
    value: product?.ratings,
    isHalf: true,
  };

  const isTranslatedBook = product?.isTranslatedBook;
  return (
    <Link className="productCard" to={`/product/${product?._id}`}>
      {product ? (
        <>
          {/* <img src={product?.image[0]?.url} alt={product?.name} /> */}

          {product?.image ? (
            <img src={product?.image[0]?.url} alt={product?.name} />
          ) : (
            <img src={logo} alt="Fallback" />
          )}

          <p>{product?.bookName}</p>
          <div>
            <ReactStars {...options} />{" "}
            <span className="productCardSpan">
              {" "}
              ({product?.numOfReviews} Reviews)
            </span>
          </div>
          <span>{`Rs.${product?.price}`}</span>
          {isTranslatedBook ? (
            <span>{`Language : ${product?.language}`}</span>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </Link>
  );
};

export default ProductCard;
