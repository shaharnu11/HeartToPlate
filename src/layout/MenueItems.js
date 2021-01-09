import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  return (
    <Menu
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
    >
      <SubMenu key="dashboard" icon={!topMenu && <FeatherIcon icon="home" />} title="Dashboard">
        <Menu.Item key="home">
          <NavLink onClick={toggleCollapsed} to={`${path}`}>
            Social Media
          </NavLink>
        </Menu.Item>
        <Menu.Item key="business">
          <NavLink onClick={toggleCollapsed} to={`${path}/business`}>
            Fintech / Business
          </NavLink>
        </Menu.Item>
        <Menu.Item key="performance">
          <NavLink onClick={toggleCollapsed} to={`${path}/performance`}>
            Site Performance
          </NavLink>
        </Menu.Item>
        <Menu.Item key="ecommerce">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce`}>
            Ecommercee
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item icon={!topMenu && <FeatherIcon icon="bookmark" />} key="note">
        <NavLink onClick={toggleCollapsed} to={`${path}/app/note/all`}>
          Note
        </NavLink>
      </Menu.Item>
      <Menu.Item key="VolunteersView" icon={!topMenu && <FeatherIcon icon="database" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/firestore/Volunteers/View`}>
          Volunteers
        </NavLink>
      </Menu.Item>
      <Menu.Item key="EldersView" icon={!topMenu && <FeatherIcon icon="database" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/firestore/Elders/View`}>
          Elders
        </NavLink>
      </Menu.Item>
      <Menu.Item key="GroupManagersView" icon={!topMenu && <FeatherIcon icon="database" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/firestore/GroupManagers/View`}>
          Group managers
        </NavLink>
      </Menu.Item>
      <Menu.Item key="RegionManagersView" icon={!topMenu && <FeatherIcon icon="database" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/firestore/RegionManagers/View`}>
          Region managers
        </NavLink>
      </Menu.Item>
      <Menu.Item key="GroupsView" icon={!topMenu && <FeatherIcon icon="database" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/firestore/Groups/View`}>
          Groups
        </NavLink>
      </Menu.Item>
      <SubMenu key="firestore" icon={!topMenu && <FeatherIcon icon="database" />} title="Firestore Crud">
        <Menu.Item key="fbView">
          <NavLink onClick={toggleCollapsed} to={`${path}/firestore/fbView`}>
            View All
          </NavLink>
        </Menu.Item>
        <Menu.Item key="fbAdd">
          <NavLink onClick={toggleCollapsed} to={`${path}/firestore/fbAdd`}>
            Add New
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="project" icon={!topMenu && <FeatherIcon icon="target" />} title="Project">
        <Menu.Item key="view">
          <NavLink onClick={toggleCollapsed} to={`${path}/project/view`}>
            Project
          </NavLink>
        </Menu.Item>
        <Menu.Item key="ProjectCreate">
          <NavLink onClick={toggleCollapsed} to={`${path}/project/create`}>
            Create Project
          </NavLink>
        </Menu.Item>
        <Menu.Item key="projectDetails">
          <NavLink onClick={toggleCollapsed} to={`${path}/project/projectDetails/1`}>
            Project Details
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="pages" icon={!topMenu && <FeatherIcon icon="folder" />} title="Pages">
        <Menu.Item key="team">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/team`}>
            Team
          </NavLink>
        </Menu.Item>
        <Menu.Item key="users">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/users`}>
            Users
          </NavLink>
        </Menu.Item>
        <Menu.Item key="addUser">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/add-user/info`}>
            Add User
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dataTable">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/dataTable`}>
            Users Table
          </NavLink>
        </Menu.Item>
        <Menu.Item key="gallery">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/gallery`}>
            Gallery
          </NavLink>
        </Menu.Item>
        <Menu.Item key="pricing">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/pricing`}>
            Pricing
          </NavLink>
        </Menu.Item>
        <Menu.Item key="faq">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/faq`}>
            Faq`s
          </NavLink>
        </Menu.Item>
        <Menu.Item key="search">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/search`}>
            Search Results
          </NavLink>
        </Menu.Item>
        <Menu.Item key="maintenance">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/maintenance`}>
            Maintenance
          </NavLink>
        </Menu.Item>
        <Menu.Item key="404">
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/404`}>
            404
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {!topMenu && <p className="sidebar-nav-title">Applications</p>}
      <Menu.Item icon={!topMenu && <FeatherIcon icon="message-square" />} key="chat">
        <NavLink onClick={toggleCollapsed} to={`${path}/main/chat/private/rofiq@gmail.com`}>
          Chat
        </NavLink>
      </Menu.Item>
      <Menu.Item icon={!topMenu && <FeatherIcon icon="user-check" />} key="contact">
        <NavLink onClick={toggleCollapsed} to={`${path}/app/contact`}>
          Contact
        </NavLink>
      </Menu.Item>
      <SubMenu key="ecommerce" icon={!topMenu && <FeatherIcon icon="shopping-cart" />} title="eCommerce">
        <Menu.Item key="products">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/products`}>
            Products
          </NavLink>
        </Menu.Item>
        <Menu.Item key="productDetails">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/productDetails/1`}>
            Product detail
          </NavLink>
        </Menu.Item>

        <Menu.Item key="add-product">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/add-product`}>
            Product Add
          </NavLink>
        </Menu.Item>

        <Menu.Item key="edit-product">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/edit-product`}>
            Product Edit
          </NavLink>
        </Menu.Item>
        <Menu.Item key="cart">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/cart`}>
            Cart
          </NavLink>
        </Menu.Item>
        <Menu.Item key="orders">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/orders`}>
            Orders
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="15">Credit Card</Menu.Item> */}
        <Menu.Item key="sellers">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/sellers`}>
            Sellers
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Invoice">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/Invoice`}>
            Invoices
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="email" icon={!topMenu && <FeatherIcon icon="mail" />} title="Email">
        <Menu.Item key="inbox">
          <NavLink onClick={toggleCollapsed} to={`${path}/email/inbox`}>
            Inbox
          </NavLink>
        </Menu.Item>
        <Menu.Item key="single">
          <NavLink onClick={toggleCollapsed} to={`${path}/email/single/1585118055048`}>
            Read Email
          </NavLink>
        </Menu.Item>
      </SubMenu>
      {/* <Menu.Item icon={!topMenu && <FeatherIcon icon="bookmark" />} key="note">
        <NavLink onClick={toggleCollapsed} to={`${path}/app/note/all`}>
          Note
        </NavLink>
      </Menu.Item> */}

      <SubMenu key="profile" icon={!topMenu && <FeatherIcon icon="user" />} title="Social App">
        <Menu.Item key="myProfile">
          <NavLink onClick={toggleCollapsed} to={`${path}/profile/myProfile/overview`}>
            My Profile
          </NavLink>
        </Menu.Item>
        <Menu.Item key="settings">
          <NavLink onClick={toggleCollapsed} to={`${path}/profile/settings`}>
            Settings
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item icon={!topMenu && <FeatherIcon icon="activity" />} key="to-do">
        <NavLink onClick={toggleCollapsed} to={`${path}/app/to-do/`}>
          To Do
        </NavLink>
      </Menu.Item>

      {!topMenu && <p className="sidebar-nav-title">Components</p>}

      <SubMenu key="components" icon={!topMenu && <FeatherIcon icon="layers" />} title="UI Elements">
        <Menu.Item key="alerts">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/alerts`}>
            Alerts
          </NavLink>
        </Menu.Item>
        <Menu.Item key="auto-complete">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/auto-complete`}>
            AutoComplete
          </NavLink>
        </Menu.Item>
        <Menu.Item key="avatar">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/avatar`}>
            Avatar
          </NavLink>
        </Menu.Item>
        <Menu.Item key="badge">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/badge`}>
            Badge
          </NavLink>
        </Menu.Item>
        <Menu.Item key="breadcrumb">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/breadcrumb`}>
            Breadcrumb
          </NavLink>
        </Menu.Item>
        <Menu.Item key="button">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/button`}>
            Button
          </NavLink>
        </Menu.Item>
        <Menu.Item key="calendar">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/calendar`}>
            Calendar
          </NavLink>
        </Menu.Item>
        <Menu.Item key="cards">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/cards`}>
            Cards
          </NavLink>
        </Menu.Item>
        <Menu.Item key="carousel">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/carousel`}>
            Carousel
          </NavLink>
        </Menu.Item>
        <Menu.Item key="cascader">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/cascader`}>
            Cascader
          </NavLink>
        </Menu.Item>
        <Menu.Item key="checkbox">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/checkbox`}>
            Checkbox
          </NavLink>
        </Menu.Item>
        <Menu.Item key="collapse">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/collapse`}>
            Collapse
          </NavLink>
        </Menu.Item>
        <Menu.Item key="comments">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/comments`}>
            Comments
          </NavLink>
        </Menu.Item>
        <Menu.Item key="base">
          <NavLink onClick={toggleCollapsed} to={`${path}/base`}>
            Dashboard Base
          </NavLink>
        </Menu.Item>
        <Menu.Item key="date-picker">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/date-picker`}>
            DatePicker
          </NavLink>
        </Menu.Item>
        <Menu.Item key="drag">
          <NavLink to="/admin/components/drag">Drag & Drop</NavLink>
        </Menu.Item>
        <Menu.Item key="drawer">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/drawer`}>
            Drawer
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dropdown">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/dropdown`}>
            Dropdown
          </NavLink>
        </Menu.Item>
        <Menu.Item key="empty">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/empty`}>
            Empty
          </NavLink>
        </Menu.Item>
        <Menu.Item key="form">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/form`}>
            Form
          </NavLink>
        </Menu.Item>
        <Menu.Item key="grid">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/grid`}>
            Grid
          </NavLink>
        </Menu.Item>
        <Menu.Item key="input">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/input`}>
            Input
          </NavLink>
        </Menu.Item>
        <Menu.Item key="list">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/list`}>
            List
          </NavLink>
        </Menu.Item>
        <Menu.Item key="menu">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/menu`}>
            Menu
          </NavLink>
        </Menu.Item>
        <Menu.Item key="message">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/message`}>
            Message
          </NavLink>
        </Menu.Item>
        <Menu.Item key="modals">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/modals`}>
            Modals
          </NavLink>
        </Menu.Item>
        <Menu.Item key="notification">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/notification`}>
            Notification
          </NavLink>
        </Menu.Item>
        <Menu.Item key="page-headers">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/page-headers`}>
            Page Headers
          </NavLink>
        </Menu.Item>
        <Menu.Item key="pagination">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/pagination`}>
            Paginations
          </NavLink>
        </Menu.Item>
        <Menu.Item key="confirme">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/confirme`}>
            Popconfirme
          </NavLink>
        </Menu.Item>
        <Menu.Item key="popover">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/popover`}>
            Popover
          </NavLink>
        </Menu.Item>
        <Menu.Item key="progress">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/progress`}>
            Progress
          </NavLink>
        </Menu.Item>
        <Menu.Item key="radio">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/radio`}>
            Radio
          </NavLink>
        </Menu.Item>
        <Menu.Item key="rate">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/rate`}>
            Rate
          </NavLink>
        </Menu.Item>
        <Menu.Item key="result">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/result`}>
            Result
          </NavLink>
        </Menu.Item>
        <Menu.Item key="select">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/select`}>
            Select
          </NavLink>
        </Menu.Item>
        <Menu.Item key="skeleton">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/skeleton`}>
            Skeleton{' '}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="slider">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/slider`}>
            Slider
          </NavLink>
        </Menu.Item>
        <Menu.Item key="spiner">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/spiner`}>
            Spiner
          </NavLink>
        </Menu.Item>
        <Menu.Item key="statistic">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/statistic`}>
            Statistic
          </NavLink>
        </Menu.Item>
        <Menu.Item key="steps">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/steps`}>
            Steps
          </NavLink>
        </Menu.Item>
        <Menu.Item key="switch">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/switch`}>
            Switch
          </NavLink>
        </Menu.Item>
        <Menu.Item key="tabs">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/tabs`}>
            Tabs
          </NavLink>
        </Menu.Item>
        <Menu.Item key="tags">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/tags`}>
            Tags
          </NavLink>
        </Menu.Item>
        <Menu.Item key="timeline">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/timeline`}>
            Timeline
          </NavLink>
        </Menu.Item>
        <Menu.Item key="timepicker">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/timepicker`}>
            Timepicker
          </NavLink>
        </Menu.Item>
        <Menu.Item key="tree-select">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/tree-select`}>
            TreeSelect
          </NavLink>
        </Menu.Item>
        <Menu.Item key="upload">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/upload`}>
            Upload
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="icons" icon={!topMenu && <FeatherIcon icon="grid" />} title="Icons">
        <Menu.Item key="feathers">
          <NavLink onClick={toggleCollapsed} to={`${path}/icons/feathers`}>
            Feather icons (svg)
          </NavLink>
        </Menu.Item>
        <Menu.Item key="font-awesome">
          <NavLink onClick={toggleCollapsed} to={`${path}/icons/font-awesome`}>
            Font Awesome
          </NavLink>
        </Menu.Item>
        <Menu.Item key="antd">
          <NavLink onClick={toggleCollapsed} to={`${path}/icons/antd`}>
            Ant Design icons
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="charts" icon={!topMenu && <FeatherIcon icon="bar-chart-2" />} title="Charts">
        <Menu.Item key="chartjs">
          <NavLink onClick={toggleCollapsed} to={`${path}/charts/chartjs`}>
            Chart Js
          </NavLink>
        </Menu.Item>
        <Menu.Item key="google-chart">
          <NavLink onClick={toggleCollapsed} to={`${path}/charts/google-chart`}>
            Google Charts
          </NavLink>
        </Menu.Item>

        <SubMenu key="recharts" icon={!topMenu && <FeatherIcon icon="bar-chart" />} title="Recharts">
          <Menu.Item key="bar">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/bar`}>
              Bar Charts
            </NavLink>
          </Menu.Item>
          <Menu.Item key="area">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/area`}>
              Area Charts
            </NavLink>
          </Menu.Item>
          <Menu.Item key="composed">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/composed`}>
              Composed Charts
            </NavLink>
          </Menu.Item>
          <Menu.Item key="line">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/line`}>
              Line Charts
            </NavLink>
          </Menu.Item>
          <Menu.Item key="pie">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/pie`}>
              Pie Charts
            </NavLink>
          </Menu.Item>
          <Menu.Item key="radar">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/radar`}>
              Radar Charts
            </NavLink>
          </Menu.Item>
          <Menu.Item key="radial">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/radial`}>
              Radial Charts
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="peity">
          <NavLink onClick={toggleCollapsed} to={`${path}/charts/peity`}>
            Peity Charts
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item icon={!topMenu && <FeatherIcon icon="cpu" />} key="tables">
        <NavLink onClick={toggleCollapsed} to={`${path}/tables`}>
          Table
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={!topMenu && <FeatherIcon icon="disc" />} key="forms">
        <NavLink onClick={toggleCollapsed} to={`${path}/forms`}>
          Forms
        </NavLink>
      </Menu.Item>

      <SubMenu key="maps" icon={!topMenu && <FeatherIcon icon="map" />} title="Maps">
        <Menu.Item key="google">
          <NavLink onClick={toggleCollapsed} to={`${path}/maps/google`}>
            Google Maps
          </NavLink>
        </Menu.Item>
        <Menu.Item key="leaflet">
          <NavLink onClick={toggleCollapsed} to={`${path}/maps/leaflet`}>
            Leaflet Maps
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Vector">
          <NavLink onClick={toggleCollapsed} to={`${path}/maps/Vector`}>
            Vector Maps
          </NavLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
