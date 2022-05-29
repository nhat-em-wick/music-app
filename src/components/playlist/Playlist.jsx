import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SongItem from "../song-item/SongItem";
import Pagination from "../pagination/Pagination";
import "./playlist.scss";
const Playlist = ({ list, loading }) => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [sortNameSong, setSortNameSong] = useState("asc");
  const [sortAlbum, setSortAlbum] = useState("asc");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const timerID = useRef(null);

  useEffect(() => {
    setPagination({
      ...pagination,
      totalRecords: list.length,
    });
    setSongs([]);
  }, [list]);

  useEffect(() => {
    const start = (pagination.page - 1) * pagination.limit;
    const end = (pagination.page - 1) * pagination.limit + pagination.limit;
    const records = list.slice(start, end);
    setSongs((prev) => [...prev, ...records]);
  }, [pagination]);

  const handleSelectedSongs = (id) => {
    setSelectedSongs((prev) => {
      const isChecked = selectedSongs.includes(id);
      if (isChecked) {
        return selectedSongs.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectedAll = (bool) => {
    if (bool) {
      const selected = songs.map((item) => item.encodeId);
      setSelectedAll(true);
      setSelectedSongs(selected);
    } else {
      setSelectedAll(false);
      setSelectedSongs([]);
    }
  };

  useEffect(() => {
    if (selectedSongs.length > 0) {
      selectedSongs.length === songs.length
        ? setSelectedAll(true)
        : setSelectedAll(false);
    } else {
      setSelectedAll(false);
    }
  }, [selectedSongs]);

  const handleSortNameSong = (type) => {
    const copySongs = [...songs];
    let newSongs = [];
    newSongs = copySongs.sort((a, b) => {
      return type === "asc"
        ? a.title.localeCompare(b.title)
        : -a.title.localeCompare(b.title);
    });
    setSortNameSong(type === "asc" ? "desc" : "asc");
    setSongs([...newSongs]);
  };

  const handleSortAlbum = (type) => {
    let newSongs = [];
    const copySongs = [...songs];
    newSongs = copySongs.sort((a, b) => {
      return type === "asc"
        ? a?.album?.title.localeCompare(b?.album?.title)
        : -a?.album?.title.localeCompare(b?.album?.title);
    });
    setSortAlbum(type === "asc" ? "desc" : "asc");
    setSongs([...newSongs]);
  };

  const handleLoadMore = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  return (
    <div className="playlist">
      <div className="playlist__header">
        <div className="playlist__header__left">
          <div
            onClick={() => handleSelectedAll(!selectedAll)}
            className={`playlist__header__checkbox-custom ${
              selectedSongs.length > 0 ? "show" : ""
            } ${selectedAll ? "selected" : ""}`}
          ></div>
          <div
            onClick={() => handleSortNameSong(sortNameSong)}
            className="playlist__header__title"
          >
            <div className="playlist__header__title__text">Bài hát</div>
            <div className="playlist__header__title__icon">
              {sortNameSong === "asc" ? (
                <i className="bx bx-sort-up"></i>
              ) : (
                <i className="bx bx-sort-down"></i>
              )}
            </div>
          </div>
        </div>
        <div className="playlist__header__center">
          <div
            onClick={() => handleSortAlbum(sortAlbum)}
            className="playlist__header__title"
          >
            <div className="playlist__header__title__text">Album</div>
            <div className="playlist__header__title__icon">
              {sortAlbum === "asc" ? (
                <i className="bx bx-sort-up"></i>
              ) : (
                <i className="bx bx-sort-down"></i>
              )}
            </div>
          </div>
        </div>
        <div className="playlist__header__right">
          <div className="playlist__header__title">
            <div className="playlist__header__title__text">Thời gian</div>
          </div>
        </div>
      </div>
      <div className="playlist__content">
        {!loading ? (
          <>
            {songs.map((item, index) => (
              <SongItem
                key={index}
                song={item}
                songs={songs}
                indexSong={index}
                onSelected={(id) => handleSelectedSongs(id)}
                selected={selectedSongs.includes(item.encodeId)}
              />
            ))}
            {songs.length > 0 && (
              <Pagination
                pagination={pagination}
                onPageChange={handleLoadMore}
              />
            )}
          </>
        ) : (
          <>
            {Array(10)
              .fill()
              .map((item, index) => (
                <SongItem.Loading key={index} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

Playlist.propTypes = {
  list: PropTypes.array,
};

export default Playlist;
