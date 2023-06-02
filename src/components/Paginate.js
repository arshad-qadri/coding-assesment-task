import React, { useEffect, useState } from "react";

const Paginate = ({ totalCount, page, setPage, perPageLimit }) => {
  const [pages, setPages] = useState([]);
  let totalPage = Math.round(totalCount / perPageLimit);

  useEffect(() => {
    if (totalPage > 0) {
      let temp = [];
      for (let i = 1; i <= totalPage; i++) {
        if (i <= 5) {
          temp.push(i);
        }
      }
      setPages(temp);
    }
  }, [totalPage]);

  const handleNext = () => {
    let pgs = [...pages];
    if (pgs[pgs.length - 1] < totalPage) {
      pgs.shift();
      pgs.push(pgs[pgs.length - 1] + 1);
      setPages(pgs);
      setPage(page + 1);
    }
  };
  const handlePerv = () => {
    let pgs = [...pages];
    if (pgs[0] > 1) {
      pgs.pop();
      pgs.unshift(pgs[0] - 1);
      setPages(pgs);
      setPage(page - 1);
    }
  };
  const handleItem = (item) => {
    setPage(item);
  };
  return (
    <div className="pagination">
      <button onClick={handlePerv}>Prev</button>
      {pages && pages.length > 0
        ? pages.map((item, ind) => (
            <button
              key={ind}
              className={`item ${item === page && "active"}`}
              onClick={() => handleItem(item)}
            >
              {item}
            </button>
          ))
        : ""}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Paginate;
