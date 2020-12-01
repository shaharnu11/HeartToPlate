import React, { useState } from 'react';
import { Row, Col, Form, Input, Switch, Checkbox, Select, InputNumber, Upload, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
// import Select from 'react-select';
import { InboxOutlined } from '@ant-design/icons';
import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../../styled';
import { fbDataSubmit, fbFileUploder, fbFileClear } from '../../../../redux/firestore/actionCreator';
import Heading from '../../../../components/heading/heading';
import citiesAndStreets from '../israeli_street_and_cities_names.json';

const AddNew = () => {
  const dispatch = useDispatch();
  const { isLoading, url, isFileLoading } = useSelector(state => {
    return {
      isLoading: state.crud.loading,
      url: state.crud.url,
      isFileLoading: state.crud.fileLoading,
    };
  });
  // const [searchTerm, setSearchTerm] = React.useState('');
  // const [searchResults, setSearchResults] = React.useState([]);
  // const handleChange = event => {
  //   setSearchTerm(event.target.value);
  // };
  // React.useEffect(() => {
  //   const results = cities.map(_ => _.name).filter(person => person.toLowerCase().includes(searchTerm));
  //   console.log(results);
  //   setSearchResults(results);
  // }, [searchTerm]);

  const [form] = Form.useForm();
  const [state, setState] = useState({
    join: '',
  });

  const handleSubmit = values => {
    const fixValues = {};
    Object.keys(values).forEach(key => {
      if (values[key] === undefined) {
        fixValues[key] = null;
      } else {
        fixValues[key] = values[key];
      }
    });

    dispatch(fbFileUploder(values.signedForm.file.originFileObj));

    dispatch(
      fbDataSubmit('Volunteers', {
        ...fixValues,
        url,
        join: state.join,
        id: new Date().getTime(),
      }),
    );
    form.resetFields();
    dispatch(fbFileClear());
  };

  const asd = _ => {
    const a = 3;
  };
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    multiple: false,
    showUploadList: false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        dispatch(fbFileUploder(info.file.originFileObj));
      }
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const cityOptions = citiesAndStreets.data.map(_ => (
    <Select.Option key={_.city_name} value={_.city_name}>
      {_.city_name}
    </Select.Option>
  ));

  const handleCitySelect = value => {
    const { streets } = citiesAndStreets.data.filter(_ => _.city_name === value)[0];

    setState({ streets });
  };

  let streetOptions;
  if (state.streets) {
    streetOptions = state.streets.map(_ => (
      <Select.Option key={_} value={_}>
        {_}
      </Select.Option>
    ));
  }

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
                        <figure className="pro-image align-center-v">
                          <img
                            src={url === null ? require('../../../../static/img/avatar/profileImage.png') : url}
                            alt=""
                          />
                          <figcaption>
                            <Upload {...props}>
                              <Link className="upload-btn" to="#">
                                <FeatherIcon icon="camera" size={16} />
                              </Link>
                            </Upload>
                            <div className="info">
                              <Heading as="h4">Profile Photo</Heading>
                            </div>
                            {isFileLoading && (
                              <div className="isUploadSpain">
                                <Spin />
                              </div>
                            )}
                          </figcaption>
                        </figure>

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
                          <Select allowClear style={{ width: '100%' }} onSelect={handleCitySelect} showSearch>
                            {cityOptions}
                          </Select>
                        </Form.Item>

                        <Form.Item label="Address">
                          <Form.Item name="address" rules={[{ required: requireee }]}>
                            <Select allowClear showSearch placeholder="Street">
                              {streetOptions}
                            </Select>
                          </Form.Item>
                          <Form.Item name="addressNumber" rules={[{ required: requireee }]}>
                            <InputNumber min={1} placeholder="Number" />
                          </Form.Item>
                        </Form.Item>

                        <Form.Item name="age" rules={[{ required: requireee }]} label="Age">
                          <InputNumber min={1} />
                        </Form.Item>

                        <Form.Item name="language" rules={[{ required: requireee }]} label="Language">
                          <Checkbox.Group>
                            <Row>
                              <Col>
                                <Checkbox value="hebrew" style={{ lineHeight: '32px' }}>
                                  hebrew
                                </Checkbox>
                              </Col>
                              <Col>
                                <Checkbox value="english" style={{ lineHeight: '32px' }}>
                                  english
                                </Checkbox>
                              </Col>
                              <Col>
                                <Checkbox value="russian" style={{ lineHeight: '32px' }}>
                                  russian
                                </Checkbox>
                              </Col>
                              <Col>
                                <Checkbox value="arabic" style={{ lineHeight: '32px' }}>
                                  arabic
                                </Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>

                        <Form.Item name="carOwner" label="Car Owner" initialValue={false}>
                          <Switch style={{ height: '18px' }} />
                        </Form.Item>

                        <Form.Item name="kosherFood" label="Kosher Food" initialValue={false}>
                          <Switch style={{ height: '18px' }} />
                        </Form.Item>

                        <Form.Item label="Signed Form">
                          <Form.Item name="signedForm" rules={[{ required: requireee }]} noStyle>
                            <Upload.Dragger name="files" action={asd}>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">Click or drag file to this area to upload</p>
                              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                          </Form.Item>
                        </Form.Item>

                        <div className="record-form-actions text-right">
                          <Button size="default" htmlType="Save" type="primary">
                            {isLoading ? 'Loading...' : 'Submit'}
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
