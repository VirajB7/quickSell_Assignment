import React from 'react';
import './header.css';
import PlusIcon from '../../icons/add.svg';
import OptionsIcon from '../../icons/3 dot menu.svg'; 
import SvgMapping from '../svgMapping/svgMapping';

const ColumnHeader = ({ leftSvg, term, ticketCount }) => {
  return (
    <div className="column-header">
      <div className="left-section">
        <img src={leftSvg} alt={term} className="left-svg" />
        <p className="term">{term}</p>
        <p className="ticket-count">({ticketCount})</p>
      </div>
      <div className="right-section">
        <img src={PlusIcon} alt="Add Ticket" className="icon add-icon" />
        <img src={OptionsIcon} alt="Options" className="icon options-icon" />
      </div>
    </div>
  );
};

export default ColumnHeader;
