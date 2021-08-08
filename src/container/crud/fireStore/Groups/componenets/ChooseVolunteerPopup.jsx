import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './ChooseVolunteerPopup.css';
import VolunteerSearchList from './VolunteerSearchList';
import { Select } from 'antd';
import Helper from '../../Helper';
import dbHelper from '../../DB-Helper';

const ChooseVolunteerPopup = props => {
  const node = useRef();
  const [filteredCity, setFilteredCity] = useState();
  const [filteredVolunteerId, setFilteredVolunteerId] = useState();
  const [volunteers, setVolunteers] = useState();
  const [pageNumber, SetPageNumber] = useState(1);
  const { popupPositionX, popupPositionY, setIsPopupOpen } = props;
  const { filters } = useSelector(state => {
    return {
      filters: state.filtersReducer.filters,
    };
  });
  const pageCount = 10;

  useEffect(() => {
    const getVolunteers = async () => {
      const volunteers = await dbHelper.readVolunteers(
        { filteredCity, filteredVolunteerId },
        pageNumber * pageCount + 1,
      );
      setVolunteers(volunteers);
    };
    getVolunteers();
  }, [filteredCity, filteredVolunteerId, pageNumber]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = e => {
    let offSetLeft = node.current.offsetLeft;
    let offsetWidth = node.current.offsetWidth;
    let pageX = e.pageX;

    let offsetHeight = node.current.offsetHeight;
    let offsetTop = node.current.offsetTop;
    let pageY = e.pageY;

    if (
      (offsetHeight + offsetTop > pageY &&
        pageY > offsetTop &&
        offSetLeft < pageX &&
        pageX < offsetWidth + offSetLeft) ||
      e.target.className == 'ant-select-item-option-content'
    ) {
      return;
    }

    setTimeout(() => {
      setIsPopupOpen(false);
    }, 250);
  };

  const resetFilters = () => {
    setFilteredCity();
    setFilteredVolunteerId();
  };

  return (
    <div
      ref={node}
      className="choose-volunteer-popup"
      style={{ top: `${popupPositionY + 24}px`, right: `${popupPositionX + 6}px` }}
    >
      <Select
        className='select-input-volunteer-popup'
        showSearch
        placeholder="City"
        allowClear
        onClear={_ => setFilteredCity()}
        onSelect={value => {
          setFilteredCity(value);
        }}
      >
        {Helper.getCityOptions()}
      </Select>

      <Select
        className='select-input-volunteer-popup'
        allowClear
        onClear={_ => resetFilters()}
        onSelect={value => {
          resetFilters();

          setFilteredVolunteerId(value);
        }}
        value={filteredVolunteerId}
        showSearch
        loading={filters === undefined}
        placeholder="Name"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {Object.keys(filters?.VolunteerIdToDisplayName ?? []).map(volunteerId => {
          return (
            <Select.Option key={volunteerId} value={volunteerId}>
              {filters.VolunteerIdToDisplayName[volunteerId]}
            </Select.Option>
          );
        })}
      </Select>

      <VolunteerSearchList volunteers={volunteers} />
    </div>
  );
};

export default ChooseVolunteerPopup;




