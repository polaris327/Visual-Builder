import './LeftMenuComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Alert, Row, Col, Checkbox, ControlLabel, Accordion, Panel, FormGroup,
        FormControl, Modal, Image, DropdownButton, MenuItem, Button, Radio, HelpBlock } from 'react-bootstrap';
import { ExternalEditComponent } from '../../components';
import { ROUTE_BASE_URL, globalSetting } from '../../constants/urlNames';
import * as utils from '../../utils';

export default class LeftMenuComponent extends Component {

  static propTypes = {
    loadTemplate:PropTypes.func.isRequired,
    loadPages   :PropTypes.func.isRequired,
    templates   :PropTypes.object,
    pages       :PropTypes.array,
    isFetching  :PropTypes.bool,
    isOpen      :PropTypes.bool.isRequired,
    onCreatePage :PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      templates   : {},
      pages       : {},
      isFetching  : (typeof this.props.isFetching !== 'undefined')?this.props.isFetching:false,
      isOpen      : (typeof this.props.isOpen !== 'undefined')?this.props.isOpen:false,
      globeSetting : {
        show : false,
        editUrl: globalSetting,
        title: 'Global Settings'
      }
    };
  }

  componentDidMount(){
    this.loadTemplate();
    this.loadPages();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isOpen != nextProps.isOpen){
      this.setState({
        isFetching  : (typeof nextProps.isFetching !== 'undefined')?nextProps.isFetching:false,
        isOpen      : (typeof nextProps.isOpen !== 'undefined')?nextProps.isOpen:false
      });
    }
    if (this.state.templates !== nextProps.templates) {
      this.setState({
        templates: nextProps.templates
      });
    }

    if (this.state.pages !== nextProps.pages) {
      this.setState({
        pages: nextProps.pages
      });
    }
  }

  componentDidUpdate() {

  }

  loadTemplate() {
    if (this.props.loadTemplate) {
      this.props.loadTemplate();
    }
  }

  loadPages() {
    if (this.props.loadPages) {
      this.props.loadPages();
    }
  }

  onDragStartHandler(event) {
    let target = event.target;
    let data = {}; 
    if (target.getAttribute('data-dynamic') == 'true') {
      data = {
        type  : 'templateAdd',
        url   : target.getAttribute('data-template'),
        dynamic : true,
        shortcode : target.getAttribute('data-shortcode'),
        index : target.getAttribute('data-index')
      };
    }
    else {
      data = {
        type  : 'templateAdd',
        url   : target.getAttribute('data-template'),
        dynamic : false,
        shortcode : '',
        index : target.getAttribute('data-index')
      };
    }
    
    event.dataTransfer.setData("drag_item", JSON.stringify(data));
    event.dataTransfer.dropEffect = "copy";

    document.getElementById('frameWrapper').height = parseInt(document.getElementById('frameWrapper').height + 100) + 'px';
  }

  onDragEndHandler(event) {
    utils.removePlaceHolder();

    document.getElementById('frameWrapper').height = parseInt(document.getElementById('frameWrapper').height - 100) + 'px';
  }

  onCreateClick() {
    this.setState({
      modalCreate:true
    });
  }

  onCreatePage() {
    this.setState({
      modalCreate:false
    });
    if (this.props.onCreatePage) {
      this.props.onCreatePage();
    }
  }

  onModalClose() {
    this.setState({
      modalCreate:false
    });
  }

  onGlobalSetting() {
    let setting = {...this.state.globeSetting};
    setting.show = true;
    this.setState({
      globeSetting: setting
    });
  }
  onCloseGlobalSetting() {
    let setting = {...this.state.globeSetting};
    setting.show = false;
    this.setState({
      globeSetting: setting
    });
  }

  renderImages(images){
    if (images) {
      return Object.keys(images).map((key, index) => (
        <li key={index}>
          <a className="side_template">
            <img 
              src={images[key].thumbnail} 
              data-template={images[key].url}
              data-dynamic={images[key].dynamic?'true':'false'}
              data-shortcode={images[key].dynamic?images[key].shortcode:''}
              data-index={utils.guidGenerator()} 
              draggable='true' 
              onDragStart={this.onDragStartHandler.bind(this)} 
              onDragEnd={this.onDragEndHandler.bind(this)} 
              width="100%" />
            {images[key].title}
          </a>
        </li>
      ));
    }
    else {
      return <li>No Items</li>;
    }
  }

  renderTemplates(templates) {
    if (templates) {
      return Object.keys(templates).map((key, index) => (
        <Panel header={this.renderIcon('fa fa-bars', key)} eventKey={index} key={index} className="sidebar_listitem">
        <ul>{this.renderImages(templates[key])}</ul>
        </Panel>
      ));
    }
    else {
      return <li>Loading...</li>
    }
  }

  renderIcon(icon, title) {
    return (
      <span>
        <i className={icon} />
        {title}
      </span>
    );
  }

  renderCategories() {
    if (this.state.templates) {
      let templates = this.state.templates;
      return Object.keys(this.state.templates).map((key, index) => (
        <Panel header={this.renderIcon('fa fa-book', key)} eventKey={index} key={index} className="sidebar_listitem">
          {index == 1 &&
            <Accordion className="sidebar_listgroup">
            {this.renderTemplates(templates[key])}
            </Accordion>
          }
          {
            index != 1 &&
            <ul>{this.renderImages(templates[key])}</ul>
          }
        </Panel>
      ));
    }
    else {
      return <li>Loading ...</li>
    }
  }

  renderPageOption() {
    if (this.state.pages) {
      let pages = this.state.pages;
      return Object.keys(this.state.pages).map((key, index) => (
        <MenuItem href={ROUTE_BASE_URL + '?name=' + pages[key].location} eventKey={index} key={index}>{pages[key].page_name}</MenuItem>
      ));
    }
    else {
      return <option>Loading</option>;
    }
  }

  render () {
    return (
      <Col xs={3} md={2} className={this.state.isOpen ? 'sidebar opened' : 'sidebar closed'}>
        <div className="left-head">
          <div className="logoWrapper">
            <Image src="images/digilogo.png" rounded />
          </div>
          <Panel header="Select Page" className="page_section">
            <FormGroup controlId="formControlsSelect" id="page-select">
              <Row>
                <Col md={7}>
                  <DropdownButton title="Select Page" id="page-select">
                    {this.renderPageOption()}
                  </DropdownButton>
                </Col>
                <Col md={5}>
                  <Button className="page-add" bsStyle="primary" onClick = {this.onCreateClick.bind(this)}><i className="fa fa-plus"></i>Add Page</Button>
                  <Modal show={this.state.modalCreate} onHide={this.onModalClose.bind(this)}>
                    <form action="/admin/custom-page-add.php" method="post">
                    <Modal.Header closeButton>
                      <Modal.Title>Create Page</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert bsStyle="warning">
                          <strong>Warning!</strong> Make sure you save changes to your current page. When you create new page, all unsaved changes will be lost and new page will open for editing.
                        </Alert>
                        <FormGroup controlId="formControlsPageurl">
                          <ControlLabel>Page URL</ControlLabel>
                          <FormControl type="text" placeholder="Enter Page URL" name="location" />
                        </FormGroup>
                        <FormGroup controlId="formControlsPagename">
                          <ControlLabel>Page Name</ControlLabel>
                          <FormControl type="text" placeholder="Page Name" name="page_name" />
                        </FormGroup>
                        <FormGroup controlId="formControlsPagetitle">
                          <ControlLabel>Page Title</ControlLabel>
                          <FormControl type="text" placeholder="Page Title" name="page_title" />
                        </FormGroup>
                        <FormGroup controlId="formControlsPagedesc">
                          <ControlLabel>Page Description(Max 70 characters)</ControlLabel>
                          <FormControl type="text" placeholder="Page Description" name="page_desc" />
                          <HelpBlock>Shortcode: page_title</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="formControlsPagekeyword">
                          <ControlLabel>Page Keywords(Max 10 characters)</ControlLabel>
                          <FormControl type="text" placeholder="Page Keyword" name="page_keywords" />
                          <HelpBlock>Shortcode: page_keywords</HelpBlock>
                        </FormGroup>
                        <Checkbox value="0" name="restrict_page">
                          Restrict Page Access
                        </Checkbox>
                        <label>Index Page? </label>
                        <FormGroup>
                          <Radio defaultChecked name="index_page" value="1" inline>
                            Yes
                          </Radio>
                          {' '}
                          <Radio name="index_page" value="0" inline>
                            No
                          </Radio>
                        </FormGroup>
                        <FormGroup>
                          <Checkbox defaultChecked name="enable_header" value="1" inline>
                            Enable Header
                          </Checkbox>
                          {' '}
                          <Checkbox defaultChecked name="enable_footer" value="1" inline>
                            Enable Footer
                          </Checkbox>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button bsStyle="primary" type="submit">Create</Button>
                      <Button onClick={this.onModalClose.bind(this)}>Cancel</Button>
                    </Modal.Footer>
                    </form>
                  </Modal>
                </Col>
              </Row>
            </FormGroup>
          </Panel>
        </div>
        <Accordion className="sidebar_listgroup">
          {this.renderCategories()}
          <Button className="menu-btn"><i className="fa fa-paperclip" />Page Settings</Button>
          <Button className="menu-btn" onClick={this.onGlobalSetting.bind(this)}><i className="fa fa-globe" />Global Settings</Button>
          <div id="externalEditor">
					{this.state.globeSetting.show &&
						<ExternalEditComponent
							shortcode = {this.state.globeSetting}
							onClose = {this.onCloseGlobalSetting.bind(this)}
						/>}
					</div>
        </Accordion>
      </Col>
      
    );
  }
}
