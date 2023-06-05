import axios from "axios";
import React, { useEffect, useState } from "react";

const Pokmon = () => {
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(10);
  const [mainLoader, setMainLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLimit(limit + 10);
    }
  };

  const getData =  (url) => {
    setIsLoading(true);
     axios
      .get(url)
      .then((res) => {
        setData(res.data?.data);
        setIsLoading(false);
        setMainLoader(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (!search) {
      let url = `https://api.pokemontcg.io/v2/cards?page=1&pageSize=${limit}`;
       getData(url);
    }
  }, [limit, search]);

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
      <div className=" mx-auto pokmon-container">
        {!mainLoader && data && data.length > 0 ? (
          data.map((item, i) => {
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
    </div>
  );
};

export default Pokmon;
