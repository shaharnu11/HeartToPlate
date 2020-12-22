import React from 'react';
import { Switch, Image, Button, Anchor } from 'antd';
import ViewPageBase from '../View';

const ViewPage = () => {
  const createDataSource = groups => {
    const dataSource = [];

    groups.map((group, key) => {
      return dataSource.push({
        key: key + 1,
        id: group.id,
        name: group.name,
        city: group.city,
        comments: group.comments,
        // groupManager: <a href={`../GroupManagers/edit/${group.groupManager[0].id}`}>{group.groupManager[0].name}</a>,
        volunteers: (
          <div>
            {group.volunteers.map((_, i) => (
              <div key={i}>
                <a href={`../Volunteers/edit/${_.id}`}>{_.name}</a>
                <br />
              </div>
            ))}
          </div>
        ),
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
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
    // {
    //   title: 'Group Manager',
    //   dataIndex: 'groupManager',
    //   key: 'groupManager',
    //   joinCollection: 'GroupManagers',
    // },
    {
      title: 'Volunteers',
      dataIndex: 'volunteers',
      key: 'volunteers',
      joinCollection: 'Volunteers',
    },
  ];

  return ViewPageBase('Groups', columns, createDataSource);
};

export default ViewPage;
