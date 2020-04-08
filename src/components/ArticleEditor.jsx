import React, { useState, useEffect } from 'react';
import { Form, Button, Notification } from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';
import '@contentful/forma-36-react-components/dist/styles.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import TextFieldEditor from './editors/TextFieldEditor';
import DropdownEditor from './editors/DropdownEditor';
import WidgetNotFound from './WidgetNotFound';

const ArticleEditor = ({ sdk }) => {
  console.log('Rendering ArticleEditor');
  // console.log(sdk);
  console.log(sdk.contentType);
  console.log(sdk.entry);
  const [formDisabled, setFormDisabled] = useState(true);
  if (sdk.parameters == {}) sdk.parameters.test = ['hello'];

  // display a notification to show that the form is currently in read only mode
  useEffect(() => {
    Notification.warning('Currently in read only mode!', { duration: 5000, canClose: true });
  }, []);

  const checkoutButton = formDisabled ? (
    <Button
      buttonType="primary"
      onClick={() => setFormDisabled(formDisabled => !formDisabled)}
      onBlur={() => console.log('onBlur')}
    >
      Checkout
    </Button>
  ) : (
    <>
      <Button
        buttonType="positive"
        onClick={() => setFormDisabled(formDisabled => !formDisabled)}
        onBlur={() => console.log('onBlur')}
      >
        Checkin and Save
      </Button>
      <Button
        buttonType="negative"
        onClick={() => setFormDisabled(formDisabled => !formDisabled)}
        onBlur={() => console.log('onBlur')}
      >
        Discard Changes
      </Button>
    </>
  );
  const formFields = [];
  console.log(sdk.contentType.fields);
  for (const key in sdk.entry.fields) {
    //console.log(key);
    const field = sdk.entry.fields[key];
    if (field.type == 'Symbol') {
      console.log(field.validations);
      console.log(field.validations.some(v => 'in' in v));
      if (field.validations.some(v => 'in' in v)) {
        formFields.push(<DropdownEditor key={key} field={field} formDisabled={formDisabled} />);
      } else {
        formFields.push(<TextFieldEditor key={key} field={field} formDisabled={formDisabled} />);
      }
    } else {
      formFields.push(<WidgetNotFound key={key} />);
    }
  }
  const onChange = e => {
    console.log(e.target.value);
    console.log(e.target.id);
    sdk.entry.fields[e.target.id].setValue(e.target.value);
  };

  return (
    <Form spacing="default">
      {checkoutButton}
      {/* <DropdownEditor formDisabled={formDisabled} />
      <TextFieldEditor field={sdk.entry.fields['title']} formDisabled={formDisabled} />
      <TextFieldEditor field={sdk.entry.fields['slug']} formDisabled={formDisabled} />
      <RichTextEditor formDisabled={formDisabled} /> */}
      {formFields}
    </Form>
  );
};

ArticleEditor.propTypes = {
  sdk: PropTypes.any
};

export default ArticleEditor;
