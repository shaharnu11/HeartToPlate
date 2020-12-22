import React, { useState } from 'react';
import { Row, Col, Form, Input, Switch, Select, InputNumber, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Helper from '../Helper';

import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../../styled';
import { fbDataSubmit, fbFileClear } from '../../../../redux/firestore/actionCreator';

const AddNew = () => {
  const dispatch = useDispatch();
  const collection = 'Elders';

  const { fileLoading } = useSelector(state => {
    return {
      isLoading: state.crud.fileLoading,
    };
  });

  const [form] = Form.useForm();
  const [streets, setStreets] = useState([]);

  const handleSubmit = values => {
    dispatch(
      fbDataSubmit(collection, {
        ...values,
        id: new Date().getTime(),
        joinDate: new Date(),
      }),
    );
    form.resetFields();
    dispatch(fbFileClear());
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

                        <Form.Item name="phone" label="Phone" rules={[{ required: requireee }]}>
                          <Input placeholder="Phone" />
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

                        <Form.Item name="source" label="Source" rules={[{ required: requireee }]}>
                          <Input placeholder="Input Source" />
                        </Form.Item>

                        <Form.Item name="contact" label="Contact" rules={[{ required: requireee }]}>
                          <Input placeholder="Input Contact" />
                        </Form.Item>

                        {Helper.getLanguagesCheckboxs(requireee)}

                        <Form.Item name="kosherFood" label="Kosher Food" initialValue={false}>
                          <Switch style={{ height: '18px' }} />
                        </Form.Item>

                        <Form.Item name="frequency" label="Frequency">
                          <Radio.Group>
                            <Radio value="weekly">Weekly</Radio>
                            <Radio value="monthly">Monthly</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item name="deliveryStatus" label="Delivery Status" initialValue={false}>
                          <Switch style={{ height: '18px' }} />
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
