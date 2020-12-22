import React from 'react';
import { Select, Form, Checkbox, Row, Col } from 'antd';

import citiesAndStreets from './israeli_street_and_cities_names.json';

const Helper = {
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
  getLanguagesCheckboxs: (required, value = []) => {
    return (
      <Form.Item name="language" rules={[{ required }]} initialValue={value} label="Language">
        <Checkbox.Group>
          <Row>
            <Col>
              <Checkbox value="hebrew" style={{ lineHeight: '32px' }}>
                Hebrew
              </Checkbox>
            </Col>
            <Col>
              <Checkbox value="english" style={{ lineHeight: '32px' }}>
                English
              </Checkbox>
            </Col>
            <Col>
              <Checkbox value="russian" style={{ lineHeight: '32px' }}>
                Russian
              </Checkbox>
            </Col>
            <Col>
              <Checkbox value="arabic" style={{ lineHeight: '32px' }}>
                Arabic
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
    );
  },
};

export default Helper;
