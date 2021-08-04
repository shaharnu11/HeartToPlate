import React, { useState, useEffect } from 'react';
import VolunteerSearchItem from './VolunteerSearchItem';
import './VolunteerSearchList.css';

const VolunteerSearchList = ({ volunteers }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const volunteersToDisplay = volunteers?.map(volunteer => {
    return <VolunteerSearchItem key={volunteer.id} volunteer={volunteer} status="pending" />;
  });

  
  const popUpContent = () => {
    if (volunteersToDisplay?.length > 0) return <div className="volunteer-search-list"> {volunteersToDisplay} </div>;
    else if (loading) return <div className="volunteer-search-list"><div className="volunteer-search-item">loading...</div></div>;
    else {
       return (
         <div className="volunteer-search-list">
         <div className="volunteer-search-item">
           <p>Found no matching results</p>
           </div>
         </div>
       );
     }
  } 
  
  return popUpContent();
};

export default VolunteerSearchList;
