import axios from "axios";
import React, { useEffect, useState } from "react";
import Paginate from "./components/Paginate";

const Pagination = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const perPageLimit = 10;

  const getData = async (url) => {
    setIsLoading(true);
    await axios
      .get(url)
      .then((res) => {
        setData(res.data?.data);
        setIsLoading(false);

        setTotalCount(res.data?.totalCount);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err", err);
      });
  };

  useEffect(async () => {
    if (!search) {
      let url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${perPageLimit}`;
      await getData(url);
    }
  }, [perPageLimit, search, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let filtered = data.filter((item) => item.name.includes(search));
    setData(filtered);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search with name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div className=" mx-auto pokmon-container">
          {data && data.length > 0 ? (
            data.map((item, i) => {
              return (
                <div className="pokmon" key={i}>
                  <img src={item.images.small} alt={item.name} />
                  <div className="details">
                    <h5>{item.name}</h5>{" "}
                    <div className="hp">hp : {item.hp} </div>
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
              <p>No Data</p>
            </div>
          )}
        </div>
      )}
      <Paginate
        totalCount={totalCount}
        page={page}
        setPage={setPage}
        perPageLimit={perPageLimit}
      />
    </div>
  );
};

export default Pagination;
