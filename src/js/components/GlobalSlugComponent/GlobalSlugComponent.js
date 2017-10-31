import './GlobalSlugComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Modal, Button, Tab, Well } from 'react-bootstrap';

export default class GlobalSlugComponent extends Component {

  static propTypes = {
    title:PropTypes.string.isRequired,
    contents:PropTypes.object.isRequired,
    onInsert:PropTypes.func.isRequired,
    loadGlobal:PropTypes.func.isRequired
  };

  /**
   * Constructur
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      contents: {},
      showModal: true
    };
  }

  componentDidMount() {
    this.loadGlobal();
  }

  /**
   * ComponentWillReceiveProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.state.contents !== nextProps.contents) {
      this.setState({
        contents: nextProps.contents
      });
    }
  }

  loadGlobal() {
    if (this.props.loadGlobal) {
      this.props.loadGlobal();
    }
  }

  /**
   * Close Modal Dialog
   * @param {*} update 
   * @param {*} ev 
   */
  onClose() {
    this.setState({ showModal: false });
  }
  /**
   * Insert Modal Dialog
   * 
   */
  onInsert(slug) {
    this.setState({ showModal: false });
    if (this.props.onInsert) {
      this.props.onInsert(slug);
    }
  }

  /**
   * Render plugin widget
   */
  renderContent(tab) {
    return Object.keys(tab).map((key, index) => (
      <Button key={index} bsSize="small" onClick={this.onInsert.bind(this, tab[key])} block>{tab[key].cs_key}</Button>
    ));
  }

  /**
   * Render plugin widget
   */
  renderTabs() {
    if (this.state.contents.elements) {
      const tabs = this.state.contents.elements;
      return Object.keys(this.state.contents.elements).map((key, index) => (
        <Tab eventKey={key} key={key} title={key}>
          <Well bsSize={'sm'} className={'plugin-holder'}>
            {this.renderContent(tabs[key])}
          </Well>
        </Tab>
      ));
    }
    else {
      return (
        <Tab>
          Loading ...
        </Tab>
      );
    }
  }

  /**
   * Render plugin widget
   */
  render () {
    return (
      <div className='choose-icon-section'>
        <Modal
          show={this.state.showModal}
          bsSize="sm"
          onHide={this.onClose.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderContent(this.state.contents)}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onClose.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
