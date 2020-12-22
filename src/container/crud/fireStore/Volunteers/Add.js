import React, { useState } from 'react';
import { Row, Col, Form, Input, Switch, Checkbox, Select, InputNumber, Upload, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import Helper from '../Helper';

import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../../styled';
import { fbDataSubmit, fbFileClear, fbFileUploder } from '../../../../redux/firestore/actionCreator';

const AddNew = () => {
  const dispatch = useDispatch();
  const { fileLoading, fileUplode } = useSelector(state => {
    return {
      isLoading: state.crud.fileLoading,
      fileUplode: state.crud.file,
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

  React.useEffect(() => {
    if (fileUplode != null) {
      form.setFieldsValue({
        signedForm: fileUplode,
      });
    }
  }, [dispatch, fileUplode]);

  const handleSubmit = values => {
    dispatch(
      fbDataSubmit('Volunteers', {
        ...values,
        id: new Date().getTime(),
        joinDate: new Date(),
      }),
    );
    form.resetFields();
    dispatch(fbFileClear());
  };

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

  const requireee = false;
  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to="/admin/firestore/Volunteers/View">View All</Link>
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
                            autocomplete="off"
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

                        <Form.Item name="carOwner" label="Car Owner" initialValue={false}>
                          <Switch style={{ height: '18px' }} />
                        </Form.Item>

                        <Form.Item name="kosherFood" label="Kosher Food" initialValue={false}>
                          <Switch style={{ height: '18px' }} />
                        </Form.Item>

                        <Form.Item label="Signed Form">
                          <Form.Item name="signedForm" rules={[{ required: requireee }]} noStyle>
                            <Upload
                              name="files"
                              beforeUpload={() => false}
                              listType="picture"
                              fileList={signedFormFiles}
                              multiple={false}
                              onPreview={handleSignedFormPreview}
                              onChange={handleSignedFormChange}
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
                          <Button size="default" htmlType="Save" type="primary">
                            {fileLoading ? 'Loading...' : 'Submit'}
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
