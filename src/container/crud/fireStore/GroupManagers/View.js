import React from 'react';
import { Switch, Image } from 'antd';
import ViewPageBase from '../View';

const ViewPage = () => {
  const createDataSource = data => {
    const dataSource = [];

    if (data.length) {
      data.map((groupManager, key) => {
        return dataSource.push({
          key: key + 1,
          id: groupManager.id,
          name: groupManager.name,
          phone: groupManager.phone,
          email: groupManager.email,
          city: groupManager.city,
          address: `${groupManager.address} ${groupManager.addressNumber}`,
          age: groupManager.age,
          language: groupManager.language.map(_ => (
            <>
              {_}
              <br />
            </>
          )),
          regionManager: groupManager.regionManager,
          groups: groupManager.groups.map(_ => _.name),
        });
      });
    }

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
      title: 'Region Manager',
      dataIndex: 'regionManager',
      key: 'regionManager',
    },
    {
      title: 'Groups',
      dataIndex: 'groups',
      key: 'groups',
    },
  ];

  return ViewPageBase('GroupManagers', columns, createDataSource);
};

export default ViewPage;
