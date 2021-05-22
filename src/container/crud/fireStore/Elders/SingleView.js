/* eslint-disable react/prop-types */
import { Col, DatePicker, Form, Input, InputNumber, notification, Row, Select, Switch } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import Helper from '../Helper';

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
        firstName: elder.firstName,
        lastName: elder.lastName,
        phone: elder.phone,
        homePhone: elder.homePhone,
        city: elder.city,
        address: elder.address,
        addressNumber: elder.addressNumber,
        aptFloor: elder.aptFloor,
        birthday: elder.birthday == null ? undefined : moment(new Date(elder.birthday.seconds * 1000)),
        language: elder.language,
        kosherFood: elder.kosherFood,
        deliveryStatus: elder.deliveryStatus,
        source: elder.source,
        contact: elder.contact,
        comments: elder.comments.map((_, i) => {
          return { ..._, date: new Date(_.date.seconds * 1000), key: i };
        }),
        groups: elder.groups,
      });
    }
  }, [elder]);

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
                Helper.IsPhoneAlreadyExist(collection, values.phone, elder === undefined ? null : elder.phone).then(
                  __ => {
                    if (__) {
                      Helper.handleSubmit(
                        dispatch,
                        elder === undefined ? null : elder.id,
                        collection,
                        () => form.resetFields(),
                        {
                          ...values,
                          birthday: values.birthday === undefined ? null : new Date(),
                        },
                      );
                    } else {
                      notification.error({
                        message: 'this phone already exists',
                      });
                    }
                  },
                );
              }}
            >
              <Form.Item name="firstName" label="First Name" style={{ direction: 'rtl' }} rules={[{ required: true }]}>
                <Input placeholder="Input Name" />
              </Form.Item>
              <Form.Item name="lastName" style={{ direction: 'rtl' }} label="Last Name" rules={[{ required: true }]}>
                <Input placeholder="Input Name" />
              </Form.Item>
              <Form.Item name="phone" label="Private Phone" rules={[{ required: true }]}>
                <Input placeholder="Phone" />
              </Form.Item>
              <Form.Item name="homePhone" label="Home Phone" rules={[{ required: false }]}>
                <Input placeholder="Phone" />
              </Form.Item>
              <Form.Item name="city" rules={[{ required: true }]} label="City" style={{ direction: 'rtl' }}>
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
              <Form.Item label="Address" rules={[{ required: true }]}>
                <Form.Item name="address" rules={[{ required: true }]} style={{ direction: 'rtl' }}>
                  <Select allowClear showSearch placeholder="Street">
                    {Helper.getStreetOptions(streets)}
                  </Select>
                </Form.Item>

                <Form.Item name="addressNumber" rules={[{ required: true }]} style={{ direction: 'rtl' }}>
                  <InputNumber min={1} placeholder="Number" />
                </Form.Item>
                <Form.Item name="aptFloor" rules={[{ required: false }]} style={{ direction: 'rtl' }}>
                  <Input placeholder="Apartment and Floor" style={{ direction: 'rtl' }} />
                </Form.Item>
              </Form.Item>

              <Form.Item name="birthday" rules={[{ required: false }]} label="Date of birth">
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>

              {Helper.getLanguagesCheckboxs(true)}

              <Form.Item name="kosherFood" label="Kosher Food" initialValue={false} valuePropName="checked">
                <Switch style={{ height: '18px' }} />
              </Form.Item>

              <Form.Item name="deliveryStatus" label="Delivery Status" initialValue={false} valuePropName="checked">
                <Switch style={{ height: '18px' }} />
              </Form.Item>

              <Form.Item name="source" label="Source" style={{ direction: 'rtl' }} rules={[{ required: true }]}>
                <Input placeholder="Source" />
              </Form.Item>

              <Form.Item name="contact" label="Contact" style={{ direction: 'rtl' }} rules={[{ required: false }]}>
                <Input placeholder="Contact" />
              </Form.Item>

              {Helper.createHistoryComments()}

              {/* None visable items */}

              <Form.Item name="groups" visible initialValue={[]}>
                <Input />
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
