import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Switch, Checkbox, Select, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Helper from '../Helper';

import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../../styled';
import { fbDataSearch, fbDataSubmit, fbFileClear } from '../../../../redux/firestore/actionCreator';

const AddNew = () => {
  const dispatch = useDispatch();
  const { searchData, isLoading } = useSelector(state => {
    return {
      isLoading: state.crud.loading,
      searchData: state.crud.searchData,
    };
  });

  const [form] = Form.useForm();
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

  const handleSubmit = values => {
    dispatch(
      fbDataSubmit('GroupManagers', {
        ...values,
        id: new Date().getTime(),
        joinDate: new Date(),
      }),
    );
    form.resetFields();
    dispatch(fbFileClear());
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
            <Link to="/admin/firestore/GroupManagers/View">View All</Link>
          </Button>,
        ]}
        ghost
        title="Add New"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <RecordFormWrapper>
              <Cards headless>
                <Row justify="center">
                  <Col xl={10} md={16} xs={24}>
                    <BasicFormWrapper>
                      <Form
                        className="add-record-form"
                        style={{ width: '100%' }}
                        layout="vertical"
                        form={form}
                        name="addnew"
                        onFinish={handleSubmit}
                      >
                        <Form.Item name="name" label="Name" rules={[{ required: requireee }]}>
                          <Input placeholder="Input Name" />
                        </Form.Item>
                        <Form.Item name="phone" label="Phone" rules={[{ required: requireee }]}>
                          <Input placeholder="Phone" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ required: requireee, type: 'email' }]} label="Email">
                          <Input placeholder="example@gmail.com" />
                        </Form.Item>
                        <Form.Item name="city" rules={[{ required: requireee }]} label="City">
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
                          <Form.Item name="address" rules={[{ required: requireee }]}>
                            <Select allowClear showSearch placeholder="Street">
                              {Helper.getStreetOptions(streets)}
                            </Select>
                          </Form.Item>
                          <Form.Item name="addressNumber" rules={[{ required: requireee }]}>
                            <InputNumber min={1} placeholder="Number" />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item name="age" rules={[{ required: requireee }]} label="Age">
                          <InputNumber min={1} />
                        </Form.Item>
                        <Form.Item name="language" rules={[{ required: requireee }]} label="Language">
                          <Checkbox.Group>
                            <Row>
                              <Col>
                                <Checkbox value="Hebrew" style={{ lineHeight: '32px' }}>
                                  hebrew
                                </Checkbox>
                              </Col>
                              <Col>
                                <Checkbox value="English" style={{ lineHeight: '32px' }}>
                                  english
                                </Checkbox>
                              </Col>
                              <Col>
                                <Checkbox value="Russian" style={{ lineHeight: '32px' }}>
                                  russian
                                </Checkbox>
                              </Col>
                              <Col>
                                <Checkbox value="Arabic" style={{ lineHeight: '32px' }}>
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
                          <Select allowClear style={{ width: '100%' }} onSearch={_ => handleGroupSearch(_)} showSearch>
                            {groups.map(_ => (
                              <Select.Option key={_} value={_}>
                                {_}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <div className="record-form-actions text-right">
                          <Button size="default" htmlType="Save" type="primary">
                            {isLoading ? 'Loading...' : 'Submit'}
                          </Button>
                        </div>
                      </Form>
                    </BasicFormWrapper>
                  </Col>
                </Row>
              </Cards>
            </RecordFormWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddNew;
