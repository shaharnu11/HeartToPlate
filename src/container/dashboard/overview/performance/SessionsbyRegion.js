import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { VectorMap } from 'react-jvectormap';
import { RegionList, RegionMap } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { regionFilterData, regionGetData } from '../../../../redux/chartContent/actionCreator';

const moreContent = (
  <>
    <NavLink to="#">
      <FeatherIcon size={16} icon="printer" />
      <span>Printer</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="book-open" />
      <span>PDF</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file-text" />
      <span>Google Sheets</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="x" />
      <span>Excel (XLSX)</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file" />
      <span>CSV</span>
    </NavLink>
  </>
);

const regionColumns = [
  {
    title: 'Top Region',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: 'Sessions',
    dataIndex: 'sessions',
    key: 'sessions',
  },
];

const SessionsbyRegion = () => {
  const dispatch = useDispatch();
  const { regionState } = useSelector(state => {
    return {
      regionState: state.chartContent.regionData,
      lpIsLoading: state.chartContent.lpLoading,
    };
  });

  const [state, setState] = useState({
    region: 'year',
  });

  useEffect(() => {
    if (regionGetData) {
      dispatch(regionGetData());
    }
  }, [dispatch]);

  const regionData = [];

  if (regionState !== null)
    regionState.map((item, key) => {
      return regionData.push({
        key: key + 1,
        region: item[0],
        sessions: item[1],
      });
    });

  const handleActiveChangeRegion = value => {
    setState({
      ...state,
      region: value,
    });
    dispatch(regionFilterData(value));
  };

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
      height: '220px',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  renderThumb.propTypes = {
    style: PropTypes.shape(PropTypes.object).isRequired,
  };

  return (
    <Cards
      isbutton={
        <div className="card-nav">
          <ul>
            <li className={state.region === 'week' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleActiveChangeRegion('week')} to="#">
                Week
              </Link>
            </li>
            <li className={state.region === 'month' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleActiveChangeRegion('month')} to="#">
                Month
              </Link>
            </li>
            <li className={state.region === 'year' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleActiveChangeRegion('year')} to="#">
                Year
              </Link>
            </li>
          </ul>
        </div>
      }
      title="Sessions by Region"
      size="large"
      more={moreContent}
    >
      <Row>
        <Col xxl={10} md={11} xs={24}>
          <RegionList>
            <Scrollbars autoHeight autoHeightMin={280} autoHide renderThumbVertical={renderThumb}>
              <Table columns={regionColumns} dataSource={regionData} pagination={false} />
            </Scrollbars>
          </RegionList>
        </Col>
        <Col xxl={14} md={13} xs={24}>
          <RegionMap>
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
                containerStyle={{
                  width: '100%',
                  height: '100%',
                }}
                containerClassName="map"
              />
            </div>
          </RegionMap>
        </Col>
      </Row>
    </Cards>
  );
};

export default SessionsbyRegion;
