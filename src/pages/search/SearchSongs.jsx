import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import SongItem from "../../components/song-item/SongItem";
import Pagination from "../../components/pagination/Pagination";
import zingApi from "../../api/zingApi";

const SearchSongs = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [songs, setSongs] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    count: 18
  })
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
          type: "song",
          q: searchParams.get("q"),
        };
        const response = await zingApi.searchComponent(params);
        const songsRes = response.data.items !== undefined ? response.data.items : []
        timerID.current = setTimeout(() => {
          setSongs([...songs, ...songsRes]);
          setPagination({
            ...pagination,
            totalRecords: response.data.total
          })
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
          {Array(10)
            .fill()
            .map((item, index) => (
              <SongItem.Loading key={index} />
            ))}
        </>
      ) : (
        <>
        {
          songs.length > 0 ? <>{songs.map((item, index) => (
            <SongItem
              key={index}
              indexSong={index}
              song={item}
              songs={songs}
              hiddenInput={true}
            />
          ))}</> : <span>Không tìm thấy dữ liệu</span>
        }
          
          {
              songs.length > 0 && <Pagination
              pagination={pagination}
              onPageChange={handleLoadMore}
            />
            }
        </>
      )}
    </>
  );
};

SearchSongs.propTypes = {};

export default SearchSongs;
