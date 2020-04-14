import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromHTML
} from 'draft-js';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import _ from 'lodash-es';

export const serializeToRichText = () => {};

export const deserializeFromRichText = () => {};

export const getInitalFromValues = sdk => {
  const initialValues = {};
  _.forIn(sdk.entry.fields, (field, key) => {
    if (field.type == 'RichText') {
      const htmlString = documentToHtmlString(field.getValue());
      const blocksFromHTML = convertFromHTML(htmlString);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      initialValues[key] = EditorState.createWithContent(state);
    } else {
      initialValues[key] = sdk.entry.fields[key].getValue();
    }
  });
  // console.log('initialValues');
  // console.log(initialValues);
  return initialValues;
};
