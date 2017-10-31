import './TextStyleComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Tooltip, Button, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import { ExternalContentComponent, GlobalSlugComponent } from '../../components';

export default class TextStyleComponent extends Component {

  static propTypes = {
    alignMode: PropTypes.number, //eg, 0/1/2
    fontName: PropTypes.string, //eg, `Open Sans`
    fontSize: PropTypes.number, // eg, 8
    fontColor: PropTypes.object, // {r: '0', g: '0', b: '0', a: '1'}
    direction: PropTypes.string, // top/bottom
    externals: PropTypes.object,
    globals: PropTypes.object,

    onChooseAlignMode: PropTypes.func,
    onChooseFont: PropTypes.func,
    onChooseFontSize: PropTypes.func,
    onChooseColor: PropTypes.func,
    onClickAdd: PropTypes.func.isRequired,
    onInsertExternal: PropTypes.func.isRequired,
    onInsertGlobal: PropTypes.func.isRequired,
    onClickRemove: PropTypes.func.isRequired,
    loadExternal: PropTypes.func.isRequired,
    loadGlobal: PropTypes.func.isRequired
  };

  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      compactView: true, 
      displayColorPicker: false,
      displayPlugin: false,
      displayGlobal: false,

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
      direction: (typeof props.direction !== 'undefined') ? props.direction : 'top'
    };
  }

  /**
   * ComponentWillReceiveProps
   * @param {*} nextProps 
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      alignMode: (typeof nextProps.alignMode !== 'undefined') ? nextProps.alignMode : 0,
      curFontSize: (typeof nextProps.fontSize !== 'undefined') ? nextProps.fontSize : 8,
      curFont: (typeof nextProps.fontName !== 'undefined') ? nextProps.fontName : 'Open Sans',
      curColor: (typeof nextProps.fontColor !== 'undefined') ? nextProps.fontColor : {r: '0', g: '0', b: '0', a: '1'},
      direction: (typeof nextProps.direction !== 'undefined') ? nextProps.direction : 'top'
    });
  }

  /**
   * switch view from compact to full, full to compact
   */
  toggleView() {
    this.setState({ compactView: !this.state.compactView });
  }

  /**
   * switch align mode
   */
  toggleAlignMode() {
    const newAlignMode = (this.state.alignMode + 1) % 3;
    this.setState({ alignMode: newAlignMode });

    if (typeof this.props.onChooseAlignMode !== 'undefined') {
      this.props.onChooseAlignMode(newAlignMode);
    }
  }

  /**
   * Show Plugin
   */
  onColorPicker() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  /**
   * Close Plugin
   */
  onPickerClose() {
    this.setState({ displayColorPicker: false });
  }

  /**
   * On Color Change
   * @param {*} color 
   */
  handleColorChange(color) {
    this.setState({ curColor: color.rgb });

    if (typeof this.props.onChooseColor !== 'undefined') {
      this.props.onChooseColor(color.rgb);
    }
  }
  
  /**
   * Font Dropdown
   * @param {*} eventKey 
   * @param {*} event 
   */
  selectFont(eventKey, event) {
    this.setState({
      curFont: eventKey
    });

    if (typeof this.props.onChooseFont !== 'undefined') {
      this.props.onChooseFont(eventKey);
    }
  }

  /**
   * Render Font Dropdown
   */
  renderFontDropdown() {
    return (
      <DropdownButton
        id='font-dropdown'
        onSelect={this.selectFont.bind(this)}
        title={this.state.curFont}
      >
      {this.state.fonts.map((ftName, index) => (
        <MenuItem eventKey={ftName} key={index} active={this.state.curFont === ftName}>{ftName}</MenuItem>
      ))}
      </DropdownButton>
    );
  }
  
  /**
   * Font Size Change
   * @param {*} eventKey 
   * @param {*} event 
   */
  selectFontSize(eventKey, event) {
    this.setState({
      curFontSize: eventKey
    });

    if (typeof this.props.onChooseFontSize !== 'undefined') {
      this.props.onChooseFontSize(eventKey);
    }
  }

  /**
   * Render Font Size Dropdown
   */
  renderFontSizeDropdown() {
    return (
      <DropdownButton
        id='fontsize-dropdown'
        onSelect={this.selectFontSize.bind(this)}
        title={this.state.curFontSize.toString()}
      >
      {this.state.fontSizes.map((ftSize, index) => (
        <MenuItem eventKey={ftSize} key={index} active={this.state.curFontSize === ftSize}>{ftSize}</MenuItem>
      ))}
      </DropdownButton>
    );
  }
  
  /**
   * On Click Add
   */
  onClickAdd() {
    if (typeof this.props.onClickAdd !== 'undefined') {
      this.props.onClickAdd();
    }
  }

  /**
   * On Click Plugin
   */
  onClickPlugin() {
    this.setState({
      displayPlugin: !this.state.displayPlugin
    });
  }

  /**
   * On Click Global
   */
  onClickGlobal() {
    this.setState({
      displayGlobal: !this.state.displayGlobal
    });
  }

  /**
   * On Click Remove
   */
  onClickRemove() {
    if (typeof this.props.onClickRemove !== 'undefined') {
      this.props.onClickRemove();
    }
  }

  loadExternal() {
    if (this.props.loadExternal){
      this.props.loadExternal();
    }
  }

  loadGlobal() {
    if (this.props.loadGlobal){
      this.props.loadGlobal();
    }
  }

  /**
   * Render
   */
  render () {
    // Color picker style
    const styles = reactCSS({
      'default': {
        pickedColor: {
          color: `rgba(${ this.state.curColor.r }, ${ this.state.curColor.g }, ${ this.state.curColor.b }, ${ this.state.curColor.a })`,
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
    
    /**
     * Render
     */
    return (
      <Tooltip
        placement={this.state.direction}
        className='in'
        id='tooltip-top'
      >
        {!this.state.compactView &&
          this.renderFontDropdown()}
        <Button
          onClick={this.toggleAlignMode.bind(this)}
          title='Align Mode'
        >
          {this.state.alignMode == 0 &&
            <i className="fa fa-align-left" />}
          {this.state.alignMode == 1 &&
            <i className="fa fa-align-center" />}
          {this.state.alignMode == 2 &&
            <i className="fa fa-align-right" />}
        </Button>
        {!this.state.compactView &&
          this.renderFontSizeDropdown()}
        <Button
          title='Text Color'
          onClick={this.onColorPicker.bind(this)}
          >
          <i className='fa fa-certificate'
            style={styles.pickedColor} />
        </Button>
        {this.state.displayColorPicker &&
          <div
            style={this.state.compactView ? styles.compactPopover : styles.fullPopover}
          >
            <div
              style={styles.cover}
              onClick={this.onPickerClose.bind(this)} />
            <SketchPicker
              color={this.state.curColor}
              onChange={this.handleColorChange.bind(this)} />
          </div>
        }
        <Button
          onClick={this.onClickAdd.bind(this)}
          title='Duplicate'
        >
          <i className={'fa fa-plus'} />
        </Button>
        <Button
          onClick={this.onClickPlugin.bind(this)}
          title='Add Content'
        >
          <i className={'fa fa-plug'} />
        </Button>
        {
          this.state.displayPlugin &&
            <ExternalContentComponent
              title={'Select External Content'}
              contents={this.props.externals}
              onInsert={this.props.onInsertExternal}
              loadExternal={this.loadExternal.bind(this)}
            />
        }
        <Button
          onClick={this.onClickGlobal.bind(this)}
          title='Add Content'
        >
          <i className={'fa fa-globe'} />
        </Button>
        {
          this.state.displayGlobal &&
            <GlobalSlugComponent
              title={'Select Global Slugs'}
              contents={this.props.globals}
              onInsert={this.props.onInsertGlobal}
              loadGlobal={this.loadGlobal.bind(this)}
            />
        }
        
        {!this.state.compactView &&
          <Button
            onClick={this.onClickRemove.bind(this)}
            title='Remove'
          >
            <i className={'fa fa-trash'} />
          </Button>
        }
        <Button
          onClick={this.toggleView.bind(this)}
        >
          {this.state.compactView &&
            <i className="fa fa-chevron-right" />
          }
          {!this.state.compactView &&
            <i className="fa fa-chevron-left" />
          }
        </Button>
      </Tooltip>
    );
  }
}
