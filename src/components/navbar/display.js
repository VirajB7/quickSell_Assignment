import React, { useState, useRef } from 'react';
import './display.css';
import displayIcon from '../../icons/Display.svg';
import downIcon from '../../icons/down.svg';

const Display = ({ grouping, sorting, handleGroupingChange, handleSortingChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown on button click
  const handleButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when mouse leaves the dropdown area
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="display-navbar">
      {/* Display Button */}
      <div className="display-button-wrapper">
        <button className="display-button" onClick={handleButtonClick}>
          <div id="display-icon"><img src={displayIcon} alt="" /></div>
          <div>Display</div>
          <div id="down-icon"><img src={downIcon} alt=""/></div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className="dropdown-menu"
            ref={dropdownRef}
            onMouseLeave={handleMouseLeave}
          >
            <div className="dropdown-item">
              <label htmlFor="grouping">Grouping</label>
              <select
                id="grouping"
                value={grouping}
                onChange={handleGroupingChange}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label htmlFor="sorting">Ordering</label>
              <select
                id="sorting"
                value={sorting}
                onChange={handleSortingChange}
              >
                <option value="">None</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Display;
