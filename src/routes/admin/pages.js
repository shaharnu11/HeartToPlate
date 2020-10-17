import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const NotFound = lazy(() => import('../../container/pages/404'));
const Maintenance = lazy(() => import('../../container/pages/Maintenance'));
const Pricing = lazy(() => import('../../container/pages/PricingTable'));
const Gallery = lazy(() => import('../../container/pages/Gallery'));
const Faq = lazy(() => import('../../container/pages/Faq'));
const Search = lazy(() => import('../../container/pages/SearchResult'));
const Users = lazy(() => import('../../container/pages/Users'));
const AddUser = lazy(() => import('../../container/pages/AddUsers'));
const DataTable = lazy(() => import('../../container/pages/UserListDataTable'));
const Team = lazy(() => import('../../container/pages/Team'));

const PagesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/404`} component={NotFound} />
      <Route path={`${path}/maintenance`} component={Maintenance} />
      <Route path={`${path}/Pricing`} component={Pricing} />
      <Route path={`${path}/gallery`} component={Gallery} />
      <Route path={`${path}/faq`} component={Faq} />
      <Route path={`${path}/search`} component={Search} />
      <Route path={`${path}/users`} component={Users} />
      <Route path={`${path}/add-user`} component={AddUser} />
      <Route path={`${path}/dataTable`} component={DataTable} />
      <Route path={`${path}/team`} component={Team} />
    </Switch>
  );
};

export default PagesRoute;
