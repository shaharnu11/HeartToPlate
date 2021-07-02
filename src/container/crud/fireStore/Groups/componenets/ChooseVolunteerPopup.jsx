import React, { Component} from 'react';
import VolunteerSearchList from './VolunteerSearchList';
import onClickOutside from "react-onclickoutside";
import './ChooseVolunteerPopup.css';

class ChooseVolunteerPopup extends Component {

    handleClickOutside = evt => {
        this.timeoutId = setTimeout(() => {
            this.props.setIsPopupOpen(false);
        }, 100);
      };

      componentWillUnmount() {
          if (this.timeoutId) {
              clearTimeout(this.timeoutId);
          }
      }

    render() {
        const { popupPositionX, popupPositionY } = this.props;

        return (
            <div className='choose-volunteer-popup' style={{top: `${popupPositionY + 24}px`, right: `${popupPositionX + 6}px`}}>
                <div>28 Results</div>
                <VolunteerSearchList />
            </div>
        )
    }
}

export default onClickOutside(ChooseVolunteerPopup);
