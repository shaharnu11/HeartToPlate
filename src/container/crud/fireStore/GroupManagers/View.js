import React from 'react';
import ViewPageBase from '../View';
import Helper from '../Helper';

const ViewPage = () => {
  const createDataSource = groupManagers => {
    const dataSource = [];

    if (groupManagers.length) {
      groupManagers.map((groupManager, key) => {
        return dataSource.push({
          key: key + 1,
          id: groupManager.id,
          firstName: groupManager.firstName,
          lastName: groupManager.lastName,
          phone: groupManager.phone,
          email: groupManager.email,
          city: groupManager.city,
          address:
            groupManager.address == null
              ? undefined
              : `${groupManager.address} ${groupManager.addressNumber}`,
          birthday:
            groupManager.birthday == null
              ? undefined
              : Helper.toDateFormat(groupManager.birthday.seconds),
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
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      filtered: true,
      fixed: 'left',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      filtered: true,
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
      filtered: true,
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
