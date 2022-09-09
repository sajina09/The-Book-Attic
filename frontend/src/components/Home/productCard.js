import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor: "#FFB562 ",
    value: product.ratings,
    isHalf: true,
  };
  console.log("product---", product);
  return (
    <Link className="productCard" to={`/product/${product?._id}`}>
      {product ? (
        <>
          <img src={product?.image[0]?.url} alt={product?.name} />
          <p>{product?.bookName}</p>
          <div>
            {/* <ReactStars {...options} />{" "} */}
            <span className="productCardSpan">
              {" "}
              ({product?.numOfReviews} Reviews)
            </span>
          </div>
          <span>{`Rs.${product?.price}`}</span>
        </>
      ) : (
        ""
      )}
    </Link>
  );
};

export default ProductCard;