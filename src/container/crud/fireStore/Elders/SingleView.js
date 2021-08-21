/* eslint-disable react/prop-types */
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  Radio,
  Upload,
  Modal,
  Switch,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/buttons/buttons';
import { UploadOutlined } from '@ant-design/icons';
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
        nameRelatedInfo: elder.nameRelatedInfo,
        gender: elder.gender,
        phone: elder.phone,
        additionalPhone: elder.additionalPhone,
        emergencyContactName: elder.emergencyContactName,
        emergencyContactPhone: elder.emergencyContactPhone,
        caregiverNameAndRole: elder.caregiverNameAndRole,
        caregiverPhoneNumber: elder.caregiverPhoneNumber,
        city: elder.city,
        streetName: elder.streetName,
        streetNumber: elder.streetNumber,
        additionalAddresInfo: elder.additionalAddresInfo,
        birthday: elder.birthday == null ? undefined : moment(new Date(elder.birthday.seconds * 1000)),
        language: elder.language,
        kosherFood: elder.kosherFood,
        foodEmphasis: elder.foodEmphasis,
        medicalEmphases: elder.medicalEmphases,
        deliveryStatus: elder.deliveryStatus,
        source: elder.source,
        contact: elder.contact,
        personalBackground: elder.personalBackground,
        // comments: elder.comments.map((_, i) => {
        //   return { ..._, date: new Date(_.date.seconds * 1000), key: i };
        // }),
        groups: elder.groups,
      });
    }
  }, [elder]);

  const getErrorMessage = fieldName => `${fieldName} is required.`;

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
              <h2>Personal Information</h2>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: getErrorMessage('First name') }]}
              >
                <Input placeholder="ישראל" style={{ direction: 'rtl' }} />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: getErrorMessage('Last name') }]}
              >
                <Input placeholder="ישראלי" style={{ direction: 'rtl' }} />
              </Form.Item>

              <Form.Item name="nameRelatedInfo" label="Name Related Information">
                <Input placeholder={`שרוליק`} style={{ direction: 'rtl' }} />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                initialValue={null}
                rules={[{ required: true, message: getErrorMessage('Gender') }]}
              >
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="city" rules={[{ required: true, message: getErrorMessage('City') }]} label="City">
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  onSelect={_ => Helper.handleCitySelect(_, setStreets)}
                  showSearch
                  autoComplete="registration-select"
                  style={{ direction: 'rtl' }}
                >
                  {Helper.getCityOptions()}
                </Select>
              </Form.Item>
              <Form.Item
                name="streetName"
                label="Street Name"
                rules={[{ required: true, message: getErrorMessage('Street name') }]}
              >
                <Select allowClear showSearch placeholder="שם רחוב" style={{ direction: 'rtl' }}>
                  {Helper.getStreetOptions(streets)}
                </Select>
              </Form.Item>

              <Form.Item
                name="streetNumber"
                label="Street Number"
                rules={[{ required: true, message: getErrorMessage('Street number') }]}
              >
                <InputNumber min={1} placeholder="מספר בית" style={{ direction: 'rtl' }}/>
              </Form.Item>

              <Form.Item name="additionalAddresInfo" label="Additional Address Information">
                <Input placeholder="מס' דירה\קומה" style={{ direction: 'rtl' }} />
              </Form.Item>

              {Helper.getLanguagesCheckboxs(true)}

              <Form.Item name="birthday" label="Date of birth">
                <DatePicker defaultPickerValue={new moment(new Date("01/01/1950"))} placeholder="01/01/1900" format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item name="source" label="Source" rules={[{ required: true, message: getErrorMessage('Gender') }]}>
                <Input placeholder="מקור הקשיש" style={{ direction: 'rtl' }} />
              </Form.Item>

              <h2>Nutrition and health</h2>
              <Form.Item name="kosherFood" label="Kosher Food" initialValue={false} valuePropName="checked">
                <Switch style={{ height: '18px' }} />
              </Form.Item>

              <Form.Item name="foodEmphasis" label="Emphasis on food" initialValue={null}>
                <Input.TextArea
                  rows={3}
                  placeholder="אלרגיות, דגשים לכשרות, יכולת אכילה וכו'"
                  style={{ direction: 'rtl' }}
                />
              </Form.Item>

              <Form.Item name="medicalEmphases" label="Medical emphases" initialValue={null}>
                <Input.TextArea
                  rows={3}
                  placeholder="יכולת תקשורתית, דגשים רפואיים נוספים"
                  style={{ direction: 'rtl' }}
                />
              </Form.Item>

              {/* <Form.Item name="deliveryStatus" label="Delivery Status" initialValue={false} valuePropName="checked">
                <Switch style={{ height: '18px' }} />
              </Form.Item> */}

              <h2>Contact Information</h2>
              <Form.Item
                name="phone"
                label="Private Phone"
                rules={[{ required: true, message: getErrorMessage('Phone number') }]}
              >
                <Input placeholder="מס' טלפון" style={{ direction: 'rtl' }}/>
              </Form.Item>

              <Form.Item name="additionalPhone" label="Additional Phone">
                <Input placeholder="מס' טלפון נוסף" style={{ direction: 'rtl' }} />
              </Form.Item>

              <Form.Item name="emergencyContactName" label="Emergency contact full name and relation">
                <Input placeholder="שם מלא + מה הקשר שלו לקשיש" style={{ direction: 'rtl' }} />
              </Form.Item>

              <Form.Item name="emergencyContactPhone" label="Emergency Contact Phone Number">
                <Input placeholder="מס' טלפון של איש קשר חירום" style={{ direction: 'rtl' }} />
              </Form.Item>

              <Form.Item name="caregiverNameAndRole" label="Name and Role of Caregiver">
                <Input placeholder="שם מלא ותפקיד (מטפל\סוציאלי\תומך)" style={{ direction: 'rtl' }} />
              </Form.Item>

              <Form.Item name="caregiverPhoneNumber" label="Caregiver Phone Number">
                <Input placeholder="מס' טלפון של מטפל" style={{ direction: 'rtl' }} />
              </Form.Item>

              {/* <Form.Item name="contact" label="Contact" style={{ direction: 'rtl' }} rules={[{ required: false }]}>
                <Input placeholder="Contact" />
              </Form.Item> */}
              <h2>Background/More</h2>

              <Form.Item name="personalBackground" label="Personal Background" initialValue={null}>
                <Input.TextArea
                  rows={3}
                  placeholder="מצב משפחתי או כל מידע אחר שנדרש לדעת"
                  style={{ direction: 'rtl' }}
                />
              </Form.Item>

              {/* {Helper.createHistoryComments()} */}

              {/* <Form.Item label="Signed Form">
                <Form.Item
                  name="signedForm"
                  initialValue={null}
                  rules={[{ required: false }]}
                  noStyle
                >
                  <Upload
                    name="files"
                    beforeUpload={() => false}
                    listType="picture"
                    // fileList={signedFormFiles}
                    multiple={false}
                    // onPreview={handleSignedFormPreview}
                    // onChange={handleSignedFormChange}
                    showUploadList={{
                      showRemoveIcon: false,
                    }}
                  >
                    <Button>
                      <UploadOutlined />
                      Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Form.Item>

              <Modal
                // visible={signedFormPreview.visible}
                // title={signedFormPreview.title}
                footer={null}
                // onCancel={() =>
                //   setSignedFormPreview({
                //     ...signedFormPreview,
                //     visible: false,
                //   })
                // }
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  // src={signedFormPreview.image}
                />
              </Modal> */}

              {/* None visable items */}

              {/* <Form.Item 
               name="groups"
               visible
              //  hidden = {elder === undefined} 
               initialValue={[]}>
                <Input />
              </Form.Item> */}

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
