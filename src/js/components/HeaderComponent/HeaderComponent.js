import './HeaderComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Button, Nav, NavItem, Modal } from 'react-bootstrap';

export default class HeaderComponent extends Component {

  static propTypes = {
    screen      :PropTypes.string.isRequired,
    pageTitle   :PropTypes.string.isRequired,
    changes     :PropTypes.bool,
    isSaving    :PropTypes.bool,
    onPageSave  :PropTypes.func.isRequired,
    onEmptyPage :PropTypes.func.isRequired,
    onPublishPage:PropTypes.func.isRequired,
    onScreenSelect:PropTypes.func.isRequired,
    onToggleSide:PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      screen:props.screen,
      modalEmpty:false,
      modalPublish:false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.screen !== nextProps.screen){
      this.setState({
        screen: nextProps.screen
      });
    }
  }

  onScreenSelect(item) {
    if (this.props.onScreenSelect) {
      this.props.onScreenSelect(item);
    }
  }

  onPageSave() {
    if (this.props.onPageSave) {
      this.props.onPageSave();
    }
  }

  onEmptyClick() {
    this.setState({
      modalEmpty:true
    });
  }

  onPublishClick() {
    this.setState({
      modalPublish : true
    });
  }

  onEmptyPage() {
    this.setState({
      modalEmpty:false
    });
    if (this.props.onEmptyPage) {
      this.props.onEmptyPage();
    }
  }

  onPublishPage() {
    this.setState({
      modalPublish:false
    });
    if (this.props.onPublishPage) {
      this.props.onPublishPage();
    }
  }

  onToggleSide() {
    if (this.onToggleSide) {
      this.props.onToggleSide();
    }
  }

  onModalClose() {
    this.setState({
      modalEmpty:false,
      modalPublish:false
    });
  }

  onClickBack() {
    window.location = '/admin';
  }

  render () {
    const {screen, isSaving} = this.props;
    return (
      <header className="affix">
        <Button bsStyle="success" className="pull-left btn-action btn-back" onClick={this.onClickBack.bind(this)}><i className="fa fa-arrow-left"></i></Button>
        <Button bsStyle="success" className="pull-left btn-action btn-side" onClick={this.onToggleSide.bind(this)}><i className="fa fa-bars"></i></Button>
        <Nav bsStyle="pills" className="responsiveToggle" activeKey={screen} onSelect={this.onScreenSelect.bind(this)}>
          <NavItem eventKey='mobile'><i className="fa fa-mobile" aria-hidden="true"></i></NavItem>
          <NavItem eventKey='tablet'><i className="fa fa-tablet" aria-hidden="true"></i></NavItem>
          <NavItem eventKey='desktop'><i className="fa fa-desktop" aria-hidden="true"></i></NavItem>
        </Nav>
        <Button bsStyle="success" className="pull-right btn-action empty" onClick = {this.onEmptyClick.bind(this)}><i className="fa fa-trash"></i><span>Empty Page</span></Button>
        <Button bsStyle="success" className="pull-right btn-action preview"><i className="fa fa-window-maximize"></i><span>Preview</span></Button>
        <Button bsStyle="success" className="pull-right btn-action export" onClick = {this.onPublishClick.bind(this)}><i className="fa fa-sign-out"></i><span>Publish</span></Button>
        <Button bsStyle="success" className="pull-right btn-action save" onClick = {this.onPageSave.bind(this)} disabled={isSaving.isFetching}>
        <i className="fa fa-check"></i>
        <span className="bLabel">
        {(isSaving.isFetching)?'Saving':[
          (isSaving.isSaved)?'Saved':'Save'
        ]
        }
        </span>
        </Button>
        <Modal show={this.state.modalEmpty} onHide={this.onModalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Empty Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Do you really want to delete the page?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.onEmptyPage.bind(this)}>Empty</Button>
            <Button onClick={this.onModalClose.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.modalPublish} onHide={this.onModalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Publish Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Do you really want to publish the page?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.onPublishPage.bind(this)}>Publish</Button>
            <Button onClick={this.onModalClose.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </header>
    );
  }
}
