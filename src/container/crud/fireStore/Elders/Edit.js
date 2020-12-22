import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Checkbox, Switch, Radio, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../Helper';
import { RecordFormWrapper } from '../style';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../../styled';
import { fbDataUpdate, fbDataSingle, fbFileReader, fbFileUploder } from '../../../../redux/firestore/actionCreator';

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const collection = 'Elders';
  const elderId = parseInt(match.params.id, 10);

  const { elder, isLoading } = useSelector(state => {
    return {
      elder: state.singleCrud[collection],
      isLoading: state.singleCrud.loading,
    };
  });
  const [streets, setStreets] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (elder !== undefined) {
      Helper.handleCitySelect(elder.city, setStreets);
    }
  }, [dispatch, elder]);

  useEffect(() => {
    if (fbDataSingle) {
      dispatch(fbDataSingle(collection, elderId));
    }
  }, [dispatch, elderId]);

  const handleSubmit = values => {
    dispatch(fbDataUpdate(collection, elderId, values));
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
                {elder === undefined ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <Row justify="center">
                    <Col xl={10} md={16} xs={24}>
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
                            initialValue={elder.name}
                            rules={[{ required: requireee }]}
                          >
                            <Input placeholder="Input Name" />
                          </Form.Item>

                          <Form.Item
                            name="phone"
                            initialValue={elder.phone}
                            label="Phone"
                            rules={[{ required: requireee }]}
                          >
                            <Input placeholder="Phone" />
                          </Form.Item>

                          <Form.Item
                            name="city"
                            rules={[{ required: requireee }]}
                            label="City"
                            initialValue={elder.city}
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
                            <Form.Item name="address" rules={[{ required: requireee }]} initialValue={elder.address}>
                              <Select allowClear showSearch placeholder="Street">
                                {Helper.getStreetOptions(streets)}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name="addressNumber"
                              rules={[{ required: requireee }]}
                              initialValue={elder.addressNumber}
                            >
                              <InputNumber min={1} placeholder="Number" />
                            </Form.Item>
                          </Form.Item>

                          <Form.Item name="age" rules={[{ required: requireee }]} label="Age" initialValue={elder.age}>
                            <InputNumber min={1} />
                          </Form.Item>

                          {Helper.getLanguagesCheckboxs(requireee, elder.language)}

                          <Form.Item name="kosherFood" label="Kosher Food" initialValue={elder.kosherFood}>
                            <Switch style={{ height: '18px' }} defaultChecked={elder.kosherFood} />
                          </Form.Item>

                          <Form.Item name="frequency" label="Frequency" initialValue={elder.frequency}>
                            <Radio.Group defaultValue={elder.frequency}>
                              <Radio value="weekly">Weekly</Radio>
                              <Radio value="monthly">Monthly</Radio>
                            </Radio.Group>
                          </Form.Item>

                          <Form.Item name="deliveryStatus" label="Delivery Status" initialValue={elder.deliveryStatus}>
                            <Switch style={{ height: '18px' }} defaultChecked={elder.deliveryStatus} />
                          </Form.Item>

                          <Form.Item name="comments" label="Comments" initialValue={elder.comments}>
                            <Input.TextArea rows={4} />
                          </Form.Item>
                          <div className="record-form-actions text-right">
                            <Button htmlType="submit" type="primary">
                              {isLoading ? 'Loading...' : 'Update'}
                            </Button>
                          </div>
                        </Form>
                      </BasicFormWrapper>
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
