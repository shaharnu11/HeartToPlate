import React from 'react';
import ViewPageBase from '../View';
import Group from './componenets/Group';

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
        groupManagers: group.groupManagers.map(groupManager => (
          <a href={`../GroupManagers/edit/${groupManager.id}`}>
            {groupManager.firstName} {groupManager.lastName}
          </a>
        )),
        volunteers: (
          <div>
            {group.volunteers.map((_, i) => (
              <div key={i}>
                <a href={`../Volunteers/edit/${_.id}`}>
                  {_.firstName} {_.lastName}
                </a>
                <br />
              </div>
            ))}
          </div>
        ),
        maxVolunteers: group.maxVolunteers,

        elders: (
          <div>
            {group.elders.map((_, i) => (
              <div key={i}>
                <a href={`../Elders/edit/${_.id}`}>
                  {_.firstName} {_.lastName}
                </a>
                <br />
              </div>
            ))}
          </div>
        ),
        maxElders: group.maxElders,
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
      filtered: true,
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'Group Managers',
      dataIndex: 'groupManagers',
      key: 'groupManagers',
      joinCollection: 'GroupManagers',
      sourceColumn: 'id',
      action: 'array-contains',
      destinationColumn: 'groups',
    },
    {
      title: 'Volunteers',
      dataIndex: 'volunteers',
      key: 'volunteers',
      joinCollection: 'Volunteers',
      sourceColumn: 'volunteers',
      action: 'in',
      destinationColumn: 'id',
    },
    {
      title: 'Elders',
      dataIndex: 'elders',
      key: 'elders',
      joinCollection: 'Elders',
      sourceColumn: 'elders',
      action: 'in',
      destinationColumn: 'id',
    },
  ];

  return (
    <>    
      <Group groupStatus='pending' />
      <Group  groupStatus='active'/>
      {ViewPageBase('Groups', columns, createDataSource)}
    </>
  )
};

export default ViewPage;
