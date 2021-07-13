/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Spin, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { useEffect, useState } from 'react';
import ReactExport from 'react-export-excel';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { fbDataDelete, fbDataRead } from '../../../redux/firestore/actionCreator';
import { Main, TableWrapper } from '../../styled';
// import { filter } from 'all-the-cities';
import { RecordViewWrapper } from './style';

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

  const joinColumns = columns.filter(_ => _.joinCollection !== undefined);
  const [pagination, setPagination] = useState({
    showSizeChanger: true,
    current: 1,
    pageSize:10,
    showQuickJumper: false,
  });

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

  const [sorter, setSorter] = useState(null);
  const [filter, setFilter] = useState();

  useEffect(() => {
    if (fbDataRead) {
      dispatch(fbDataRead(collection, pagination, sorter, joinColumns));
    }
  }, [dispatch]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setFilter({ column: dataIndex, text: selectedKeys[0] });
    confirm();
  };

  const handleReset = clearFilters => {
    setFilter(null);
    clearFilters();
  };

  const getColumnFilterProps = column => {
    if (column.filtered === undefined || (filter && filter.column != null && filter.column !== column.key)) {
      return {};
    }

    const dataIndex = column.key;
    let searchInput = 3;

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      // onFilter: (value, record) => {
      //   const a = 3;
      //   return record[dataIndex]
      //     ? record[dataIndex]
      //         .toString()
      //         .toLowerCase()
      //         .includes(value.toLowerCase())
      //     : '';
      // },
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: text => {
        return filter && filter.column === dataIndex ? (
          <Highlighter
            class="highlighterFilter"
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[filter.text]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        );
      },
    };
  };

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(fbDataDelete(collection, parseInt(id, 10)));
    }
    return false;
  };

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
      dispatch(fbDataRead(collection, tablePagination, sorter, joinColumns, filter));
    }
    if (extra.action === 'sort') {
      setSorter(tableSorter);
      dispatch(fbDataRead(collection, pagination, tableSorter, joinColumns, filter));
    }

    if (extra.action === 'filter') {
      const filterColumn = Object.keys(filters).filter(_ => filters[_] != null)[0];
      const filterText = filters[filterColumn];

      if (filterText != null) {
        const newFilter = { column: filterColumn, text: filters[filterColumn][0] };
        const customeSorter = { columnKey: filterColumn, order: 'ascend' };
        setSorter({ ...customeSorter });
        dispatch(fbDataRead(collection, pagination, customeSorter, joinColumns, newFilter));
      } else {
        dispatch(fbDataRead(collection, pagination, null, joinColumns, null));
      }
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
                      scroll={{ x: columns.length * 140, y: 300 }}
                      columns={columns
                        .map(column => {
                          return {
                            width: 5,
                            ...column,
                            ...getColumnFilterProps(column),
                            showSorterTooltip: false,
                            sortOrder: sorter && sorter.columnKey === column.key && sorter.order,
                            sorter: filter != null ? filter.column === column.key : true,
                          };
                        })
                        .concat({
                          title: 'Actions',
                          dataIndex: 'action',
                          key: 'action',
                          width: 4,
                          fixed: 'right',
                          align: 'right',
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
