import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ChooseElderPopup from './ChooseElderPopup';

const ChooseElderButton = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const buttonRef = useRef(null);

    let popupPositionY;
    let popupPositionX;
    if (buttonRef && buttonRef.current) {
        const { offsetTop, offsetLeft, offsetWidth } = buttonRef.current;
        popupPositionY = offsetTop;
        popupPositionX = offsetLeft;
    }

    return (
        <div className='card-button' style={{height: '100%'}}>
            <button ref={buttonRef} type='button' className='add-elder-button' onClick={() => setIsPopupOpen(prevIsPopupOpen => !prevIsPopupOpen)}>
                <span>ADD ELDER</span>
                <FontAwesomeIcon style={{margin: '0 5px'}} icon={faCaretDown} />
            </button>   
                {
                    isPopupOpen && (
                        <ChooseElderPopup popupPositionY={popupPositionY} popupPositionX={popupPositionX} setIsPopupOpen={setIsPopupOpen}/>
                    )
                }            
        </div>
    )
}

export default ChooseElderButton;
