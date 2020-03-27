import React, {useState, useEffect} from 'react';
import tokens from '@contentful/forma-36-tokens';
import {Modal, TextLink, Icon, List, ListItem, EntryCard} from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {isEmpty} from 'lodash-es';

const styles = {
  root: css({
    marginBottom: tokens.spacing2Xl,
    borderLeft: `3px solid ${tokens.colorElementDark}`,
    paddingLeft: tokens.spacingM
  }),
  name: css({
    color: tokens.colorTextLight,
    fontSize: tokens.fontSizeM,
    paddingBottom: tokens.spacingS
  }),
  link: css({
    paddingBottom: tokens.spacingS,
    marginLeft: tokens.spacingS,
    display: `inline`,
    textAlign: `center`
  }),
  cardItem: css({
    marginBottom: tokens.spacingS,
    overflow: `visible`
  })
};

export const LinkEditor = ({sdk, field, isInitiallyDisabled}) => {
  const [isShown, setShown] = useState(false);
  const [images, setImages] = useState([]);
  //const [assets, setAssets] = useState([]);
  const [cards, setCards] = useState([]);
  console.log('START OF FUNCTION');
  // console.log(sdk);
  // console.log(field);
  // console.log(sdk.space.getEntries({'content_type': 'imageWithFocalPoint'}));
  /*  useEffect(() => {
      console.log('RUNNING ASSET EFFECT');
      const assets = [];
      images.forEach(image => {
        console.log('Mapping!');
        console.log(image);
        if (!isEmpty(image.fields)) {
          sdk.space.getAsset(image.fields.image['en-US'].sys.id).then(result => {
            console.log('url');
            console.log(result.fields.file['en-US'].url);
            assets.push({id: image.fields.image['en-US'].sys.id, asset: result});
            console.log('Setting new state for assets');
            setAssets(assets);
            createCards();
          });
        }
      });
      console.log('set assets state');
    }, [images]);*/

  // console.log(isInitiallyDisabled);
  useEffect(() => {
    console.log('RUNNING IMAGE EFFECT');
    sdk.space.getEntries({'content_type': 'imageWithFocalPoint'}).then(result => {
      const images = result.items;
      console.log('images:');
      console.log(images);
      images.map(image => image.processed = false);
      images.map(image => {
        console.log(image);
        if (!isEmpty(image.fields)) {
          sdk.space.getAsset(image.fields.image['en-US'].sys.id).then(result => {
            console.log('url');
            console.log(result.fields.file['en-US'].url);
            image.asset = result;
            image.processed = true;
          });
        }
        return image;
      });
      setImages(images);
    });
  }, []);

  const createCards = () => {
    console.log('CREATE CARDS FUNCTIONS BEGINS')
    const cards = [];
    images.forEach(image => {
      const id = image.sys.id;
      console.log(isEmpty(image.fields));
      const title = isEmpty(image.fields) ? 'Untitled' : image.fields.title['en-US'];
      let img = (<img
        src="data:image/jpeg;base64,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"
        alt="Joy Division - Closer album cover"
      />);
      if (!isEmpty(image.fields)) {
        const asset = image.asset;
        console.log("Rendering assets with images")
        console.log(asset);
        console.log(image);
        if (asset && !isEmpty(asset.fields)) {
          img = (<img
            src={asset.fields.file['en-US'].url}
            alt="Joy Division - Closer album cover"
          />);
        }
      } else {
        console.log('image does not have any asset');
        console.log(image);
      }
      cards.push(
        <EntryCard
          key={id}
          title={title}
          status={'published'}
          contentType={'Image'}
          thumbnailElement={img}
          onClick={() => console.log('Clicked!')}
          withDragHandle={false}
          isDragActive={false}
          loading={false}
          className={styles.cardItem}
        />);
      setCards(cards);
    });
    console.log('CREATE CARDS FUNCTIONS ENDS');
  };
  useEffect(() => createCards(), [images]);
  return (
    <>
      <div>
        <div className={styles.link}>
          <TextLink
            onClick={() => {
              setShown(true);
            }}
          >
            <Icon icon={`Plus`}/>
            Create new {field.id} and link
          </TextLink>
        </div>
        <div className={styles.link}>
          <TextLink
            onClick={() => {
              setShown(true);
            }}
          >
            <Icon icon={`Plus`}/>
            Link existing {field.id}
          </TextLink>
        </div>
      </div>
      <Modal
        title={'Insert Existing entry'}
        shouldCloseOnEscapePress={Modal.defaultProps.shouldCloseOnEscapePress}
        shouldCloseOnOverlayClick={Modal.defaultProps.shouldCloseOnOverlayClick}
        size={`long`}
        position={Modal.defaultProps.position}
        topOffset={Modal.defaultProps.topOffset}
        allowHeightOverflow={Modal.defaultProps.allowHeightOverflow}
        testId={Modal.defaultProps.testId}
        modalHeaderProps={{
          className: 'additional-modal-header-class',
        }}
        modalContentProps={{
          className: 'additional-modal-content-class',
        }}
        isShown={isShown}
        onClose={() => {
          setShown(false);
        }}
      >
        {cards}
      </Modal>
    </>
  );
}

LinkEditor.propTypes = {
  field: PropTypes.any,
  isInitiallyDisabled: PropTypes.bool,
  sdk: PropTypes.any
};
