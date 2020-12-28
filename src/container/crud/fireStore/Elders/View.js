import React from 'react';
import { Switch, Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ViewPageBase from '../View';
import Helper from '../Helper';

const ViewPage = () => {
  const createDataSource = elders => {
    const dataSource = [];

    elders.map((elder, key) => {
      return dataSource.push({
        key: key + 1,
        id: elder.id,
        name: elder.name,
        phone: elder.phone,
        city: elder.city,
        address: `${elder.address} ${elder.addressNumber}`,
        age: elder.age,
        language: elder.language.map(_ => (
          <>
            {_}
            <br />
          </>
        )),
        kosherFood: <Switch checked={elder.kosherFood} />,
        contact: elder.contact,
        source: elder.source,
        frequency: elder.frequency,
        deliveryStatus: <Switch checked={elder.deliveryStatus} />,
        comments: <Input.TextArea rows={2} value={elder.comments} />,
      });
    });

    return dataSource;
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,

      fixed: 'left',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      filters: Helper.languages.map(_ => ({ text: _, value: _ })),
    },
    {
      title: 'Kosher',
      dataIndex: 'kosherFood',
      key: 'kosherFood',
      sorter: true,
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      sorter: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      sorter: true,
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'frequency',
      sorter: true,
    },
    {
      title: 'Delivery status',
      dataIndex: 'deliveryStatus',
      key: 'deliveryStatus',
      sorter: true,
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      sorter: true,
    },
  ];

  return ViewPageBase('Elders', columns, createDataSource);
};

export default ViewPage;
