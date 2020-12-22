import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Checkbox, Switch, Upload, Spin, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { helpers } from 'chart.js';
import Helper from '../Helper';
import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../../styled';
import { fbDataUpdate, fbDataSingle, fbFileReader, fbFileUploder } from '../../../../redux/firestore/actionCreator';

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const collection = 'Volunteers';
  const volunteerId = parseInt(match.params.id, 10);

  const { volunteer, isLoading, fileUplode } = useSelector(state => {
    return {
      volunteer: state.singleCrud[collection],
      isLoading: state.singleCrud.loading,
      fileUplode: state.crud.file,
    };
  });
  const [streets, setStreets] = useState([]);
  const [signedFormFiles, setSignedFormFiles] = useState([]);
  const [signedFormPreview, setSignedFormPreview] = useState({
    image: null,
    visible: false,
    title: null,
  });

  const [form] = Form.useForm();

  React.useEffect(() => {
    if (fileUplode != null) {
      form.setFieldsValue({
        signedForm: fileUplode,
      });
    }
  }, [dispatch, fileUplode]);

  useEffect(() => {
    if (volunteer !== undefined) {
      Helper.handleCitySelect(volunteer.city, setStreets);

      setSignedFormFiles([
        {
          uid: '1',
          status: 'done',
          name: volunteer.signedForm.name,
          url: volunteer.signedForm.url,
        },
      ]);
    }
  }, [dispatch, volunteer]);

  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle(collection, volunteerId));
    }
  }, [dispatch, volunteerId]);

  const handleSubmit = values => {
    dispatch(fbDataUpdate(collection, volunteerId, values));
  };

  const handlePreview = async file => {
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

  const handleChange = ({ fileList }) => {
    const newFileList = [fileList[fileList.length - 1]];
    setSignedFormFiles(newFileList);
    dispatch(fbFileUploder(newFileList[0].originFileObj, 'SignedForms'));
  };

  const requireee = false;

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to={`/admin/firestore/${collection}/View`}>
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Update Your Recored"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <RecordFormWrapper>
              <Cards headless>
                {volunteer === undefined ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <Row justify="center">
                    <Col xl={10} md={16} xs={24}>
                      {volunteer !== null && (
                        <BasicFormWrapper>
                          <Form
                            className="add-record-form"
                            style={{ width: '100%' }}
                            layout="vertical"
                            form={form}
                            name="edit"
                            onFinish={handleSubmit}
                          >
                            <Form.Item
                              name="name"
                              label="Name"
                              initialValue={volunteer.name}
                              rules={[{ required: requireee }]}
                            >
                              <Input placeholder="Input Name" />
                            </Form.Item>

                            <Form.Item
                              name="phone"
                              initialValue={volunteer.phone}
                              label="Phone"
                              rules={[{ required: requireee }]}
                            >
                              <Input placeholder="Phone" />
                            </Form.Item>

                            <Form.Item
                              name="email"
                              initialValue={volunteer.email}
                              rules={[{ required: requireee, type: 'email' }]}
                              label="Email"
                            >
                              <Input placeholder="example@gmail.com" />
                            </Form.Item>

                            <Form.Item
                              name="city"
                              rules={[{ required: requireee }]}
                              label="City"
                              initialValue={volunteer.city}
                            >
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
                              <Form.Item
                                name="address"
                                rules={[{ required: requireee }]}
                                initialValue={volunteer.address}
                              >
                                <Select allowClear showSearch placeholder="Street">
                                  {Helper.getStreetOptions(streets)}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name="addressNumber"
                                rules={[{ required: requireee }]}
                                initialValue={volunteer.addressNumber}
                              >
                                <InputNumber min={1} placeholder="Number" />
                              </Form.Item>
                            </Form.Item>

                            <Form.Item
                              name="age"
                              rules={[{ required: requireee }]}
                              label="Age"
                              initialValue={volunteer.age}
                            >
                              <InputNumber min={1} />
                            </Form.Item>

                            {Helper.getLanguagesCheckboxs(requireee, volunteer.language)}

                            <Form.Item name="carOwner" label="Car Owner" initialValue={volunteer.carOwner}>
                              <Switch style={{ height: '18px' }} defaultChecked={volunteer.carOwner} />
                            </Form.Item>

                            <Form.Item name="kosherFood" label="Kosher Food" initialValue={volunteer.kosherFood}>
                              <Switch style={{ height: '18px' }} defaultChecked={volunteer.kosherFood} />
                            </Form.Item>

                            <Form.Item label="Signed Form">
                              <Form.Item
                                name="signedForm"
                                rules={[{ required: requireee }]}
                                noStyle
                                initialValue={volunteer.signedForm}
                              >
                                <Upload
                                  name="files"
                                  beforeUpload={() => false}
                                  listType="picture"
                                  fileList={signedFormFiles}
                                  multiple={false}
                                  onPreview={handlePreview}
                                  onChange={handleChange}
                                  showUploadList={{ showRemoveIcon: false }}
                                >
                                  <Button>
                                    <UploadOutlined />
                                    Upload
                                  </Button>
                                </Upload>
                                <Modal
                                  visible={signedFormPreview.visible}
                                  title={signedFormPreview.title}
                                  footer={null}
                                  onCancel={() => setSignedFormPreview({ ...signedFormPreview, visible: false })}
                                >
                                  <img alt="example" style={{ width: '100%' }} src={signedFormPreview.image} />
                                </Modal>
                              </Form.Item>
                            </Form.Item>

                            <div className="record-form-actions text-right">
                              <Button htmlType="submit" type="primary">
                                {isLoading ? 'Loading...' : 'Update'}
                              </Button>
                            </div>
                          </Form>
                        </BasicFormWrapper>
                      )}
                    </Col>
                  </Row>
                )}
              </Cards>
            </RecordFormWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Edit;
