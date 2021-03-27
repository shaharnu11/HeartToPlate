/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Upload,
  Modal,
  Radio,
  DatePicker,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import Helper from '../Helper';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import { fbFileUploder } from '../../../../redux/firestore/actionCreator';

const SingleView = ({ IsActionAdd, volunteer }) => {
  const dispatch = useDispatch();
  const collection = 'Volunteers';

  const { fileUplode, IsFileUploadig } = useSelector(state => {
    return {
      fileUplode: state.crud.file,
      IsFileUploadig: state.crud.fileLoading,
    };
  });

  const [form] = Form.useForm();
  const [streets, setStreets] = useState([]);
  const [signedFormFiles, setSignedFormFiles] = useState([]);
  const [signedFormPreview, setSignedFormPreview] = useState({
    image: null,
    visible: false,
    title: null,
  });

  useEffect(() => {
    if (volunteer !== undefined) {
      Helper.handleCitySelect(volunteer.city, setStreets);

      if (volunteer.signedForm !== null) {
        setSignedFormFiles([
          {
            uid: '1',
            status: 'done',
            name: volunteer.signedForm.name,
            url: volunteer.signedForm.url,
          },
        ]);
      }
    }
  }, [dispatch, volunteer]);

  useEffect(() => {
    if (fileUplode != null) {
      form.setFieldsValue({
        signedForm: fileUplode,
      });
    }
  }, [dispatch, fileUplode]);

  useEffect(() => {
    if (volunteer !== undefined) {
      form.setFieldsValue({
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        phone: volunteer.phone,
        email: volunteer.email,
        city: volunteer.city,
        address: volunteer.address,
        addressNumber: volunteer.addressNumber,
        birthday:
          volunteer.birthday == null
            ? undefined
            : moment(new Date(volunteer.birthday.seconds * 1000)),
        language: volunteer.language,
        carOwner: volunteer.carOwner,
        kosherFood: volunteer.kosherFood,
        frequency: volunteer.frequency,
        signedForm: volunteer.signedForm,
        comments: volunteer.comments.map((_, i) => {
          return {
            ..._,
            date: new Date(_.date.seconds * 1000),
            key: i,
          };
        }),
        groups: volunteer.groups,
      });
    }
  }, [volunteer]);

  const handleSignedFormChange = ({ fileList }) => {
    const newFileList = [fileList[fileList.length - 1]];
    setSignedFormFiles(newFileList);
    dispatch(fbFileUploder(newFileList[0].originFileObj, 'SignedForms'));
  };

  const handleSignedFormPreview = async file => {
    function getBase64() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64();
    }

    setSignedFormPreview({
      image: file.url || file.preview,
      visible: true,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

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
                return Helper.handleSubmit(
                  dispatch,
                  volunteer === undefined ? null : volunteer.id,
                  collection,
                  () => {
                    form.resetFields();
                    setSignedFormPreview({
                      image: null,
                      visible: false,
                      title: null,
                    });
                  },
                  {
                    ...values,
                    signedForm:
                      values.signedForm === undefined ||
                      values.signedForm === null
                        ? null
                        : {
                            name: values.signedForm.name,
                            url: values.signedForm.url,
                          },
                    birthday:
                      values.birthday === undefined || values.birthday === null
                        ? null
                        : values.birthday.toDate(),
                  },
                );
              }}
            >
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true }]}
                initialValue={null}
                style={{
                  direction: 'rtl',
                }}
              >
                <Input placeholder="Input Name" />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true }]}
                style={{
                  direction: 'rtl',
                }}
                initialValue={null}
              >
                <Input placeholder="Input Name" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true }]}
                initialValue={null}
              >
                <Input placeholder="Phone" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: false,
                    type: 'email',
                  },
                ]}
                label="Email"
                initialValue={null}
              >
                <Input placeholder="example@gmail.com" />
              </Form.Item>

              <Form.Item
                name="city"
                rules={[{ required: true }]}
                label="City"
                initialValue={null}
                style={{
                  direction: 'rtl',
                }}
              >
                <Select
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  onSelect={_ => Helper.handleCitySelect(_, setStreets)}
                  showSearch
                  autoComplete="registration-select"
                >
                  {Helper.getCityOptions()}
                </Select>
              </Form.Item>

              <Form.Item label="Address" rules={[{ required: true }]}>
                <Form.Item
                  name="address"
                  style={{
                    direction: 'rtl',
                  }}
                  rules={[{ required: true }]}
                  initialValue={null}
                >
                  <Select allowClear showSearch placeholder="Street">
                    {Helper.getStreetOptions(streets)}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="addressNumber"
                  rules={[{ required: true }]}
                  initialValue={null}
                  style={{
                    direction: 'rtl',
                  }}
                >
                  <InputNumber
                    min={1}
                    placeholder="Number"
                    style={{
                      direction: 'rtl',
                    }}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item
                name="birthday"
                initialValue={null}
                rules={[{ required: false }]}
                label="Date of birth"
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>

              {Helper.getLanguagesCheckboxs(false)}

              <Form.Item
                name="carOwner"
                label="Car Owner"
                initialValue={false}
                valuePropName="checked"
              >
                <Switch
                  style={{
                    height: '18px',
                  }}
                />
              </Form.Item>

              <Form.Item
                name="kosherFood"
                label="Kosher Food"
                initialValue={false}
                valuePropName="checked"
              >
                <Switch
                  style={{
                    height: '18px',
                  }}
                />
              </Form.Item>

              <Form.Item
                name="frequency"
                label="Frequency"
                initialValue={null}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="weekly">Weekly</Radio>
                  <Radio value="monthly">Monthly</Radio>
                </Radio.Group>
              </Form.Item>

              {Helper.createHistoryComments()}

              <Form.Item label="Signed Form">
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
                    fileList={signedFormFiles}
                    multiple={false}
                    onPreview={handleSignedFormPreview}
                    onChange={handleSignedFormChange}
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
                visible={signedFormPreview.visible}
                title={signedFormPreview.title}
                footer={null}
                onCancel={() =>
                  setSignedFormPreview({
                    ...signedFormPreview,
                    visible: false,
                  })
                }
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={signedFormPreview.image}
                />
              </Modal>

              {/* None visable items */}

              <Form.Item
                name="groups"
                hidden={volunteer === undefined}
                initialValue={[]}
              >
                <Input />
              </Form.Item>

              <div className="record-form-actions text-right">
                <Button
                  htmlType={IsActionAdd ? 'submit' : 'save'}
                  type="primary"
                  disabled={IsFileUploadig}
                >
                  {IsFileUploadig
                    ? 'Loading File'
                    : IsActionAdd
                    ? 'Submit'
                    : 'Update'}
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
