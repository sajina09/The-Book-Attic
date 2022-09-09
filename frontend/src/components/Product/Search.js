import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  // const history = useNavigate();

  const searchSubmitHandler = (e) => {
    console.log("THe search component");
    e.preventDefault();
    if (keyword.trim()) {
      console.log("THe search ------", keyword);
      history(`/products/${keyword}`);
    } else {
      console.log("else part");
      history("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
