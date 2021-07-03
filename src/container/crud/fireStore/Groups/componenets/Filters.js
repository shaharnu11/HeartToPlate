import { Button, Col, Row, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { PageHeader } from '../../../../../components/page-headers/page-headers';
import { ProjectHeader } from '../../../../project/style';
import { Main } from '../../../../styled';
import Helper from '../../Helper';
import { groupStatuses, volunteerStatuses } from '../Data/Group';
import { readGroupFilters, readGroups } from '../firestore/actionCreator';

function Filters() {
  const dispatch = useDispatch();
  const [filteredVolunteerId, setFilteredVolunteerId] = useState();
  const [filteredElderId, setFilteredElderId] = useState();
  const [filteredGroupManagerId, setFilteredGroupManagerId] = useState();
  const [filteredCity, setFilteredCity] = useState();
  const [volunteerIdToDisplayNameMap, setVolunteerIdToDisplayNameMap] = useState({});
  const [elderIdToDisplayNameMap, setElderIdToDisplayNameMap] = useState({});
  const [groupIdToDisplayNameMap, setGroupIdToDisplayNameMap] = useState({});
  const [groupManagerIdToDisplayNameMap, setGroupManagerIdToDisplayNameMap] = useState({});
  const [organizationIdToDisplayNameMap, setOrganizationIdToDisplayNameMap] = useState({});
  const [isLoadingFilters, setIsLoadingFilters] = useState(true);
  const [pageNumber, SetPageNumber] = useState(1);
  const { groupFilters, groups } = useSelector(state => {
    return {
      groupFilters: state.groupsReducer.groupFilters,
      groups: state.groupsReducer.groups,
    };
  });
  const pageCount = 3;
  useEffect(() => {
    dispatch(readGroupFilters());
  }, []);

  useEffect(() => {
    if (groupFilters !== undefined) {
      setGroupIdToDisplayNameMap(groupFilters.idToDisplayName);
      setGroupManagerIdToDisplayNameMap(groupFilters.groupManagerIdToDisplayName);
      setOrganizationIdToDisplayNameMap(groupFilters.organizationIdToDisplayName);
      setVolunteerIdToDisplayNameMap(groupFilters.volunteerIdToDisplayName);
      setElderIdToDisplayNameMap(groupFilters.elderIdToDisplayName);
      setIsLoadingFilters(false);
    }
  }, [groupFilters]);

  useEffect(() => {
    dispatch(
      readGroups(
        {
          filteredCity,
          filteredElderId,
          filteredVolunteerId,
          filteredGroupManagerId,
        },
        pageNumber * pageCount + 1,
      ),
    );
  }, [filteredElderId, filteredVolunteerId, filteredGroupManagerId, filteredCity, pageNumber]);

  function onSorting(value) {
    console.log(`selected ${value}`);
  }

  const resetFilters = () => {
    setFilteredVolunteerId(undefined);
    setFilteredGroupManagerId(undefined);
    setFilteredElderId(undefined);
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
          // subTitle={<>12 Running Projects</>}
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
              onChange={onSorting}
              allowClear
              onSelect={value => setFilteredCity(value)}
            >
              {Helper.getCityOptions()}
            </SelectStyle>

            <SelectStyle placeholder="Organization" loading={isLoadingFilters} onChange={onSorting}>
              {Object.keys(organizationIdToDisplayNameMap).map(organizationId => {
                return (
                  <Select.Option key={organizationId} value={organizationId}>
                    {organizationIdToDisplayNameMap[organizationId]}
                  </Select.Option>
                );
              })}
            </SelectStyle>

            <SelectStyle placeholder="Group Status" onChange={onSorting} loading={isLoadingFilters}>
              {groupStatuses.map(status => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </SelectStyle>

            <SelectStyle placeholder="Volunteer Status" onSelect={onSorting} loading={isLoadingFilters}>
              {volunteerStatuses.map(status => (
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
              onSelect={value => setFilteredVolunteerId(value)}
              value={filteredVolunteerId}
              showSearch
              loading={isLoadingFilters}
              placeholder="Select Volunteer"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {Object.keys(volunteerIdToDisplayNameMap).map(volunteerId => {
                return (
                  <Select.Option key={volunteerId} value={volunteerId}>
                    {volunteerIdToDisplayNameMap[volunteerId]}
                  </Select.Option>
                );
              })}
            </SelectSearchStyle>
          </Col>
          <Col style={{ width: '25%' }}>
            <SelectSearchStyle
              onSelect={value => setFilteredElderId(value)}
              value={filteredElderId}
              showSearch
              loading={isLoadingFilters}
              placeholder="Select Elder"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {Object.keys(elderIdToDisplayNameMap).map(elderId => {
                return (
                  <Select.Option key={elderId} value={elderId}>
                    {elderIdToDisplayNameMap[elderId]}
                  </Select.Option>
                );
              })}
            </SelectSearchStyle>
          </Col>
          <Col style={{ width: '25%' }}>
            <SelectSearchStyle
              onSelect={value => setFilteredGroupManagerId(value)}
              value={filteredGroupManagerId}
              loading={isLoadingFilters}
              showSearch
              placeholder="Select Group Manager"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {Object.keys(groupManagerIdToDisplayNameMap).map(groupManagerId => {
                return (
                  <Select.Option key={groupManagerId} value={groupManagerId}>
                    {groupManagerIdToDisplayNameMap[groupManagerId]}
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
                <Row style={{ height: '100', width: '100', backgroundColor: 'red' }}>
                  <div style={{ height: '100px', width: '100px', backgroundColor: 'red' }}>{group.id}</div>
                </Row>
              );
            })}
            <Button
              className="btn-add_new"
              size="default"
              key="1"
              type="primary"
              style={{ float: 'left' }}
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
              style={{ float: 'right' }}
              onClick={handlePageNextClick}
            >
              <FeatherIcon icon="plus" size={14} /> Next
            </Button>
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
