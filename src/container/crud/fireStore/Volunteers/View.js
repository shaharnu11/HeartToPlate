import React from 'react';
import { Switch, Image } from 'antd';
import ViewPageBase from '../View';

const ViewPage = () => {
  const createDataSource = data => {
    const dataSource = [];

    try {
      if (data.length) {
        data.map((person, key) => {
          return dataSource.push({
            key: key + 1,
            id: person.id,
            name: person.name,
            phone: person.phone,
            email: person.email,
            city: person.city,
            address: `${person.address} ${person.addressNumber}`,
            age: person.age,
            language: person.language.map(s => (
              <>
                {s}
                <br />
              </>
            )),
            carOwner: <Switch checked={person.carOwner} />,
            kosherFood: <Switch checked={person.kosherFood} />,
            signedForm: <Image width={20} src={person.signedForm.url} />,
            // id,
            // name: (
            //   <div className="record-img align-center-v">
            //     <img src={url !== null ? url : require('../../../../static/img/avatar/profileImage.png')} alt={id} />
            //     <span>
            //       <span>{name}</span>
            //       <span className="record-location">
            //         {city},{country}
            //       </span>
            //     </span>
            //   </div>
            // ),
            // email,
            // company,
            // position,
            // jdate: join,
            // status: <span className={`status ${status}`}>{status}</span>,
          });
        });
      }
    } catch (err) {
      const a = err;
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
      title: 'Car',
      dataIndex: 'carOwner',
      key: 'carOwner',
      sorter: true,
    },
    {
      title: 'Kosher',
      dataIndex: 'kosherFood',
      key: 'kosherFood',
      sorter: true,
    },
    {
      title: 'Signed Form',
      dataIndex: 'signedForm',
      key: 'signedForm',
      sorter: true,
    },
  ];

  return ViewPageBase('Volunteers', columns, createDataSource);
};

export default ViewPage;
