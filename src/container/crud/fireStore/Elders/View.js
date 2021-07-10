import { Switch } from 'antd';
import React from 'react';
import Helper from '../Helper';
import ViewPageBase from '../View';

const ViewPage = () => {
  const createDataSource = elders => {
    const dataSource = [];

    elders.map((elder, key) => {
      return dataSource.push({
        key: key + 1,
        id: elder.id,
        firstName: elder.firstName,
        lastName: elder.lastName,
        gender: elder.gender,
        phone: elder.phone,
        homePhone: elder.homePhone,
        emergencyContactName: elder.emergencyContactName,
        emergencyContactPhone: elder.emergencyContactPhone,
        elderTherapist: elder.elderTherapist,
        therapistPhone: elder.therapistPhone,
        city: elder.city,
        address: `${elder.address} ${elder.addressNumber}`,
        aptFloor: elder.aptFloor,
        birthday: elder.birthday == null ? undefined : Helper.toDateFormat(elder.birthday.seconds),
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
        otherLanguages: elder.otherLanguages,
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
        foodEmphasis: elder.foodEmphasis,
        medicalEmphases: elder.medicalEmphases,
        personalBackground: elder.personalBackground,
        // contact: elder.contact,
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
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
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
      title: 'Emergency Contact Name',
      dataIndex: 'emergencyContactName',
      key: 'emergencyContactName',
      filtered: true,
    },
    {
      title: 'Emergency Contact Phone',
      dataIndex: 'emergencyContactPhone',
      key: 'emergencyContactPhone',
      filtered: true,
    },
    {
      title: "elder's Therapist",
      dataIndex: 'elderTherapist',
      key: 'elderTherapist',
      filtered: true,
    },
    {
      title: "Therapist Phone",
      dataIndex: 'therapistPhone',
      key: 'therapistPhone',
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
      title: 'Other Language',
      dataIndex: 'otherLanguages',
      key: 'otherLanguages',
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
      title: 'Food Emphasis',
      dataIndex: 'foodEmphasis',
      key: 'foodEmphasis',
    },
    {
      title: 'Medical Emphasis',
      dataIndex: 'medicalEmphases',
      key: 'medicalEmphases',
    },
    {
      title: 'Personal Background',
      dataIndex: 'personalBackground',
      key: 'personalBackground',
    },
    // {
    //   title: 'Contact',
    //   dataIndex: 'contact',
    //   key: 'contact',
    // },
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
