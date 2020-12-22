import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, InputNumber } from 'antd';
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
  const collection = 'GroupManagers';
  const groupManagerId = parseInt(match.params.id, 10);
  const joinColumns = [
    {
      key: 'groups',
      joinCollection: 'Groups',
    },
  ];

  const { groupManager, groups, isLoading } = useSelector(state => {
    return {
      groupManager: state.singleCrud[collection],
      isLoading: state.singleCrud.loading,
      groups: state.crud.groups,
    };
  });
  const [form] = Form.useForm();
  const [streets, setStreets] = useState([]);
  const [groupsOptions, setGroupsOptions] = useState(null);
  const groupsKeys = ['name'];

  const setGroupsOptionsWrapper = _ => {
    setGroupsOptions(
      _.map(group => (
        <Select.Option key={groupsKeys.map(key => group[key]).join(' ')} value={group.id}>
          {group.name}
        </Select.Option>
      )),
    );
  };

  useEffect(() => {
    if (groups !== undefined) {
      setGroupsOptionsWrapper(groups);
    }
  }, [groups]);

  useEffect(() => {
    if (groupManager !== undefined) {
      setGroupsOptionsWrapper(groupManager.groups);
    }
  }, [groupManager]);

  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle(collection, groupManagerId, joinColumns));
    }
  }, [dispatch, groupManagerId]);

  const handleSubmit = values => {
    dispatch(fbDataUpdate(collection, groupManagerId, values));
  };

  const handleGroupsSearch = value => {
    setGroupsOptions(null);
    if (value.length > 2) {
      dispatch(fbDataSearch('Elders', value, groupsKeys));
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
                {groupManager === undefined ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <Row justify="center">
                    <Col xl={10} md={16} xs={24}>
                      {groupManager !== null && (
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
                              initialValue={groupManager.name}
                            >
                              <Input placeholder="Input Name" />
                            </Form.Item>

                            <Form.Item
                              name="phone"
                              label="Phone"
                              rules={[{ required: requireee }]}
                              initialValue={groupManager.phone}
                            >
                              <Input placeholder="Phone" />
                            </Form.Item>

                            <Form.Item
                              name="email"
                              rules={[{ required: requireee, type: 'email' }]}
                              label="Email"
                              initialValue={groupManager.email}
                            >
                              <Input placeholder="example@gmail.com" />
                            </Form.Item>

                            <Form.Item
                              name="city"
                              rules={[{ required: requireee }]}
                              label="City"
                              initialValue={groupManager.city}
                            >
                              <Select
                                allowClear
                                style={{ width: '100%' }}
                                onSelect={_ => Helper.handleCitySelect(_, setStreets)}
                                showSearch
                              >
                                {Helper.getCityOptions()}
                              </Select>
                            </Form.Item>

                            <Form.Item label="Address">
                              <Form.Item
                                name="address"
                                rules={[{ required: requireee }]}
                                initialValue={groupManager.address}
                              >
                                <Select allowClear showSearch placeholder="Street">
                                  {Helper.getStreetOptions(streets)}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name="addressNumber"
                                rules={[{ required: requireee }]}
                                initialValue={groupManager.addressNumber}
                              >
                                <InputNumber min={1} placeholder="Number" />
                              </Form.Item>
                            </Form.Item>

                            <Form.Item
                              name="age"
                              rules={[{ required: requireee }]}
                              label="Age"
                              initialValue={groupManager.age}
                            >
                              <InputNumber min={1} />
                            </Form.Item>

                            {Helper.getLanguagesCheckboxs(requireee, groupManager.language)}

                            <Form.Item
                              initialValue={groupManager.groups.map(_ => _.id)}
                              name="groups"
                              rules={[{ required: requireee }]}
                              label="Groups"
                            >
                              <Select
                                allowClear
                                style={{ width: '100%' }}
                                notFoundContent={groupsOptions === null ? <Spin size="small" /> : null}
                                onSearch={_ => handleGroupsSearch(_)}
                                showSearch
                                optionFilterProp="key"
                              >
                                {groupsOptions}
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
