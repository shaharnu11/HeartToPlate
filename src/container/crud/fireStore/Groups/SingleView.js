/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, InputNumber, Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../Helper';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import {
  fbDataSearch,
  fbDataClean,
  fbDataSubmit,
  fbFileClear,
  fbDataUpdate,
} from '../../../../redux/firestore/actionCreator';
import { firestore as db } from '../../../../config/database/firebase';
import { groupStatus } from './Data/Group';

const handleGroupSubmit = async (whenSuccess, newGroup, oldGroup, dispatch) => {
  Helper.convertUndefindToNullAndLowerCaseStrings(newGroup);
  console.log("THIS IS THE NEW GROUP" + JSON.stringify(newGroup));

  const id = oldGroup === undefined ? new Date().getTime() : oldGroup.id;

  try {
    if (oldGroup === undefined) {
      dispatch(
        fbDataSubmit('Groups', {
          ...newGroup,
          id,
          joinDate: new Date(),
        }),
      );
      dispatch(fbFileClear());
      whenSuccess();
    } else {
      dispatch(fbDataUpdate('Groups', id, newGroup));
    }

    const oldGroupVolunteerIds = oldGroup === undefined ? [] : oldGroup.volunteers.map(_ => _.id);
    const newGroupVolunteerIds = newGroup.volunteers;

    const removedVolunteersIds = oldGroupVolunteerIds.filter(_ => !newGroupVolunteerIds.includes(_));

    const addedVolunteersIds = newGroupVolunteerIds.filter(_ => !oldGroupVolunteerIds.includes(_));

    const dbVolunteersRef = db.collection('Volunteers');
    removedVolunteersIds.forEach(async volunteerId => {
      await dbVolunteersRef.doc(`${volunteerId}`).update({ groups: [] });
    });
    addedVolunteersIds.forEach(async volunteerId => {
      await dbVolunteersRef.doc(`${volunteerId}`).update({ groups: [id] });
    });

    const dbEldersRef = db.collection('Elders');

    const oldGroupElderIds = oldGroup === undefined ? [] : oldGroup.elders.map(_ => _.id);
    const newGroupElderIds = newGroup.elders;

    const removedElderIds = oldGroupElderIds.filter(_ => !newGroupElderIds.includes(_));

    const addedElderIds = newGroupElderIds.filter(_ => !oldGroupElderIds.includes(_));

    removedElderIds.forEach(async elderId => {
      await dbEldersRef.doc(`${elderId}`).update({ groups: [] });
    });
    addedElderIds.forEach(async elderId => {
      await dbEldersRef.doc(`${elderId}`).update({ groups: [id] });
    });
  } catch (err) {
    // console.log(err);
  }
};

const SingleView = ({ IsActionAdd, group }) => {
  const dispatch = useDispatch();

  const { volunteers, elders } = useSelector(state => {
    return {
      volunteers: state.crud.Volunteers,
      elders: state.crud.Elders,
    };
  });
  const [form] = Form.useForm();
  const [volunteersOptions, setVolunteersOptions] = useState(null);
  const [eldersOptions, setEldersOptions] = useState(null);
  const volunteersKeys = ['firstName', 'lastName'];
  const eldersKeys = ['firstName', 'lastName'];

  const setVolunteersOptionsWrapper = _ => {
    setVolunteersOptions(
      _.map(volunteer => (
        <Select.Option key={volunteersKeys.map(key => volunteer[key]).join(' ')} value={volunteer.id}>
          {volunteer.firstName} {volunteer.lastName}
          {volunteer.groups.length > 0
            ? group === undefined || !volunteer.groups.includes(group.id)
              ? '( already assigned )'
              : ''
            : ''}
        </Select.Option>
      )),
    );
  };

  const setEldersOptionsWrapper = _ => {
    setEldersOptions(
      _.map(elder => (
        <Select.Option key={eldersKeys.map(key => elder[key]).join(' ')} value={elder.id}>
          {elder.firstName} {elder.lastName}
          {elder.groups.length > 0
            ? group === undefined || !elder.groups.includes(group.id)
              ? '( already assigned )'
              : ''
            : ''}
        </Select.Option>
      )),
    );
  };

  useEffect(() => {
    if (volunteers !== undefined) {
      setVolunteersOptionsWrapper(volunteers);
    }

    return () => dispatch(fbDataClean('Volunteers'));
  }, [volunteers]);

  useEffect(() => {
    if (elders !== undefined) {
      setEldersOptionsWrapper(elders);
    }
    return () => dispatch(fbDataClean('Elders'));
  }, [elders]);

  useEffect(() => {
    if (group !== undefined) {
      setVolunteersOptionsWrapper(group.volunteers);
      setEldersOptionsWrapper(group.elders);
      form.setFieldsValue({
        name: group.name,
        city: group.city,
        volunteers: group.volunteers.map(_ => _.id),
        maxVolunteers: group.maxVolunteers,
        elders: group.elders.map(_ => _.id),
        maxElders: group.maxElders,
      });
    }
  }, [group]);

  const handleVolunteersSearch = value => {
    setVolunteersOptions(null);
    if (value.length >= 1) {
      dispatch(fbDataSearch('Volunteers', value, volunteersKeys));
    }
  };
  const handleEldersSearch = value => {
    setEldersOptions(null);
    if (value.length >= 1) {
      dispatch(fbDataSearch('Elders', value, eldersKeys));
    }
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
              onFinish={newGroup => handleGroupSubmit(() => form.resetFields(), newGroup, group, dispatch)}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="Input Name" />
              </Form.Item>

              <Form.Item name="city" rules={[{ required: true }]} label="City">
                <Select
                  autoComplete="registration-select"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  showSearch
                >
                  {Helper.getCityOptions()}
                </Select>
              </Form.Item>

              <Form.Item name="volunteers" rules={[{ required: false }]} label="Volunteers" initialValue={[]}>
                <Select
                  mode="multiple"
                  notFoundContent={volunteersOptions === null ? <Spin size="small" /> : null}
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  onSearch={_ => handleVolunteersSearch(_)}
                  showSearch
                  optionFilterProp="key"
                >
                  {volunteersOptions}
                </Select>
              </Form.Item>
{/* 
              <Form.Item name="maxVolunteers" label="Max Volunteers" rules={[{ required: true }]} initialValue={4}>
                <InputNumber placeholder="Max Volunteers" />
              </Form.Item> */}

              <Form.Item name="elders" rules={[{ required: false }]} label="Elders" initialValue={[]}>
                <Select
                  mode="multiple"
                  notFoundContent={eldersOptions === null ? <Spin size="small" /> : null}
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  onSearch={_ => handleEldersSearch(_)}
                  showSearch
                  optionFilterProp="key"
                >
                  {eldersOptions}
                </Select>
              </Form.Item>

              {/* <Form.Item name="maxElders" label="Max Elders" rules={[{ required: true }]} initialValue={2}>
                <InputNumber placeholder="Max Elders" />
              </Form.Item> */}

              <Form.Item
                name="status"
                label="Group Status"
                rules={[{ required: false }]}
                label="Group Status"
                initialValue={[]}
              >
                <Select
                  mode="single"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                >
                  {Object.values(groupStatus).map(status => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="record-form-actions text-right">
                <Button htmlType={IsActionAdd ? 'submit' : 'save'} type="primary">
                  {IsActionAdd ? 'Submit' : 'Update'}
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
