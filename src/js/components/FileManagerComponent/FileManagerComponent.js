import './FileManagerComponent.scss';
import { editImage } from '../../constants/urlNames';

import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class FileManagerComponent extends Component {

  static propTypes = {
    shortcode:PropTypes.object.isRequired,
    onClose:PropTypes.func.isRequired
  };

  /**
   * Constructur
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      showModal: true
    };
  }

  /**
   * ComponentWillReceiveProps
   */
  componentWillReceiveProps() {
    this.setState({
      showModal: true
    });
  }

  /**
   * Close Modal Dialog
   * @param {*} update 
   * @param {*} ev 
   */
  onClose() {
    this.setState({ showModal: false });
    if (this.props.onClose) {
      this.props.onClose();
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
          onHide={this.onClose.bind(this)}
          backdrop={'static'}
          bsSize={'large'}>
          <Modal.Header closeButton>
            <Modal.Title>File Manager</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe src={editImage}
              frameBorder={0}
              height={'100%'}
              width={'100%'}
              className={'plugin-frame'}
            ></iframe>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
