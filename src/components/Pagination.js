import React from "react";

import { Button } from "@material-ui/core";
const Pagination = ({
  onPrevious,
  onNext,
  max,
  currentPage,
  value,
  handleChange,
}) => {
  const handlePrevious = () => {
    onPrevious();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <nav className="my-5">
      <ul className="pagination justify-content-center">
        {currentPage > 1 ? (
          <li className="page-item">
            <Button
              color="primary"
              variant="contained"
              onClick={handlePrevious}
            >
              Previous
            </Button>
          </li>
        ) : null}
        <h2 style={{ padding: "0 12px" }}>
          Page {currentPage} to {max}
        </h2>
        {currentPage < max ? (
          <li className="page-item">
            <Button color="primary" variant="contained" onClick={handleNext}>
              Next
            </Button>
          </li>
        ) : null}
      </ul>
      <div className="containerInput">
        <input
          className="form-control"
          value={value}
          placeholder="search by name or breed"
          onChange={handleChange}
        />
      </div>
    </nav>
  );
};

export default Pagination;
