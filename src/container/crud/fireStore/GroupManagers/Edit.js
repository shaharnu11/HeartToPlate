import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Checkbox, Spin } from 'antd';
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
  const GroupManagerId = parseInt(match.params.id, 10);

  const { crud, isLoading, searchData } = useSelector(state => {
    return {
      crud: state.singleCrud.data,
      isLoading: state.singleCrud.loading,
      searchData: state.crud.searchData,
    };
  });
  const [streets, setStreets] = useState([]);
  const [regionManagers, setRegionManagers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (searchData && searchData.collection === 'RegionManagers') {
      setRegionManagers(searchData.data);
    }
    if (searchData && searchData.collection === 'Groups') {
      setGroups(searchData.data);
    }
  }, [searchData]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle('GroupManagers', GroupManagerId));
    }
  }, [dispatch, GroupManagerId]);

  const handleSubmit = values => {
    dispatch(fbDataUpdate('GroupManagers', GroupManagerId, values));
  };

  const handleRegionManagerSearch = value => {
    if (value.length > 2) {
      dispatch(fbDataSearch('RegionManagers', value, ['name', 'email']));
    }
  };

  const handleGroupSearch = value => {
    if (value.length > 2) {
      dispatch(fbDataSearch('Groups', value, ['name']));
    }
  };

  const requireee = false;

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/firestore/GroupManagers/View">
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
                {crud === null ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <Row justify="center">
                    <Col xl={10} md={16} xs={24}>
                      {crud !== null && (
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
                              initialValue={crud.name}
                              rules={[{ required: requireee }]}
                            >
                              <Input placeholder="Input Name" />
                            </Form.Item>

                            <Form.Item
                              name="phone"
                              initialValue={crud.phone}
                              label="Phone"
                              rules={[{ required: requireee }]}
                            >
                              <Input placeholder="Phone" />
                            </Form.Item>

                            <Form.Item
                              name="email"
                              initialValue={crud.email}
                              rules={[{ required: requireee, type: 'email' }]}
                              label="Email"
                            >
                              <Input placeholder="example@gmail.com" />
                            </Form.Item>

                            <Form.Item
                              name="city"
                              rules={[{ required: requireee }]}
                              label="City"
                              initialValue={crud.city}
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
                              <Form.Item name="address" rules={[{ required: requireee }]} initialValue={crud.address}>
                                <Select allowClear showSearch placeholder="Street">
                                  {Helper.getStreetOptions(streets)}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name="addressNumber"
                                rules={[{ required: requireee }]}
                                initialValue={crud.addressNumber}
                              >
                                <InputNumber min={1} placeholder="Number" />
                              </Form.Item>
                            </Form.Item>

                            <Form.Item name="age" rules={[{ required: requireee }]} label="Age" initialValue={crud.age}>
                              <InputNumber min={1} />
                            </Form.Item>

                            <Form.Item
                              name="language"
                              rules={[{ required: requireee }]}
                              initialValue={crud.language}
                              label="Language"
                            >
                              <Checkbox.Group>
                                <Row>
                                  <Col>
                                    <Checkbox value="hebrew" style={{ lineHeight: '32px' }}>
                                      hebrew
                                    </Checkbox>
                                  </Col>
                                  <Col>
                                    <Checkbox value="english" style={{ lineHeight: '32px' }}>
                                      english
                                    </Checkbox>
                                  </Col>
                                  <Col>
                                    <Checkbox value="russian" style={{ lineHeight: '32px' }}>
                                      russian
                                    </Checkbox>
                                  </Col>
                                  <Col>
                                    <Checkbox value="arabic" style={{ lineHeight: '32px' }}>
                                      arabic
                                    </Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                            </Form.Item>

                            <Form.Item
                              initialValue={null}
                              name="regionManager"
                              rules={[{ required: requireee }]}
                              label="Region Manager"
                            >
                              <Select
                                allowClear
                                style={{ width: '100%' }}
                                onSearch={_ => handleRegionManagerSearch(_)}
                                showSearch
                              >
                                {regionManagers.map(_ => (
                                  <Select.Option key={_} value={_}>
                                    {_}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item initialValue={[]} name="groups" rules={[{ required: requireee }]} label="Groups">
                              <Select
                                allowClear
                                style={{ width: '100%' }}
                                onSearch={_ => handleGroupSearch(_)}
                                showSearch
                              >
                                {groups.map(_ => (
                                  <Select.Option key={_} value={_}>
                                    {_}
                                  </Select.Option>
                                ))}
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
