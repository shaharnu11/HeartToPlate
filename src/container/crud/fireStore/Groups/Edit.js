import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../Helper';
import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../../styled';
import { fbDataUpdate, fbDataSingle, fbDataSearch } from '../../../../redux/firestore/actionCreator';

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const collection = 'Groups';
  const groupId = parseInt(match.params.id, 10);
  const joinColumns = [
    {
      key: 'volunteers',
      joinCollection: 'Volunteers',
    },
    {
      key: 'elders',
      joinCollection: 'Elders',
    },
  ];

  const {
    group,
    //  groupManagers,
    volunteers,
    elders,
    isLoading,
  } = useSelector(state => {
    return {
      group: state.singleCrud[collection],
      isLoading: state.singleCrud.loading,
      volunteers: state.crud.Volunteers,
      elders: state.crud.Elders,
    };
  });
  const [form] = Form.useForm();

  const [volunteersOptions, setVolunteersOptions] = useState(null);
  const [eldersOptions, setEldersOptions] = useState(null);
  const volunteersKeys = ['name', 'email'];
  const eldersKeys = ['name'];

  const setVolunteersOptionsWrapper = _ => {
    setVolunteersOptions(
      _.map(volunteer => (
        <Select.Option key={volunteersKeys.map(key => volunteer[key]).join(' ')} value={volunteer.id}>
          {volunteer.name} ({volunteer.email})
        </Select.Option>
      )),
    );
  };

  const setEldersOptionsWrapper = _ => {
    setEldersOptions(
      _.map(elder => (
        <Select.Option key={eldersKeys.map(key => elder[key]).join(' ')} value={elder.id}>
          {elder.name}
        </Select.Option>
      )),
    );
  };

  useEffect(() => {
    if (volunteers !== undefined) {
      setVolunteersOptionsWrapper(volunteers);
    }
  }, [volunteers]);

  useEffect(() => {
    if (elders !== undefined) {
      setEldersOptionsWrapper(elders);
    }
  }, [elders]);

  useEffect(() => {
    if (group !== undefined) {
      setVolunteersOptionsWrapper(group.volunteers);
      setEldersOptionsWrapper(group.elders);
    }
  }, [group]);

  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle(collection, groupId, joinColumns));
    }
  }, [dispatch, groupId]);

  const handleSubmit = values => {
    dispatch(fbDataUpdate(collection, groupId, values));
  };

  const handleVolunteersSearch = value => {
    setVolunteersOptions(null);
    if (value.length > 2) {
      dispatch(fbDataSearch('Volunteers', value, volunteersKeys));
    }
  };
  const handleEldersSearch = value => {
    setEldersOptions(null);
    if (value.length > 2) {
      dispatch(fbDataSearch('Elders', value, eldersKeys));
    }
  };

  const requireee = false;

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
                {group === undefined ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <Row justify="center">
                    <Col xl={10} md={16} xs={24}>
                      {group !== null && (
                        <BasicFormWrapper>
                          <Form
                            className="add-record-form"
                            style={{ width: '100%' }}
                            layout="vertical"
                            form={form}
                            name="edit"
                            onFinish={handleSubmit}
                          >
                            <Form.Item
                              name="name"
                              label="Name"
                              rules={[{ required: requireee }]}
                              initialValue={group.name}
                            >
                              <Input placeholder="Input Name" />
                            </Form.Item>

                            <Form.Item
                              name="city"
                              rules={[{ required: requireee }]}
                              label="City"
                              initialValue={group.city}
                            >
                              <Select autocomplete="off" allowClear style={{ width: '100%' }} showSearch>
                                {Helper.getCityOptions()}
                              </Select>
                            </Form.Item>

                            <Form.Item
                              initialValue={group.volunteers.map(_ => _.id)}
                              name="volunteers"
                              rules={[{ required: requireee }]}
                              label="Volunteers"
                            >
                              <Select
                                mode="multiple"
                                notFoundContent={volunteersOptions === null ? <Spin size="small" /> : null}
                                allowClear
                                style={{ width: '100%' }}
                                onSearch={_ => handleVolunteersSearch(_)}
                                showSearch
                                optionFilterProp="key"
                              >
                                {volunteersOptions}
                              </Select>
                            </Form.Item>

                            <Form.Item
                              initialValue={group.elders.map(_ => _.id)}
                              name="elders"
                              rules={[{ required: requireee }]}
                              label="Elders"
                            >
                              <Select
                                mode="multiple"
                                notFoundContent={eldersOptions === null ? <Spin size="small" /> : null}
                                allowClear
                                style={{ width: '100%' }}
                                onSearch={_ => handleEldersSearch(_)}
                                showSearch
                                optionFilterProp="key"
                              >
                                {eldersOptions}
                              </Select>
                            </Form.Item>

                            <div className="record-form-actions text-right">
                              <Button htmlType="submit" type="primary">
                                {isLoading ? 'Loading...' : 'Update'}
                              </Button>
                            </div>
                          </Form>
                        </BasicFormWrapper>
                      )}
                    </Col>
                  </Row>
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
