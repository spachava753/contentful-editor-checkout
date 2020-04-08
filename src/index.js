import React from 'react';
import { render } from 'react-dom';
import { css } from 'emotion';
import { init, locations } from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import '@contentful/forma-36-react-components/dist/styles.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import './index.css';
import ArticleEditor from './components/ArticleEditor';

const styles = {
  root: css({
    minWidth: '400px',
    maxWidth: '1000px',
    width: '100%'
  }),
  internal: css({
    padding: tokens.spacing3Xl,
    paddingTop: tokens.spacingM
  }),
  tabs: css({
    marginBottom: tokens.spacingXl
  })
};

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<ArticleEditor sdk={sdk} />, document.getElementById('root'));
  }

  sdk.window.startAutoResizer();
});
