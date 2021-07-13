import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import ChooseVolunteerPopup from './ChooseVolunteerPopup';

const ChooseVolunteerButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const buttonRef = useRef(null);

  let popupPositionY;
  let popupPositionX;
  if (buttonRef && buttonRef.current) {
    const { offsetTop, offsetLeft, offsetWidth } = buttonRef.current;
    popupPositionY = offsetTop;
    popupPositionX = window.innerWidth - (offsetLeft + offsetWidth);
  }

  return (
    <div className="card-button">
      <div>
        <button
          ref={buttonRef}
          type="button"
          className="choose-volunteer-button"
          onClick={() => setIsPopupOpen(prevIsPopupOpen => !prevIsPopupOpen)}
        >
          <span>CHOOSE VOLUNTEER</span>
          <FontAwesomeIcon style={{ margin: '0 5px' }} icon={faCaretDown} />
        </button>
        {isPopupOpen && (
          <ChooseVolunteerPopup
            popupPositionY={popupPositionY}
            popupPositionX={popupPositionX}
            setIsPopupOpen={setIsPopupOpen}
          />
        )}
      </div>
    </div>
  );
};

export default ChooseVolunteerButton;
