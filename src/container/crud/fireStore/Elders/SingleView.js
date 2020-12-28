/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../Helper';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import { fbDataUpdate, fbDataSubmit, fbFileClear } from '../../../../redux/firestore/actionCreator';

const SingleView = ({ IsActionAdd, elder }) => {
  const dispatch = useDispatch();
  const collection = 'Elders';

  const { fileUplode, IsFileUploadig } = useSelector(state => {
    return {
      fileUplode: state.crud.file,
      IsFileUploadig: state.crud.fileLoading,
    };
  });

  const [form] = Form.useForm();
  const [streets, setStreets] = useState([]);

  useEffect(() => {
    if (fileUplode != null) {
      form.setFieldsValue({
        signedForm: fileUplode,
      });
    }
  }, [fileUplode]);

  useEffect(() => {
    if (elder !== undefined) {
      Helper.handleCitySelect(elder.city, setStreets);

      form.setFieldsValue({
        name: elder.name,
        phone: elder.phone,
        city: elder.city,
        address: elder.address,
        addressNumber: elder.addressNumber,
        age: elder.age,
        language: elder.language,
        kosherFood: elder.kosherFood,
        deliveryStatus: elder.deliveryStatus,
      });
    }
  }, [elder]);

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
  //     dispatch(fbDataUpdate(collection, elder.id, values));
  //   }
  // };

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
                Helper.handleSubmit(dispatch, elder === undefined ? null : elder.id, collection, form, values)
              }
            >
              <Form.Item name="name" label="Name" rules={[{ required: requireee }]}>
                <Input placeholder="Input Name" />
              </Form.Item>

              <Form.Item name="phone" label="Phone" rules={[{ required: requireee }]}>
                <Input placeholder="Phone" />
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

              <Form.Item name="kosherFood" label="Kosher Food" initialValue={false} valuePropName="checked">
                <Switch style={{ height: '18px' }} />
              </Form.Item>

              <Form.Item name="deliveryStatus" label="Delivery Status" initialValue={false} valuePropName="checked">
                <Switch style={{ height: '18px' }} />
              </Form.Item>

              <Form.Item name="comments" label="Comments">
                <Input.TextArea rows={4} />
              </Form.Item>
              <div className="record-form-actions text-right">
                <Button htmlType={IsActionAdd ? 'submit' : 'save'} type="primary" disabled={IsFileUploadig}>
                  {IsFileUploadig ? 'Loading File' : IsActionAdd ? 'Submit' : 'Update'}
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
