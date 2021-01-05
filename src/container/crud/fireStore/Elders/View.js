import React from 'react';
import { Switch, Table, Input, Button, Space } from 'antd';
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
        birthday: Helper.toDateFormat(elder.birthday.seconds),
        language: (
          <div>
            {elder.language.map((_, i) => (
              <div key={i}>
                {_}
                <br />
              </div>
            ))}
          </div>
        ),
        kosherFood: <Switch checked={elder.kosherFood} />,
        contact: elder.contact,
        source: elder.source,
        deliveryStatus: <Switch checked={elder.deliveryStatus} />,
        joinDate: Helper.toDateFormat(elder.joinDate.seconds),
      });
    });

    return dataSource;
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filtered: true,
      fixed: 'left',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      filtered: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
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
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Delivery status',
      dataIndex: 'deliveryStatus',
      key: 'deliveryStatus',
    },
    {
      title: 'Joined Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
  ];

  return ViewPageBase('Elders', columns, createDataSource);
};

export default ViewPage;
