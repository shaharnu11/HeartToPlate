import React from 'react';
import { Select } from 'antd';

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
};

export default Helper;
