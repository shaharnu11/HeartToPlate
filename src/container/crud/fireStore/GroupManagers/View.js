import React from 'react';
import ViewPageBase from '../View';

const ViewPage = () => {
  const createDataSource = groupManagers => {
    const dataSource = [];

    if (groupManagers.length) {
      groupManagers.map((groupManager, key) => {
        return dataSource.push({
          key: key + 1,
          id: groupManager.id,
          name: groupManager.name,
          phone: groupManager.phone,
          email: groupManager.email,
          city: groupManager.city,
          address: `${groupManager.address} ${groupManager.addressNumber}`,
          age: groupManager.age,
          language: (
            <div>
              {groupManager.language.map((_, i) => (
                <div key={i}>
                  {_}
                  <br />
                </div>
              ))}
            </div>
          ),
          groups: (
            <div>
              {groupManager.groups.map((_, i) => (
                <div key={i}>
                  <a href={`../GroupManagers/edit/${_.id}`}>{_.name}</a>
                  <br />
                </div>
              ))}
            </div>
          ),
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
      title: 'Groups',
      dataIndex: 'groups',
      key: 'groups',
      joinCollection: 'Groups',
      sourceColumn: 'groups',
      action: 'in',
      destinationColumn: 'id',
    },
  ];

  return ViewPageBase('GroupManagers', columns, createDataSource);
};

export default ViewPage;
