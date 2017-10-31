import './BlockStyleComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Panel, Button, Glyphicon, Radio, Checkbox, Row, Col } from 'react-bootstrap';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import { ChooseImageComponent } from '../../components';

export default class BlockStyleComponent extends Component {

  static propTypes = {
    blockEditor: PropTypes.object, // blockEditor option

    loadImages: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    removeUploadedImage: PropTypes.func.isRequired,
    imagelibrary: PropTypes.object,

    onChooseBgImage: PropTypes.func, // background image selected callback
    onChooseBgColor: PropTypes.func, // background color selected callback
    onChooseBackgroundVideo: PropTypes.func, // background video selected callback
    onChooseOverlayColor: PropTypes.func, // background overlay color selected callback
    onChangePadding: PropTypes.func, // onChangePadding(paddingL, paddingR, paddingT, paddingB)
    onChangeMargin: PropTypes.func, // onChangePadding(paddingL, paddingR, paddingT, paddingB)
    onApplyChanges: PropTypes.func, //onApplyChanges(this.state)
    onHideBlockEditor: PropTypes.func // Close Editor Modal onHideBlockEditor()
  };

  constructor(props) {
    super(props);

    this.state = {
      blockEditor: (typeof props.blockEditor !== 'undefined') ? this.props.blockEditor : null,
      displayBgColorPicker: false,
      displayOverlayColorPicker: false,
      displayBgImagePicker: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        blockEditor: (typeof nextProps.blockEditor !== 'undefined') ? nextProps.blockEditor : this.props.blockEditor
      });
    }
  }

  /* -- Close the Editor Modal */
  onCloseEditor() {
    this.setState({
      blockEditor: this.state.blockEditor
    });

    this.props.onHideBlockEditor(this.state.blockEditor);
  }
  /* Close the Editor Modal -- */

  /* -- background option change */
  onChangeBgOption(v) {
    let blockEditor = this.state.blockEditor;
    blockEditor.bgOption = v;
    this.setState({
      blockEditor: blockEditor
    });
  }
  /* background option change -- */

  /* -- overlay */
  toggleOverlay() {
    let blockEditor = this.state.blockEditor;
    blockEditor.bOverlay = !this.state.blockEditor.bOverlay;
    this.setState({
      blockEditor: blockEditor
    });
  }
  /* overlay -- */

  /* -- background image picker */
  onToggleBgImagePicker() {
    this.setState({ displayBgImagePicker: !this.state.displayBgImagePicker });
  }

  onCloseBgImageModal(val, alt) {
    this.setState({ displayBgImagePicker: !this.state.displayBgImagePicker });
    let blockEditor = this.state.blockEditor;

    if (val !== null) {

      blockEditor.bgImage = val;
      blockEditor.bgImageAltText = alt;
      this.setState({
        blockEditor: blockEditor
      });
    }
  }
  /* background image picker -- */

  /* -- background color picker */
  onHandleBgColorPickerClick() {
    this.setState({ displayBgColorPicker: !this.state.displayBgColorPicker });
  }

  onHandleBgColorPickerClose() {
    this.setState({ displayBgColorPicker: false });
  }

  onHandleBgColorColorChange(color) {
    let blockEditor = this.state.blockEditor;
    blockEditor.bgColor = color.rgb;
    this.setState({
      blockEditor: blockEditor
    });
  }
  /* background color picker -- */

  /* -- overlay color picker */
  onHandleOverlayColorPickerClick() {
    this.setState({ displayOverlayColorPicker: !this.state.displayOverlayColorPicker });
  }

  onHandleOverlayColorPickerClose() {
    this.setState({ displayOverlayColorPicker: false });
  }

  onHandleOverlayColorColorChange(color) {
    let blockEditor = this.state.blockEditor;
    blockEditor.overlayColor = color.rgb;
    this.setState({
      blockEditor: blockEditor
    });
  }
  /* overlay color picker -- */
  
  /* -- background youtube url */
  onChangeBgVideo(e) {
    let blockEditor = this.state.blockEditor;
    blockEditor.bgVideo = e.target.value;
    this.setState({
      blockEditor: blockEditor
    });
  }
  /* background youtube url -- */

  /* -- apply the changed style */
  onApplyChanges() {
    this.setState({
      blockEditor: this.state.blockEditor
    });

    this.props.onApplyChanges(this.state.blockEditor);
  }
  /* apply the changed style -- */

  /* -- change padding value */
  changePaddingValue(t, ev) {

    let blockEditor = this.state.blockEditor;

    switch (t) {
      case 'L':
        blockEditor.paddingL = ev.target.value;

        this.setState({
          blockEditor: blockEditor
        });        
        break;
      case 'R':
        blockEditor.paddingR = ev.target.value;

        this.setState({
          blockEditor: blockEditor
        });
        break;
      case 'T':
        blockEditor.paddingT = ev.target.value;

        this.setState({
          blockEditor: blockEditor
        });
        break;
      case 'B':
        blockEditor.paddingB = ev.target.value;

        this.setState({
          blockEditor: blockEditor
        });
        break;
    }
  }
  /* change margin value -- */

  /* -- change margin value */
  changeMarginValue(t, ev) {
    let blockEditor = this.state.blockEditor;

    switch (t) {
      case 'L':
        blockEditor.marginL = ev.target.value;

        this.setState({
          blockEditor: blockEditor
        });
        break;
      case 'R':
        blockEditor.marginR = ev.target.value;

        this.setState({
          blockEditor: blockEditor
        });
        break;
      case 'T':
        blockEditor.marginT = ev.target.value;

        this.setState({
          blockEditor: blockEditor
        });
        break;
      case 'B':    
        blockEditor.marginB = ev.target.value;

        this.setState({
          blockEditor: blockEditor
        });
        break;
    }
  }
  /* change padding value -- */

  paddingSection() {
    return (
      <div>
        { /* -- padding control */ }
        <Row>
          <Col sm={12}>
            <h5>Padding</h5>
          </Col>
        </Row>
        <hr />
       <Row>
          <Col sm={2}>
            <label>Left</label>
          </Col>
          <Col sm={4}>
            <input type='text' className='form-control' placeholder='0px' value={ this.state.blockEditor.paddingL } onChange={ this.changePaddingValue.bind(this, 'L') } />
          </Col>
          <Col sm={2}>
            <label>Right</label>
          </Col>
          <Col sm={4}>
            <input type='text' className='form-control' placeholder='0px' value={ this.state.blockEditor.paddingR } onChange={ this.changePaddingValue.bind(this, 'R') } />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={2}>
            <label>Top</label>
          </Col>
          <Col sm={4}>
            <input type='text' className='form-control' placeholder='0px' value={this.state.blockEditor.paddingT} onChange={this.changePaddingValue.bind(this, 'T')} />
          </Col>
          <Col sm={2}>
            <label>Bottom</label>
          </Col>
          <Col sm={4}>
            <input type='text' className='form-control' placeholder='0px' value={this.state.blockEditor.paddingB} onChange={this.changePaddingValue.bind(this, 'B')} />
          </Col>
        </Row>
        { /* padding control -- */ }
      </div>
    );
  }

  /* change padding value -- */

  marginSection() {
    return (
      <div>
        { /* -- padding control */ }
        <Row>
          <Col sm={12}>
            <h5>Margin</h5>
          </Col>
        </Row>
        <hr />
       <Row>
          <Col sm={2}>
            <label>Left</label>
          </Col>
          <Col sm={4}>
            <input type='text' className='form-control' placeholder='0px' value={ this.state.blockEditor.marginL } onChange={ this.changeMarginValue.bind(this, 'L') } />
          </Col>
          <Col sm={2}>
            <label>Right</label>
          </Col>
          <Col sm={4}>
            <input type='text' className='form-control' placeholder='0px' value={ this.state.blockEditor.marginR } onChange={ this.changeMarginValue.bind(this, 'R') } />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={2}>
            <label>Top</label>
          </Col>
          <Col sm={4}>
            <input type='text' className='form-control' placeholder='0px' value={ this.state.blockEditor.marginT } onChange={ this.changeMarginValue.bind(this, 'T') } />
          </Col>
          <Col sm={2}>
            <label>Bottom</label>
          </Col>
          <Col sm={4}>
            <input type='text' className='form-control' placeholder='0px' value={ this.state.blockEditor.marginB } onChange={ this.changeMarginValue.bind(this, 'B') } />
          </Col>
        </Row>
        { /* padding control -- */ }
      </div>
    );
  }

  applyButton() {
    return(
      <div>
        <Row>
          <Col sm={4}>
            <Button title='Apply' onClick={this.onApplyChanges.bind(this)}>Apply</Button>
          </Col>
          <Col sm={4}>
            <Button title='Close' onClick={this.onCloseEditor.bind(this)}>Close</Button>
          </Col>
        </Row>
      </div>
    );
  }

  render () {
    /* -- color picker style */
    const styles = reactCSS({
      'default': {
        pickedBgColor: {
          color: `rgba(${ this.state.blockEditor.bgColor.r }, ${ this.state.blockEditor.bgColor.g }, ${ this.state.blockEditor.bgColor.b }, ${ this.state.blockEditor.bgColor.a })`,
        },
        pickedOverlayColor: {
          color: `rgba(${ this.state.blockEditor.overlayColor.r }, ${ this.state.blockEditor.overlayColor.g }, ${ this.state.blockEditor.overlayColor.b }, ${ this.state.blockEditor.overlayColor.a })`,
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          right: '20px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }
      }
    });
    /* color picker style -- */

    return (
      <div>
        <Panel header="Section Setting" className="blockEditor">
            <form className='form-horizontal'>
              <Row>
                <Col sm={12}>
                  <h5>Background</h5>
                </Col>
              </Row>
              <hr />
              { /* -- background control */ }
              <Row>
                <Col sm={12}>
                  <Radio 
                    name='block_background' 
                    checked={this.state.blockEditor.bgOption == 0}
                    onChange={this.onChangeBgOption.bind(this, 0)} 
                    >
                    Background Image
                  </Radio>
                </Col>
              </Row>
              <hr />
              {
                this.state.blockEditor.bgOption == 0 && 
                ( 
                  <Row>
                    <Col sm={8} smOffset={2}>
                      <div className='image-wrapper' onClick={ this.onToggleBgImagePicker.bind(this) }>
                        { this.state.blockEditor.bgImage && <img src={this.state.blockEditor.bgImage} alt='No Image' /> }
                      </div>
                      { this.state.displayBgImagePicker && 
                        <ChooseImageComponent
                          loadImages={this.props.loadImages}
                          uploadImage={this.props.uploadImage}
                          removeUploadedImage={this.props.removeUploadedImage}
                          imagelibrary={this.props.imagelibrary}
                          onClose={ this.onCloseBgImageModal.bind(this) }
                          value={ this.state.blockEditor.bgImage }
                          altText={ this.state.blockEditor.bgImageAltText }
                          /> }
                    </Col>
                  </Row>
                )
              }
              <Row>
                <Col sm={12}>
                  <Radio 
                    name='block_background' 
                    checked={this.state.blockEditor.bgOption == 1}
                    onChange={this.onChangeBgOption.bind(this, 1)} 
                    >
                    Background Color
                  </Radio>
                </Col>
              </Row>
              <hr />
              {
                this.state.blockEditor.bgOption == 1 && 
                ( 
                  <Row>
                    <Col sm={6}>
                      <label>Color</label>
                    </Col>
                    <Col sm={6}>
                      <Button title='Background Color' onClick={this.onHandleBgColorPickerClick.bind(this)}><Glyphicon glyph="certificate" style={styles.pickedBgColor} /></Button>
                      {
                        this.state.displayBgColorPicker &&
                        (
                          <div style={ styles.popover }>
                            <div style={styles.cover} onClick={ this.onHandleBgColorPickerClose.bind(this)} />
                            <SketchPicker color={ this.state.blockEditor.bgColor } onChange={ this.onHandleBgColorColorChange.bind(this)} />
                          </div>
                        )
                      }
                    </Col>
                  </Row>
                )
              }
              <Row>
                <Col sm={12}>
                  <Radio 
                    name='block_background' 
                    checked={this.state.blockEditor.bgOption == 2}
                    onChange={this.onChangeBgOption.bind(this, 2)} 
                    >
                    Background Video
                  </Radio>
                </Col>
              </Row>
              <hr />
              {
                this.state.blockEditor.bgOption == 2 && 
                ( 
                  <Row>
                    <Col sm={12}>
                      <label for='youtube_link'>YouTube</label>
                      <input type='text' className='form-control' name='youtube_link' value={ this.state.blockEditor.bgVideo } onChange={ this.onChangeBgVideo.bind(this) } />
                    </Col>
                  </Row>
                )
              }
              { /* background control -- */ }
              { /* -- overlay control */ }
              <Row>
                <Col sm={12}>
                  <Checkbox 
                    checked={this.state.blockEditor.bOverlay}
                    onChange={this.toggleOverlay.bind(this)} 
                    >
                    Background Overlay
                  </Checkbox>
                </Col>
              </Row>
              {
                this.state.bOverlay && 
                ( 
                  <Row>
                    <Col sm={6}>
                      <h5>Color</h5>
                    </Col>
                    <Col sm={6}>
                      <Button title='Overlay Color' onClick={this.onHandleOverlayColorPickerClick.bind(this)}><Glyphicon glyph="certificate" style={styles.pickedOverlayColor} /></Button>
                      {
                        this.state.displayOverlayColorPicker &&
                        (
                          <div style={ styles.popover }>
                            <div style={styles.cover} onClick={ this.onHandleOverlayColorPickerClose.bind(this)} />
                            <SketchPicker color={ this.state.blockEditor.overlayColor } onChange={ this.onHandleOverlayColorColorChange.bind(this)} />
                          </div>
                        )
                      }
                    </Col>
                  </Row>
                )
              }
              { /* overlay control -- */ }
              <hr />
              { this.paddingSection() }
              <hr />
              { this.marginSection() }
              <hr />
              { this.applyButton() }
            </form>
        </Panel>
      </div>
    );
  }
}
