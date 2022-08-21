import React, { useEffect, useState } from "react";
import "./sttyle.css";

const renderData = (data) => {
  return (
    <ul>
      {data.map((todo, index) => (
        <li key={index}>{todo.title}</li>
      ))}
    </ul>
  );
};

const Pagination = () => {
  const [data, setData] = useState([]); //original data
  const [currentPage, setCurrentPage] = useState(1); //current page
  const [itemsPerPage, setItemsPerPage] = useState(5); //items per page
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handlePrev = () => {
    setCurrentPage(currentPage + 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleClick = (event) => {
    setCurrentPage(event.target.id);
  };
  const page = []; //sare page agaye isme
  for (let i = 1; i < Math.ceil(data.length / itemsPerPage); i++) {
    page.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumber = page.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li key={number} id={number} onClick={handleClick}>
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  return (
    <div>
      <h1>Todo</h1>
      {renderData(currentItems)}
      <ul className="pagenumber">
        <li onClick={handlePrev}>prev</li>
        {renderPageNumber}
        <li onClick={handleNext}>next</li>
      </ul>
    </div>
  );
};

export default Pagination;
