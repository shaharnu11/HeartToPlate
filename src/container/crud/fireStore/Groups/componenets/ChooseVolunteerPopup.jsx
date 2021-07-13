import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import './ChooseVolunteerPopup.css';
import VolunteerSearchList from './VolunteerSearchList';

class ChooseVolunteerPopup extends Component {
  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  handleClickOutside = evt => {
    this.timeoutId = setTimeout(() => {
      this.props.setIsPopupOpen(false);
    }, 100);
  };

  render() {
    const { popupPositionX, popupPositionY } = this.props;

    return (
      <div
        className="choose-volunteer-popup"
        style={{ top: `${popupPositionY + 24}px`, right: `${popupPositionX + 6}px` }}
      >
        <VolunteerSearchList />
      </div>
    );
  }
}

export default onClickOutside(ChooseVolunteerPopup);
