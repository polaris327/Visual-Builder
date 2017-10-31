import './BlockComponent.scss';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as utils from '../../utils';
import {
	editDynamicForm,
	editStaticBlock,
	editPost,
	editEvent,
	editPromotion,
	editSlider
} from '../../constants/urlNames';

export default class BlockComponent extends Component {

  static propTypes = {
    url             : PropTypes.string.isRequired,
    shortcode       : PropTypes.object.isRequired,
    id              : PropTypes.string.isRequired,
    dynamic         : PropTypes.string.isRequired,
    header          : PropTypes.string.isRequired,
    footer          : PropTypes.string.isRequired,
    top             : PropTypes.bool.isRequired,
    removeTemplate  : PropTypes.func.isRequired,
    storeTemplate   : PropTypes.func.isRequired,
    updateStyleEditor:PropTypes.func.isRequired,    // update style editor
    updateBlockEditor:PropTypes.func.isRequired,    // update block editor
    updateExternalEditor: PropTypes.func.isRequired, // update external editor
    updateCodeEditor: PropTypes.func.isRequired,
    triggerPluginEditor: PropTypes.func.isRequired,
    hideEditor      : PropTypes.func.isRequired,
    loadPrepare : PropTypes.func.isRequired,
    loadComplete : PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const initialStyleEditor = {
        direction   : 'top',
				editorType	: '',
        editTarget  : null,
        editClone   : null,
				eventName   : '',   
				fontSize   	: 12,
				fontColor  	: {r:'0', g:'0', b:'0', a:'1'},
				fontName 	  : 'Open Sans',
				fontWeight	: false,
				fontStyle	  : false,
				iconValue	  : {},
				linkValue	  : {},
				imageValue	: '',
        imageAltText: '',
				alignMode	  : 0
			};
    const initialBlockEditor = {
        showEditor 		: false,
				editTarget 		: '',
				direction 		: 'top',
				bgOption 		  : 0,
				bgImage 		  : '',
				bgImageAltText: '',
				bgColor 		  : {r:'255', g:'255', b:'255', a:'1'},
				bgVideo 		  : '',
				bOverlay 		  : false,
				overlayColor 	: {r:'255', g:'255', b:'255', a:'1'},
				paddingL 		  : 0,
				paddingR 		  : 0,
				paddingT 		  : 0,
				paddingB 		  : 0
			};
    this.state = {
      showController: true,
      styleEditor   : initialStyleEditor,
      blockEditor   : initialBlockEditor,
      templateDrag  : {
        index       : -1,
        isDrag      : false,
        startOffset : null,
        initialOffset: null,
        dragObj     : null
      },
      isLoading     : false
    };
  }
  
  /**
   * Component Mounted Life Cycle
   */
  componentDidMount() {
    this.renderFromUrl(this.props.shortcode);
  }

  /**
   * Component Received Props Life Cycle
   */
  componentWillReceiveProps() { }

  /**
   * Component Updated Life Cycle
   * @param {*} prevProps 
   * @param {*} prevState 
   */
  componentDidUpdate(prevProps, prevState){
    let target = this.state.styleEditor.editTarget;
    if (target) {
      switch (this.state.styleEditor.eventName) {
        case 'click':
          if (target)
            utils.applyContentEditable(target);
          break;
        case 'focus':
          if (target)
            utils.applyContentEditable(target);
          break;
        default:
          break;
      }
    }
    if (target !== prevState.styleEditor.editTarget) {
      utils.styleMouseOut(prevState.styleEditor.editTarget);
      utils.removeEditable(prevState.styleEditor.editTarget);
      utils.styleEdit(target);
    }
  }

  /**
   * Component dismount life cycle
   */
  componentWillUnmount() { }

  /* Dispatchers */

  /**
   * Dispatcher for updating Style Editor
   * @param {Object} styleEditor
   * @return 
   */
  setDragState(templateDrag) {
    this.setState({
      templateDrag:templateDrag
    });
  }

  /**
   * Dispatcher for updating Style Editor
   * @param {Object} styleEditor
   * @return 
   */

  hideEditor() {
      const hideEditor = {
        direction   : 'top',
				editorType	: '',
				editTarget  : null,
				eventName   : '',   
				fontSize   	: 12,
				fontColor  	: '#000000',
				fontName 	  : 'Open Sans',
				fontWeight	: false,
				fontStyle	  : false,
				iconValue	  : {},
				linkValue	  : {},
				imageValue	: '',
        imageAltText: '',
				alignMode	  : 0
			};
      this.setState({
        styleEditor:hideEditor
      });
      if (this.props.hideEditor)
        this.props.hideEditor();
  }

