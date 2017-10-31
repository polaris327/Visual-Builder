import './ChooseImageComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Row, Col, Modal, Button, Panel, ProgressBar, Tabs, Tab } from 'react-bootstrap';
import classnames from 'classnames';

export default class ChooseImageComponent extends Component {

  static propTypes = {
    value: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    altText: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      curImage: (typeof props.value !== 'undefined') ? props.value : '',
      altText: (typeof props.altText !== 'undefined') ? props.altText : ''
    };
  }

  componentDidMount() {
   // this.props.loadImages('');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      altText: (typeof nextProps.altText !== 'undefined') ? nextProps.altText : ''
    });
  }

  /* modal close */
  close(update) {
    this.setState({ showModal: false });
    if (typeof update !== 'undefined' && update === true) {
        this.props.onClose(this.state.curImage, this.state.altText);
    } else {
      this.props.onClose(null);
    }
  }
  render () {
    return (
      <Modal show={this.state.showModal} bsSize={'large'} onHide={this.close.bind(this)} backdrop={'static'} className='choose-image-section'>
        <Modal.Header closeButton>
          <Modal.Title>Select images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div className='col-sm-5'>
              <label htmlFor=''>Selected Image:</label>
              <div className='image-wrapper'>
                {this.state.curImage && <img src={this.state.curImage} alt='No Image' />}
              </div>
            </div>
            <div className='col-sm-7'>
              <div className='form-group'>
                <label htmlFor='altText'>Alt Text</label>
                <input type='text' id='altText' className='form-control' value={this.state.altText} onChange={(ev) => this.setState({ altText: ev.target.value })}  />
              </div>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='primary' onClick={this.close.bind(this, true)}>Save</Button>
          <Button onClick={this.close.bind(this)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
