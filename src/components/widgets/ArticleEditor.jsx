import React, { useState, useEffect } from 'react';
import { Form, Button, Notification } from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';
import '@contentful/forma-36-react-components/dist/styles.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import TextFieldEditor from '../editors/TextFieldEditor';
import DropdownEditor from '../editors/DropdownEditor';
import RichTextEditor from '../editors/RichTextEditor';
import LinkEditor from '../editors/LinkEditor';
import SymbolListEditor from '../editors/SymbolListEditor';
import WidgetNotFound from './WidgetNotFound';
import FieldComponent from './FieldComponent';
import { useFormik } from 'formik';
import _ from 'lodash-es';
import { getInitalFromValues, deserializeFromRichText } from '../utils/utils';
import { convertToRaw } from 'draft-js';

const ArticleEditor = ({ sdk }) => {
  console.log('Rendering ArticleEditor');
  console.log(sdk);
  // console.log(sdk.contentType);
  console.log(sdk.entry);
  console.log(sdk.entry.fields.authors);
  console.log(sdk.entry.fields.authors.type);
  console.log(sdk.entry.fields.authors.getValue());
  sdk.entry.fields.authors
    .setValue([
      {
        sys: {
          id: '3yV5fORuD9LaasxZDHb9n8',
          linkType: 'Entry',
          type: 'Link'
        }
      }
    ])
    .then(() => console.log('successful overwrite'))
    .catch(() => console.log('unsuccessful overwrite'));
  console.log(sdk.entry.fields.authors.getValue());
  const [formDisabled, setFormDisabled] = useState(true);
  const formik = useFormik({
    initialValues: getInitalFromValues(sdk),
    onSubmit: values => {
      console.log('onSubmit');
      console.log(values);
      _.forIn(values, (value, key) => {
        if (value) {
          if (sdk.entry.fields[key].type == 'RichText') {
            // value will be editor state
            deserializeFromRichText(convertToRaw(value.getCurrentContent())).then(val => {
              console.log('The converted md');
              console.log(val);
              sdk.entry.fields[key].setValue(val);
            });
          } else {
            sdk.entry.fields[key].setValue(value);
          }
        }
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
    let component = <WidgetNotFound />;
    if (field.type == 'Symbol') {
      console.log(field.validations);
      console.log(field.validations.some(v => 'in' in v));
      if (field.validations.some(v => 'in' in v)) {
        component = (
          <DropdownEditor
            id={key}
            value={formik.values[key]}
            onChange={formik.handleChange}
            formDisabled={formDisabled}
          />
        );
      } else {
        component = (
          <TextFieldEditor
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
      component = (
        <RichTextEditor
          id={key}
          value={formik.values[key]}
          onChange={formik.setFieldValue}
          formDisabled={formDisabled}
        />
      );
    } else if (field.type == 'Array') {
      console.log(field.type);
      console.log(field.items);
      if (field.items.type == 'Link') {
        component = (
          <LinkEditor
            sdk={sdk}
            value={formik.values[key]}
            items={field.items}
            onChange={formik.setFieldValue}
            formDisabled={formDisabled}
          />
        );
      } else if (field.items.type == 'Symbol') {
        component = (
          <SymbolListEditor
            id={key}
            value={formik.values[key]}
            onChange={formik.setFieldValue}
            formDisabled={formDisabled}
          />
        );
      }
    }

    formFields.push(
      <FieldComponent key={key} name={key}>
        {component}
      </FieldComponent>
    );
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
