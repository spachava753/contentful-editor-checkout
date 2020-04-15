import React from 'react';
import { render } from 'react-dom';
import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import tokens from '@contentful/forma-36-tokens';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import './index.css';
import { css } from 'emotion';
import ArticleEditor from './components/widgets/ArticleEditor';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

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
    render(
      <div className={styles.root}>
        <div className={styles.internal}>
          <ArticleEditor sdk={sdk} />
        </div>
      </div>,
      document.getElementById('root')
    );
  }

  sdk.window.startAutoResizer();
});
