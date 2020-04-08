import React from 'react';
import _ from 'lodash-es';
import { TextField } from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';

const TextFieldEditor = ({ field, formDisabled }) => {
  return (
    <TextField
      required
      name={field.id}
      id={field.id}
      labelText={_.startCase(field.id)}
      value={field.getValue()}
      countCharacters
      textInputProps={{
        disabled: formDisabled,
        type: 'text'
      }}
    />
  );
};

TextFieldEditor.propTypes = {
  field: PropTypes.object,
  formDisabled: PropTypes.bool
};

export default TextFieldEditor;
