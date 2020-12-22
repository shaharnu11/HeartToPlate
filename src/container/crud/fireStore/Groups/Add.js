import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Helper from '../Helper';

import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../../styled';
import { fbDataSubmit, fbDataSearch, fbFileClear } from '../../../../redux/firestore/actionCreator';

const AddNew = () => {
  const dispatch = useDispatch();
  const collection = 'Groups';

  const { volunteers, elders, fileLoading } = useSelector(state => {
    return {
      isLoading: state.crud.fileLoading,
      volunteers: state.crud.Volunteers,
      elders: state.crud.Elders,
    };
  });

  const [form] = Form.useForm();
  const [volunteersOptions, setVolunteersOptions] = useState(null);
  const [eldersOptions, setEldersOptions] = useState(null);
  const volunteersKeys = ['name', 'email'];
  const eldersKeys = ['name'];

  useEffect(() => {
    if (volunteers !== undefined) {
      setVolunteersOptions(
        volunteers.map(volunteer => (
          <Select.Option key={volunteersKeys.map(key => volunteer[key]).join(' ')} value={volunteer.id}>
            {volunteer.name} ({volunteer.email})
          </Select.Option>
        )),
      );
    }
  }, [volunteers]);

  useEffect(() => {
    if (elders !== undefined) {
      setEldersOptions(
        elders.map(elder => (
          <Select.Option key={eldersKeys.map(key => elder[key]).join(' ')} value={elder.id}>
            {elder.name}
          </Select.Option>
        )),
      );
    }
  }, [elders]);

  const handleSubmit = values => {
    dispatch(
      fbDataSubmit(collection, {
        ...values,
        id: new Date().getTime(),
        createDate: new Date(),
      }),
    );
    form.resetFields();
    dispatch(fbFileClear());
  };

  const handleVolunteersSearch = value => {
    setVolunteersOptions(null);
    if (value.length > 2) {
      dispatch(fbDataSearch('Volunteers', value, volunteersKeys));
    }
  };
  const handleEldersSearch = value => {
    setEldersOptions(null);
    if (value.length > 2) {
      dispatch(fbDataSearch('Elders', value, eldersKeys));
    }
  };

  const requireee = false;
  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to={`/admin/firestore/${collection}/View`}>View All</Link>
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

                        <Form.Item name="city" rules={[{ required: requireee }]} label="City">
                          <Select autocomplete="off" allowClear style={{ width: '100%' }} showSearch>
                            {Helper.getCityOptions()}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          initialValue={[]}
                          name="volunteers"
                          rules={[{ required: requireee }]}
                          label="Volunteers"
                        >
                          <Select
                            mode="multiple"
                            notFoundContent={volunteersOptions === null ? <Spin size="small" /> : null}
                            allowClear
                            style={{ width: '100%' }}
                            onSearch={_ => handleVolunteersSearch(_)}
                            showSearch
                            optionFilterProp="key"
                          >
                            {volunteersOptions}
                          </Select>
                        </Form.Item>

                        <Form.Item initialValue={[]} name="elders" rules={[{ required: requireee }]} label="Elders">
                          <Select
                            mode="multiple"
                            notFoundContent={eldersOptions === null ? <Spin size="small" /> : null}
                            allowClear
                            style={{ width: '100%' }}
                            onSearch={_ => handleEldersSearch(_)}
                            showSearch
                            optionFilterProp="key"
                          >
                            {eldersOptions}
                          </Select>
                        </Form.Item>

                        <Form.Item name="comments" label="Comments">
                          <Input.TextArea rows={4} />
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
