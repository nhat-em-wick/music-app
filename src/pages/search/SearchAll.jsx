import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import Section, { SectionTitle } from "../../components/section/Section";
import { albumTest, songsTest } from "../../constant";
import SongItem from "../../components/song-item/SongItem";
import CardAlbum from "../../components/card-album/CardAlbum";
import zingApi from "../../api/zingApi";

const SearchAll = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  const timerID = useRef();

  useEffect(() => {
    setLoading(true);
    const fetchSearch = async () => {
      try {
        const params = {
          q: searchParams.get("q"),
        };
        const response = await zingApi.searchAll(params);
        timerID.current = setTimeout(() => {
          setResults(response?.data);
          setLoading(false);
        }, 1000);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearch();
    return clearTimeout(timerID.current);
  }, [searchParams]);


  return (
    <div className="search-page__all">
      <h3 className="search-page__all__title">
        tìm kiếm kết quả với <span>{`"${searchParams.get("q")}"`}</span>
      </h3>
      <Section>
        <SectionTitle title="Bài hát" />
        {loading ? (
          <>
            {Array(5)
              .fill()
              .map((item, index) => (
                <SongItem.Loading key={index} />
              ))}
          </>
        ) : (
          <>
          {
            results?.songs !== undefined ? <>
              {results?.songs?.map((item, index) => (
                  <SongItem
                    key={index}
                    songs={results?.songs}
                    indexSong={index}
                    song={item}
                    hiddenInput={true}
                  />
                ))}
            </>  : <span>Không tìm thấy dữ liệu</span>
          }
            
          </>
        )}
      </Section>
      <Section>
        <SectionTitle title="Playlist/Album" />
        <div className="row">
          {
            loading ? <>
            {Array(5)
              .fill()
              .map((item, index) => (
                <div key={index} className="col l-2-4 m-3 c-6">
                  <CardAlbum.Loading/>
              </div>
              ))}
            </> : <>
              {
                results?.playlists !== undefined ? <>
                    {results?.playlists?.map((item, index) => (
                  <div key={index} className="col l-2-4 m-3 c-6">
                    <CardAlbum album={item} />
                  </div>
                ))}
                </> : <span>Không tìm thấy dữ liệu</span>
              }
              
            </>
          }
        </div>
      </Section>
    </div>
  );
};

SearchAll.propTypes = {};

export default SearchAll;
