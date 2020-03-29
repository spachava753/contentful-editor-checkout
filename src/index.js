import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import {
  Form,
  FieldGroup,
  Dropdown,
  DropdownList,
  DropdownListItem,
  Button,
  TextField,
  Textarea,
  CheckboxField,
  Notification
} from '@contentful/forma-36-react-components';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { init, locations } from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import '@contentful/forma-36-react-components/dist/styles.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import './index.css';
import { FieldComponent } from './FieldComponent';
import { RichTextEditor } from './components/RichTextEditor';

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

const ArticleEditor = ({ sdk }) => {
  console.log('Rendering ArticleEditor');
  console.log(sdk);
  console.log(sdk.contentType);
  console.log(sdk.contentType.sys.id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [fields, setFields] = useState(sdk.entry.fields);
  if (sdk.parameters == {}) sdk.parameters.test = ['hello'];

  // display a notification to show that the form is currently in read only mode
  useEffect(() => {
    Notification.warning('Currently in read only mode!', { duration: 5000, canClose: true });
    return function cleanup() {
      console.log('UNMOUNTING ARTICLE_EDITOR');
    };
  }, []);

  useEffect(() => {
    return function cleanup() {
      console.log('UNMOUNTING ARTICLE_EDITOR');
    };
  });

  const checkoutButton = formDisabled ? (
    <Button
      buttonType="primary"
      onClick={() => setFormDisabled(!formDisabled)}
      onBlur={() => console.log('onBlur')}
    >
      Checkout
    </Button>
  ) : null;

  const onChange = e => {
    console.log(e.target.value);
    console.log(e.target.id);
    sdk.entry.fields[e.target.id].setValue(e.target.value);
  };

  return (
    <Form spacing="default">
      {checkoutButton}
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
      <TextField
        required
        name="title"
        id="title"
        labelText="Title"
        value={sdk.entry.fields['title'].getValue()}
        helpText="Please enter the title of article"
        countCharacters
        textInputProps={{
          disabled: formDisabled,
          placeholder: 'Daily Targum is the Best Newspaper',
          maxLength: 200,
          rows: 1,
          type: 'text'
        }}
        onChange={onChange}
      />
      <TextField
        required
        name="slug"
        id="slug"
        labelText="Slug"
        value={sdk.entry.fields['slug'].getValue()}
        helpText="Please enter the slug of the article"
        countCharacters
        textInputProps={{
          disabled: formDisabled,
          placeholder: '/daily-targum-is-the-best-newspaper',
          maxLength: 200,
          rows: 2,
          type: 'text'
        }}
        onChange={onChange}
      />
      <Textarea
        name="body"
        id="body"
        error={false}
        maxLength={500}
        required={true}
        width="full"
        onChange={() => console.log('onChange')}
        onBlur={() => console.log('onBlur')}
        disabled={formDisabled}
        rows={2}
        willBlurOnEsc={true}
      />
      <RichTextEditor />
    </Form>
  );
};

ArticleEditor.propTypes = {
  sdk: PropTypes.any
};
