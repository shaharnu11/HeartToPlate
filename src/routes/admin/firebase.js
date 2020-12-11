import React, { lazy } from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useRouteMatch } from 'react-router-dom';

const VolunteersView = lazy(() => import('../../container/crud/fireStore/Volunteers/View'));
const VolunteersEdit = lazy(() => import('../../container/crud/fireStore/Volunteers/Edit'));
const VolunteersAdd = lazy(() => import('../../container/crud/fireStore/Volunteers/Add'));

const GroupManagersView = lazy(() => import('../../container/crud/fireStore/GroupManagers/View'));
const GroupManagersEdit = lazy(() => import('../../container/crud/fireStore/GroupManagers/Edit'));
const GroupManagersAdd = lazy(() => import('../../container/crud/fireStore/GroupManagers/Add'));

const GroupsView = lazy(() => import('../../container/crud/fireStore/Groups/View'));
const GroupsEdit = lazy(() => import('../../container/crud/fireStore/Groups/Edit'));
const GroupsAdd = lazy(() => import('../../container/crud/fireStore/Groups/Add'));

const FbView = lazy(() => import('../../container/crud/fireStore/View'));
// const FbAdd = lazy(() => import('../../container/crud/fireStore/addNew'));
// const FbUpdate = lazy(() => import('../../container/crud/fireStore/edit'));

const FirebaseRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route excat path={`${path}/Volunteers/View`} component={VolunteersView} />
      <Route exact path={`${path}/Volunteers/Edit/:id`} component={VolunteersEdit} />
      <Route exact path={`${path}/Volunteers/Add`} component={VolunteersAdd} />

      <Route excat path={`${path}/GroupManagers/View`} component={GroupManagersView} />
      <Route exact path={`${path}/GroupManagers/Edit/:id`} component={GroupManagersEdit} />
      <Route exact path={`${path}/GroupManagers/Add`} component={GroupManagersAdd} />

      <Route excat path={`${path}/Groups/View`} component={GroupsView} />
      <Route exact path={`${path}/Groups/edit/:id`} component={GroupsEdit} />
      <Route exact path={`${path}/Groups/Add`} component={GroupsAdd} />

      <Route path={`${path}/fbView`} component={FbView} />
      {/* <Route excat path={`${path}/:collection/Add`} component={FbAdd} /> */}
      {/* <Route exact path={`${path}/:collection/edit/:id`} component={FbUpdate} /> */}
    </Switch>
  );
};

export default FirebaseRoute;
