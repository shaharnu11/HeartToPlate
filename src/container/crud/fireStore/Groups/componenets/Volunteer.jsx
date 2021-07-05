import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import StatusIcon from './StatusIcon.jsx';
import './Volunteer.css';

const Volunteer = ({ firstName, lastName, city, isLeader, status }) => {
  return (
    <div className="volunteer-container">
      <div className="volunteer-status-container">
        <div className="volunteer-status">
          <StatusIcon type="volunteer" status={status} />
          <span style={{ marginLeft: '5px' }}>{status} since 30/12/20</span>
        </div>
        <button type="button" style={{ padding: 0 }}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>

      <div className={`volunteer-content ${status}`}>
        {status === 'invited' ? (
          <>
            <div className="volunteer-info invited">
              <div className="volunteer-info-item">Full Name</div>
              <div className="volunteer-info-item">0527243298</div>
            </div>
            <button type="button" className="button" style={{ marginTop: '7px' }}>
              ENROLL NEW VOLUNTEER
            </button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className="image-container"
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#898989',
                  marginBottom: '7px',
                }}
              />
              <div>F/36</div>
            </div>
            <div className="volunteer-info">
              <div className="volunteer-info-item">{city}</div>
              <div className="volunteer-info-item">{firstName}</div>
              <div className="volunteer-info-item">{lastName}</div>
              <div className="volunteer-info-item">Organization</div>
            </div>
          </>
        )}
      </div>
      {isLeader && <div className="leader-title">LEADER</div>}
    </div>
  );
};

export default Volunteer;
