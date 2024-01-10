import React from "react";
// import { searchInput } from "../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usesearch } from "../context/search";
// import searchInput from "./searchInput";

const SearchInput = () => {
  const [values, setValues] = usesearch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <form
        className="d-flex text-black p-1"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control p-2 me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => {
            setValues({ ...values, keyword: e.target.value });
          }}
        />
        <button className="btn btn-outline-success" type="submit"></button>
      </form>
    </>
  );
};

export default SearchInput;
