import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ChooseVolunteerButton from './ChooseVolunteerButton';
import Elder from './Elder';
import './Group.css';
import StatusIcon from './StatusIcon';
import Volunteer from './Volunteer';

const Group = ({ group }) => {
  if (group.status == undefined) {
    group.status = 'active';
  }
  console.log(group);
  return (
    <div className="group-container">
      <div className="group-status-container">
        <StatusIcon status={group.status} type="group" />
        {/* {group.id} */}
        <h3 className="group-status">Group {group.status} since 30/12/20</h3>
        <p className="group-status-issues">// Please add volunteers, elders, manage and activate</p>
        <div className="group-manager-info">
          {group.status === 'active' ? (
            <div className="manager-info card-button">
              <span>
                {group.groupManager.firstName} {group.groupManager.lastName}
              </span>
              <span> {group.groupManager.phone}</span>
            </div>
          ) : (
            <>
              <button type="button" className="add-manager-button card-button">
                <span>Add GROUP MANAGER</span>
                <FontAwesomeIcon style={{ margin: '0 5px' }} icon={faCaretDown} />
              </button>
              <button type="button" className="activate-group-button">
                ACTIVATE GROUP
              </button>
            </>
          )}
        </div>
      </div>
      <div className="group-items">
        <div className="group-elders">
          <Elder />
          <button type="button" className="add-elder-button card-button">
            <span>ADD ELDER</span>
            <FontAwesomeIcon style={{ margin: '0 5px' }} icon={faCaretDown} />
          </button>
        </div>

        <Volunteer status="active" />
        <Volunteer status="invited" />
        <Volunteer status="pending" />

        <ChooseVolunteerButton />
      </div>
    </div>
  );
};

export default Group;
