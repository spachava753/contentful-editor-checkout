import React from 'react';
import _ from 'lodash-es';
import {
  EntryCard,
  CardDragHandle,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';
import Select from 'react-select';

const LinkEditor = ({ id, value, onChange, formDisabled, dragActive }) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];
  return <Select options={options} />;
};

LinkEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  formDisabled: PropTypes.bool
};

export default LinkEditor;
