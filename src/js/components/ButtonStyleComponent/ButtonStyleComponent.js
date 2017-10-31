import './ButtonStyleComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Tooltip, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import { ChooseIconComponent, LinkEditorComponent } from '../../components';

export default class ButtonStyleComponent extends Component {

  static propTypes = {
    alignMode: PropTypes.number, //eg, 0/1/2,
    fontName: PropTypes.string, //eg, `Open Sans`
    fontSize: PropTypes.number, // eg, 8
    fontColor: PropTypes.object, // {r: '0', g: '0', b: '0', a: '1'}
    hoverColor: PropTypes.object, // {r: '0', g: '0', b: '0', a: '1'}
    iconValue: PropTypes.object, // eg, {glyphIcon: 'align-justify', iconColor: {r: '0', g: '0', b: '0', a: '1'}, iconSize: 'auto'}
    linkValue: PropTypes.object, // eg, {textToDisplay: 'Google', curUrl: 'http://www.google.com/', openInNewWindow: true, pages: ['index.html', 'test.html'], pageAnchors: ['#top', '#footer']},
    direction: PropTypes.string, // top/bottom
    
    onChooseAlignMode: PropTypes.func,
    onChooseFont: PropTypes.func,
    onChooseFontSize: PropTypes.func,
    onChooseColor: PropTypes.func,
    onChooseHoverColor: PropTypes.func,
    onClickAdd: PropTypes.func.isRequired,
    onClickRemove: PropTypes.func.isRequired,
    onChooseIcon: PropTypes.func, // callback param format - eg, {glyphIcon: 'align-justify', iconColor: {r: '0', g: '0', b: '0', a: '1'}, iconSize: '10px'}
    onChangeLink: PropTypes.func // callback param format - eg, {textToDisplay: 'Google', curUrl: 'http://www.google.com/', openInNewWindow: true, pages: ['index.html', 'test.html'], pageAnchors: ['#top', '#footer']}
  };

