import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { VectorMap } from 'react-jvectormap';
import { LocationMapWrapper } from '../../style';
import { locationGetData, locationFilterData } from '../../../../redux/chartContent/actionCreator';
import { Cards } from '../../../../components/cards/frame/cards-frame';

const SalesByLocation = () => {
  const dispatch = useDispatch();
  const { locationState } = useSelector(state => {
    return {
      locationState: state.chartContent.locationData,
    };
  });
  const [state, setState] = useState({
    location: 'today',
  });
  useEffect(() => {
    if (locationGetData) {
      dispatch(locationGetData());
    }
  }, [dispatch]);
  const handleActiveChangeLocation = value => {
    setState({
      ...state,
      location: value,
    });
    dispatch(locationFilterData(value));
  };

  const locationData = [];

  if (locationState !== null) {
    locationState.map(value => {
      const { key, location, order, revenue } = value;
      return locationData.push({
        key,
        location,
        order,
        revenue,
      });
    });
  }

  const locationColumns = [
    {
      title: 'Top Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
    },
  ];
  return (
    <LocationMapWrapper>
      <div className="full-width-table">
        <Cards
          isbutton={
            <div className="card-nav">
              <ul>
                <li className={state.location === 'today' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeLocation('today')} to="#">
                    Today
                  </Link>
                </li>
                <li className={state.location === 'week' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeLocation('week')} to="#">
                    Week
                  </Link>
                </li>
                <li className={state.location === 'month' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeLocation('month')} to="#">
                    Month
                  </Link>
                </li>
                <li className={state.location === 'year' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeLocation('year')} to="#">
                    Year
                  </Link>
                </li>
              </ul>
            </div>
          }
          title="Sales By Location"
          size="large"
        >
          <div className="location-map d-flex justify-content-center">
            <div>
              <VectorMap
                map="world_mill"
                backgroundColor="transparent"
                regionStyle={{
                  initial: {
                    fill: '#DBE1E8',
                    'fill-opacity': 1,
                    stroke: 'none',
                    'stroke-width': 0,
                    'stroke-opacity': 1,
                  },
                  hover: {
                    'fill-opacity': 1,
                    cursor: 'pointer',
                    fill: '#5F63F2',
                  },
                  selected: {
                    fill: 'yellow',
                  },
                  selectedHover: {},
                }}
                markerStyle={{
                  initial: {
                    'stroke-width': 6,
                    fill: '#fff',
                    stroke: '#5F63F2',
                    r: 6,
                  },
                  hover: {
                    fill: '#5F63F2',
                    stroke: '#fff',
                  },
                }}
                markers={[
                  {
                    latLng: [38, -97],
                    name: 'United States',
                  },
                  {
                    latLng: [20, 77],
                    name: 'India',
                  },
                  {
                    latLng: [60, -95],
                    name: 'Canada',
                  },
                  {
                    latLng: [51, 9],
                    name: 'Germany',
                  },
                  {
                    latLng: [54, -2],
                    name: 'United Kingdom',
                  },
                ]}
                containerStyle={{
                  width: '100%',
                  height: '100%',
                }}
                containerClassName="map"
              />
            </div>
          </div>

          <div className="location-table">
            <Table columns={locationColumns} dataSource={locationData} pagination={false} />
          </div>
        </Cards>
      </div>
    </LocationMapWrapper>
  );
};

export default SalesByLocation;
