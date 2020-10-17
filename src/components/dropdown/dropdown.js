import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Content, DropdownStyle } from './dropdown-style';

const Dropdown = props => {
  const { content, placement, title, action, children } = props;

  return (
    <DropdownStyle placement={placement} title={title} overlay={<Content>{content}</Content>} trigger={action}>
      {children}
    </DropdownStyle>
  );
};

const content = (
  <>
    <Link to="#">
      <span>Export to CSV</span>
    </Link>
    <Link to="#">
      <span>Export to XML</span>
    </Link>
    <Link to="#">
      <span>Export to Drive</span>
    </Link>
  </>
);

Dropdown.defaultProps = {
  action: ['hover'],
  placement: 'bottomCenter',
  content,
};

Dropdown.propTypes = {
  placement: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.array,
  content: PropTypes.node,
  children: PropTypes.node,
};

export { Dropdown };
