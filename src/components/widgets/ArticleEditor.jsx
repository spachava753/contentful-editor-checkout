import React, { useState, useEffect } from 'react';
import { Form, Button, Notification } from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';
import '@contentful/forma-36-react-components/dist/styles.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import TextFieldEditor from '../editors/TextFieldEditor';
import DropdownEditor from '../editors/DropdownEditor';
import RichTextEditor from '../editors/RichTextEditor';
import WidgetNotFound from './WidgetNotFound';
import { useFormik } from 'formik';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import _ from 'lodash-es';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { getInitalFromValues } from '../utils/utils';

const ArticleEditor = ({ sdk }) => {
  console.log('Rendering ArticleEditor');
  console.log(sdk);
  // console.log(sdk.contentType);
  // console.log(sdk.entry);
  const [formDisabled, setFormDisabled] = useState(true);
  const formik = useFormik({
    initialValues: getInitalFromValues(sdk),
    onSubmit: values => {
      console.log('onSubmit');
      console.log(values);
      _.forIn(values, (value, key) => {
        if (value) sdk.entry.fields[key].setValue(value);
      });
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
    } else if (field.type == 'RichText') {
      console.log(field.validations);
      console.log(field.validations.some(v => 'in' in v));
      formFields.push(
        <RichTextEditor
          key={key}
          id={key}
          value={formik.values[key]}
          onChange={formik.setFieldValue}
          formDisabled={formDisabled}
        />
      );
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
