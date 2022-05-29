import React, {useEffect, useState} from "react";
import { Outlet, Link, useSearchParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Helmet from "../../components/helmet/Helmet";
import "./search.scss";

const linkSearch = [
  {
    path: 'tat-ca',
    display: 'tất cả'
  },
  {
    path: 'bai-hat',
    display: 'bài hát'
  },
  {
    path: 'album',
    display: 'album/playlist'
  }
]

const Search = (props) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeLink, setActiveLink] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const currPath = location.pathname.split("/")[2];
    const activeItem = linkSearch.findIndex((e) => e.path === currPath);
    setActiveLink(currPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <Helmet title={"Tìm kiếm"}>
      <div className="search-page">
        <div className="search-page__header">
          <h2 className="search-page__header__title">kết quả tìm kiếm</h2>
          <div className="search-page__header__navbar">
            {
              linkSearch.map((item, index) => (
                <Link key={index} to={`${item.path}?q=${searchParams.get('q')}`} className={`search-page__header__navbar__item ${activeLink === index ? 'active' : ''}`}>{item.display}</Link>
              ))
            }
          </div>
        </div>
        <div className="search-page__content">
          <Outlet />
        </div>
      </div>
    </Helmet>
  );
};

Search.propTypes = {};

export default Search;
