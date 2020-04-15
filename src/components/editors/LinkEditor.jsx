import React, { useState, useEffect } from 'react';
import _ from 'lodash-es';
import {
  EntryCard,
  CardDragHandle,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';

const LinkEditor = ({ sdk, value, items, onChange, formDisabled }) => {
  console.log(value);
  console.log(items);
  const handleClick = () => console.log('OnClick');
  const [linkComps, setLinkComps] = useState([]);
  useEffect(() => {
    if (value && Array.isArray(value)) {
      sdk.space
        .getEntries({ 'sys.id[in]': [...value.map(entry => entry.sys.id)] })
        .then(entries => {
          console.log(entries);
          entries = entries.items;
          const links = [];
          entries.forEach(entry => {
            console.log(entry);
            links.push(
              <EntryCard
                key={entry.sys.id}
                title={entry.fields.displayName['en-US']}
                status="published"
                contentType={_.startCase(entry.sys.contentType.sys.id)}
                onClick={handleClick}
                cardDragHandleComponent={<CardDragHandle>Reorder card</CardDragHandle>}
                dropdownListElements={
                  <DropdownList>
                    <DropdownListItem isTitle>Actions</DropdownListItem>
                    <DropdownListItem onClick={handleClick}>Edit</DropdownListItem>
                    <DropdownListItem onClick={e => console.log(e.target)}>
                      Download
                    </DropdownListItem>
                    <DropdownListItem onClick={e => console.log(e)}>Remove</DropdownListItem>
                  </DropdownList>
                }
                isDragActive={false}
                size="small"
              />
            );
          });
          setLinkComps(links);
        });
    }
  }, []);

  return <>{linkComps}</>;
};

LinkEditor.propTypes = {
  sdk: PropTypes.object.isRequired,
  value: PropTypes.any,
  items: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  formDisabled: PropTypes.bool
};

export default LinkEditor;
