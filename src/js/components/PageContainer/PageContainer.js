import './PageContainer.scss';

import React, { Component, PropTypes } from 'react';
import closest from 'dom-closest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import { pageActions,
		externalActions,
		imagelibraryActions } from '../../actions';
import { ButtonStyleComponent,
		MenuStyleComponent,
		IconStyleComponent,
		TextStyleComponent,
		TextLinkEditorComponent,
		ImageStyleComponent,
		BlockComponent,
		BlockStyleComponent,
		CodeEditorComponent,
		ExternalEditComponent,
		PageListComponent,
		IFrameComponent } from '../../components';
import * as utils from '../../utils';
import {builderSrc} from '../../constants/urlNames';

class PageContainer extends Component {
	static propTypes = {	
		pageName		:PropTypes.number,				// e.g 1,2
		pageTitle 		:PropTypes.string.isRequired,
		blockList		:PropTypes.array.isRequired,	// e.g {{id:'2-0', url:'elements/header.html', html:'<div>...</div>'}}
		headerString 	:PropTypes.string,
		recentId		:PropTypes.string,				// e.g "9-1" whereas 9 is template type index and 1 is template index
		isLoading		:PropTypes.bool,				// true or false
		isMenuFetching  :PropTypes.bool,
		externals 		:PropTypes.array,
		globals			:PropTypes.array,
		loadHead 		:PropTypes.func.isRequired,
		loadExternal	:PropTypes.func.isRequired,
		loadGlobal		:PropTypes.func.isRequired,
		closeSideMenu   :PropTypes.func.isRequired,
		updateTemplate	:PropTypes.func.isRequired,
		getTemplate 	:PropTypes.func.isRequired,
		addTemplate		:PropTypes.func.isRequired,
		storeTemplate   :PropTypes.func.isRequired,
		removeTemplate	:PropTypes.func.isRequired,
		changeOrderTemplate:PropTypes.func.isRequired,
		loadImages 		: PropTypes.func.isRequired,
		uploadImage 	: PropTypes.func.isRequired,
		removeUploadedImage: PropTypes.func.isRequired,
		imagelibrary 	: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			blockList : [],
			loadedBlock: [],
			headerString : '',
			isFrameLoading : true,
			externalEditor : {
				showEditor : false,
				shortcode : {}
			},
			globalEditor : {
				showEditor : false
			},
			codeEditor : {
				showEditor : false,
				sectionID : ''
			},
			styleEditor : {
				direction 	: 'top',
				blockKey 	: -1,
				editorType	: '',
				editTarget  : null,
				fontSize   	: 12,
				fontColor  	: {r:'0', g:'0', b:'0', a:'1'},
				fontName 	: 'Open Sans',
				fontWeight	: false,
				fontStyle	: false,
				iconValue	: {},
				linkValue	: {},
				imageValue	: '',
				imageAltText: '',
				alignMode	: 0
			},
			blockEditor : {
				showEditor 		: false,
				editTarget 		: null,
				direction 		: 'top',
				bgOption 		: 0,
				bgImage 		: '',
				bgImageAltText 	: '',
				bgColor 		: {r:'255', g:'255', b:'255', a:'1'},
				bgVideo 		: '',
				bOverlay 		: false,
				overlayColor 	: {r:'255', g:'255', b:'255', a:'1'},
				paddingL 		: 0,
				paddingR 		: 0,
				paddingT 		: 0,
				paddingB 		: 0
			}
		};
	}

	componentDidMount() {
		this.loadHead();
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.blockList !== nextProps.blockList) {
			this.setState({
				blockList:nextProps.blockList
			});
			if (nextProps.blockList.length == 0 || this.state.loadedBlock.length === 0) {
				this.setState({
					isFrameLoading: false
				});
			}
			else if (this.state.loadedBlock.length !== 0) {
				this.setState({
					isFrameLoading: true
				});
			}
		}
		if (this.state.headerString !== nextProps.headerString) {
			this.setState({
				headerString:nextProps.headerString
			});
		}
	}

	componentDidUpdate(prevProps, prevState){
		if (this.state !== prevState){
			let styleEditor = this.state.styleEditor;
			let blockEditor = this.state.blockEditor;
			if (this.styleEditor !== prevState.styleEditor) {
				utils.contentUpdate(styleEditor);
			}
			utils.sectionUpdate(blockEditor);
			utils.styleEdit(styleEditor);
			utils.styleEditorPos(styleEditor.editTarget, styleEditor.direction);
		}
			
	}

	componentWillUnmount() {
		ReactDOM.findDOMNode(this.refs.iframeRef).contentWindow.document.removeEventListener('updateOrder',  this.onUpdateHandler.bind(this));
	}

	/* Dispatchers */
	
	/**
	 * Update Redux Store with latest content
	 * @param  {String} id
	 * @param  {Number} index
	 */
	updateTemplate(id, index) {
		let idocument = utils.getFrameHandler();
		let template = idocument.getElementById(id);
		if (template.children[0] && template.children[0].children.length >= 2){
			let page = template.children[0].children[1];
			if (template && this.props.updateTemplate) {
				this.props.updateTemplate(id, index, page.innerHTML);
			}
		}
	}
	/**
	 * Update Redux Store with latest content
	 * @param  {String} id
	 * @param  {Number} index
	 */
	getTemplate(index, url) {
		this.setState({
			isFrameLoading: true
		});
		if (this.props.updateTemplate) {
			this.props.getTemplate(index, url);
		}
	}
	/**
	 * Change Template Order
	 * @param  {String} id
	 * @param  {Number} index
	 * @param  {Number} destIndex
	 */
	changeOrderTemplate(index, destIndex) {
		if (this.props.changeOrderTemplate) {
			this.props.changeOrderTemplate(index, destIndex);
		}
	}
	/**
	 * Add Template Using Template Url and Index
	 * @param  {String} id
	 * @param  {Number} index
	 * @param  {Object} block
	 */
	addTemplate(id, index, block) {
		this.setState({
			isFrameLoading: true
		});
		if (this.props.addTemplate) {
			this.props.addTemplate(id, index, block);
		}
	}
	/**
	 * Remove Template with Index
	 * @param  {Number} index
	 */
	removeTemplate(index) {
		this.setState({
			isFrameLoading: true
		});
		if (this.props.removeTemplate) {
			this.props.removeTemplate(index);
		}
	}

	/**
	 * Store Template with ID
	 * @param  {Number} ID
	 */
	storeTemplate(id) {
		this.setState({
			isFrameLoading: true
		});
		const html = utils.getSourceCode(id);
		if (this.props.storeTemplate) {
			this.props.storeTemplate(html);
		}
	}

	loadHead() {
		if (this.props.loadHead) {
			this.props.loadHead();
		}
	}

	loadExternal() {
		if (this.props.loadExternal) {
			this.props.loadExternal();
		}
	}

	loadGlobal() {
		if (this.props.loadGlobal) {
			this.props.loadGlobal();
		}
	}

	closeSideMenu() {
		if (this.props.closeSideMenu) {
			this.props.closeSideMenu();
		}
	}

	/**
	 * Hide Style Editor
	 * @param  
	 */
	hideEditor() {
		let styleEditor = Object.assign({}, this.state.styleEditor);
		let blockEditor = Object.assign({}, this.state.blockEditor);
		styleEditor.editorType = '';
		blockEditor.showEditor = false;
		this.setState({
			styleEditor : styleEditor,
			blockEditor : blockEditor
		});
	}

	/**
	 * Hide Block Editor Modal
	 * @param
	 */
	onHideBlockEditor(blockStyle) {
		let blockEditor = blockStyle;

		// let blockEditor = Object.assign({}, this.state.blockEditor);
		blockEditor.showEditor = false;
		this.setState({
			blockEditor : blockEditor
		});
	}

	/**
	 * Update Inner State
	 * @param  {Object} styleEditor
	 */
	updateStyleEditor(styleEditor){
		this.setState({
			styleEditor:styleEditor
		});
	}

	/**
	 * Update External Editor
	 * @param  {Object} externalEditor
	 */
	updateExternalEditor(externalEditor){
		this.setState({
			externalEditor:externalEditor
		});
	}

	/**
	 * Update Global Editor
	 * @param  {Object} globalEditor
	 */
	updateGlobalEditor(globalEditor){
		this.setState({
			globalEditor:globalEditor
		});
	}

	/**
	 * Update Inner State
	 * @param  {Object} blockEditor
	 */
	updateBlockEditor(blockEditor){
		this.setState({
			blockEditor:blockEditor
		});
	}

	/**
	 * Update Handler
	 * @param {Event} event 
	 */
	onUpdateHandler(event){
		let startIndex = event.detail.dragStartIndex;
		let destIndex = event.detail.dragNewIndex;
		this.changeOrderTemplate(startIndex, destIndex);
	}

	/**
	 * On Load Handler
	 * @param  {Object} event
	 */
	onLoadHandler() {
		ReactDOM.findDOMNode(this.refs.iframeRef).contentWindow.document.addEventListener('updateOrder',  this.onUpdateHandler.bind(this));
		this.setState({
			isFrameLoading:false
		});
	}

	/**
	 * On Drop Event Handler
	 * @param  {Object} event
	 */
	onDropHandler(event) {
		event.preventDefault();
		let idocument, dragObj, dragData, pageList, target, nextTarget,
			pageArray, childIndex, destIndex, dragIndex;

		idocument = utils.getFrameHandler();
		pageList = utils.getPageList();

		if (event.dataTransfer.getData("drag_item") === '') return;
		dragData = JSON.parse(event.dataTransfer.getData("drag_item"));

		if (pageList.childElementCount && pageList.childElementCount == 0) {  
			this.addTemplate(dragData.index, -1, dragData);
		}
		else {
			target = event.target;
			nextTarget = target.nextSibling;
			dragIndex = parseInt(dragData.index);
			if (nextTarget && Array.prototype.slice.call(pageList.children)) {
				pageArray = Array.prototype.slice.call(pageList.children);
				childIndex = pageArray.indexOf(nextTarget);
				if (typeof nextTarget.getAttribute !== 'undefined'){
					destIndex = parseInt(nextTarget.getAttribute('data-key'));
					if (dragIndex < destIndex)
						destIndex = destIndex - 1;
				}
				if (childIndex == -1) {
					if (dragData.type == 'templateAdd')
						this.addTemplate(dragData.index, -1, dragData); 
					else if(dragData.type == 'templateUpdate')
						this.changeOrderTemplate(dragIndex, -1);
				}
				else {
					if (dragData.type == 'templateAdd')
						this.addTemplate(dragData.index, childIndex - 1, dragData);
					else if(dragData.type == 'templateUpdate')
						this.changeOrderTemplate(dragIndex, destIndex);
				}
			}
			else {
			if (dragData.type == 'templateAdd')
				this.addTemplate(dragData.index, -1, dragData); 
			else if(dragData.type == 'templateUpdate')
				this.changeOrderTemplate(dragIndex, -1);
			}
		}

		this.hideEditor();
		this.closeSideMenu();

		dragObj = idocument.getElementById(dragData.index);
		if (dragObj)
			dragObj.setAttribute('draggable', false);

		utils.removePlaceHolder();
		document.getElementById('frameWrapper').height = parseInt(document.getElementById('frameWrapper').height - 100) + 'px';
	}
	/**
	 * On Drag Over Event Handler
	 * @param  {Object} event
	 */
	onDragOverHandler(event) {
		event.preventDefault();
		let pageList, target, placeHolder, nearLi, oldPlaceHolders;

		pageList = utils.getPageList();

		if (pageList && pageList.childElementCount && pageList.childElementCount == 0) {  // add placeholder at the end of template list
			pageList.appendChild(utils.addPlaceHolder());
		}
		else {  
			target = event.target;
			placeHolder = utils.addPlaceHolder();
			nearLi = closest(target, '.template_list');         					// find nearest template from the dragging element
			if (pageList) {
				oldPlaceHolders = pageList.getElementsByClassName('template_placeholder');
			}
			else {
				oldPlaceHolders = [];
			}
			if (target.className == 'page_list' && oldPlaceHolders.length == 0) {	// not found, add at the end of template list
				pageList.appendChild(placeHolder);
			}
			else if (nearLi){ //found!
				if (placeHolder && placeHolder.nextSibling && placeHolder.nextSibling == nearLi) {/**/} // holder already exist on dest
				else {                                // insert placeholder before the nearest li
					utils.removePlaceHolder();
					pageList.insertBefore(placeHolder, nearLi);
				}
			}
			else if (oldPlaceHolders.length == 0) {                // dragging target is not even on page list area
				pageList.appendChild(placeHolder);
			}
		}
		utils.dragScroll(event.target);
	}
	/**
	 * On Drag End Event Handler
	 * @param  {} event
	 */
	onDragEndHandler() {
		utils.removePlaceHolder();        // remove placeholder on drag end
	}

	/* Style Editor Event Handlers */
	/**
	 * On Choose Align Mode Event From Style Editor
	 * @param  {Number} alignMode
	 */
	onChooseAlignMode(alignMode) {
		let styleEditor = {...this.state.styleEditor};
		styleEditor.alignMode = alignMode;
		this.setState({
			styleEditor:styleEditor
		});
	}
	/**
	 * On Choose Font Family Event From Style Editor
	 * @param  {String} fontFamily
	 */
	onChooseFont(fontFamily){
		let styleEditor = {...this.state.styleEditor};
		styleEditor.fontName = fontFamily;
		this.setState({
			styleEditor:styleEditor
		});
	}
	/**
	 * On Choose Font Size Event From Style Editor
	 * @param  {Number} fontSize
	 */
	onChooseFontSize(fontSize){
		let styleEditor = {...this.state.styleEditor};
		styleEditor.fontSize = fontSize;
		this.setState({
			styleEditor:styleEditor
		});
	}
	/**
	 * On Choose Color Event From Style Editor
	 * @param  {String} fontColor
	 */
	onChooseColor(fontColor){
		let styleEditor = {...this.state.styleEditor};
		styleEditor.fontColor = fontColor;
		this.setState({
			styleEditor:styleEditor
		});
	}
	/**
	 * On Choose Icon Event From Style Editor
	 * @param  {Object} iconValue
	 */
	onChooseIcon(iconValue){
		let styleEditor = {...this.state.styleEditor};
		styleEditor.iconValue = iconValue;
		this.setState({
			styleEditor:styleEditor
		});
	}
	/**
	 * On Change Link Event From Style Editor
	 * @param  {Object} linkValue
	 */
	onChangeLink(linkValue){
		let styleEditor = {...this.state.styleEditor};
		styleEditor.linkValue = linkValue;
		this.setState({
			styleEditor:styleEditor
		});
	}
	/**
	 * On Choose Image Event From Style Editor
	 * @param  {String} imageValue
	 */
	onChooseImage(imageValue, imageAltText){
		let styleEditor = {...this.state.styleEditor};
		styleEditor.imageValue 		= imageValue;
		styleEditor.imageAltText 	= imageAltText;
		this.setState({
			styleEditor:styleEditor
		});
	}
	/**
	 * On Toggle Bold Event From Style Editor
	 * @param  {String} fontWeight
	 */
	onToggleBold(fontWeight){
		let styleEditor = {...this.state.styleEditor};
		styleEditor.fontWeight = fontWeight;
		this.setState({
			styleEditor:styleEditor
		});
	}
	/**
	 * On Toggle Italic Event From Style Editor
	 * @param  {String} fontStyle
	 */
	onToggleItalic(fontStyle){
		let styleEditor = {...this.state.styleEditor};
		styleEditor.fontStyle = fontStyle;
		this.setState({
			styleEditor:styleEditor
		});
	}
	/**
	 * On Click Add Event From Style Editor
	 * @param  {String} 
	 */
	onClickAdd(){
		let target = this.state.styleEditor.editTarget;
		utils.duplicateElement(target);
	}
	/**
	 * On Click Add Event From Style Editor
	 * @param  {String} 
	 */
	onInsertExternal(shortcode){
		if (this.state.styleEditor.editTarget == null) {
			return false;
		}
		const target = this.state.styleEditor.editTarget;
		this.setState({
			isFrameLoading:true
		});
		this.insertShortCode(shortcode.url).then((html) => {
			if (html != '') {
				if (target) {
					utils.addShortcode(target, shortcode.shortcode, html);
				}
			}
			this.setState({
				isFrameLoading: false
			});
			this.hideEditor();
		});
		return false;
		//let target = this.state.styleEditor.editTarget;
		//utils.duplicateElement(target);
	}
	/**
	 * On Click Add Event From Style Editor
	 * @param  {String} 
	 */
	onInsertGlobal(slug){
		if (this.state.styleEditor.editTarget === null) {
			return false;
		}
		if (slug.cs_key === null) {
			return false;
		}
		const target = this.state.styleEditor.editTarget;
		utils.addSlug(target, slug.cs_key);
		this.hideEditor();
		return false;
	}
	/**
	 * On Click Remove Event From Style Editor
	 * @param  {String} 
	 */
	onClickRemove(){
		let target = this.state.styleEditor.editTarget;
		utils.removeElement(target);
		this.hideEditor();
	}
	/**
	 * 	On Change Block Bg Image
	 * @param {String} background src
	 * @param {String} image alt
	 */
	onChooseBgImage(bgImage, bgImageAltText) {
		let blockEditor = Object.assign({}, this.state.blockEditor);
		blockEditor.bgImage 		= bgImage;
		blockEditor.bgImageAltText 	= bgImageAltText;
		this.setState({
			blockEditor:blockEditor
		});
	}

	/**
	 * On Choose Background Color
	 * @param {String} hex value
	 */
	onChooseBgColor(bgColor) {
		let blockEditor = Object.assign({}, this.state.blockEditor);
		blockEditor.bgColor = bgColor;
		this.setState({
			blockEditor:blockEditor
		});
	}

	/**
	 * On Choose Background Video
	 * @param {String} src of the video
	 */
	onChooseBackgroundVideo(bgVideo) {
		let blockEditor = Object.assign({}, this.state.blockEditor);
		blockEditor.bgVideo = bgVideo;
		this.setState({
			blockEditor:blockEditor
		});
	}

	/**
	 * On Choose Overlay Color
	 * @param {String} hex value of the color
	 */
	onChooseOverlayColor(overlayColor) {
		let blockEditor = Object.assign({}, this.state.blockEditor);
		blockEditor.overlayColor = overlayColor;
		this.setState({
			blockEditor:blockEditor
		});
	}

	/**
	 * On Change Padding
	 * @param {Integer} Padding left
	 * @param {Integer} Padding right
	 * @param {Integer} Padding top
	 * @param {Integer} Padding bottom
	 */
	
	onChangePadding(paddingL, paddingR, paddingT, paddingB) {
		let blockEditor = [...this.state.blockEditor];
		blockEditor.paddingL = paddingL;
		blockEditor.paddingR = paddingR;
		blockEditor.paddingT = paddingT;
		blockEditor.paddingB = paddingB;
		this.setState({
			blockEditor:blockEditor
		});
	}

	/**
	 * On Apply Change the styles
	 * @param all state.
	 *
	*/
	onApplyChanges(blockStyle) {
		let blockEditor = blockStyle;

		this.updateBlockEditor(blockEditor);
	}

	updateCodeEditor(codeEditor) {
		this.setState({
			codeEditor:codeEditor
		});
	}

	onCloseCodeEditor() {
		let codeEditor = {...this.codeEditor};
		codeEditor.showEditor = false;
		this.updateCodeEditor(codeEditor);
	}

	onCloseExternalEditor() {
		let externEditor = {...this.externalEditor};
		externEditor.showEditor = false;
		this.updateExternalEditor(externEditor);
	}

	onCloseGlobalEditor() {
		let globalEditor = {...this.globalEditor};
		globalEditor.showEditor = false;
		this.updateGlobalEditor(globalEditor);
	}

	loadPrepare(index) {
		let loadedBlock = [...this.state.loadedBlock];
		if (loadedBlock.indexOf(index) === -1) {
			loadedBlock.push(index);
			this.setState({
				isFrameLoading:true,
				loadedBlock:loadedBlock
			});
		}
	}

	loadBlockComplete(index) {
		let loadedBlock = [...this.state.loadedBlock];
		if (loadedBlock.indexOf(index) !== -1) {
			let pos = loadedBlock.indexOf(index);
			loadedBlock.splice(pos, 1);
			if (loadedBlock.length == 0) {
				this.setState({
					isFrameLoading: false,
					loadedBlock:loadedBlock
				});
			}
			else {
				this.setState({
					loadedBlock:loadedBlock
				});
			}
			
		}
	}

	async insertShortCode(url) {
		let config = {
			'credentials': 'same-origin',
			'mode': 'no-cors',
			'method': 'GET',
			'headers': { 'Content-Type':'text/html' }
		};
		const data = await fetch(url, config);
		//const data = await fetch('module.json', config);
		const html = await data.text();
		return html;
	}

	renderBlocks(){
		return this.state.blockList.map((block, index) => (
			<li className={'template_list block_' + block.id} id={block.id} key={block.id} data-dynamic={block.dynamic?'true':'false'}>
				<BlockComponent
					url={block.url}
					shortcode={block.dynamic?block.shortcode:''}
					dynamic={block.dynamic?'true':'false'}
					header={block.header?'true':'false'}
					footer={block.footer?'true':'false'}
					id={block.id}
					top={index==0}
					removeTemplate={this.removeTemplate.bind(this, index)}
					storeTemplate={this.storeTemplate.bind(this, block.id)}
					updateStyleEditor={this.updateStyleEditor.bind(this)}
					updateBlockEditor={this.updateBlockEditor.bind(this)}
					updateExternalEditor={this.updateExternalEditor.bind(this)}
					updateGlobalEditor={this.updateGlobalEditor.bind(this)}
					updateCodeEditor={this.updateCodeEditor.bind(this)}
					hideEditor={this.hideEditor.bind(this)}
					loadPrepare={this.loadPrepare.bind(this, block.id)}
					loadComplete={this.loadBlockComplete.bind(this, block.id)}
				/>
			</li>));
	}

	createMarkup() { return {__html: this.state.headerString}; }

	renderHeader() {
		return utils.headerAssets.map((element, index) => {
			if (element.type == 'style')
				return <link type='text/css' rel='stylesheet' href={element.src} key={index} />
		});
	}

	render() {
		const { pageId, isMenuFetching } = this.props;
		const styleEditor = this.state.styleEditor;
		const blockEditor = this.state.blockEditor;
		const codeEditor = this.state.codeEditor;
		const externalEditor = this.state.externalEditor;
		return (
			<div>
				{(this.state.isFrameLoading == true || isMenuFetching) &&
				<div className="template-loader" >
					<span>{'{'}</span>
					<span>{'}'}</span>
				</div>}
				<IFrameComponent
					ref='iframeRef'
					url={builderSrc}
					onLoad={this.onLoadHandler.bind(this)}
				>
					<div dangerouslySetInnerHTML={this.createMarkup()} />
					<PageListComponent
						ref = "pageList"
						pageId = {pageId}
						onDragOver={(event) => this.onDragOverHandler(event)}
						onDragEnd={(event) => this.onDragEndHandler(event)}
						onDragExit={(event) => this.onDragExitHandler(event)}
						onDrop={(event) => this.onDropHandler(event)}
					>
					{this.renderBlocks()}
					</PageListComponent>
					<div id="sectionSetting">
					{blockEditor.showEditor &&
						<BlockStyleComponent 
							direction 		= {blockEditor.direction}
							blockEditor 	= {blockEditor}							
							onApplyChanges	= {this.onApplyChanges.bind(this)}
							onHideBlockEditor = {this.onHideBlockEditor.bind(this)}
							imagelibrary 	= {this.props.imagelibrary}
							loadImages 		= {this.props.loadImages}
							uploadImage 	= {this.props.uploadImage}
							removeUploadedImage = {this.props.removeUploadedImage}
						/>}
					</div>
					<div id="externalEditor">
					{externalEditor.showEditor &&
						<ExternalEditComponent
							shortcode = {externalEditor.shortcode}
							onClose = {this.onCloseExternalEditor.bind(this)}
						/>}
					</div>
					<div id="codeEditor">
					{codeEditor.showEditor &&
						<CodeEditorComponent
							sectionID = {codeEditor.sectionID}
							onClose = {this.onCloseCodeEditor.bind(this)}
						/>}
					</div>		
					<div id = "styleEditor">
					{styleEditor.editorType == 'text' &&
						<TextStyleComponent
							fontName  = {styleEditor.fontName}
							fontSize  = {styleEditor.fontSize}
							fontColor = {styleEditor.fontColor}
							alignMode = {styleEditor.alignMode}
							direction = {styleEditor.direction}
							externals = {this.props.externals}
							globals = {this.props.globals}
							onChooseAlignMode= {this.onChooseAlignMode.bind(this)}
							onChooseFont 	= {this.onChooseFont.bind(this)}
							onChooseFontSize= {this.onChooseFontSize.bind(this)}
							onChooseColor 	= {this.onChooseColor.bind(this)}
							onClickAdd 		= {this.onClickAdd.bind(this)}
							onClickRemove 	= {this.onClickRemove.bind(this)}
							onInsertExternal = {this.onInsertExternal.bind(this)}
							onInsertGlobal = {this.onInsertGlobal.bind(this)}
							loadExternal = {this.loadExternal.bind(this)}
							loadGlobal 	= {this.loadGlobal.bind(this)}
						/>}
					{styleEditor.editorType == 'button' &&
						<ButtonStyleComponent
							fontName  = {styleEditor.fontName}
							fontSize  = {styleEditor.fontSize}
							fontColor = {styleEditor.fontColor}
							alignMode = {styleEditor.alignMode}
							iconValue = {styleEditor.iconValue}
							linkValue = {styleEditor.linkValue}
							direction = {styleEditor.direction}
							onChooseAlignMode= {this.onChooseAlignMode.bind(this)}
							onChooseFont 	= {this.onChooseFont.bind(this)}
							onChooseFontSize= {this.onChooseFontSize.bind(this)}
							onChooseColor 	= {this.onChooseColor.bind(this)}
							onClickAdd 		= {this.onClickAdd.bind(this)}
							onClickRemove 	= {this.onClickRemove.bind(this)}
							onChooseIcon 	= {this.onChooseIcon.bind(this)}
							onChangeLink 	= {this.onChangeLink.bind(this)}
						/>}
					{styleEditor.editorType == 'icon' && 
						<IconStyleComponent
							fontSize  = {styleEditor.fontSize}
							fontColor = {styleEditor.fontColor}
							iconValue = {styleEditor.iconValue}
							direction = {styleEditor.direction}
							onChooseFontSize= {this.onChooseFontSize.bind(this)}
							onChooseColor 	= {this.onChooseColor.bind(this)}
							onClickAdd 		= {this.onClickAdd.bind(this)}
							onClickRemove 	= {this.onClickRemove.bind(this)}
							onChooseIcon 	= {this.onChooseIcon.bind(this)}
						/>}
					{styleEditor.editorType == 'menu' &&
						<MenuStyleComponent
							fontName  = {styleEditor.fontName}
							fontSize  = {styleEditor.fontSize}
							fontColor = {styleEditor.fontColor}
							iconValue = {styleEditor.iconValue}
							linkValue = {styleEditor.linkValue}
							direction = {styleEditor.direction}
							onChooseFont 	= {this.onChooseFont.bind(this)}
							onChooseFontSize= {this.onChooseFontSize.bind(this)}
							onChooseColor 	= {this.onChooseColor.bind(this)}
							onClickAdd 		= {this.onClickAdd.bind(this)}
							onClickRemove 	= {this.onClickRemove.bind(this)}
							onChooseIcon 	= {this.onChooseIcon.bind(this)}
							onChangeLink 	= {this.onChangeLink.bind(this)}
						/>}
					{styleEditor.editorType == 'textlink' &&
						<TextLinkEditorComponent
							bold 			= {styleEditor.fontWeight}
							italic 			= {styleEditor.fontStyle}
							linkValue 		= {styleEditor.linkValue} 
							direction 		= {styleEditor.direction}
							onToggleBold	= {this.onToggleBold.bind(this)}
							onToggleItalic 	= {this.onToggleItalic.bind(this)}
							onChangeLink 	= {this.onChangeLink.bind(this)}
						/>}
					{styleEditor.editorType == 'image' &&
						<ImageStyleComponent
							iconValue 	= {styleEditor.iconValue}
							imageValue 	= {styleEditor.imageValue}
							imageAltText= {styleEditor.imageAltText}
							linkValue 	= {styleEditor.linkValue} 
							direction 	= {styleEditor.direction}
							imagelibrary= {this.props.imagelibrary}
							loadImages  ={this.props.loadImages}
							uploadImage ={this.props.uploadImage}
							removeUploadedImage={this.props.removeUploadedImage}
							onChooseImage= {this.onChooseImage.bind(this)}
							onChooseIcon = {this.onChooseIcon.bind(this)}
							onChangeLink = {this.onChangeLink.bind(this)}
						/>}
					</div>
				</IFrameComponent>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
  return {
    changeOrderTemplate	: bindActionCreators(pageActions.changeOrderTemplate, dispatch),
    addTemplate			: bindActionCreators(pageActions.insertTemplate, dispatch),
	getTemplate			: bindActionCreators(pageActions.getTemplateRequest, dispatch),
	removeTemplate		: bindActionCreators(pageActions.deleteTemplate, dispatch),
	storeTemplate		: bindActionCreators(pageActions.storeTemplate, dispatch),
    updateTemplate		: bindActionCreators(pageActions.updateTemplate, dispatch),
	loadHead 			: bindActionCreators(pageActions.insertHeadRequest, dispatch),
	loadExternal 		: bindActionCreators(externalActions.getExternalRequest, dispatch),
	loadGlobal	 		: bindActionCreators(externalActions.getGlobalRequest, dispatch),
	loadImages 			: bindActionCreators(imagelibraryActions.requestImageLibrary, dispatch),
    uploadImage 		: bindActionCreators(imagelibraryActions.requestImageUpload, dispatch),
    removeUploadedImage : bindActionCreators(imagelibraryActions.requestImageRemove, dispatch)
  };
}

function mapStateToProps(state) {
  return {
	headerString : state.page.present.headerString,
	imagelibrary : state.imagelibrary.present,
	externals 	 : state.external.present.externals,
	globals		: state.external.present.globals
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);
