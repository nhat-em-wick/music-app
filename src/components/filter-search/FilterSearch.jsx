import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../custom-hook/clickOutside";
import useDebounce from "../../custom-hook/useDebounce";
import zingApi from "../../api/zingApi";
import "./filter-search.scss";

const FilterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMobile, setActiveMobile] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const debounce = useDebounce(searchTerm, 800)
  const navigate = useNavigate()

  const resultsRef = useClickOutside(() => {
    setShowResults(false);
  });

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    if(!debounce.trim()) {
      setSearchResults([])
      return
    }
    const fetchSearch = async () => {
      try {
        const response = await zingApi.searchAll({q: debounce})
        setSearchResults(response.data.songs)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSearch()
  }, [debounce])

  const handleClearInput = () => {
    setSearchTerm("");
    inputRef.current.focus();
  };

  const handleNavigate = () => {
    if(searchTerm.length > 0) {
      navigate(`/tim-kiem/tat-ca?q=${searchTerm}`)
    }
  }

  return (
    <>
      <div className={`search-wrapper ${activeMobile ? "show-mobile" : ""}`}>
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => handleChangeInput(e)}
          placeholder="Tên bài hát, ca sĩ"
          className="search__input"
          onFocus={() => setShowResults(true)}
          onKeyPress={(e) => {
            if(e.key === 'Enter') {
              handleNavigate()
            }
          }}
        />
        <div className="search-action">
          {searchTerm.length > 0 && (
            <div
              onClick={handleClearInput}
              className="search-action__icon action--clear"
            >
              <i className="bx bx-x"></i>
            </div>
          )}

          <div onClick={handleNavigate} className="search-action__icon action--search">
            <i className="bx bx-search"></i>
          </div>
        </div>
        <div className="search-action-mobile">
          {searchTerm.length > 0 ? (
            <>
              <div
                onClick={handleClearInput}
                className="search-action__icon action--clear"
              >
                <i className="bx bx-x"></i>
              </div>
              <div className="search-action__icon action--search">
                <i className="bx bx-search"></i>
              </div>
            </>
          ) : (
            <div
              onClick={() => {
                setActiveMobile(false);
              }}
              className="search-action__text action--close"
            >
              Đóng
            </div>
          )}
        </div>
        <SearchResult
          keyword={searchTerm}
          ref={resultsRef}
          visible={
            showResults && (searchResults !== undefined && searchResults.length > 0) && searchTerm.length > 0
          }
          results={searchResults}
        />
      </div>
      <div
        onClick={() => {
          setActiveMobile(true);
          inputRef.current.focus();
        }}
        className="search__icon-mobile--toggle"
      >
        <i className="bx bx-search"></i>
      </div>
    </>
  );
};

const SearchResult = React.forwardRef(({ results, visible, keyword }, ref) => {
  
  return (
    <div
      ref={ref}
      className={`search-result-wrapper ${visible ? "active" : ""} `}
    >
      <div className="search-result__title">
        {keyword.length > 0 && `Tìm kiếm với từ khóa "${keyword}"`}
      </div>
      <ul className="search-result__list-songs">
        {results !== undefined && results
          .map((item, index) => (
            <li key={index} className="search-result__item-song">
              <Link to={ item.album ? `album/${item.album.encodeId}` : `bai-hat/${item.encodeId}`} className="search-result__link-song">
                <div className="search-result__item-song__thumb">
                  <img
                    src={item.thumbnail}
                    alt=""
                  />
                </div>
                <div className="search-result__item-song__info">
                  <div className="search-result__item-song__name">
                    {item.title}
                  </div>
                  <div className="search-result__item-song__singer">
                    {item.artistsNames}
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
});


export default FilterSearch;
