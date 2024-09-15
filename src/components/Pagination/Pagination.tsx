
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import './Pagination.css'

function PaginationComponent({ activeItem, onPageChange, totalRecords, limit }) {
  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleTotalPages = () => {
    return Math.ceil(totalRecords / limit);
  };

  let totalPages = handleTotalPages();

  const getVisiblePages = () => {
    const visiblePages = [];
    let startPage, endPage;

    if (totalPages <= 5) {
      // Show all pages if totalPages is less than or equal to 5
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate startPage and endPage based on activeItem
      if (activeItem <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (activeItem + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = activeItem - 2;
        endPage = activeItem + 2;
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      visiblePages.push(
        <Pagination.Item  
          key={number}
          active={number === activeItem}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='pagination-container'>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          disabled={activeItem === 1}
          onClick={() => handlePageChange(activeItem > 1 ? activeItem - 1 : 1)}
        />
        {visiblePages}
        <Pagination.Next
          disabled={activeItem === totalPages || activeItem > totalPages}
          onClick={() =>
            handlePageChange(activeItem < totalPages ? activeItem + 1 : totalPages)
          }
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
}

PaginationComponent.propTypes = {
  activeItem: PropTypes.number,
  onPageChange: PropTypes.func,
  totalRecords: PropTypes.number,
  limit: PropTypes.number,
};

export default PaginationComponent;