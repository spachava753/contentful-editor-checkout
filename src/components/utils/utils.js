import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import _ from 'lodash-es';
import { draftjsToMd } from 'draftjs-md-converter';
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');

export const serializeToRichText = value => {
  const htmlString = documentToHtmlString(value);
  const blocksFromHTML = convertFromHTML(htmlString);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return state;
};

export const deserializeFromRichText = async value => {
  // convert to mardown first
  const mdString = draftjsToMd(value);
  console.log('The md string exported');
  console.log(mdString);
  const richText = await richTextFromMarkdown(mdString);
  return richText;
};

export const getInitalFromValues = sdk => {
  const initialValues = {};
  _.forIn(sdk.entry.fields, (field, key) => {
    if (field.type == 'RichText') {
      initialValues[key] = EditorState.createWithContent(serializeToRichText(field.getValue()));
    } else {
      initialValues[key] = sdk.entry.fields[key].getValue();
    }
  });
  // console.log('initialValues');
  // console.log(initialValues);
  return initialValues;
};
