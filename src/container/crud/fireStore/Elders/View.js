import React from 'react';
import { Switch } from 'antd';
import ViewPageBase from '../View';
import Helper from '../Helper';

const ViewPage = () => {
  const createDataSource = elders => {
    const dataSource = [];

    elders.map((elder, key) => {
      return dataSource.push({
        key: key + 1,
        id: elder.id,
        firstName: elder.firstName,
        lastName: elder.lastName,
        phone: elder.phone,
        homePhone: elder.homePhone,

        city: elder.city,
        address: `${elder.address} ${elder.addressNumber}`,
        aptFloor: elder.aptFloor,
        birthday:
          elder.birthday == null
            ? undefined
            : Helper.toDateFormat(elder.birthday.seconds),
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
        groups: (
          <div>
            {elder.groups.map((_, i) => (
              <div key={i}>
                <a href={`../Groups/edit/${_.id}`}>{_.name}</a>
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
      title: 'Private Phone',
      dataIndex: 'phone',
      key: 'phone',
      filtered: true,
    },
    {
      title: 'Home Phone',
      dataIndex: 'homePhone',
      key: 'homePhone',
      filtered: true,
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
      title: 'Apartment/Floor',
      dataIndex: 'aptFloor',
      key: 'aptFloor',
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
      title: 'Groups',
      dataIndex: 'groups',
      key: 'groups',
      joinCollection: 'Groups',
      sourceColumn: 'groups',
      action: 'in',
      destinationColumn: 'id',
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