  /**
   * Dispatcher for updating Style Editor
   * @param {Object} styleEditor
   * @return 
   */
  setEditState(target, event, editor) {
    let styleObj = utils.getStyleInfo(target, '');
    let alignMode = utils.getAlignMode(styleObj);
   
    let styleEditor = {
      blockKey    : this.state.templateKey,
      editorType  : editor,
      editTarget  : target,
      eventName   : event,
      fontName    : utils.getFontName(styleObj.fontFamily),
      fontColor   : utils.rgb2obj(styleObj.color),
      fontSize    : parseInt(styleObj.fontSize.replace('px',''), 10),
      alignMode   : alignMode
    };
    if (this.state.templateKey == 0) {
      styleEditor.direction = 'bottom';
    }
    else {
      styleEditor.direction = 'top';
    }
    switch (editor) {
      case 'textlink':
        styleEditor.fontStyle = styleObj.fontStyle;
        styleEditor.fontWeight = styleObj.fontWeight;
        styleEditor.linkValue = {
              textToDisplay   : target.innerHTML, 
              curUrl          : target.getAttribute('href'), 
              openInNewWindow : true, 
              pages           : ['index.html', 'test.html'], 
              pageAnchors     : ['#top', '#footer']
            };
        break;
    }
    this.updateStyleEditor(styleEditor);
  }

  /**
   * Locate style editor to target with proper type
   * @param {Object} target
   * @param {String} editor
   * @return 
   */
  setStyleState(target, editor){
    // get all styles from element
    let styleObj = utils.getStyleInfo(target, '');
    let alignMode = utils.getAlignMode(styleObj);
    let styleEditor = {
      blockKey    : this.state.templateKey,
      editorType  : editor,
      editTarget  : target
    };
    // style editor direction
    if (this.props.top)
      styleEditor.direction = 'bottom';
    else
      styleEditor.direction = 'top';
    switch (editor) {
      case 'text':{
          styleEditor.fontName  = utils.getFontName(styleObj.fontFamily);
          styleEditor.fontColor = utils.rgb2obj(styleObj.color);
          styleEditor.fontSize  = parseInt(styleObj.fontSize.replace('px',''), 10);
          styleEditor.alignMode = alignMode;
        break;
      }
      case 'button': {
          styleEditor.fontColor = utils.rgb2obj(styleObj.color);
          styleEditor.fontSize  = parseInt(styleObj.fontSize.replace('px',''), 10);
          styleEditor.alignMode = alignMode;
          styleEditor.linkValue = {
              textToDisplay   : target.innerHTML, 
              curUrl          : target.getAttribute('href'), 
              openInNewWindow : true
          };
          styleEditor.iconValue = {
              glyphIcon : target.getAttribute('class'),
              iconColor : utils.rgb2obj(styleObj.color),
              iconSize  : parseInt(styleObj.fontSize.replace('px',''), 10)
          };
        break;
      }
      case 'menu': {
          styleEditor.fontColor = utils.rgb2obj(styleObj.color);
          styleEditor.fontSize  = parseInt(styleObj.fontSize.replace('px',''), 10);
          styleEditor.linkValue = {
              textToDisplay   : target.innerHTML, 
              curUrl          : target.getAttribute('href'), 
              openInNewWindow : true
          };
          styleEditor.iconValue = {
              glyphIcon : target.getAttribute('class'),
              iconColor : utils.rgb2obj(styleObj.color),
              iconSize  : parseInt(styleObj.fontSize.replace('px',''), 10)
          };
        break;
      }
      case 'icon': {
          styleEditor.fontColor = utils.rgb2obj(styleObj.color);
          styleEditor.fontSize  = parseInt(styleObj.fontSize.replace('px',''), 10);
          styleEditor.iconValue = {
              glyphIcon : target.getAttribute('class'),
              iconColor : utils.rgb2obj(styleObj.color),
              iconSize  : parseInt(styleObj.fontSize.replace('px',''), 10)
          };
        break;
      }
      case 'image': {
        if (target.tagName == 'IMG'){
          styleEditor.imageValue    = target.getAttribute('src');
          styleEditor.imageAltText  = target.getAttribute('alt');
        }
        else{
          styleEditor.iconValue = target.getAttribute('class');
        }
        break;
      } 
      case 'textlink': {
        styleEditor.linkValue = {
            textToDisplay   : target.innerHTML, 
            curUrl          : target.getAttribute('href'), 
            openInNewWindow : true
          };
        break;
      }
      default:
        break;
    }
    this.updateStyleEditor(styleEditor);
  }

