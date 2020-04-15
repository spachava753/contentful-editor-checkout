import React from 'react';
import tokens from '@contentful/forma-36-tokens';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const styles = {
  root: css({
    marginBottom: tokens.spacing2Xl,
    borderLeft: `3px solid ${tokens.colorElementDark}`,
    paddingLeft: tokens.spacingM
  }),
  name: css({
    color: tokens.colorTextLight,
    fontSize: tokens.fontSizeM,
    paddingBottom: tokens.spacingS
  })
};

const FieldComponent = ({ name, children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.name}>{name}</div>
      {children}
    </div>
  );
};

FieldComponent.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default FieldComponent;
