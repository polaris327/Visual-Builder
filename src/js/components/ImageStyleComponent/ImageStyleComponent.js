import './ImageStyleComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Tooltip, Button } from 'react-bootstrap';
import { ChooseIconComponent, LinkEditorComponent, ChooseImageComponent } from '../../components';

export default class ImageStyleComponent extends Component {

  static propTypes = {
    imageValue: PropTypes.string, 
    imageAltText: PropTypes.string,
    iconValue: PropTypes.object, // eg, {glyphIcon: 'align-justify', iconColor: { r: '0', g: '0', b: '0', a: '1' }, iconSize: 'auto'}
    linkValue: PropTypes.object, // eg, {textToDisplay: 'Google', curUrl: 'http://www.google.com/', openInNewWindow: true, pages: ['index.html', 'test.html'], pageAnchors: ['#top', '#footer']},
    direction: PropTypes.string, // top/bottom
    loadImages: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    removeUploadedImage: PropTypes.func.isRequired,
    imagelibrary: PropTypes.object,
    
    onChooseImage: PropTypes.func, // callback param format - eg, /images/XXX.jpg
    onChooseIcon: PropTypes.func, // callback param format - eg, {glyphIcon: 'align-justify', iconColor: { r: '0', g: '0', b: '0', a: '1' }, iconSize: '10px'}
    onChangeLink: PropTypes.func // callback param format - eg, {textToDisplay: 'Google', curUrl: 'http://www.google.com/', openInNewWindow: true, pages: ['index.html', 'test.html'], pageAnchors: ['#top', '#footer']}
  };

  constructor(props) {
    super(props);

    this.state = {
      displayImagePicker: false,
      displayIconPicker: false,
      displayLinkEditor: false,
      imageMode: 0,

      imageValue: (typeof props.imageValue !== 'undefined') ? props.imageValue : '',
      iconValue: (typeof props.iconValue !== 'undefined') ? props.iconValue : {},
      linkValue: (typeof props.linkValue !== 'undefined') ? props.linkValue : {},
      direction: (typeof props.direction !== 'undefined') ? props.direction : 'top',
      imageAltText: (typeof props.imageAltText !== 'undefined') ? props.imageAltText : ''
    };
  }
 
  componentWillReceiveProps(nextProps) {
    this.setState({
      imageValue: (typeof nextProps.imageValue !== 'undefined') ? nextProps.imageValue : '',
      iconValue: (typeof nextProps.iconValue !== 'undefined') ? nextProps.iconValue : {},
      linkValue: (typeof nextProps.linkValue !== 'undefined') ? nextProps.linkValue : {},
      direction: (typeof nextProps.direction !== 'undefined') ? nextProps.direction : 'top',
      imageAltText: (typeof nextProps.imageAltText !== 'undefined') ? nextProps.imageAltText : ''
    });
  }

  /* -- link editor */
  toggleLinkEditor() {
    this.setState({ displayLinkEditor: !this.state.displayLinkEditor });
  }

  onCloseLinkEditorModal(opt) {
    this.setState({ displayLinkEditor: !this.state.displayLinkEditor });
    this.setState({ linkValue: opt });

    if (typeof this.props.onChangeLink !== 'undefined') {
      this.props.onChangeLink(opt);
    }
  }
  /* link editor -- */

  /* -- Icon picker */
  toggleIconPicker() {
    this.setState({ displayIconPicker: !this.state.displayIconPicker });
  }

  onCloseIconModal(opt) {
    this.setState({ displayIconPicker: !this.state.displayIconPicker });
    
    if (opt !== null) {
      this.setState({ iconValue: opt });
      this.setState({ imageMode: 2 });

      if (typeof this.props.onChooseIcon !== 'undefined') {
        if (typeof opt.iconSize !== 'undefined' && opt.iconSize !== 'auto') {
          opt.iconSize += 'px';
        }
        
        this.props.onChooseIcon(opt);
      }
    }
  }
  /* Icon picker -- */
  
  /* -- image picker */
  onToggleImagePicker() {
    this.setState({ displayImagePicker: !this.state.displayImagePicker });
  }

  onCloseImageModal(val, alt) {
    this.setState({ displayImagePicker: !this.state.displayImagePicker });

    if (val !== null) {
      this.setState({ imageValue: val });
      this.setState({ imageAltText: alt });
      this.setState({ imageMode: 1 });

      if (typeof this.props.onChooseImage !== 'undefined') {
        this.props.onChooseImage(val, alt);
      }
    }
  }
  /* image picker -- */

  render () {
    return (
      <div>
        <Tooltip placement={this.state.direction} className='in' id='tooltip-top'>
          <Button onClick={this.onToggleImagePicker.bind(this)} active={ this.state.imageMode === 1 } title='Choose Image'><i className='fa fa-picture-o' /></Button>
          <Button onClick={this.toggleLinkEditor.bind(this)} title='Link'><i className='fa fa-link' /></Button>
        </Tooltip>

        {this.state.displayImagePicker && 
          <ChooseImageComponent
            onClose={this.onCloseImageModal.bind(this)}
            loadImages={this.props.loadImages}
            uploadImage={this.props.uploadImage}
            removeUploadedImage={this.props.removeUploadedImage}
            imagelibrary={this.props.imagelibrary}
            value={this.state.imageValue}
            altText={this.state.imageAltText} />}
        {this.state.displayIconPicker && <ChooseIconComponent onClose={this.onCloseIconModal.bind(this)} value={this.state.iconValue} />}
        {this.state.displayLinkEditor && <LinkEditorComponent onClose={this.onCloseLinkEditorModal.bind(this)} value={this.state.linkValue} />}
      </div>
    );
  }
}
