import './CodeEditorComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';
import * as utils from '../../utils';

import 'brace/mode/html';
import 'brace/theme/github';

export default class CodeEditorComponent extends Component {

  static propTypes = {
    sectionID:PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      sectionID: (typeof props.sectionID !== 'undefined') ? props.sectionID : '',
      code: (typeof props.sectionID !== 'undefined') ? utils.getSourceCode(props.sectionID) : ''
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  /**
   * Close
   * @param {*} update 
   * @param {*} ev 
   */
  onClose() {
    this.setState({ showModal: false });
    if (this.props.onClose)
        this.props.onClose();
  }

  onSaveCode() {
    utils.setSectionCode(this.props.sectionID, this.state.code);
    this.setState({ showModal: false });
  }

  /**
   * Update Handler from CodeMirror
   * @param {*} newCode 
   */
  updateCode(newCode) {
    this.setState({
        code: newCode
    });
  }

  render () {
    return (
      <Modal show={this.state.showModal} bsSize={'lg'} onHide={this.onClose.bind(this)} backdrop={'static'} className='codeeditor'>
        <Modal.Header closeButton>
          <Modal.Title>Code Editor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AceEditor
                name="editor"
                mode="html"
                theme="github"
                width="100%"
                onChange={this.updateCode.bind(this)}
                value={this.state.code}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='primary' onClick={this.onSaveCode.bind(this)}>Save</Button>
          <Button onClick={this.onClose.bind(this)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
