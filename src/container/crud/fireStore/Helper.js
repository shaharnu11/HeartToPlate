// import { useDispatch } from 'react-redux';
// import { keys } from 'all-the-cities';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Col, Form, Row, Select, Timeline } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { firestore as db } from '../../../config/database/firebase';
import { fbDataSubmit, fbDataUpdate, fbFileClear } from '../../../redux/firestore/actionCreator';
import citiesAndStreets from './israeli_street_and_cities_names.json';


const Helper = {
  languages: ['Hebrew', 'English', 'Russian', 'Arabic', 'Amharic', 'French', "Spanish"],

  isValidIsraeliID: (id) => {
    try {
      var id = String(id).trim();
      if (id.length > 9 || id.length < 5 || isNaN(id)) {
        return false;
      } 
      // Pad string with zeros up to 9 digits
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
   
        return Array
          .from(id, Number)
            .reduce((counter, digit, i) => {
              console.log(counter);
              const step = digit * ((i % 2) + 1);
              return counter + (step > 9 ? step - 9 : step);
            }) % 10 === 0;
    } catch(err){
      return false;
    }
  },

  IsPhoneAlreadyExist: async (collection, newPhone, currentPhone) => {
    try {
      if (currentPhone === newPhone) {
        return true;
      }
      const ref = db.collection(collection).where('phone', '==', newPhone);

      const result = await ref.get();

      return result.docs.filter(_ => _.data().phone === newPhone).length === 0;
    } catch (err) {
      return null;
    }
  },

  createHistoryComments: () => {
    const DateHeader = props => {
      return <span>{Helper.toDateFormat(props.value.getTime() / 1000)}</span>;
    };

    return (
      <Form.List name="comments" label="Comments" initialValue={[]}>
        {(fields, { add, remove }) => (
          <Cards title="Comments" caption="The simplest use of Timelines">
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add comment
              </Button>
            </Form.Item>
            <Timeline mode="alternate">
              {fields.reverse().map(field => (
                <Timeline.Item
                  dot={
                    <Form.Item
                      name={[field.name, 'checked']}
                      fieldKey={[field.fieldKey, 'checked']}
                      initialValue={false}
                      valuePropName="checked"
                    >
                      <Checkbox style={{ fontSize: '16px' }} />
                    </Form.Item>
                  }
                >
                  <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />

                  <Form.Item
                    className="dateInput"
                    name={[field.name, 'date']}
                    fieldKey={[field.fieldKey, 'date']}
                    initialValue={new Date()}
                  >
                    <DateHeader />
                  </Form.Item>

                  <Form.Item
                    style={{ direction: 'rtl' }}
                    name={[field.name, 'text']}
                    fieldKey={[field.fieldKey, 'text']}
                    initialValue=""
                  >
                    <TextArea placeholder="Comment" />
                  </Form.Item>
                </Timeline.Item>
              ))}
            </Timeline>
          </Cards>
        )}
      </Form.List>
    );
  },

  toDateFormat: seconds => {
    const date = new Date(seconds * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  },

  convertUndefindToNullAndLowerCaseStrings: object => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(object)) {
      if (object[key] === undefined) {
        object[key] = null;
      }
    }

    Object.keys(object).forEach(key => {
      if (typeof object[key] === 'string') {
        object[key] = object[key].toLowerCase();
      }
    });
  },

  handleSubmit: (dispatch, id, collection, whenSuccess, values) => {
    const newValues = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(values)) {
      if (values[key] === undefined) {
        newValues[key] = null;
      } else {
        newValues[key] = values[key];
      }
    }

    Object.keys(values).forEach(key => {
      if (typeof values[key] === 'string') {
        newValues[key] = values[key].toLowerCase();
      }
    });

    if (id === null) {
      dispatch(
        fbDataSubmit(collection, {
          ...newValues,
          id: new Date().getTime(),
          joinDate: new Date(),
        }),
      );
      whenSuccess();
      dispatch(fbFileClear());
    } else {
      dispatch(fbDataUpdate(collection, id, newValues));
    }
  },

  getCityOptions: () =>
    citiesAndStreets.data.map(_ => (
      <Select.Option key={_.city_name} value={_.city_name} style={{ direction: 'rtl' }}>
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
      <Form.Item name="language" rules={[{ required: true }]} label="Language" initialValue={[]}>
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