  constructor(props) {
    super(props);

    this.state = {
      compactView: true, 
      displayColorPicker: false,
      displayHoverPicker: false,
      displayIconPicker: false,
      displayLinkEditor: false,

      alignMode: (typeof props.alignMode !== 'undefined') ? props.alignMode : 0,
      curFontSize: (typeof props.fontSize !== 'undefined') ? props.fontSize : 8,
      fontSizes: [ 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 
                30, 32, 36, 46, 48, 60, 72, 80, 84, 100 ],
      curFont: (typeof props.fontName !== 'undefined') ? props.fontName : 'Open Sans',
      fonts: [ 'Open Sans', 'Roboto', 'Lato', 'Oswald', 'Roboto Condensed', 'serif', 'Lora',
                'Source Sans Pro', 'PT Sans', 'Open Sans Condensed', 'Raleway', 'Droid Sans',
                'Montserrat', 'Ubuntu', 'Droid Serif', 'Roboto Slab', 'Merriweather', 'PT Sans Narrow',
                'Arimo', 'Noto Sans', 'Bitter', 'Titillium Web', 'Indie Flower', 'PT Serif', 
                'Yanone Kaffeesatz', 'Oxygen' ],
      curColor: (typeof props.fontColor !== 'undefined') ? props.fontColor : {r: '0', g: '0', b: '0', a: '1'},
      hoverColor: (typeof props.hoverColor !== 'undefined') ? props.hoverColor : {r: '0', g: '0', b: '0', a: '1'},
      iconValue: (typeof props.iconValue !== 'undefined') ? props.iconValue : {},
      linkValue: (typeof props.linkValue !== 'undefined') ? props.linkValue : {},
      direction: (typeof props.direction !== 'undefined') ? props.direction : 'top'
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      alignMode: (typeof nextProps.alignMode !== 'undefined') ? nextProps.alignMode : 0,
      curFontSize: (typeof nextProps.fontSize !== 'undefined') ? nextProps.fontSize : 8,
      curFont: (typeof nextProps.fontName !== 'undefined') ? nextProps.fontName : 'Open Sans',
      curColor: (typeof nextProps.fontColor !== 'undefined') ? nextProps.fontColor : {r: '0', g: '0', b: '0', a: '1'},
      hoverColor: (typeof nextProps.hoverColor !== 'undefined') ? nextProps.hoverColor : {r: '0', g: '0', b: '0', a: '1'},
      iconValue: (typeof nextProps.iconValue !== 'undefined') ? nextProps.iconValue : {},
      linkValue: (typeof nextProps.linkValue !== 'undefined') ? nextProps.linkValue : {},
      direction: (typeof nextProps.direction !== 'undefined') ? nextProps.direction : 'top'
    });
  }

  /* -- add / trash button handlers */
  onClickAdd() {
    if (typeof this.props.onClickAdd !== 'undefined') {
      this.props.onClickAdd();
    }
  }

  onClickRemove() {
    if (typeof this.props.onClickRemove !== 'undefined') {
      this.props.onClickRemove();
    }
  }
  /* add / trash button handlers -- */

  // switch view from compact to full, full to compact
  onToggleView() {
    this.setState({ compactView: !this.state.compactView });
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

  // switch align mode
  toggleAlignMode() {
    const newAlignMode = (this.state.alignMode + 1) % 3;
    this.setState({ alignMode: newAlignMode });

    if (typeof this.props.onChooseAlignMode !== 'undefined') {
      this.props.onChooseAlignMode(newAlignMode);
    }
  }

  onCloseIconModal(opt) {
    this.setState({ displayIconPicker: !this.state.displayIconPicker });

    if (opt !== null) {
      this.setState({ iconValue: opt });

      if (typeof this.props.onChooseIcon !== 'undefined') {
        if (typeof opt.iconSize !== 'undefined' && opt.iconSize !== 'auto') {
          opt.iconSize += 'px';
        }
        
        this.props.onChooseIcon(opt);
      }
    }
  }
  /* Icon picker -- */
  
  /* -- picker */
  handlePickerClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handlePickerClose() {
    this.setState({ displayColorPicker: false });
  }

  handleColorChange(color) {
    this.setState({ curColor: color.rgb });

    if (typeof this.props.onChooseColor !== 'undefined') {
      this.props.onChooseColor(color.rgb);
    }
  };
  /* picker -- */

  /* -- hover color picker */
  handleHoverPickerClick() {
    this.setState({ displayHoverPicker: !this.state.displayHoverPicker });
  }

  handleHoverPickerClose() {
    this.setState({ displayHoverPicker: false });
  }

  handleHoverColorChange(color) {
    this.setState({ hoverColor: color.rgb });

    if (typeof this.props.onChooseHoverColor !== 'undefined') {
      this.props.onChooseHoverColor(color.rgb);
    }
  };
  /* picker -- */

  /* -- fonts dropdown */
  selectFont(eventKey, event) {
    this.setState({
      curFont: eventKey
    });

    if (typeof this.props.onChooseFont !== 'undefined') {
      this.props.onChooseFont(eventKey);
    }
  }
  renderFontDropdown() {
    return (
      <DropdownButton id='font-dropdown' onSelect={this.selectFont.bind(this)} title={ this.state.curFont }>
      {
        this.state.fonts.map((ftName, index) => 
          (
            <MenuItem eventKey={ftName} key={index} active={this.state.curFont === ftName}>{ftName}</MenuItem>
          )
        )
      }
      </DropdownButton>
    );
  }
  /* fonts dropdown -- */

  /* -- font size dropdown */
  selectFontSize(eventKey, event) {
    this.setState({
      curFontSize: eventKey
    });

    if (typeof this.props.onChooseFontSize !== 'undefined') {
      this.props.onChooseFontSize(eventKey);
    }
  }
  
  renderFontSizeDropdown() {
    return (
      <DropdownButton id='fontsize-dropdown' onSelect={this.selectFontSize.bind(this)} title={ this.state.curFontSize.toString() }>
      {
        this.state.fontSizes.map((ftSize, index) => 
          (
            <MenuItem eventKey={ftSize} key={index} active={this.state.curFontSize === ftSize}>{ftSize}</MenuItem>
          )
        )
      }
      </DropdownButton>
    );
  }

  render () {
    /* -- color picker style */
    const styles = reactCSS({
      'default': {
        pickedColor: {
          color: `rgba(${ this.state.curColor.r }, ${ this.state.curColor.g }, ${ this.state.curColor.b }, ${ this.state.curColor.a })`,
        },
        hoverPickedColor: {
          color: `rgba(${ this.state.hoverColor.r }, ${ this.state.hoverColor.g }, ${ this.state.hoverColor.b }, ${ this.state.hoverColor.a })`,
        },
        compactPopover: {
          position: 'absolute',
          zIndex: '2',
          left: '0px'
        },
        fullPopover: {
          position: 'absolute',
          zIndex: '2',
          right: '0px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    });

    return (
      <div>
        <Tooltip placement={this.state.direction} className='in' id='tooltip-top'>
          {!this.state.compactView && this.renderFontDropdown()}
          <Button onClick={this.toggleLinkEditor.bind(this)} title='Edit'><i className='fa fa-edit' /></Button>
          {!this.state.compactView && this.renderFontSizeDropdown()}
          <Button onClick={this.handlePickerClick.bind(this)} title='Text Color'><i className="fa fa-certificate" style={styles.pickedColor} /></Button>
          {this.state.displayColorPicker &&
            <div style={this.state.compactView ? styles.compactPopover : styles.fullPopover}>
              <div style={styles.cover} onClick={this.handlePickerClose.bind(this)} />
              <SketchPicker color={this.state.curColor} onChange={this.handleColorChange.bind(this)} />
            </div>
          }
          <Button onClick={this.onClickAdd.bind(this)} title='Add'><i className='fa fa-plus' /></Button>
          <Button onClick={this.onClickRemove.bind(this)} title='Remove'><i className='fa fa-trash' /></Button>
          <Button onClick={this.onToggleView.bind(this)}>
            {this.state.compactView && <i className="fa fa-chevron-right" />}
            {!this.state.compactView && <i className="fa fa-chevron-left" />}
          </Button>
        </Tooltip>
        {this.state.displayLinkEditor && <LinkEditorComponent onClose={ this.onCloseLinkEditorModal.bind(this)} value={this.state.linkValue} />}
      </div>
    );
  }
}
