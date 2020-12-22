import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import ReactExport from 'react-export-excel';
import { RecordViewWrapper } from './style';
import { Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { fbDataDelete, fbDataRead, fbDataSearch } from '../../../redux/firestore/actionCreator';
import DownloadExcel from '../../../utilities/DownloadExcel';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

const ViewPageBase = (collection, columns, createDataSource) => {
  const dispatch = useDispatch();
  const { documents } = useSelector(state => {
    return {
      documents: state.crud[collection],
    };
  });

  const [pagination, setPagination] = useState({
    showSizeChanger: true,
    current: 1,
    pageSize: 10,
    showQuickJumper: false,
  });

  const [sorter, setSorter] = useState({
    columnKey: 'id',
    order: 'asc',
  });

  useEffect(() => {
    if (fbDataRead) {
      dispatch(
        fbDataRead(
          collection,
          pagination,
          sorter,
          columns.filter(_ => _.joinCollection !== undefined),
        ),
      );
    }
  }, [dispatch]);

  // const handleExport = () => {
  //   setState({
  //     ...state,
  //     export: true,
  //   });
  // };

  // const handleReExport = () => {
  //   setState({
  //     ...state,
  //     export: !state.export,
  //   });

  //   return <DownloadExcel data={crud.data} />;
  // };

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(fbDataDelete(parseInt(id, 10)));
    }
    return false;
  };

  // const onHandleSearch = e => {
  //   dispatch(fbDataSearch(collection, e.target.value, crud));
  // };

  const getDataSource = () =>
    createDataSource(documents).map(data => {
      return {
        ...data,
        action: (
          <div style={{ textAlign: 'right' }}>
            <Link className="edit" to={`/admin/firestore/${collection}/edit/${data.id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(data.id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
      };
    });

  const handleChange = (tablePagination, filters, tableSorter, extra) => {
    if (extra.action === 'paginate') {
      setPagination(tablePagination);
      dispatch(fbDataRead(collection, pagination, sorter));
    }
    if (extra.action === 'sort') {
      setSorter({ ...tableSorter, order: tableSorter.order === 'ascend' ? 'asc' : 'desc' });
      dispatch(fbDataRead(collection, pagination, sorter));
    }
  };

  return (
    <RecordViewWrapper>
      {/* {state.export ? handleReExport() : 123} */}
      {/* {crudAll ? crudAll.length : 123} */}

      <PageHeader
        subTitle={
          <div>
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to={`/admin/firestore/${collection}/Add`}>
                <FeatherIcon icon="plus" size={14} /> Add New
              </Link>
            </Button>
            {/* <Button size="small" type="white" onClick={handleExport}>
              <FeatherIcon icon="download" size={14} />
              Export
            </Button> */}
          </div>
        }
        buttons={[
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            {/* <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" /> */}
          </div>,
        ]}
        ghost
        title="Data List"
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
              {documents === undefined ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <div>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      pagination={pagination}
                      dataSource={getDataSource()}
                      onChange={handleChange}
                      scroll={{ x: columns.length * 150, y: 300 }}
                      columns={columns
                        .map(column => {
                          return {
                            width: 10,
                            ...column,
                            showSorterTooltip: false,
                          };
                        })
                        .concat({
                          title: 'Actions',
                          dataIndex: 'action',
                          key: 'action',
                          width: 7,
                          fixed: 'right',
                        })}
                    />
                  </TableWrapper>
                </div>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </RecordViewWrapper>
  );
};

export default ViewPageBase;
