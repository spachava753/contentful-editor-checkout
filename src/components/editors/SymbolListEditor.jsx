import React, { useState } from 'react';
import { TextInput, Pill, Form, Button } from '@contentful/forma-36-react-components';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';

const createOption = label => ({
  label,
  value: label
});

const components = {
  DropdownIndicator: null
};

const SymbolListEditor = ({ id, value, onChange, formDisabled }) => {
  console.log('SymbolListEditor');
  console.log(value);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState(value.map(value => createOption(value)));
  console.log(tags);

  const handleChange = (tags, actionMeta) => {
    console.group('tags Changed');
    console.log(tags);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    onChange(id, [...tags.map(tag => tag.value)]);
    setTags(tags);
  };

  const handleInputChange = inputValue => {
    setInputValue(inputValue);
  };

  const handleKeyDown = event => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(tags);
        console.groupEnd();
        setInputValue('');
        setTags([...tags, createOption(inputValue)]);
        event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      isDisabled={formDisabled}
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={tags}
    />
  );
};

SymbolListEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  formDisabled: PropTypes.bool
};

export default SymbolListEditor;
