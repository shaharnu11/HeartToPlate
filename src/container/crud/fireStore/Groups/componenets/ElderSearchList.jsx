import React from 'react';
import Elder from './Elder';
import './VolunteerSearchList.css';

const ElderSearchList = () => {
    return (
        <div className='volunteer-search-list'>
            <Elder canBeAdded={true} status='pending'/>
            <Elder canBeAdded={true} status='pending'/>
        </div>
    )
}

export default ElderSearchList;
