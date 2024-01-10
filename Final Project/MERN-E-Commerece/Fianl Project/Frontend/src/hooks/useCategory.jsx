import axios from "axios";
import { useEffect, useState } from "react";

const useCategory = () => {
  const [cateroies, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/category");
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return cateroies;
};
export default useCategory;
