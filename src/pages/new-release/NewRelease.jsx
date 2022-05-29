import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Section, { SectionTitle } from "../../components/section/Section";
import SongItem from "../../components/song-item/SongItem";
import Pagination from "../../components/pagination/Pagination";
import Helmet from "../../components/helmet/Helmet";
import zingApi from "../../api/zingApi";

const NewRelease = (props) => {

  const [songs, setSongs] = useState([]);
  const [songsTemp, setSongsTemp] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const [loading, setLoading] = useState(true);

  const timerID = useRef();

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await zingApi.newRelease();
        console.log(response)
        setSongs(response.data.items);
        setPagination({
          ...pagination,
          totalRecords: response.data.items.length,
        });
        timerID.current = setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchChart();
    return () => clearTimeout(timerID.current)
  }, []);

  

  useEffect(() => {
    const start = (pagination.page - 1) * pagination.limit;
    const end = (pagination.page - 1) * pagination.limit + pagination.limit;
    const records = songs.slice(start, end);
    setSongsTemp((prev) => [...prev, ...records]);
  }, [pagination]);

  const handleLoadMore = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  return (
    <Helmet title="Mới phát hành"> 
      <div className="new-release">
        <Section>
          <SectionTitle title="mới phát hành" />
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
              {songsTemp.map((item, index) => (
                <SongItem
                  key={index}
                  indexSong={index}
                  song={item}
                  songs={songs}
                  hiddenInput={true}
                />
              ))}
              {songs.length > 0 ? (
                <Pagination pagination={pagination} onPageChange={handleLoadMore} />
              ) : (
                ""
              )}
            </>
          )}
        </Section>
      </div>
    </Helmet>
  );
};

NewRelease.propTypes = {};

export default NewRelease;
