import React from "react";
import { useEffect } from "react";
import { useAppContext } from "../context/context";
import axios from "axios";
import CatTable from "../components/CatTable";

export default function LocalCatList() {
  const {
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
  } = useAppContext();

  const catCrud = "http://localhost:3001/cats";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectCat((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const get = async () => {
    await axios
      .get(catCrud)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const post = async () => {
    await axios
      .post(catCrud, selectCat)
      .then((response) => {
        setData(data.concat(response.data));
        openCloseInsertModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const put = async () => {
    await axios
      .put(catCrud + "/" + selectCat.id, selectCat)
      .then((response) => {
        let newData = data;
        newData.map((cat) => {
          if (cat.id === selectCat.id) {
            cat.name = selectCat.name;
            cat.breed = selectCat.breed;
            cat.weigth = selectCat.weigth;
          }
        });
        setData(newData);
        openCloseEditModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePetition = async () => {
    await axios
      .delete(catCrud + "/" + selectCat.id)
      .then((response) => {
        setData(data.filter((cat) => cat.id !== selectCat.id));
        openCloseDeleteModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openCloseInsertModal = () => {
    setInsertModal(!insertModal);
  };

  const openCloseEditModal = () => {
    setEditModal(!editModal);
  };
  const openCloseDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const selectedCat = (cat, i) => {
    setSelectCat(cat);
    i === "Edit" ? openCloseEditModal() : openCloseDeleteModal();
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="container">
      <CatTable
        styles={styles}
        columns={columns}
        handleChange={handleChange}
        post={post}
        openCloseInsertModal={openCloseInsertModal}
        selectCat={selectCat}
        put={put}
        openCloseEditModal={openCloseEditModal}
        deletePetition={deletePetition}
        openCloseDeleteModal={openCloseDeleteModal}
        data={data}
        selectedCat={selectedCat}
        insertModal={insertModal}
        editModal={editModal}
        deleteModal={deleteModal}
      />
    </div>
  );
}
