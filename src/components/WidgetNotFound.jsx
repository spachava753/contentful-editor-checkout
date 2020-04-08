import React from 'react';
import _ from 'lodash-es';
import { Card } from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';

const WidgetNotFound = ({ field, formDisabled }) => {
  return <Card padding="default">Widget not renderable</Card>;
};

WidgetNotFound.propTypes = {
  field: PropTypes.object,
  formDisabled: PropTypes.bool
};

export default WidgetNotFound;
