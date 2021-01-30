/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SingleView from './SingleView';
import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main } from '../../../styled';
import { fbDataSingle } from '../../../../redux/firestore/actionCreator';

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const collection = 'RegionManagers';
  const regionManagerId = parseInt(match.params.id, 10);
  const joinColumns = [
    {
      key: 'groupManagers',
      joinCollection: 'GroupManagers',
    },
  ];
  const { regionManager } = useSelector(state => {
    return {
      regionManager: state.singleCrud[collection],
    };
  });

  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle(collection, regionManagerId, joinColumns));
    }
  }, [dispatch, regionManagerId]);

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to={`/admin/firestore/${collection}/View`}>
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Update Your Recored "
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <RecordFormWrapper>
              <Cards headless>
                {regionManager === undefined ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <SingleView IsActionAdd={false} regionManager={regionManager} />
                )}
              </Cards>
            </RecordFormWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Edit;