  /**
   * Locate block editor to target with proper type
   * @param
   * @return 
   */
  setBlockState() {
    const {id} = this.props;
    let styleObj = utils.getBlockInfo(id);
    let blockEditor = {
       showEditor 		: true,
				editTarget 		: utils.getSection(id),
				direction 		: 'top',
				bgOption 		  : 0,
				bgImage 		  : '',
				bgImageAltText: '',
				bgColor 		  : '',
				bgVideo 		  : '',
				bOverlay 		  : false,
				overlayColor 	: '#fff',
				paddingL 		  : 0,
				paddingR 		  : 0,
				paddingT 		  : 0,
        paddingB 		  : 0,
        marginL 		  : 0,
				marginR 		  : 0,
				marginT 		  : 0,
				marginB 		  : 0
			};
    if (styleObj) {
      blockEditor.paddingL = parseInt(styleObj.paddingLeft.replace('px',''), 10);
      blockEditor.paddingR = parseInt(styleObj.paddingRight.replace('px',''), 10);
      blockEditor.paddingT = parseInt(styleObj.paddingTop.replace('px',''), 10);
      blockEditor.paddingB = parseInt(styleObj.paddingBottom.replace('px',''), 10);
      blockEditor.marginL = parseInt(styleObj.marginLeft.replace('px',''), 10);
      blockEditor.marginR = parseInt(styleObj.marginRight.replace('px',''), 10);
      blockEditor.marginT = parseInt(styleObj.marginTop.replace('px',''), 10);
      blockEditor.marginB = parseInt(styleObj.marginBottom.replace('px',''), 10);
      if (styleObj.backgroundImage !== '' && styleObj.backgroundImage.indexOf('url(') !== -1) {
        blockEditor.bgImage = styleObj.backgroundImage.replace('url("', '').replace('")', '');
        blockEditor.bgOption = 0;
      }
      else {
        blockEditor.bgOption = 1;
      }
      if (styleObj.backgroundColor !== '') {
        blockEditor.bgColor = styleObj.backgroundColor;
      }
      else {
        blockEditor.bgColor = '';
      }
    }
    this.updateBlockEditor(blockEditor);
  }

  /**
   * Locate External editor to target with proper type
   * @param
   * @return 
   */
  setExternalState(target) {
    const shortcode = utils.getDynamicForm(target);
    let externalEditor = {
       showEditor: true,
       shortcode: shortcode
		};
    this.updateExternalEditor(externalEditor);
  }

  /**
   * Show Code Editor
   * @param
   * @return 
   */
  showCodeEditor() {
    let codeEditor = {
      showEditor: true,
      sectionID: this.props.id
    };
    if (this.props.updateCodeEditor) {
      this.props.updateCodeEditor(codeEditor);
    }
  }

  /**
   * Dispatcher for removing template
   * @param
   * @return 
   */

  deleteTemplate() {
    if (this.props.removeTemplate) {
      this.props.removeTemplate();
    }
  }

  /**
   * Dispatcher for storing template
   * @param
   * @return 
   */

  storeTemplate() {
    if (this.props.storeTemplate) {
      this.props.storeTemplate();
    }
  }

  /**
   * Dispatcher for updating Style Editor
   * @param {Object} styleEditor
   * @return 
   */

  updateStyleEditor(styleEditor) {
    this.setState({
      styleEditor:styleEditor
    });
    
    if (this.props.updateStyleEditor) {
      this.props.updateStyleEditor(styleEditor);
    }
  }

  /**
   * Dispatcher for updating Block Editor
   * @param {Object} styleEditor
   * @return 
   */

  updateBlockEditor(blockEditor) {
    this.setState({
      blockEditor:blockEditor
    });
    utils.blockEditorPos(blockEditor.editTarget);
    if (this.props.updateBlockEditor) {
      this.props.updateBlockEditor(blockEditor);
    }
  }

  /**
   * Dispatcher for updating Block Editor
   * @param {Object} styleEditor
   * @return 
   */

  updateExternalEditor(externalEditor) {
    if (this.props.updateExternalEditor) {
      this.props.updateExternalEditor(externalEditor);
    }
  }

  /**
   * Dispatcher for triggering dynamic content editor
   * @param {Object} styleEditor
   * @return 
   */

  triggerPluginEditor(contentType) {
    if (this.props.triggerPluginEditor) {
      this.props.triggerPluginEditor(contentType);
    }
  }

  onMouseOverHandler(event) {
    let target = event.target;
    if (utils.isBlockController(target))
      return;
    // Hover over column elements .col-md-6, .col-md-3, ...
    let column = utils.isElementColumn(target);
    if (column) {
      utils.styleMouseOver(column);
    }
  }

