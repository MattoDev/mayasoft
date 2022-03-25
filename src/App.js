import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent";
import { AppContext } from "./context/context";

function App() {
  const [cats, setCats] = useState([]);
  const [searchCats, setSearchCats] = useState([]);
  const [page, setPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          cats,
          setCats,
          searchCats,
          setSearchCats,
          page,
          currentPage,
          setCurrentPage,
          search,
          setSearch,
        }}
      >
        <NavbarComponent />
      </AppContext.Provider>
    </div>
  );
}

export default App;
