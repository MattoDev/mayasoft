import React from "react";
import { useEffect } from "react";
import { useAppContext } from "../context/context";
import MaterialTable from "material-table";
import axios from "axios";
import { Modal, TextField, Button } from "@material-ui/core";

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

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Add new cat</h3>
      <TextField
        className={styles.inputMaterial}
        label="Id"
        name="id"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Name"
        name="name"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Breed"
        name="breed"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Weigth"
        name="weigth"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => post()}>
          Insert
        </Button>
        <Button onClick={() => openCloseInsertModal()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Cat edit</h3>

      <br />
      <TextField
        className={styles.inputMaterial}
        label="Name"
        name="name"
        onChange={handleChange}
        value={selectCat && selectCat.name}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Breed"
        name="breed"
        onChange={handleChange}
        value={selectCat && selectCat.breed}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Weigth"
        name="weigth"
        onChange={handleChange}
        value={selectCat && selectCat.weigth}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => put()}>
          Edit
        </Button>
        <Button onClick={() => openCloseEditModal()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Are you sure you want to delete this cat?{" "}
        <b>{selectCat && selectCat.name}</b>?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => deletePetition()}>
          Yes
        </Button>
        <Button onClick={() => openCloseDeleteModal()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <Button
        color="primary"
        variant="contained"
        className="mt-3 mb-3"
        onClick={() => openCloseInsertModal()}
      >
        Add cat
      </Button>
      <MaterialTable
        columns={columns}
        data={data}
        title="My cat list"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit cat",
            onClick: (event, rowData) => selectedCat(rowData, "Edit"),
          },
          {
            icon: "delete",
            tooltip: "Delete cat",
            onClick: (event, rowData) => selectedCat(rowData, "Delete"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header: {
            actions: "Action",
          },
        }}
      />

      <Modal open={insertModal} onClose={openCloseInsertModal}>
        {bodyInsertar}
      </Modal>
      <Modal open={editModal} onClose={openCloseEditModal}>
        {bodyEditar}
      </Modal>
      <Modal open={deleteModal} onClose={openCloseDeleteModal}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}
