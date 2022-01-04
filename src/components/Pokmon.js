import axios from "axios";
import React, { useEffect, useState } from "react";

const Pokmon = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(page + 1);
      setLimit(limit + 10);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${limit}`,
        {}
      )
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log(limit);
  }, [page, limit]);
  return (
    <>
      <h1>pokemon</h1>
      <div className="pokmon-container">
        {data?.data?.data.map((item, i) => {
          return (
            <div className="pokmon" key={i}>
              <img src={item.images.small} alt={item.name} />
              <div className="details">
                <h5>{item.name}</h5> <div className="hp">hp : {item.hp} </div>
              </div>
              <p>{item.artist}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Pokmon;
