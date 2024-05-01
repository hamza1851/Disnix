import React from "react";
import "./style.scss";
// import using obj
import HeroBanner from "../home/heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./toprated/TopRated";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
