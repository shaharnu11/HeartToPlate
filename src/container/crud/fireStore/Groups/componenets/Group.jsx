import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './Group.css';
import Volunteer from './Volunteer';
import StatusIcon from './StatusIcon';
import ChooseVolunteerButton from './ChooseVolunteerButton';
import Elder from './Elder';

const Group = ({groupStatus}) => {
    return (
        <div className='group-container'>
            <div className='group-status-container'>
                <StatusIcon status={groupStatus} type='group'/>
                <h3 className='group-status'>Group {groupStatus} since 30/12/20</h3>
                <p className='group-status-issues'>// Please add volunteers, elders, manage and activate</p>
                <div className='group-manager-info'>
                    {
                        groupStatus === 'active' ? (
                            <div className='manager-info card-button'>
                                <span>Manager Nickname - </span>
                                <span> Full Name - </span>
                                <span> 0527243298</span>
                            </div>
                        ) : (
                            <>
                                <button type='button' className='add-manager-button card-button'>
                                    <span>Add GROUP MANAGER</span>
                                    <FontAwesomeIcon style={{margin: '0 5px'}} icon={faCaretDown} />
                                </button>
                                <button type='button' className='activate-group-button'>ACTIVATE GROUP</button>
                            </>
                        )
                    }
                </div>
            </div>
            <div className='group-items'>
                <div className='group-elders'>
                    <Elder />
                    <button type='button' className='add-elder-button card-button'>
                        <span>ADD ELDER</span>
                        <FontAwesomeIcon style={{margin: '0 5px'}} icon={faCaretDown} />
                    </button>                  
                </div>

                <Volunteer status='active'/>
                <Volunteer status='invited'/>
                <Volunteer status='pending'/>
                
                <ChooseVolunteerButton />

            </div>
        </div>
    )
}

export default Group;
