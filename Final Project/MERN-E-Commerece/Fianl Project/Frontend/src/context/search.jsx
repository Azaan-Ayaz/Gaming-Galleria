import { createContext, useContext, useState } from "react";

const searchContext = createContext();

// const [search, setsearch] = useState({
//     user:null
// })

const SearchProvider = (props) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  return (
    <searchContext.Provider value={[search, setSearch]}>
      {props.children}
    </searchContext.Provider>
  );
};

// custom hook

const usesearch = () => useContext(searchContext);

export { usesearch, SearchProvider };
