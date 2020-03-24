import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';

import {init, locations} from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import {Heading, Note, Form, SelectField, Option} from '@contentful/forma-36-react-components';

const DEFAULT_ANIMAL = 'cat';

init(sdk => {
  const Component = sdk.location.is(locations.LOCATION_APP_CONFIG) ? Config : AnimalPicture;

  render(<Component sdk={sdk}/>, document.getElementById('root'));
  sdk.window.startAutoResizer();
});

const Config = ({sdk}) => {
  const app = sdk.app;
  let [parameters, setParameters] = useState(app.getParameters() || {});
  console.log('Created state');

  useEffect(() => {
    app.onConfigure(async () => {
      console.log('Configuring...');
      const {items: contentTypes} = await sdk.space.getContentTypes();
      const contentTypeIds = contentTypes.map(ct => ct.sys.id)
      console.log('Mapped content types');

      return {
        parameters: parameters,
        targetState: {
          EditorInterface: contentTypeIds.reduce((acc, id) => {
            console.log(`Modify entry sidebar ${id}`);
            return {...acc, [id]: {sidebar: {position: 0}}}
          }, {})
        }
      };
    });
    console.log('Set up call for app.onConfigure');
  }, []);

  app.setReady();

  return (
    <Form id="app-config">
      <Heading>Editor Workflow</Heading>
      <Note noteType="primary" title="About the app">
        Allow checkout workflow for editors
      </Note>
      <SelectField
        required
        name="animal-selection"
        id="animal-selection"
        labelText="Animal"
        value={parameters.animal || DEFAULT_ANIMAL}
        onChange={e => setParameters({animal: e.target.value})}
      >
        <Option value={DEFAULT_ANIMAL}>Cat</Option>
        <Option value="dog">Dog</Option>
        <Option value="owl">Owl</Option>
      </SelectField>
    </Form>
  );
}

function AnimalPicture({sdk}) {
  const animal = sdk.parameters.installation.animal || DEFAULT_ANIMAL;
  const src = `https://source.unsplash.com/250x250/?${animal}`;

  return <img alt={animal} id="animal-picture" src={src}/>
}

AnimalPicture.propTypes = {
  sdk: PropTypes.any
};

Config.propTypes = {
  sdk: PropTypes.any
};
