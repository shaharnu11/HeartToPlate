import React from 'react';
import { Row, Col } from 'antd';
import { VectorMap } from 'react-jvectormap';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
// import config from '../../config/config';

// const { theme } = config;

const VectorMaps = () => {
  return (
    <>
      <PageHeader title="Vector Maps" />
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <div className="vertor-map">
              <Cards title="World Map" size="large">
                <div className="world-map">
                  <VectorMap
                    map="world_mill"
                    backgroundColor="transparent"
                    regionStyle={{
                      initial: {
                        fill: '#E3E6EF',
                        'fill-opacity': 1,
                        stroke: 'none',
                        'stroke-width': 0,
                        'stroke-opacity': 1,
                      },
                      hover: {
                        'fill-opacity': 0.8,
                        cursor: 'pointer',
                      },
                      selected: {
                        fill: 'yellow',
                      },
                      selectedHover: {},
                    }}
                    series={{
                      regions: [
                        {
                          scale: ['#C8EEFF', '#0071A4'],
                        },
                      ],
                    }}
                    containerStyle={{
                      width: '100%',
                      height: '100%',
                    }}
                    containerClassName="map"
                  />
                </div>
              </Cards>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default VectorMaps;
