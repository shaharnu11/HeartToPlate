import React from 'react';
import { Select, Form, Checkbox, Row, Col } from 'antd';

// import { useDispatch } from 'react-redux';
// import { keys } from 'all-the-cities';
import citiesAndStreets from './israeli_street_and_cities_names.json';
import { fbDataUpdate, fbDataSubmit, fbFileClear } from '../../../redux/firestore/actionCreator';

const Helper = {
  languages: ['hebrew', 'english', 'russian', 'arabic'],

  handleSubmit: (dispatch, id, collection, form, values) => {
    console.log(values);

    Object.keys(values).forEach(key => {
      if (typeof values[key] === 'string') {
        values[key] = values[key].toLowerCase();
      }
    });

    if (id === null) {
      dispatch(
        fbDataSubmit(collection, {
          ...values,
          id: new Date().getTime(),
          joinDate: new Date(),
        }),
      );
      form.resetFields();
      dispatch(fbFileClear());
    } else {
      dispatch(fbDataUpdate(collection, id, values));
    }
  },

  getCityOptions: () =>
    citiesAndStreets.data.map(_ => (
      <Select.Option key={_.city_name} value={_.city_name}>
        {_.city_name}
      </Select.Option>
    )),
  handleCitySelect: (value, setValue) => {
    const { streets } = citiesAndStreets.data.filter(_ => _.city_name === value)[0];

    setValue(streets);
  },
  getStreetOptions: streets =>
    streets == null
      ? []
      : streets.map(_ => (
          <Select.Option key={_} value={_}>
            {_}
          </Select.Option>
        )),
  getLanguagesCheckboxs: required => {
    return (
      <Form.Item name="language" rules={[{ required }]} label="Language">
        <Checkbox.Group>
          <Row>
            {Helper.languages.map((_, i) => (
              <Col key={i}>
                <Checkbox value={_} style={{ lineHeight: '32px' }}>
                  {_}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    );
  },
};

export default Helper;
