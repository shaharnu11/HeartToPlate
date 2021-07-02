import React from 'react';
<<<<<<< HEAD
import Filters from './componenets/Filters';
=======
import ViewPageBase from '../View';
import Group from './componenets/Group';
>>>>>>> 168f692ea7d3d980a98003650325e7cd447b9f16

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

<<<<<<< HEAD
  return <Filters />;
  // return ViewPageBase('Groups', columns, createDataSource);
=======
  return (
    <>    
      <Group groupStatus='pending' />
      <Group  groupStatus='active'/>
      {ViewPageBase('Groups', columns, createDataSource)}
    </>
  )
>>>>>>> 168f692ea7d3d980a98003650325e7cd447b9f16
};

export default ViewPage;
