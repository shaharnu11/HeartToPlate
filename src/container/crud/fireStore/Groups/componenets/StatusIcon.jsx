import React from 'react';
import './StatusIcon.css';

const StatusIcon = ({ status, type }) => {
  let backgroundColor;

  switch (status) {
    case 'Pending':
    case 'invited':
    case 'manually created':
      backgroundColor = '#F98825';
      break;
    case 'active':
      backgroundColor = '#28D96C';
      break;
    default:
      backgroundColor = '#898989';
      break;
  }

  return <div className={`status-icon ${type}`} style={{ backgroundColor }} />;
};

export default StatusIcon;
