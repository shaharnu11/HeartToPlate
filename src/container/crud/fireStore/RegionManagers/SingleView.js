/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../Helper';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import { fbDataUpdate, fbDataSubmit, fbDataSearch, fbFileClear } from '../../../../redux/firestore/actionCreator';

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
  const groupManagerKeys = ['name'];

  const setGroupManagersOptionsWrapper = _ => {
    setGroupManagersOptions(
      _.map(groupManager => (
        <Select.Option key={groupManagerKeys.map(key => groupManager[key]).join(' ')} value={groupManager.id}>
          {groupManager.name}
        </Select.Option>
      )),
    );
  };

  useEffect(() => {
    if (groupManagers !== undefined) {
      setGroupManagersOptionsWrapper(groupManagers);
    }
  }, [groupManagers]);

  useEffect(() => {
    if (regionManager !== undefined) {
      setGroupManagersOptionsWrapper(regionManager.groupManagers);
      form.setFieldsValue({
        name: regionManager.name,
        phone: regionManager.phone,
        email: regionManager.email,
        city: regionManager.city,
        address: regionManager.address,
        addressNumber: regionManager.addressNumber,
        age: regionManager.age,
        language: regionManager.language,
        groupManager: regionManager.groupManager.map(_ => _.id),
      });
    }
  }, [regionManager]);

  // const handleSubmit = values => {
  //   if (IsActionAdd) {
  //     dispatch(
  //       fbDataSubmit(collection, {
  //         ...values,
  //         id: new Date().getTime(),
  //         joinDate: new Date(),
  //       }),
  //     );
  //     form.resetFields();
  //     dispatch(fbFileClear());
  //   } else {
  //     dispatch(fbDataUpdate(collection, regionManager.id, values));
  //   }
  // };

  const handleGroupManagersSearch = value => {
    setGroupManagersOptions(null);
    if (value.length > 2) {
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
              // onFinish={handleSubmit}
              onFinish={values =>
                Helper.handleSubmit(
                  dispatch,
                  regionManager === undefined ? null : regionManager.id,
                  collection,
                  form,
                  values,
                )
              }
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

              <Form.Item name="groupManagers" rules={[{ required: requireee }]} label="Group Managers">
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
