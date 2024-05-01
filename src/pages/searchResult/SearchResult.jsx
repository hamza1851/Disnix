import React, { useState, useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
// useFetch has config  so wont work here
import { fetchData } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams(); // searchQuery has this

  const fetchFirstPage = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  useEffect(() => {
    setPageNum(1); // 1 day debug (set 1 every time query changes)
    fetchFirstPage();
  }, [query]);
  // for infinite scrolling
  const fetchNextPage = () => {
    // last results ko merge karna hai now page is 2 so calling api and mergin the prev+1
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({ ...data, results: { ...data?.results, ...res.results } });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}

      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPage}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, i) => {
                  // result also contains search about person so i'm not showing here maybe in future
                  if (item.media_type === "person") return;
                  return <MovieCard key={i} data={item} fromSearch={true} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div>
              {/* not found bug left */}
              <span className="resultNotFound">Sorry, Results not found!</span>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
