import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ChooseElderButton from './ChooseElderButton';
import ChooseVolunteerButton from './ChooseVolunteerButton';
import Elder from './Elder';
import './Group.css';
import StatusIcon from './StatusIcon';
import Volunteer from './Volunteer';

const Group = ({ group }) => {
  if (group.status == undefined) {
    group.status = 'active';
  }
  group.maxElders = 2;
  group.maxVolunteers = 4;
  //   console.log(group);
  return (
    <div className="group-container">
      <div className="group-status-container">
        <StatusIcon status={group.status} type="group" />
        {/* {group.id} */}
        <h3 className="group-status">Group {group.status} since 30/12/20</h3>
        <p className="group-status-issues">// Please add volunteers, elders, manage and activate</p>
        <div className="group-manager-info">
          {group.status === 'active' && group.groupManager ? (
            <div className="manager-info card-button">
              <span>
                  {`${group.groupManager.firstName} ${group.groupManager.lastName} - ${group.groupManager.phone}`}
                </span>
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
          {group.elders.map(({ id, firstName, lastName, city }) => (
            <Elder key={id} firstName={firstName} lastName={lastName} city={city} />
            ))}
            {new Array(group.maxElders - group.elders.length).fill(true).map((_, i) => (
            <ChooseElderButton key={i} />
            ))}
        </div>
        {group.volunteers.map(({ id, firstName, lastName, city }) => (
          <Volunteer key={id} firstName={firstName} lastName={lastName} city={city} status="active" />
          ))}
        {new Array(group.maxVolunteers - group.volunteers.length).fill(true).map((_, i) => (
          <ChooseVolunteerButton key={i} />
          ))}
      </div>
    </div>
  );
};

export default Group;
