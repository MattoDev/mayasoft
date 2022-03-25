import React, { Component } from "react";
import { useAppContext } from "../context/context";
import { useEffect } from "react";
import Pagination from "../components/Pagination";
import Cats from "../components/Cats";

export default function GlobalCatList() {
  const {
    cats,
    setCats,
    searchCats,
    setSearchCats,
    page,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
  } = useAppContext();

  let max;
  const catUrl = "https://api.thecatapi.com/v1/breeds";

  searchCats.length === 0
    ? (max = Math.ceil(cats.length / page))
    : (max = Math.ceil(searchCats.length / page));

  const fetchCats = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCats(data);
      })
      .catch((error) => console.log(error));
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleChange = (e) => {
    setSearch(e);

    if (e !== "") {
      let oldList = cats;
      let newList = [];
      newList = oldList.filter(
        (element) =>
          element.name.toString().toLowerCase().includes(e.toLowerCase()) ||
          element.id.toString().toLowerCase().includes(e.toLowerCase())
      );

      setSearchCats(newList);
    } else {
      setSearchCats(cats);
    }
  };

  useEffect(() => {
    fetchCats(catUrl);
  }, []);
  return (
    <>
      <div className="container mt-5 ">
        <Pagination
          onPrevious={onPrevious}
          onNext={onNext}
          max={max}
          currentPage={currentPage}
          value={search}
          handleChange={(e) => handleChange(e.target.value)}
        />
        <Cats
          cats={search.length < 1 ? cats : searchCats}
          page={page}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
