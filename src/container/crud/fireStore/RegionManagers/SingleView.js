/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../Helper';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import { fbDataClean, fbDataSearch } from '../../../../redux/firestore/actionCreator';

const SingleView = ({ IsActionAdd, regionManager }) => {
  const dispatch = useDispatch();
  const collection = 'RegionManagers';

  const { groupManagers } = useSelector(state => {
    return {
      groupManagers: state.crud.GroupManagers,
    };
  });
  const [form] = Form.useForm();
  const [streets, setStreets] = useState([]);
  const [groupManagersOptions, setGroupManagersOptions] = useState(null);
  const groupManagerKeys = ['firstName', 'lastName'];

  const setGroupManagersOptionsWrapper = _ => {
    setGroupManagersOptions(
      _.map(groupManager => (
        <Select.Option key={groupManagerKeys.map(key => groupManager[key]).join(' ')} value={groupManager.id}>
          {groupManager.firstName} {groupManager.lastName}
        </Select.Option>
      )),
    );
  };

  useEffect(() => {
    if (groupManagers !== undefined) {
      setGroupManagersOptionsWrapper(groupManagers);
    }
    return () => dispatch(fbDataClean('groupManagers'));
  }, [groupManagers]);

  useEffect(() => {
    if (regionManager !== undefined) {
      setGroupManagersOptionsWrapper(regionManager.groupManagers);
      form.setFieldsValue({
        firstName: regionManager.firstName,
        lastName: regionManager.lastName,
        phone: regionManager.phone,
        email: regionManager.email,
        city: regionManager.city,
        address: regionManager.address,
        addressNumber: regionManager.addressNumber,
        age: regionManager.age,
        language: regionManager.language,
        groupManager: regionManager.groupManagers.map(_ => _.id),
      });
    }
  }, [regionManager]);

  const handleGroupManagersSearch = value => {
    setGroupManagersOptions(null);
    if (value.length > 0) {
      dispatch(fbDataSearch('GroupManagers', value, groupManagerKeys));
    }
  };

  const requireee = false;

  return (
    <>
      <Row justify="center">
        <Col xl={10} md={16} xs={24}>
          <BasicFormWrapper>
            <Form
              className="add-record-form"
              style={{ width: '100%' }}
              layout="vertical"
              form={form}
              name={IsActionAdd ? 'addnew' : 'edit'}
              onFinish={values =>
                Helper.handleSubmit(
                  dispatch,
                  regionManager === undefined ? null : regionManager.id,
                  collection,
                  () => form.resetFields(),
                  values,
                )
              }
            >
              <Form.Item name="firstName" label="First Name" rules={[{ required: requireee }]}>
                <Input placeholder="Input Name" />
              </Form.Item>

              <Form.Item name="lastName" label="Last Name" rules={[{ required: requireee }]}>
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
                  autoComplete="registration-select"
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

              {Helper.getLanguagesCheckboxs(requireee)}

              <Form.Item
                name="groupManagers"
                rules={[{ required: requireee }]}
                label="Group Managers"
                initialValue={[]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  notFoundContent={groupManagersOptions === null ? <Spin size="small" /> : null}
                  onSearch={_ => handleGroupManagersSearch(_)}
                  showSearch
                  optionFilterProp="key"
                >
                  {groupManagersOptions}
                </Select>
              </Form.Item>

              <div className="record-form-actions text-right">
                <Button htmlType={IsActionAdd ? 'submit' : 'save'} type="primary">
                  {IsActionAdd ? 'Submit' : 'Update'}
                </Button>
              </div>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </>
  );
};

export default SingleView;
