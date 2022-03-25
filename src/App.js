import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent";
import { AppContext } from "./context/context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  icons: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function App() {
  const [cats, setCats] = useState([]);
  const [searchCats, setSearchCats] = useState([]);
  const [page, setPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const styles = useStyles();
  const [data, setData] = useState([]);
  const [insertModal, setInsertModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectCat, setSelectCat] = useState({
    id: "",
    name: "",
    breed: "",
    weigth: "",
  });

  const columns = [
    { title: "Id", field: "id" },
    { title: "Name", field: "name" },
    { title: "Breed", field: "breed" },
    { title: "Weigth", field: "weigth", type: "numeric" },
  ];

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
          data,
          setData,
          insertModal,
          setInsertModal,
          editModal,
          setEditModal,
          deleteModal,
          setDeleteModal,
          selectCat,
          setSelectCat,
          styles,
          columns,
        }}
      >
        <NavbarComponent />
      </AppContext.Provider>
    </div>
  );
}

export default App;
