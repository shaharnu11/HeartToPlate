import React from 'react';
import ViewPageBase from '../View';

const ViewPage = () => {
  const createDataSource = regionManagers => {
    const dataSource = [];

    if (regionManagers.length) {
      regionManagers.map((regionManager, key) => {
        return dataSource.push({
          key: key + 1,
          id: regionManager.id,
          firstName: regionManager.firstName,
          lastName: regionManager.lastName,
          phone: regionManager.phone,
          email: regionManager.email,
          city: regionManager.city,
          address: `${regionManager.address} ${regionManager.addressNumber}`,
          language: regionManager.language.map(_ => (
            <>
              {_}
              <br />
            </>
          )),
          groupManagers: (
            <div>
              {regionManager.groupManagers.map((_, i) => (
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
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Group managers',
      dataIndex: 'groupManagers',
      key: 'groupManagers',
      joinCollection: 'GroupManagers',
      sourceColumn: 'groupManagers',
      action: 'in',
      destinationColumn: 'id',
    },
  ];

  return ViewPageBase('RegionManagers', columns, createDataSource);
};

export default ViewPage;
