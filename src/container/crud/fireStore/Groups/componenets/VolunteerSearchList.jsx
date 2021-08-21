import React from 'react';
import VolunteerSearchItem from './VolunteerSearchItem';
import './VolunteerSearchList.css';

const VolunteerSearchList = () => {
  return (
    <div className="volunteer-search-list">
      <VolunteerSearchItem status="pending" />
      <VolunteerSearchItem status="pending" />
      <VolunteerSearchItem status="pending" />
      <VolunteerSearchItem status="pending" />
      <VolunteerSearchItem status="pending" />
      <VolunteerSearchItem status="pending" />
      <VolunteerSearchItem status="pending" />
      <VolunteerSearchItem status="pending" />
    </div>
  );
};

export default VolunteerSearchList;
