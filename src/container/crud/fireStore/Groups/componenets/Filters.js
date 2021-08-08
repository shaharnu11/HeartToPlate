import { Button, Col, Row, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { PageHeader } from '../../../../../components/page-headers/page-headers';
import { ProjectHeader } from '../../../../project/style';
import { Main } from '../../../../styled';
import { readFilters } from '../../Filters/firestore/actionCreator';
import Helper from '../../Helper';
import { groupStatus } from '../Data/Group';
import { readGroups } from '../firestore/actionCreator';
import Group from './Group';

function Filters() {
  const dispatch = useDispatch();
  const [filteredCity, setFilteredCity] = useState();
  const [filteredElderId, setFilteredElderId] = useState();
  const [filteredGroupManagerId, setFilteredGroupManagerId] = useState();
  const [filteredGroupStatus, setFilteredGroupStatus] = useState();
  const [filteredOrganizationId, setFilteredOrganizationId] = useState();
  const [filteredVolunteerId, setFilteredVolunteerId] = useState();

  const [pageNumber, SetPageNumber] = useState(1);
  const { filters, groups } = useSelector(state => {
    return {
      filters: state.filtersReducer.filters,
      groups: state.groupsReducer.groups,
      organizations: state.organizationsReducer.organizations,
    };
  });
  const pageCount = 3;
  useEffect(() => {
    dispatch(readFilters());
  }, []);

  useEffect(() => {
    dispatch(
      readGroups(
        {
          filteredCity,
          filteredElderId,
          filteredVolunteerId,
          filteredGroupManagerId,
          filteredOrganizationId,
          filteredGroupStatus,
        },
        pageNumber * pageCount + 1,
      ),
    );
  }, [
    filteredCity,
    filteredElderId,
    filteredGroupManagerId,
    filteredGroupStatus,
    filteredOrganizationId,
    filteredVolunteerId,
    pageNumber,
  ]);

  const resetFilters = () => {
    setFilteredCity();
    setFilteredElderId();
    setFilteredGroupManagerId();
    setFilteredGroupStatus();
    setFilteredOrganizationId();
    setFilteredVolunteerId();
  };

  const handlePageNextClick = () => {
    SetPageNumber(pageNumber + 1);
  };

  const handlePagePrevClick = () => {
    SetPageNumber(pageNumber - 1);
  };
  return (
    <>
      <ProjectHeader>
        <PageHeader
          ghost
          title="Groups"
          buttons={[
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to="/admin/firestore/Groups/Add">
                <FeatherIcon icon="plus" size={14} /> Add New
              </Link>
            </Button>,
          ]}
        />
      </ProjectHeader>
      <Main>
        <Row>
          <Col style={{ width: '10%' }}>
            <span>Filters :</span>
          </Col>
          <Col style={{ width: '90%' }}>
            <SelectStyle
              showSearch
              placeholder="City"
              allowClear
              onClear={_ => setFilteredCity()}
              onSelect={value => setFilteredCity(value)}
            >
              {Helper.getCityOptions()}
            </SelectStyle>
            <SelectStyle
              placeholder="Organization"
              loading={filters === undefined}
              allowClear
              onClear={_ => setFilteredOrganizationId()}
              onSelect={value => setFilteredOrganizationId(value)}
            >
              {Object.keys(filters?.organizationIdToDisplayNameMap ?? []).map(organizationId => {
                return (
                  <Select.Option key={organizationId} value={organizationId}>
                    {filters.organizationIdToDisplayNameMap[organizationId]}
                  </Select.Option>
                );
              })}
            </SelectStyle>

            <SelectStyle
              allowClear
              placeholder="Group Status"
              loading={filters === undefined}
              onClear={_ => setFilteredGroupStatus()}
              onSelect={value => setFilteredGroupStatus(value)}
            >
              {Object.values(groupStatus).map(status => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </SelectStyle>
          </Col>
        </Row>
        <Row>
          <Col style={{ width: '10%' }}>
            <span>Search Filters :</span>
          </Col>
          <Col style={{ width: '25%' }}>
            <SelectSearchStyle
              allowClear
              onClear={_ => resetFilters()}
              onSelect={value => {
                resetFilters();
                setFilteredVolunteerId(value);
              }}
              value={filteredVolunteerId}
              showSearch
              loading={filters === undefined}
              placeholder="Select Volunteer"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {Object.keys(filters?.VolunteerIdToDisplayName ?? []).map(volunteerId => {
                return (
                  <Select.Option key={volunteerId} value={volunteerId}>
                    {filters.VolunteerIdToDisplayName[volunteerId]}
                  </Select.Option>
                );
              })}
            </SelectSearchStyle>
          </Col>
          <Col style={{ width: '25%' }}>
            <SelectSearchStyle
              allowClear
              onClear={_ => resetFilters()}
              onSelect={value => {
                resetFilters();
                setFilteredElderId(value);
              }}
              value={filteredElderId}
              showSearch
              loading={filters === undefined}
              placeholder="Select Elder"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {Object.keys(filters?.elderIdToDisplayNameMap ?? []).map(elderId => {
                return (
                  <Select.Option key={elderId} value={elderId}>
                    {filters.elderIdToDisplayNameMap[elderId]}
                  </Select.Option>
                );
              })}
            </SelectSearchStyle>
          </Col>
          <Col style={{ width: '25%' }}>
            <SelectSearchStyle
              allowClear
              onClear={_ => resetFilters()}
              onSelect={value => {
                resetFilters();
                setFilteredGroupManagerId(value);
              }}
              value={filteredGroupManagerId}
              loading={filters === undefined}
              showSearch
              placeholder="Select Group Manager"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {Object.keys(filters?.groupManagerIdToDisplayNameMap ?? []).map(groupManagerId => {
                return (
                  <Select.Option key={groupManagerId} value={groupManagerId}>
                    {filters.groupManagerIdToDisplayNameMap[groupManagerId]}
                  </Select.Option>
                );
              })}
            </SelectSearchStyle>
          </Col>
          <Col style={{ width: '10%', alignItems: 'center', display: 'flex' }}>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </Col>
        </Row>
        {groups !== undefined ? (
          <>
            {groups.slice((pageNumber - 1) * pageCount, pageNumber * pageCount).map((group, i) => {
              return (
                <Row style={{ height: '100', width: '100' }}>
                  <Group group={group} />
                </Row>
              );
            })}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                className="btn-add_new"
                size="default"
                key="1"
                type="primary"
                onClick={handlePagePrevClick}
                disabled={pageNumber === 1}
              >
                <FeatherIcon icon="plus" size={14} /> Preview
              </Button>
              <Button
                disabled={groups.length <= pageNumber * pageCount}
                className="btn-add_new"
                size="default"
                key="1"
                type="primary"
                onClick={handlePageNextClick}
              >
                <FeatherIcon icon="plus" size={14} /> Next
              </Button>
            </div>
          </>
        ) : (
          'no'
        )}
        {}

        <Row style={{ height: '100', width: '100' }} />
      </Main>
    </>
  );
}

export default Filters;

const SelectStyle = Styled(Select)`
    width:23%;
    margin-right:10px !important;
    .ant-btn {
        border-radius: 0px 8px 0px 8px;
        height: 53px;
        background-color: red;
    }
`;

const SelectSearchStyle = Styled(Select)`
    width:90%;
    margin-right:10px !important;
`;