  onMouseOutHandler(event) {
    let target = event.target;
    if (utils.isBlockController(target))
      return;
    let column = utils.isElementColumn(target);
    if (column) {
      utils.styleMouseOut(column);
    }
  }
  /**
   * 
   * @param {*} event 
   */
  onClickHandler(event) {
    event.preventDefault();
    let target = event.target;
    /* Check whether target is dyanmic */
    if (utils.isElementDynamic(target)) {
        this.setExternalState(target);
    }
    /* Check wheter target is column delete */
    else if (utils.isElementColDelete(target)) {
        utils.removeElement(target);
    }
    /* Check whether target is text */
    else if (utils.isElementEditable(target)) {
        this.setStyleState(target, 'text');
    }
    /* Check whether target is icon */
    else if (utils.isElementIcon(target)){
        this.setStyleState(target, 'icon');
    }
    /* Check whether target is menu */
    else if (utils.isElementMenu(target)){
        if (target.contentEditable !== true)
          this.setStyleState(target, 'menu');
    }
    /* Check whether target is list */
    else if (utils.isElementList(target)){
        if (target.contentEditable !== true)
          this.setStyleState(target, 'button');
    }
    /* Check whether target is button */
    else if (utils.isElementButton(target)) {
        this.setStyleState(target, 'button');
    }
    /* Check whether target is anchor */
    else if (utils.isElementAnchor(target)){
        this.setStyleState(target, 'textlink');
    }
    /* Check whether target is image */
    else if (utils.isElementImage(target)) {
        this.setStyleState(target, 'image');
    }
    /* Check for empty click */
    else {
      utils.removeEditable(target);
      this.hideEditor();
    }
  }

  onDblClickHandler(event) {
    let target    = event.target;
    /* Check for block controller */
    if (utils.isBlockController(target, 'setting'))
      return;
    else if (utils.isBlockController(target, 'move'))
      return;
    else if (utils.isBlockController(target, 'trash'))
      return;
    else if (utils.isBlockController(target, 'column'))
      return;
    /* Check whether target is dyanmic */
    else if (utils.isElementDynamic(target)) {
      return;
    }
    /* Check whether target is editable */
    else if (utils.isElementEditable(target)) {
      if (target.contentEditable != 'true')
        utils.setEditable(target);
    }
    /* Check whether target is menu */
    else if (utils.isElementMenu(target)){
      if (target.contentEditable != 'true')
        utils.setEditable(target);
    }
    /* Check whether target is list */
    else if (utils.isElementList(target)){
      if (target.contentEditable != 'true')
        utils.setEditable(target);
    }
  }

  onMouseMoveHandler(event) {
    let target = event.target;
    let dragObj = this.state.templateDrag.dragObj;
    if (this.state.templateDrag.isDrag === true && dragObj != null ) {
      if(event.which != 1) {
        utils.unsetDragPos(dragObj);
        this.setDragState({
          startOffset: null,
          index: -1,
          isDrag:false,
          dragObj:null
        });
      }
      else {
        let startPos = this.state.templateDrag.startOffset;
        let initialOffset = this.state.templateDrag.initialOffset;
        let offset = utils.getDragOffset(event, startPos);
        utils.setDragPos(dragObj, initialOffset, offset);
      }
    }
    else if (target.tagName == 'DIV') { 
      if (target.className.indexOf('col-md-') !== -1) {
        target.setAttribute('draggable', true);
        target.style.cursor = "move";
      } 
    }
  }

  onMouseUpHandler(event) {
    let dragObj = this.state.templateDrag.dragObj;
    if (dragObj != null) {
      dragObj.setAttribute('draggable', false);
      utils.unsetDragPos(dragObj);
      this.setDragState({
        startOffset: null,
        index: -1,
        isDrag:false,
        dragObj:null
      });
    }
  }

  onDragStartHandler(event) {
    let target = event.target;
    let dragObj = this.state.templateDrag.dragObj;
    if (this.state.templateDrag.isDrag == true && dragObj != null ) {
      const data = {
        type    : 'templateUpdate',
        index   : this.state.templateKey
      };
      event.dataTransfer.setData("drag_item", JSON.stringify(data));
      event.dataTransfer.dropEffect = "move";
    }
    else {
      event.preventDefault();
    }
  }

  onDragEndHandler(event) {
    let dragObj = this.state.templateDrag.dragObj;
    if (dragObj != null) {
      dragObj.setAttribute('draggable', false);
      utils.unsetDragPos(dragObj);
      this.setDragState({
        startOffset: null,
        index: -1,
        isDrag:false,
        dragObj:null
      });
    }
  }

