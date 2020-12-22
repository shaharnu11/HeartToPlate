import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Spin } from 'antd';
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
  const { groups, isLoading } = useSelector(state => {
    return {
      isLoading: state.crud.loading,
      groups: state.crud.Groups,
    };
  });

  const [form] = Form.useForm();
  const [streets, setStreets] = useState([]);
  const [groupsOptions, setGroupsOptions] = useState(null);
  const groupsKeys = ['name'];

  useEffect(() => {
    if (groups !== undefined) {
      setGroupsOptions(
        groups.map(group => (
          <Select.Option key={groupsKeys.map(key => group[key]).join(' ')} value={group.id}>
            {group.name}
          </Select.Option>
        )),
      );
    }
  }, [groups]);

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

  const handleGroupsSearch = value => {
    setGroupsOptions(null);
    if (value.length > 2) {
      dispatch(fbDataSearch('Groups', value, groupsKeys));
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

                        {Helper.getLanguagesCheckboxs(requireee)}

                        <Form.Item initialValue={[]} name="groups" rules={[{ required: requireee }]} label="Groups">
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
