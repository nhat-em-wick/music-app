import React from "react";
import PropTypes from "prop-types";

import "./pagination.scss";

const Pagination = ({ pagination, onPageChange }) => {
  const { page, limit, totalRecords } = pagination;
  const totalPages = Math.ceil(totalRecords / limit);
  
  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div onClick={() => handlePageChange(page + 1)} className={`pagination ${page >= totalPages ? 'disable' : ''}`}>
      <div  className="pagination__btn">
        <div className={`pagination__icon`}>
          <i className="bx bx-loader-circle bx-spin bx-flip-horizontal"></i>
        </div>
        <div className="pagination__text">Xem thêm</div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  onPageChange: null,
};

export default Pagination;
