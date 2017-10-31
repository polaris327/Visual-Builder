import './LinkEditorComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Modal, Button, Panel, Checkbox, FormControl } from 'react-bootstrap';

export default class LinkEditorComponent extends Component {

  static propTypes = {
    value: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      textToDisplay: (typeof props.value.textToDisplay !== 'undefined') ? props.value.textToDisplay : '',
      curUrl: (typeof props.value.curUrl !== 'undefined') ? props.value.curUrl : 'http://',
      openInNewWindow: (typeof props.value.openInNewWindow !== 'undefined') ? props.value.openInNewWindow : true,
      pageAnchors: (typeof props.value.pageAnchors !== 'undefined') ? props.value.pageAnchors : [],
      curPage: '',
      curPageAnchor: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      textToDisplay: (typeof nextProps.value.textToDisplay !== 'undefined') ? nextProps.value.textToDisplay : '',
      curUrl: (typeof nextProps.value.curUrl !== 'undefined') ? nextProps.value.curUrl : 'http://',
      openInNewWindow: (typeof nextProps.value.openInNewWindow !== 'undefined') ? nextProps.value.openInNewWindow : true,
      pageAnchors: (typeof nextProps.value.pageAnchors !== 'undefined') ? nextProps.value.pageAnchors : []
    });
  }

  /* modal close */
  close(update, ev) {
    this.setState({ showModal: false });

    if (typeof update !== 'undefined' && update === true) {
      var opt = {};
      opt.textToDisplay = this.state.textToDisplay;
      opt.curUrl = this.state.curUrl;
      opt.openInNewWindow = this.state.openInNewWindow;
      opt.pages = this.state.pages;
      opt.pageAnchors = this.state.pageAnchors;

      this.props.onClose(opt);
    } else {
      this.props.onClose(this.props.value);
    }
  }

  /* -- open in new window */
  toggleOpenInNewWindow(e) {
    this.setState({ openInNewWindow: !this.state.openInNewWindow });
  }
  /* open in new window -- */

  /* -- page dropdown */
  onChangePage(ev) {
    this.setState({ curPage: ev.target.value });
    this.setState({ curUrl: ev.target.value + this.state.curPageAnchor});
  }
  /* page dropdown -- */

  /* -- page anchor dropdown */
  onChangePageAnchor(ev) {
    this.setState({ curPageAnchor: ev.target.value });
    this.setState({ curUrl: this.state.curPage + ev.target.value });
  }
  /* page anchor dropdown -- */

  renderPagesDropdown() {
    return (
      <select id='selPages' className='form-control' onChange={ this.onChangePage.bind(this) } value={ this.state.curPage } >
        <option value=''></option>
        {
          this.state.pages.map((p, index) => (
            <option value={p} key={index}>{p}</option>
          ))
        }
      </select>
    );
  }

  renderPageAnchorsDropdown() {
    return (
      <select id='selPageAnchors' className='form-control' onChange={ this.onChangePageAnchor.bind(this) } value={ this.state.curPageAnchor } >
        <option value=''></option>
        {
          this.state.pageAnchors.map((pa, index) => (
            <option value={pa} key={index}>{pa}</option>
          ))
        }
      </select>
    );
  }

  render () {
    return (
      <div className='choose-icon-section'>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)} backdrop={'static'}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='form-group'>
              <label htmlFor='textToDisplay'>Text to display</label>
              <FormControl
                id='textToDisplay'
                componentClass='textarea'
                value={this.state.textToDisplay}
                onChange={(ev) => this.setState({textToDisplay: ev.target.value})}
                placeholder="" />
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label htmlFor='textURL'>URL</label>
                  <input type='text' id='textURL' className='form-control' value={this.state.curUrl} onChange={ (ev) => this.setState({ curUrl: ev.target.value }) }  />
                </div>
              </div>
            </div>
            <div className='form-group'>
              <Checkbox checked={ this.state.openInNewWindow } onChange={ this.toggleOpenInNewWindow.bind(this) } value=''>
                Open in new window
              </Checkbox>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='primary' onClick={this.close.bind(this, true)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
