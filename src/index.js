import React from 'react';
import { render } from 'react-dom';
import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import './index.css';
import ArticleEditor from './components/widgets/ArticleEditor';

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<ArticleEditor sdk={sdk} />, document.getElementById('root'));
  }

  sdk.window.startAutoResizer();
});
