import './ExternalEditComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ExternalEditComponent extends Component {

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
    const { shortcode } = this.props;
    return (
      <div className='choose-icon-section'>
        <Modal
          show={this.state.showModal}
          onHide={this.onClose.bind(this)}
          backdrop={'static'}
          dialogClassName={'custom-modal'}>
          <Modal.Header closeButton>
            <Modal.Title>{shortcode.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe src={shortcode.editUrl}
              frameBorder={0}
              height={'100%'}
              width={'100%'}
              className={'plugin-frame'}
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onClose.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
