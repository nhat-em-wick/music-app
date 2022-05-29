import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import CardAlbum from "../../components/card-album/CardAlbum";
import Pagination from "../../components/pagination/Pagination";
import zingApi from "../../api/zingApi";

const SearchAlbum = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [playlists, setPlaylists] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    count: 18,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 18,
  });
  const [loading, setLoading] = useState(true);

  const timerID = useRef();

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const params = {
          ...filters,
          type: "playlist",
          q: searchParams.get("q"),
        };
        const response = await zingApi.searchComponent(params);
        const playlistRes = response.data.items !== undefined ? response.data.items : [];
        timerID.current = setTimeout(() => {
          setPlaylists([...playlists, ...playlistRes]);
          setPagination({
            ...pagination,
            totalRecords: response.data.total,
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchSearch();
    return () => clearTimeout(timerID.current);
  }, [filters]);

  const handleLoadMore = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  return (
    <>
      {loading ? (
        <>
          <div className="row">
            {Array(10)
              .fill()
              .map((item, index) => (
                <div key={index} className="col l-2-4 m-4 c-6">
                  <CardAlbum.Loading />
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          {playlists.length > 0 ? (
            <div className="row">
              {playlists.map((item, index) => (
                <div key={index} className="col l-2-4 m-4 c-6">
                  <CardAlbum album={item} />
                </div>
              ))}
            </div>
          ) : (
            <span>Không tìm thấy dữ liệu</span>
          )}

          {playlists.length > 0 ? (
            <Pagination pagination={pagination} onPageChange={handleLoadMore} />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

SearchAlbum.propTypes = {};

export default SearchAlbum;
