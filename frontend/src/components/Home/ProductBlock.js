import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCard";
import "./Home.css";

const ProductBlock = ({ productList }) => {
  const history = useNavigate();
  const handleClick = () => {
    history("/products");
  };
  return (
    <div className="see-all-container" key={productList?._id}>
      <div className="container" id="container">
        {productList &&
          productList.map((product) => (
            <ProductCard key={product?.ISBN} product={product} />
          ))}
      </div>
      {/* <div>
        <button onClick={handleClick}>See All</button>
      </div> */}
    </div>
  );
};

export default ProductBlock;
