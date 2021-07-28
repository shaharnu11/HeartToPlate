import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import './ChooseVolunteerPopup.css';
import VolunteerSearchList from './VolunteerSearchList';
import {Select } from 'antd';
import Helper from '../../Helper';

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
        <Select
          showSearch
          placeholder="City"
          allowClear
          onClear={_ => setFilteredCity()}
          onSelect={value => setFilteredCity(value)}
        >
          {Helper.getCityOptions()}
        </Select>
        <VolunteerSearchList />
      </div>
    );
  }
}

export default onClickOutside(ChooseVolunteerPopup);
