import React from 'react';
import _ from 'lodash-es';
import { TextField } from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';

const TextFieldEditor = ({ id, value, onChange, formDisabled }) => {
  return (
    <TextField
      required
      name={id}
      id={id}
      labelText={_.startCase(id)}
      value={value}
      countCharacters
      textInputProps={{
        disabled: formDisabled,
        type: 'text'
      }}
      onChange={onChange}
    />
  );
};

TextFieldEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  formDisabled: PropTypes.bool
};

export default TextFieldEditor;
