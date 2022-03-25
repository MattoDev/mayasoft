import React from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";

const CatTable = ({
  styles,
  columns,
  handleChange,
  post,
  openCloseInsertModal,
  selectCat,
  put,
  openCloseEditModal,
  deletePetition,
  openCloseDeleteModal,
  data,
  selectedCat,
  insertModal,
  editModal,
  deleteModal,
}) => {
  const bodyInsert = (
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

  const bodyEdit = (
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

  const bodyDelete = (
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
        {bodyInsert}
      </Modal>
      <Modal open={editModal} onClose={openCloseEditModal}>
        {bodyEdit}
      </Modal>
      <Modal open={deleteModal} onClose={openCloseDeleteModal}>
        {bodyDelete}
      </Modal>
    </div>
  );
};

export default CatTable;
