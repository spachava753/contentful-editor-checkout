import React from 'react';
import _ from 'lodash-es';
import {
  Dropdown,
  DropdownList,
  DropdownListItem,
  Button
} from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const DropdownEditor = ({ id, value, onChange, formDisabled }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <Dropdown
      isOpen={dropdownOpen && !formDisabled}
      onClose={() => {
        if (!formDisabled) setDropdownOpen(false);
      }}
      isAutoalignmentEnabled={true}
      isFullWidth={true}
      position="bottom-right"
      toggleElement={
        <Button
          size="small"
          buttonType="muted"
          onClick={() => setDropdownOpen(true)}
          indicateDropdown
        >
          Pick a bin
        </Button>
      }
    >
      <DropdownList>
        <DropdownListItem isTitle isDisabled>
          News
        </DropdownListItem>
        <DropdownListItem>news 1</DropdownListItem>
        <DropdownListItem>news 2</DropdownListItem>
        <DropdownListItem>news 3</DropdownListItem>
        <DropdownListItem>news rtg</DropdownListItem>
        <DropdownListItem isTitle isDisabled>
          Sports
        </DropdownListItem>
        <DropdownListItem>sports 1</DropdownListItem>
        <DropdownListItem>sports 2</DropdownListItem>
        <DropdownListItem>sports 3</DropdownListItem>
        <DropdownListItem>sports rtg</DropdownListItem>
      </DropdownList>
    </Dropdown>
  );
};

DropdownEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  formDisabled: PropTypes.bool
};

export default DropdownEditor;
