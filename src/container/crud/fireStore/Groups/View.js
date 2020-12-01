import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import FontAwesome from 'react-fontawesome';
import { RecordViewWrapper } from '../style';
import { Main, TableWrapper } from '../../../styled';
import { Button } from '../../../../components/buttons/buttons';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { fbDataDelete, fbDataRead, fbDataSearch } from '../../../../redux/firestore/actionCreator';

const SortDirections = {
  DESC: 'desc',
  ASC: 'asc',
};
const ViewPage = () => {
  const dispatch = useDispatch();
  const { crud, isLoading } = useSelector(state => {
    return {
      crud: state.crud,
      isLoading: false,
    };
  });

  const [state, setState] = useState({
    selectedRowKeys: [],
    currentPage: 1,
    pageSize: 10,
    sortBy: 'id',
    sortDirection: SortDirections.UP,
  });
  const { selectedRowKeys } = state;

  useEffect(() => {
    if (fbDataRead) {
      dispatch(fbDataRead(state.pageSize, state.currentPage, state.sortBy, state.sortDirection));
    }
  }, [dispatch]);
  const dataSource = [];

  const handleExport = () => {
    dispatch(fbDataRead());
  };

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(fbDataDelete(parseInt(id, 10)));
    }
    return false;
  };

  const onHandleSearch = e => {
    dispatch(fbDataSearch(e.target.value, crud.data));
  };

  if (crud.data.length)
    crud.data.map((person, key) => {
      const { id, name, email, company, position, join, status, city, country, url } = person;
      return dataSource.push({
        key: key + 1,
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
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/firestore/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
      });
    });

  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const handlePagination = data => {
    setState({
      ...state,
      currentPage: data.current,
      pageSize: data.pageSize,
    });
    dispatch(fbDataRead(data.pageSize, data.current, state.sortBy, state.sortDirection));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSort = (sortBy, isFiledSorted) => {
    const sortDirection = isFiledSorted
      ? state.sortDirection === SortDirections.DESC
        ? SortDirections.ASC
        : SortDirections.DESC
      : SortDirections.DESC;

    setState({
      ...state,
      sortBy,
      sortDirection,
    });
    dispatch(fbDataRead(state.pageSize, state.currentPage, sortBy, sortDirection));
  };

  const createSortedIconTitle = title => {
    const isSortedBy = state.sortBy === title;

    return (
      <div>
        {title}
        <span>&nbsp;&nbsp;</span>
        <FontAwesome
          name={isSortedBy ? `sort-${state.sortDirection === SortDirections.DESC ? 'down' : 'up'}` : 'sort'}
          onClick={() => handleSort(title, isSortedBy)}
          className="super-crazy-colors"
          size="1x"
          style={{
            color: isSortedBy ? (state.sortDirection === SortDirections.DESC ? 'red' : 'green') : undefined,
            textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    );
  };

  const columns = [
    {
      title: createSortedIconTitle('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: createSortedIconTitle('Email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: createSortedIconTitle('Company'),
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: createSortedIconTitle('Position'),
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: createSortedIconTitle('Status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: createSortedIconTitle('Joining Date'),
      dataIndex: 'jdate',
      key: 'jdate',
    },
    {
      title: createSortedIconTitle('Actions'),
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];
  return (
    <RecordViewWrapper>
      {/* {crud.length ? <DownloadExcel data={crud} /> : {}} */}
      {/* {crudAll ? crudAll.length : 123} */}

      <PageHeader
        subTitle={
          <div>
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to="/admin/firestore/fbAdd">
                <FeatherIcon icon="plus" size={14} /> Add New
              </Link>
            </Button>
            <Button size="small" type="white" onClick={handleExport}>
              <FeatherIcon icon="download" size={14} />
              Export
            </Button>
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
                      // eslint-disable-next-line react/jsx-boolean-value
                      rowSelection={rowSelection}
                      pagination={{
                        showSizeChanger: true,
                        current: state.currentPage,
                        pageSize: state.pageSize,
                        showQuickJumper: false,
                      }}
                      dataSource={dataSource}
                      onChange={handlePagination}
                      columns={columns}
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

export default ViewPage;
