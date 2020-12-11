import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Switch,
  Checkbox,
  Select,
  InputNumber,
  Upload,
  Spin,
  Pagination,
  Button as b,
} from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
// import Select from 'react-select';
import { InboxOutlined } from '@ant-design/icons';
import { database, firestore } from 'firebase';
import { startOfYesterday } from 'date-fns';
import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../../styled';
import { fbDataSubmit, fbFileUploder, fbDataRead, fbFileClear } from '../../../../redux/firestore/actionCreator';
import Heading from '../../../../components/heading/heading';
import citiesAndStreets from '../israeli_street_and_cities_names.json';

const AddNew = () => {
  const dispatch = useDispatch();
  const { crud, isLoading, url, isFileLoading } = useSelector(state => {
    return {
      crud: state.crud,
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
  const [groupVolunteers, setGroupVolunteers] = useState([]);
  const [pagination, setPagination] = useState({
    showSizeChanger: true,
    current: 1,
    pageSize: 10,
    showQuickJumper: false,
  });

  const [sorter, setSorter] = useState({
    columnKey: 'id',
    order: 'asc',
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
      fbDataSubmit('Groups', {
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
  const SortDirections = {
    DESC: 'desc',
    ASC: 'asc',
  };

  useEffect(() => {
    if (fbDataRead) {
      dispatch(fbDataRead('Volunteers', pagination, sorter));
    }
  }, [dispatch]);

  const Volunteers = crud.data;

  const Managers = [
    {
      name: 'shahar',
      phone: '052832523',
      adress: 'zvi brook 10',
      groupId: '1',
      language: 'hebrew',
      CityManagerobj: '?',
      Date: '?',
    },
    {
      name: 'yohav',
      phone: '050000033',
      adress: 'zvi brook 10',
      groupId: '2',
      language: 'English',
      CityManagerobj: '?',
      Date: '?',
    },
  ];
  const Elders = [
    {
      name: 'viktor',
      phone: '052832523',
      adress: 'zvi brook 10',
      groupId: '1',
      language: 'hebrew',
      CityManagerobj: '?',
      Date: '?',
    },
    {
      name: 'yosef',
      phone: '050000033',
      adress: 'zvi brook 10',
      groupId: '2',
      language: 'English',
      CityManagerobj: '?',
      Date: '?',
    },
  ];
  const ManagerOptions = Managers.map(_ => (
    <Select.Option key={state.name} value={state.name}>
      {_.name}
    </Select.Option>
  ));
  const ElderOptions = Elders.map(_ => (
    <Select.Option key={state.name} value={state.name}>
      {_.name}
    </Select.Option>
  ));

  const VolunteerOptions = Volunteers.map(_ => (
    <Select.Option key={_.name} value={_.name}>
      {_.name}
    </Select.Option>
  ));

  const cityOptions = citiesAndStreets.data.map(_ => (
    <Select.Option key={state.city_name} value={state.city_name}>
      {_.city_name}
    </Select.Option>
  ));

  const handleCitySelect = value => {
    const { streets } = citiesAndStreets.data.filter(_ => _.city_name === value)[0];

    setState({ streets });
  };

  const handleManagerSelect = value => {
    const { manager } = Managers.filter(_ => _.name === value)[0];

    setState({ manager });
  };

  const handleElderSelect = value => {
    const { manager } = Elders.filter(_ => _.name === value)[0];

    setState({ manager });
  };

  const handleVolonteerSelect = value => {
    const volunteer = Volunteers.filter(_ => _.name === value)[0];
    groupVolunteers.push(volunteer);
    setGroupVolunteers(groupVolunteers.map(_ => _));
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
            <Link to="/admin/firestore/Groups/View">View All</Link>
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

                        <Form.Item name="ID" label="ID" rules={[{ required: requireee }]}>
                          <Input placeholder="Input ID" />
                        </Form.Item>

                        <Form.Item name="Manager" label="Manager" rules={[{ required: requireee }]}>
                          <Select allowClear style={{ width: '100%' }} onSelect={handleManagerSelect} showSearch>
                            {ManagerOptions}
                          </Select>
                        </Form.Item>

                        <Form.Item name="Elder" label="Elder" rules={[{ required: requireee }]}>
                          <Select allowClear style={{ width: '100%' }} onSelect={handleElderSelect} showSearch>
                            {ElderOptions}
                          </Select>
                        </Form.Item>

                        <Form.Item name="Volunteers" label="Volunteers" rules={[{ required: requireee }]}>
                          <Select allowClear style={{ width: '100%' }} onSelect={handleVolonteerSelect} showSearch>
                            {VolunteerOptions}
                          </Select>
                          {groupVolunteers.map(v => (
                            <div style={{ fontSize: 'x-large' }} key={v.name} value={v.name}>
                              {v.name}
                            </div>
                          ))}
                        </Form.Item>

                        <Form.Item name="city" rules={[{ required: requireee }]} label="City">
                          <Select allowClear style={{ width: '100%' }} onSelect={handleCitySelect} showSearch>
                            {cityOptions}
                          </Select>
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
