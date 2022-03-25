import React from "react";
import "./Cats.css";

const Cats = ({ cats = [], page, currentPage }) => {
  return (
    <div className="row">
      {cats

        .slice((currentPage - 1) * page, (currentPage - 1) * page + page)
        .map((item, index) => (
          <div key={index} className="col mb-4 d-flex ">
            <div
              className="card borderCard justify-content-center"
              style={{ minWidth: "250px", minHeigth: "200px" }}
            >
              {!item.image ? (
                <img
                  className="imageBorder"
                  style={{ width: "100%", height: "50%" }}
                  alt="Not Image Reference"
                ></img>
              ) : (
                <img
                  className="imageBorder"
                  style={{ width: "100%", height: "50%" }}
                  src={item.image.url}
                  alt=""
                ></img>
              )}

              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <hr />
                <p>Id: {item.id}</p>
                <p>Origin: {item.origin}</p>
                <p>Temperament: {item.temperament}</p>
                <p>Imperial: {item.weight.imperial}</p>
                <p>Metric: {item.weight.metric}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Cats;
