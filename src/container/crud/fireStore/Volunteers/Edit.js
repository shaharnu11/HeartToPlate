import React, { useEffect, useState } from 'react';
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
  const collection = 'Volunteers';
  const volunteerId = parseInt(match.params.id, 10);

  const { volunteer } = useSelector(state => {
    return {
      volunteer: state.singleCrud[collection],
    };
  });

  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle(collection, volunteerId));
    }
  }, [dispatch, volunteerId]);

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
        title="Update Your Recored"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <RecordFormWrapper>
              <Cards headless>
                {volunteer === undefined ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <SingleView IsActionAdd={false} volunteer={volunteer} />
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
