import React from 'react';
import StatusIcon from './StatusIcon';
import './VolunteerSearchItem.css';

const VolunteerSearchItem = ({ status }) => {
    return (
        <div className='volunteer-search-item'>
            <div>
                <div className='volunteer-search-item-status'>
                    <StatusIcon type='volunteer' status={status} />  
                    <span style={{marginLeft: '5px'}}>{status} since 01/01/21</span>
                </div>
                <div className='volunteer-search-item-info-container'>
                    <div className='image-container' style={{height: '50px', width:'50px', borderRadius: '50%', backgroundColor: '#898989'}}/>     
                    <div className='volunteer-search-item-info'>
                        <div>
                            <span>City -</span>
                            <span>Organization</span>
                        </div>
                        <div>
                            <span>First Name</span>
                            <span>Last Name</span>
                        </div>
                    </div>
                </div> 
            </div>
             <div className='additional-info-add-button'>
                 <div>F/36</div>
                 <button type='button'>ADD</button>
            </div>    
        </div>
    )
}

export default VolunteerSearchItem;
