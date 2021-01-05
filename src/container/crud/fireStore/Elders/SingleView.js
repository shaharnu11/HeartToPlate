/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Switch, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Helper from '../Helper';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';

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
        birthday: moment(new Date(elder.birthday.seconds * 1000)),
        language: elder.language,
        kosherFood: elder.kosherFood,
        deliveryStatus: elder.deliveryStatus,
        comments: elder.comments.map((_, i) => {
          return { ..._, date: new Date(_.date.seconds * 1000), key: i };
        }),
      });
    }
  }, [elder]);

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
              onFinish={values => {
                Helper.handleSubmit(dispatch, elder === undefined ? null : elder.id, collection, form, {
                  ...values,
                  birthday: values.birthday.toDate(),
                });
              }}
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

              <Form.Item name="birthday" rules={[{ required: requireee }]} label="Date of birth">
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>

              {Helper.getLanguagesCheckboxs(requireee)}

              <Form.Item name="kosherFood" label="Kosher Food" initialValue={false} valuePropName="checked">
                <Switch style={{ height: '18px' }} />
              </Form.Item>

              <Form.Item name="deliveryStatus" label="Delivery Status" initialValue={false} valuePropName="checked">
                <Switch style={{ height: '18px' }} />
              </Form.Item>

              {Helper.createHistoryComments()}

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
