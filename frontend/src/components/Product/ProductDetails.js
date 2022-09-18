import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/ProductActions";
import ReviewCard from "./ReviewCard.js";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/CartActions";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@mui/material";
// import Rating from "@mui/material/Rating";

// import { NEW_REVIEW_RESET } from "../../constants/ProductConstants";
// import BookButton from "../Button";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const productData = product?.data?.book;

  const { cartItems } = useSelector((state) => state.productDetails);

  console.log("cartItems", cartItems);

  // const { success, error: reviewError } = useSelector(
  //   (state) => state.newReview
  // );

  const options = {
    size: "large",
    value: productData?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  // const addToCartHandler = () => {
  //   dispatch(addItemsToCart(id, quantity));
  //   alert.success("Item Added To Cart");
  // };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  console.log(" id in add to cart ", id);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item added to cart");
    console.log("cartItems ====== ", cartItems);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    //   if (reviewError) {
    //     alert.error(reviewError);
    //     dispatch(clearErrors());
    //   }

    //   if (success) {
    //     alert.success("Review Submitted Successfully");
    //     dispatch({ type: NEW_REVIEW_RESET });
    //   }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${productData?.bookName} -- TBA`} />
          <div className="ProductDetails">
            <div>
              <img
                className="CarouselImage"
                src={productData?.image[0].url}
                alt={`Slide`}
              />

              {/* <Carousel>
                {productData?.image &&
                  productData?.image.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel> */}
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{productData?.bookName}</h2>
                <p>Product # {productData?._id}</p>
              </div>
              <div className="detailsBlock-2">
                {/* <Rating {...options} /> */}
                <span className="detailsBlock-2-span">
                  {" "}
                  ({productData?.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs.${productData?.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={productData?.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b
                    className={
                      productData?.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {productData?.stock < 1 ? " OutOfStock" : " InStock"}{" "}
                    {productData?.stock}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{productData?.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {/* <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>{" "} */}
          {productData?.reviews && productData?.reviews[0] ? (
            <div className="reviews">
              {productData?.reviews &&
                productData?.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
