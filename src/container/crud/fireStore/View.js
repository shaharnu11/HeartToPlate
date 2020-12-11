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
  const { crud, isLoading } = useSelector(state => {
    return {
      crud: state.crud,
      isLoading: false,
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
      dispatch(fbDataRead(collection, pagination, sorter));
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

  const onHandleSearch = e => {
    dispatch(fbDataSearch(collection, e.target.value, crud.data));
  };

  const dataSource = createDataSource(crud.data).map(data => {
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
      asd: 3,
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

  // const handleSort = (sortBy, isFiledSorted) => {
  //   const sortDirection = isFiledSorted
  //     ? state.sortDirection === SortDirections.DESC
  //       ? SortDirections.ASC
  //       : SortDirections.DESC
  //     : SortDirections.DESC;

  //   setState({
  //     ...state,
  //     sortBy,
  //     sortDirection,
  //   });
  //   dispatch(fbDataRead(collection, state.pageSize, state.currentPage, sortBy, sortDirection));
  // };

  // const reateSortableTitle = title => {
  //   const isSortedBy = state.sortBy === title;

  //   return (
  //     <div>
  //       {title}
  //       <span>&nbsp;&nbsp;</span>
  //       <FontAwesome
  //         name={isSortedBy ? `sort-${state.sortDirection === SortDirections.DESC ? 'down' : 'up'}` : 'sort'}
  //         onClick={() => handleSort(title, isSortedBy)}
  //         className="super-crazy-colors"
  //         size="2x"
  //         style={{
  //           color: isSortedBy ? (state.sortDirection === SortDirections.DESC ? 'red' : 'green') : undefined,
  //           textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
  //         }}
  //       />
  //     </div>
  //   );
  // };

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
            <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" />
          </div>,
        ]}
        ghost
        title="Data List"
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
              {isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <div>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      // rowSelection={rowSelection}
                      pagination={pagination}
                      dataSource={dataSource}
                      onChange={handleChange}
                      scroll={{ x: 1500, y: 300 }}
                      columns={columns
                        .map(column => {
                          return {
                            width: 10,
                            ...column,
                            showSorterTooltip: false,

                            // title: column.sortable ? reateSortableTitle(column.title) : column.title,
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
