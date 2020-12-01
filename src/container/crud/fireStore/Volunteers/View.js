import React from 'react';

import ViewPageBase from '../View';

const ViewPage = () => {
  const createDataSource = crud => {
    const dataSource = [];

    if (crud.data.length) {
      crud.data.map((person, key) => {
        const { id, name, email, company, position, join, status, city, country, url } = person;
        return dataSource.push({
          key: key + 1,
          id,
          name: (
            <div className="record-img align-center-v">
              <img src={url !== null ? url : require('../../../../static/img/avatar/profileImage.png')} alt={id} />
              <span>
                <span>{name}</span>
                <span className="record-location">
                  {city},{country}
                </span>
              </span>
            </div>
          ),
          email,
          company,
          position,
          jdate: join,
          status: <span className={`status ${status}`}>{status}</span>,
        });
      });
    }

    return dataSource;
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      sortable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      sortable: true,
    },

    {
      title: 'City',
      dataIndex: 'City',
      key: 'City',
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
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Car Owner',
      dataIndex: 'carOwner',
      key: 'carOwner',
    },
  ];

  return ViewPageBase('Volunteers', 'Volunteers', columns, createDataSource);
};

export default ViewPage;
