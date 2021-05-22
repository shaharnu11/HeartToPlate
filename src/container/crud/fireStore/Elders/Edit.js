import { Col, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/buttons/buttons';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { fbDataSingle } from '../../../../redux/firestore/actionCreator';
import { Main } from '../../../styled';
import { RecordFormWrapper } from '../style';
import SingleView from './SingleView';

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const collection = 'Elders';
  const elderId = parseInt(match.params.id, 10);

  const { elder } = useSelector(state => {
    return {
      elder: state.singleCrud[collection],
    };
  });

  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle(collection, elderId));
    }
  }, [dispatch, elderId]);

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
                {elder === undefined ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <SingleView IsActionAdd={false} elder={elder} />
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
