import React from 'react';
import './Elder.css';

const Elder = ({ canBeAdded }) => {
    return (
        <div className='elder-container card-button'>
            <div style={{display: 'flex', alignItems: 'center', height: '100%', width: '100%', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className='image-container' style={{height: '50px', width:'50px', borderRadius: '50%', backgroundColor: '#898989'}}/>
                        <div style={{marginLeft: '7px'}}>
                            <div className='elder-info-item'>First Name</div>
                            <div className='elder-info-item'>Last Name</div>
                            <div className='elder-info-item'>City</div>
                        </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>F/36</div>
                    {
                        canBeAdded && (
                            <button type='button' style={{textDecoration: 'none'}}>ADD</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Elder;
