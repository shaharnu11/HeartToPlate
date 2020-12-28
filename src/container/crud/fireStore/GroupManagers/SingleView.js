/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../Helper';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import { fbDataUpdate, fbDataSubmit, fbDataSearch, fbFileClear } from '../../../../redux/firestore/actionCreator';

const SingleView = ({ IsActionAdd, groupManager }) => {
  const dispatch = useDispatch();
  const collection = 'GroupManagers';

  const { groups } = useSelector(state => {
    return {
      groups: state.crud.Groups,
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
      form.setFieldsValue({
        name: groupManager.name,
        phone: groupManager.phone,
        email: groupManager.email,
        city: groupManager.city,
        address: groupManager.address,
        addressNumber: groupManager.addressNumber,
        age: groupManager.age,
        language: groupManager.language,
        groups: groupManager.groups.map(_ => _.id),
      });
    }
  }, [groupManager]);

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
  //     dispatch(fbDataUpdate(collection, groupManager.id, values));
  //   }
  // };

  const handleGroupsSearch = value => {
    setGroupsOptions(null);
    if (value.length > 2) {
      dispatch(fbDataSearch('Groups', value, groupsKeys));
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
                  groupManager === undefined ? null : groupManager.id,
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
                  style={{ width: '100%' }}
                  onSelect={_ => Helper.handleCitySelect(_, setStreets)}
                  showSearch
                  autoComplete="registration-select"
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

              <Form.Item name="groups" rules={[{ required: requireee }]} label="Groups">
                <Select
                  allowClear
                  mode="multiple"
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
