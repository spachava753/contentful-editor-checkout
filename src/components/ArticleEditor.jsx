import React, { useState, useEffect } from 'react';
import { Form, Button, Notification } from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';
import '@contentful/forma-36-react-components/dist/styles.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import TextFieldEditor from './editors/TextFieldEditor';
import DropdownEditor from './editors/DropdownEditor';
import WidgetNotFound from './WidgetNotFound';
import { useFormik } from 'formik';

const getInitalFromValues = sdk => {
  const initialValues = {};
  for (const key in sdk.entry.fields) {
    initialValues[key] = sdk.entry.fields[key].getValue();
  }
  // console.log('initialValues');
  // console.log(initialValues);
  return initialValues;
};

const ArticleEditor = ({ sdk }) => {
  console.log('Rendering ArticleEditor');
  // console.log(sdk);
  // console.log(sdk.contentType);
  // console.log(sdk.entry);
  const [formDisabled, setFormDisabled] = useState(true);
  const formik = useFormik({
    initialValues: getInitalFromValues(sdk),
    onSubmit: values => {
      console.log('onSubmit');
      console.log(values);
      for (const key in values) {
        if (values[key]) {
          sdk.entry.fields[key].setValue(values[key]);
        }
      }
      setFormDisabled(formDisabled => !formDisabled);
    }
  });

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
  ) : null;
  const formFields = [];
  console.log(sdk.contentType.fields);
  for (const key in formik.values) {
    //console.log(key);
    const field = sdk.entry.fields[key];
    if (field.type == 'Symbol') {
      console.log(field.validations);
      console.log(field.validations.some(v => 'in' in v));
      if (field.validations.some(v => 'in' in v)) {
        formFields.push(
          <DropdownEditor
            key={key}
            id={key}
            value={formik.values[key]}
            onChange={formik.handleChange}
            formDisabled={formDisabled}
          />
        );
      } else {
        formFields.push(
          <TextFieldEditor
            key={key}
            id={key}
            value={formik.values[key]}
            onChange={formik.handleChange}
            formDisabled={formDisabled}
          />
        );
      }
    } else {
      formFields.push(<WidgetNotFound key={key} />);
    }
  }

  return (
    <Form spacing="default" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      {checkoutButton}
      {/* <DropdownEditor formDisabled={formDisabled} />
      <TextFieldEditor field={sdk.entry.fields['title']} formDisabled={formDisabled} />
      <TextFieldEditor field={sdk.entry.fields['slug']} formDisabled={formDisabled} />
      <RichTextEditor formDisabled={formDisabled} /> */}
      {formFields}
      <Button type="submit" disabled={formDisabled}>
        Check in and save
      </Button>
      <Button
        type="reset"
        disabled={formDisabled}
        onClick={() => setFormDisabled(formDisabled => !formDisabled)}
      >
        Discard Changes
      </Button>
    </Form>
  );
};

ArticleEditor.propTypes = {
  sdk: PropTypes.any
};

export default ArticleEditor;
