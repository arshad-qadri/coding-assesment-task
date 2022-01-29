import axios from "axios";
import React, { useEffect, useState } from "react";

const Pokmon = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [mainLoader, setMainLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // setPage(page + 1);
      setLimit(limit + 10);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${limit}`,
        {}
      )
      .then((res) => {
        setData(res);
        setIsLoading(false);
        setMainLoader(false);
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log(limit);
  }, [limit]);
  return (
    <>
      <div className="container mx-auto pokmon-container">
        {!mainLoader ? (
          data.data.data.map((item, i) => {
            return (
              <div className="pokmon" key={i}>
                <img src={item.images.small} alt={item.name} />
                <div className="details">
                  <h5>{item.name}</h5> <div className="hp">hp : {item.hp} </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    margin: "8px 0",
                  }}
                >
                  <h5 className="m-0 ">Attacks :</h5>
                  {item?.attacks?.map((x, ind) => (
                    <span key={ind} style={{ marginLeft: "5px" }}>
                      {x.name}
                      {ind > -1 ? "," : ind - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
                <p className="m-0">
                  <b>Abilities</b> : N/A
                </p>
              </div>
            );
          })
        ) : (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}
      </div>
      {!mainLoader && isLoading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default Pokmon;
