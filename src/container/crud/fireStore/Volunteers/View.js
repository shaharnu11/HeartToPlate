import React from 'react';
import { Switch, Image } from 'antd';
import ViewPageBase from '../View';

const ViewPage = () => {
  const createDataSource = volunteers => {
    const dataSource = [];

    volunteers.map((volunteer, key) => {
      return dataSource.push({
        key: key + 1,
        id: volunteer.id,
        name: volunteer.name,
        phone: volunteer.phone,
        email: volunteer.email,
        city: volunteer.city,
        address: `${volunteer.address} ${volunteer.addressNumber}`,
        age: volunteer.age,
        language: volunteer.language.map(_ => (
          <>
            {_}
            <br />
          </>
        )),
        carOwner: <Switch checked={volunteer.carOwner} />,
        kosherFood: <Switch checked={volunteer.kosherFood} />,
        signedForm: <Image width={20} src={volunteer.signedForm.url} />,
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
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sortable: true,
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
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Car',
      dataIndex: 'carOwner',
      key: 'carOwner',
      sorter: true,
    },
    {
      title: 'Kosher',
      dataIndex: 'kosherFood',
      key: 'kosherFood',
      sorter: true,
    },
    {
      title: 'Signed Form',
      dataIndex: 'signedForm',
      key: 'signedForm',
      sorter: true,
    },
  ];

  return ViewPageBase('Volunteers', columns, createDataSource);
};

export default ViewPage;