  async renderFromUrl(shortcode) {
    if (this.props.loadPrepare) {
      this.props.loadPrepare();
    }
    let config = {
      'credentials': 'same-origin',
      'mode': 'no-cors',
      'method': 'GET',
      'headers': { 'Content-Type':'text/html' }
    };

    const data = await fetch(this.props.url, config);
    const html = await data.text();
    if (this.props.loadComplete) {
      this.props.loadComplete();
    }
    if (html != '') {
      const container = ReactDOM.findDOMNode(this.refs.container);
      if (this.props.dynamic == "true") {
        let dynamicContainer = document.createElement('DIV');
        let dynamicCover = document.createElement('DIV');
        dynamicContainer.innerHTML = html;
        dynamicContainer.setAttribute('class', '_vb_dynamic-element container_dynamic');
        dynamicContainer.setAttribute('data-url', this.props.url);
        if (typeof shortcode !== 'undefined') {
          const code = atob(shortcode.toString());
          let regex = /id="([^"]+)"/i;
          let match = regex.exec(code);
          let editUrl = '';
          const id = match[1];
          if (code.indexOf('form') !== -1) {
            editUrl = editDynamicForm + id;
          }
          else if (code.indexOf('block') !== -1) {
            editUrl = editStaticBlock + id;			
          }
          else if (code.indexOf('post') !== -1) {
            if (code.indexOf('Blog') !== -1) {
              editUrl = editPost + id;
            }
            else if (code.indexOf('Event') !== -1) {
              editUrl = editEvent + id;
            }
            else if (code.indexOf('Promotion') !== -1) {
              editUrl = editPromotion + id;
            }
            else {
              editUrl = editPost + id;
            }
          }
          else if (code.indexOf('slider') !== -1) {
            editUrl = editSlider + id;
          }
          dynamicContainer.setAttribute('data-title', code);
          dynamicContainer.setAttribute('data-editurl', editUrl);
          dynamicContainer.setAttribute('label', shortcode);
          dynamicCover.setAttribute('class', '_vb_dynamic-cover');
          dynamicContainer.insertBefore(dynamicCover, dynamicContainer.firstChild);
          container.appendChild(dynamicContainer);
        }
        else {
          container.innerHTML = dynamicContainer.innerHTML;
        }        
      }
      else {
        let htmlDom = document.createElement('html');
        htmlDom.innerHTML = html;
        let page = htmlDom.getElementsByTagName('body')[0];
        let scripts = page.getElementsByTagName('script');
        for(let script of scripts) {
          script.remove();
        }
        if (page && page.innerHTML !== '') {
          container.innerHTML = page.innerHTML;
        } else {
          container.innerHTML = html;
        }
        
      }
      
    }
  }

  render () {
    return (
      <div>
        {this.state.showController && (this.props.dynamic != "true") &&
          <div className="_vb_block-ctrler btn-group">
            <a className="_vb_ctrler-item btn move"><i className="fa fa-arrows-v move _vb_ctrler-item"></i></a>
            <a className="_vb_ctrler-item btn code" onClick={this.showCodeEditor.bind(this)}><i className="fa fa-code code _vb_ctrler-item"></i></a>
            <a className="_vb_ctrler-item btn save" onClick={this.storeTemplate.bind(this)}><i className="fa fa-save save _vb_ctrler-item"></i></a>
            <a className="_vb_ctrler-item btn trash" onClick = {this.deleteTemplate.bind(this)}><i className="fa fa-trash-o trash _vb_ctrler-item"></i></a>
          </div>
        }
        {this.state.showController && this.props.dynamic == "true" && (this.props.header != "true" && this.props.footer != "true") &&
        <div className="_vb_block-ctrler btn-group">
          <a className="_vb_ctrler-item btn move"><i className="fa fa-arrows-v move _vb_ctrler-item"></i></a>
          <a className="_vb_ctrler-item btn trash" onClick = {this.deleteTemplate.bind(this)}><i className="fa fa-trash-o trash _vb_ctrler-item"></i></a>
        </div>
      }
        <div
        className = "template-container"
        ref="container"
        onClick={this.onClickHandler.bind(this)}
        onMouseOver={this.onMouseOverHandler.bind(this)}
        onMouseOut={this.onMouseOutHandler.bind(this)}
        onDoubleClick={this.onDblClickHandler.bind(this)}
        >
        </div>
        {this.state.isLoading &&
          <div className = "template-loader" >
            <span>{'{'}</span>
            <span>{'}'}</span>
          </div>}
      </div>
    );
  }
}
